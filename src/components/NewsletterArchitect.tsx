import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, FileText, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PLACEHOLDER = "[USER_YOUTUBE_URL_HERE]";

const buildPrompt = (url: string) => `Using your YouTube extension, FIRST analyze the content of this specific podcast episode: ${url || PLACEHOLDER}

Based ONLY on the insights from this episode, perform the following tasks as a Creative Director for Create Media:

1. THE NEWSLETTER COPY: Write a high-authority LinkedIn post summarizing the guest's core investment thesis. Use institutional, data-driven language.
2. CAROUSEL IMAGE PROMPT ENGINE: Generate 5 distinct 'Micro-Prompts' specifically for ChatGPT's DALL-E 3.
   - Each prompt must be a standalone block for copy-pasting.
   - Style: Professional, 'Apple-style' minimalist, high-end 3D or cinematic aesthetic.
   - Content: Describe a visual scene for a newsletter slide, including Title and Description text overlays.

Format the output so I can copy one image prompt at a time.`;

const isValidYouTubeUrl = (url: string) => {
  try {
    const u = new URL(url);
    return /(^|\.)youtube\.com$/.test(u.hostname) || u.hostname === "youtu.be";
  } catch {
    return false;
  }
};

const NewsletterArchitect = () => {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const trimmed = url.trim();
  const urlReady = trimmed.length > 0 && isValidYouTubeUrl(trimmed);
  const prompt = useMemo(() => buildPrompt(urlReady ? trimmed : ""), [trimmed, urlReady]);

  const handleCopy = async () => {
    if (!urlReady) {
      toast({ title: "Add your YouTube URL first", description: "Paste a valid YouTube link above to inject it into the prompt.", variant: "destructive" });
      return;
    }
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Prompt copied", description: "Now click Launch Gemini and paste it in." });
    } catch {
      toast({ title: "Copy failed", description: "Select the prompt manually and copy.", variant: "destructive" });
    }
  };

  const handleLaunch = () => {
    const a = document.createElement("a");
    a.href = "https://gemini.google.com/app";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 animate-slide-up">
      <div className="depth-card p-8 md:p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="text-center">
            <div className="depth-icon w-14 h-14 mx-auto mb-6">
              <FileText size={26} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Newsletter <span className="text-primary">Architect</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Transform your podcast into institutional-grade investor newsletters in one click.
            </p>
          </div>

          {/* Step 1 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-primary tracking-widest">STEP 01</span>
              <span className="text-xs text-white/50">Paste your YouTube podcast URL</span>
            </div>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              maxLength={500}
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
            />
          </div>

          {/* Step 2 - Prompt box */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary tracking-widest">STEP 02</span>
                <span className="text-xs text-white/50">
                  {urlReady ? "URL injected — ready to copy" : "Your URL will be injected here"}
                </span>
              </div>
              <span className="text-[10px] text-white/30 font-mono uppercase">Mega-Prompt</span>
            </div>
            <div className="relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/[0.03] border-b border-white/5 flex items-center px-3 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <pre className="pt-10 pb-4 px-4 md:px-5 text-xs md:text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap break-words max-h-80 overflow-y-auto">
                {prompt}
              </pre>
            </div>
          </div>

          {/* Step 3 - Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={handleCopy}
              className="h-12 flex-1"
            >
              {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Prompt</>}
            </Button>
            <Button
              size="lg"
              onClick={handleLaunch}
              className="h-12 flex-1"
            >
              <ExternalLink size={18} />
              Launch Gemini
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/55 text-center">
            Need this automated for your entire show history?{" "}
            <Link
              to="/connect"
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            >
              Let Create Media build your full Distribution Engine.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterArchitect;
