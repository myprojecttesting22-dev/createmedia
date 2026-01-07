import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import atlasFirstResponseSound from "@/assets/atlas-first-response.mp3";
import atlasThinkingSound from "@/assets/atlas-thinking.mp3";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-chat`;
const SESSION_KEY = "atlas-session-started";

const AtlasChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const firstResponseAudioRef = useRef<HTMLAudioElement | null>(null);
  const thinkingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    firstResponseAudioRef.current = new Audio(atlasFirstResponseSound);
    thinkingAudioRef.current = new Audio(atlasThinkingSound);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const playFirstResponseSound = useCallback(() => {
    const hasSessionStarted = sessionStorage.getItem(SESSION_KEY);
    if (!hasSessionStarted && firstResponseAudioRef.current) {
      firstResponseAudioRef.current.play().catch(console.error);
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  }, []);

  const playThinkingSound = useCallback(() => {
    if (thinkingAudioRef.current) {
      thinkingAudioRef.current.currentTime = 0;
      thinkingAudioRef.current.play().catch(console.error);
    }
  }, []);

  const stopThinkingSound = useCallback(() => {
    if (thinkingAudioRef.current) {
      thinkingAudioRef.current.pause();
      thinkingAudioRef.current.currentTime = 0;
    }
  }, []);

  const isNavigationRequest = (content: string): boolean => {
    const navKeywords = [
      "take me to", "go to", "open", "show me", "navigate",
      "snapcuts", "core story", "trust frame", "ai engine",
      "connect", "visionlab", "home", "create suite", "get started"
    ];
    const lowerContent = content.toLowerCase();
    return navKeywords.some(keyword => lowerContent.includes(keyword));
  };

  const parseNavigationButtons = (content: string) => {
    const regex = /\[Navigate to: (\/[^\]]*)\]/g;
    const parts: (string | { type: "button"; path: string; label: string })[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      const path = match[1];
      const label = getPageLabel(path);
      parts.push({ type: "button", path, label });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  const getPageLabel = (path: string): string => {
    const labels: Record<string, string> = {
      "/": "Go to Home",
      "/core-story": "View Core Story",
      "/create-suite": "Explore Create Suite",
      "/snapcuts": "Join SnapCuts",
      "/trust-frame": "See Trust Frame",
      "/ai-engine": "Discover AI Engine",
      "/connect": "Connect with Us",
      "/visionlab": "Request Custom Plan",
    };
    return labels[path] || `Go to ${path}`;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to start stream");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMsg: Message = { role: "user", content: userInput };
    const newMessages = [...messages, userMsg];
    const isFirstMessage = messages.length === 0;
    const isNavRequest = isNavigationRequest(userInput);
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Play first response sound if this is the first message of the session
    if (isFirstMessage) {
      playFirstResponseSound();
    }

    try {
      // If navigation request, show thinking state with sound
      if (isNavRequest) {
        setIsThinking(true);
        playThinkingSound();
        
        // Wait for minimum thinking duration (1.5-2.5 seconds)
        const thinkingDuration = 1500 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, thinkingDuration));
        
        stopThinkingSound();
        setIsThinking(false);
      }

      await streamChat(newMessages);
    } catch (error) {
      console.error("Chat error:", error);
      stopThinkingSound();
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div>
                <h3 className="font-semibold text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">ATLAS</h3>
                <p className="text-[10px] text-muted-foreground/60 tracking-wide">CREATE MEDIA Concierge</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !isThinking && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm font-medium text-foreground tracking-wide">WELCOME TO CREATE MEDIA</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-2">
                        {parseNavigationButtons(msg.content).map((part, j) =>
                          typeof part === "string" ? (
                            <span key={j}>{part}</span>
                          ) : (
                            <Button
                              key={j}
                              size="sm"
                              variant="outline"
                              onClick={() => handleNavigate(part.path)}
                              className="mt-2 w-full"
                            >
                              {part.label}
                            </Button>
                          )
                        )}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {/* Thinking state - subtle UI shift only */}
              {isThinking && (
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Atlas"
                  disabled={isLoading}
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AtlasChatbot;
