import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MEGA_PROMPT = (url: string) => `Using your YouTube extension, FIRST analyze the content of this specific podcast episode: ${url}

Based ONLY on the insights from this episode, perform the following tasks:

1. THE NEWSLETTER COPY: Write a high-authority LinkedIn post (institutional, Apple-meets-Bloomberg tone, bold headers, zero fluff) summarizing the guest's core investment thesis. Focus on IRR, Risk Mitigation, and First-Principles logic. Format the entire post as a single clean copy-paste block.

2. THE VISUAL ASSETS: Generate 5 standalone DALL·E 3 / ChatGPT image prompts to accompany the newsletter. Each prompt must:
   - Be fully self-contained (no episode context required to render)
   - Specify an Apple-style minimalist aesthetic: pitch-black background, soft glassmorphism, subtle brand-blue (#02AAF5) accents, high-end editorial composition, generous negative space, institutional Bloomberg-grade restraint
   - Be presented as its own clean copy-paste block, clearly labeled IMAGE 1 through IMAGE 5
   - Cover, in order: (1) hero conceptual visual, (2) abstract data / chart composition, (3) cinematic portrait-style scene, (4) macro thesis metaphor, (5) closing brand-mark composition

Constraints: zero fluff, no emojis, institutional tone throughout. Do not summarize the tasks back — execute them.`;

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
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast({ title: "Add a URL", description: "Paste a YouTube podcast URL to continue.", variant: "destructive" });
      return;
    }
    if (!isValidYouTubeUrl(trimmed)) {
      toast({ title: "Invalid URL", description: "Please paste a valid YouTube URL.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const prompt = MEGA_PROMPT(trimmed);
    const target = `https://gemini.google.com/app?prompt=${encodeURIComponent(prompt)}`;
    setTimeout(() => {
      window.open(target, "_blank", "noopener,noreferrer");
      setLoading(false);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 animate-slide-up">
      <div className="depth-card p-10 md:p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%)",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="depth-icon w-14 h-14 mx-auto mb-6">
            <FileText size={26} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Newsletter <span className="text-primary">Architect</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Transform your podcast into institutional-grade investor newsletters in one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="Paste your YouTube Podcast URL here..."
              maxLength={500}
              className="h-12 flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
            />
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={loading}
              className="h-12 px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze with Gemini
                </>
              )}
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/55">
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
