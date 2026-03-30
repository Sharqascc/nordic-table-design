import fs from "fs/promises";
import path from "path";

interface KnowledgeChunk {
  id: string;
  text: string;
  source: string;
  tokenCounts: Record<string, number>;
  norm: number;
}

interface StoredVectorIndex {
  knowledgePath: string;
  knowledgeMtimeMs: number;
  chunkSize: number;
  chunkOverlap: number;
  chunks: KnowledgeChunk[];
}

interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface ChatAnswer {
  answer: string;
  sources: Array<{ source: string; preview: string }>;
}

const DEFAULT_CHUNK_SIZE = 900;
const DEFAULT_CHUNK_OVERLAP = 120;
const MIN_RETRIEVAL_SCORE = 0.075;

function normalizeApiKey(raw?: string): string {
  return (raw || "").trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function toTermVector(text: string): { tokenCounts: Record<string, number>; norm: number } {
  const tokenCounts: Record<string, number> = {};
  for (const token of tokenize(text)) {
    tokenCounts[token] = (tokenCounts[token] || 0) + 1;
  }

  let squaredSum = 0;
  for (const count of Object.values(tokenCounts)) {
    squaredSum += count * count;
  }

  return {
    tokenCounts,
    norm: Math.sqrt(squaredSum),
  };
}

function cosineSimilarity(queryVector: Record<string, number>, queryNorm: number, doc: KnowledgeChunk): number {
  if (!queryNorm || !doc.norm) return 0;

  let dotProduct = 0;
  for (const [token, count] of Object.entries(queryVector)) {
    const docCount = doc.tokenCounts[token];
    if (docCount) {
      dotProduct += count * docCount;
    }
  }

  return dotProduct / (queryNorm * doc.norm);
}

function chunkText(text: string, chunkSize: number, overlap: number): string[] {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;

    if (candidate.length <= chunkSize) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current);
      const overlapPart = current.slice(Math.max(0, current.length - overlap));
      current = `${overlapPart}\n\n${paragraph}`;
      if (current.length <= chunkSize) {
        continue;
      }
    } else {
      current = paragraph;
    }

    while (current.length > chunkSize) {
      const slice = current.slice(0, chunkSize);
      chunks.push(slice);
      current = current.slice(Math.max(1, chunkSize - overlap));
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isGreeting(text: string): boolean {
  const normalized = normalizeForMatch(text);
  const greetings = ["hi", "hello", "hey", "hej", "good morning", "good evening"];
  return greetings.some((greet) => normalized === greet || normalized.startsWith(`${greet} `));
}

function keywordIntent(text: string): "hours" | "service" | "booking" | "menu" | "other" {
  const normalized = normalizeForMatch(text);
  if (/(open|opening|hours|time|when)/.test(normalized)) return "hours";
  if (/(service|services|provide|offer|catering|buffet|halal|vegetarian)/.test(normalized)) return "service";
  if (/(book|booking|reservation|reserve|otp|table)/.test(normalized)) return "booking";
  if (/(menu|dish|food|price|dessert|drink)/.test(normalized)) return "menu";
  return "other";
}

export class RagService {
  private backendRoot: string;
  private persistFile: string;
  private knowledgePath: string;
  private modelName: string;
  private apiKey: string;
  private baseUrl: string;
  private index: StoredVectorIndex | null = null;

  constructor(backendRoot: string) {
    this.backendRoot = backendRoot;

    const knowledgeRelative =
      process.env.RAG_KNOWLEDGE_PATH || "rag/knowledge/saffran_website_knowledge.txt";
    this.knowledgePath = path.resolve(this.backendRoot, knowledgeRelative);

    this.persistFile = path.resolve(this.backendRoot, "rag/store/vector_store.json");

    this.modelName = process.env.MODEL_NAME || "llama-3.1-70b-versatile";
    this.apiKey = normalizeApiKey(process.env.MODEL_API_KEY);
    this.baseUrl =
      (process.env.MODEL_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
  }

  async ensureIndex(): Promise<StoredVectorIndex> {
    const stats = await fs.stat(this.knowledgePath);
    const knowledgeMtimeMs = stats.mtimeMs;

    const loaded = await this.loadIndexFromDisk();
    if (
      loaded &&
      loaded.knowledgePath === this.knowledgePath &&
      loaded.knowledgeMtimeMs === knowledgeMtimeMs &&
      loaded.chunkSize === DEFAULT_CHUNK_SIZE &&
      loaded.chunkOverlap === DEFAULT_CHUNK_OVERLAP
    ) {
      this.index = loaded;
      return loaded;
    }

    const knowledgeText = await fs.readFile(this.knowledgePath, "utf-8");
    const chunks = chunkText(knowledgeText, DEFAULT_CHUNK_SIZE, DEFAULT_CHUNK_OVERLAP).map((text, index) => {
      const vector = toTermVector(text);
      return {
        id: `chunk-${index + 1}`,
        text,
        source: path.basename(this.knowledgePath),
        tokenCounts: vector.tokenCounts,
        norm: vector.norm,
      };
    });

    this.index = {
      knowledgePath: this.knowledgePath,
      knowledgeMtimeMs,
      chunkSize: DEFAULT_CHUNK_SIZE,
      chunkOverlap: DEFAULT_CHUNK_OVERLAP,
      chunks,
    };

    await fs.mkdir(path.dirname(this.persistFile), { recursive: true });
    await fs.writeFile(this.persistFile, JSON.stringify(this.index), "utf-8");
    await this.writeCompatibilityArtifacts(this.index);
    return this.index;
  }

  private async writeCompatibilityArtifacts(index: StoredVectorIndex): Promise<void> {
    const storeDir = path.dirname(this.persistFile);
    const indexFile = path.join(storeDir, "faiss.index");
    const metadataFile = path.join(storeDir, "metadata.pkl");

    const indexPayload = {
      format: "simple-cosine-index",
      createdAt: new Date().toISOString(),
      chunks: index.chunks.map((chunk) => ({
        id: chunk.id,
        source: chunk.source,
        norm: chunk.norm,
      })),
    };

    const metadataPayload = index.chunks.map((chunk) => ({
      id: chunk.id,
      source: chunk.source,
      text: chunk.text,
    }));

    await Promise.all([
      fs.writeFile(indexFile, JSON.stringify(indexPayload, null, 2), "utf-8"),
      fs.writeFile(metadataFile, JSON.stringify(metadataPayload, null, 2), "utf-8"),
    ]);
  }

  async reindex(): Promise<{ chunks: number; knowledgePath: string }> {
    this.index = null;
    const index = await this.ensureIndex();
    return {
      chunks: index.chunks.length,
      knowledgePath: this.knowledgePath,
    };
  }

  private async loadIndexFromDisk(): Promise<StoredVectorIndex | null> {
    try {
      const raw = await fs.readFile(this.persistFile, "utf-8");
      return JSON.parse(raw) as StoredVectorIndex;
    } catch {
      return null;
    }
  }

  private retrieve(query: string, topK = 5): RetrievalResult[] {
    if (!this.index) return [];

    const queryVectorData = toTermVector(query);
    const scored = this.index.chunks
      .map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryVectorData.tokenCounts, queryVectorData.norm, chunk),
      }))
      .filter((entry) => entry.score >= MIN_RETRIEVAL_SCORE)
      .sort((left, right) => right.score - left.score)
      .slice(0, topK);

    return scored;
  }

  private async answerWithModel(question: string, contexts: RetrievalResult[]): Promise<string> {
    const contextBlock = contexts
      .map((entry, index) => `Context ${index + 1} (score ${entry.score.toFixed(3)}):\n${entry.chunk.text}`)
      .join("\n\n");

    const prompt = [
      "You are a helpful website assistant for Saffran restaurant.",
      "Answer only from the provided context.",
      "If the context does not contain the answer, say: I don't know based on the website knowledge.",
      "Keep answers concise and practical in 2-5 lines.",
      "Do not copy large raw blocks.",
      "\nContext:\n",
      contextBlock,
      "\nQuestion:\n",
      question,
    ].join("\n");

    if (!this.apiKey) {
      return this.answerWithoutModel(contexts);
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: "system", content: "You answer questions about the Saffran restaurant website." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Model request failed (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = payload.choices?.[0]?.message?.content?.trim();
    return text || this.answerWithoutModel(contexts);
  }

  private answerWithoutModel(contexts: RetrievalResult[]): string {
    if (!contexts.length) return "I don't know based on the website knowledge.";

    const joined = contexts.map((entry) => entry.chunk.text).join("\n\n");
    const lines = joined
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.slice(0, 5).join("\n");
  }

  private answerByIntent(question: string, contexts: RetrievalResult[]): string {
    const intent = keywordIntent(question);
    const corpus = contexts.map((entry) => entry.chunk.text).join("\n\n");
    const lines = corpus
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    const pick = (matcher: RegExp, max = 5) => lines.filter((line) => matcher.test(line)).slice(0, max);

    if (intent === "hours") {
      const matched = pick(/monday|tuesday|wednesday|thursday|friday|saturday|sunday|opening hours|open/i, 8);
      if (matched.length) return matched.join("\n");
    }

    if (intent === "service") {
      const matched = pick(/service|services|lunch buffet|catering|halal|vegetarian|trust and service/i, 8);
      if (matched.length) return matched.join("\n");
    }

    if (intent === "booking") {
      const matched = pick(/booking|book|reservation|otp|required fields|table/i, 8);
      if (matched.length) return matched.join("\n");
    }

    if (intent === "menu") {
      const matched = pick(/menu|dish|price|sek|dessert|drinks|starters|kebab|rice/i, 8);
      if (matched.length) return matched.join("\n");
    }

    return this.answerWithoutModel(contexts);
  }

  async ask(question: string): Promise<ChatAnswer> {
    if (isGreeting(question)) {
      return {
        answer: "Hi! I can help with menu, opening hours, catering, and booking at Saffran.",
        sources: [],
      };
    }

    await this.ensureIndex();

    const contexts = this.retrieve(question, 5);
    if (!contexts.length) {
      return {
        answer: "I don't know based on the website knowledge.",
        sources: [],
      };
    }

    let answer: string;
    try {
      answer = await this.answerWithModel(question, contexts);
    } catch {
      answer = this.answerByIntent(question, contexts);
    }

    if (!answer || answer.length > 1200 || /^:\s*/.test(answer.trim())) {
      answer = this.answerByIntent(question, contexts);
    }

    return {
      answer,
      sources: contexts.slice(0, 3).map((entry) => ({
        source: entry.chunk.source,
        preview: `${entry.chunk.text.slice(0, 120)}...`,
      })),
    };
  }
}
