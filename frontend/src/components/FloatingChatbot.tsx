import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { askChatbot } from '@/services/chatbotService';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi! Ask me anything about Saffran: menu, hours, catering, or booking.',
};

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const disabled = useMemo(() => loading || !input.trim(), [loading, input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || loading) return;

    setInput('');
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const reply = await askChatbot(message);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: reply.answer || "I don't know based on the website knowledge.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          role: 'assistant',
          text: error instanceof Error ? error.message : 'Chatbot is currently unavailable.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await handleSend();
  };

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-24 right-6 z-50 rounded-full shadow-lg md:bottom-6"
        size="icon"
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </Button>

      {open && (
        <div className="fixed bottom-40 right-6 z-50 w-[min(92vw,360px)] rounded-lg border border-border bg-card shadow-lg md:bottom-20">
          <div className="border-b border-border px-4 py-3">
            <p className="font-medium">Saffran Assistant</p>
            <p className="text-xs text-muted-foreground">Answers from website knowledge</p>
          </div>

          <div className="max-h-80 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-md px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-8 bg-primary text-primary-foreground'
                    : 'mr-8 bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="mr-8 inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border p-3 flex items-center gap-2">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about menu, hours, booking..."
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={disabled} aria-label="Send message">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
