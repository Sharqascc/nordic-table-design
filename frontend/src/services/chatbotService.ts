const API_URL = (
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://nordic-table-design.vercel.app')
).replace(/\/$/, '');

export interface ChatbotReply {
  answer: string;
  sources: Array<{ source: string; preview: string }>;
}

export async function askChatbot(message: string): Promise<ChatbotReply> {
  const response = await fetch(`${API_URL}/api/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const payload = await response.json();

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'Failed to get chatbot response');
  }

  return {
    answer: payload.answer,
    sources: Array.isArray(payload.sources) ? payload.sources : [],
  };
}
