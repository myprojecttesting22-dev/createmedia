import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Check, ArrowLeft } from "lucide-react";

const CALENDAR_URL = "https://calendly.com/createmedia22/appointment";
const MIN_CHARS = 50;
const MAX_CHARS = 1000;

const QUESTIONS = [
  {
    title: "What outcome are you trying to achieve over the next 12 months?",
    placeholder:
      "Example: Build authority in my market, generate investor leads, attract buyers, or grow my podcast audience.",
  },
  {
    title: "What's preventing you from getting there today?",
    placeholder:
      "Example: Lack of distribution, inconsistent content, limited visibility, or difficulty attracting the right audience.",
  },
  {
    title: "What have you already invested in content, marketing, or podcast growth?",
    placeholder:
      "Example: Team members, paid advertising, content production, podcasting, personal branding, or marketing agencies.",
  },
  {
    title: "Why is now the right time to solve this?",
    placeholder:
      "Example: Expanding into a new market, launching a project, raising capital, increasing visibility, or scaling my business.",
  },
];

const Connect = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const current = answers[step];
  const valid = current.trim().length >= MIN_CHARS && current.length <= MAX_CHARS;
  const isLast = step === QUESTIONS.length - 1;

  const updateAnswer = (val: string) => {
    if (val.length > MAX_CHARS) return;
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (!valid) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    if (honeypot) return;
    setIsSubmitting(true);
    try {
      const body =
        `Let's dominate.\n\n` +
        QUESTIONS.map(
          (q, i) => `Q${i + 1}. ${q}\n${answers[i].trim()}`,
        ).join("\n\n") +
        `\n\n— Sent from Create Media Connect Line`;

      const mailto = `mailto:vanshhingmire22@gmail.com?subject=${encodeURIComponent(
        "Lets dominate",
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      setSuccess(true);
      setTimeout(() => {
        window.location.href = CALENDAR_URL;
      }, 2500);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Could not open email app",
        description: "Please email us directly at hello@createmedia.pro",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const charCount = current.length;
  const remaining = Math.max(0, MIN_CHARS - current.trim().length);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Connect Line
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's build your next growth system together.
            </p>
          </div>

          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#02AAF5]/40 via-[#02AAF5]/10 to-[#02AAF5]/40 rounded-3xl blur-2xl opacity-60" />

            <div className="relative depth-card p-8 md:p-12 rounded-3xl border border-white/10">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mx-auto w-20 h-20 rounded-full bg-[#02AAF5]/20 border-2 border-[#02AAF5] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(2,170,245,0.6)]"
                    >
                      <Check size={40} className="text-[#02AAF5]" strokeWidth={3} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-3">Application Received</h2>
                    <p className="text-white/70">
                      Redirecting you to book your call...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                  >
                    {/* Intro on step 0 */}
                    {step === 0 && (
                      <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed border-l-2 border-[#02AAF5]/60 pl-4">
                        We partner with a limited number of real estate professionals and podcast hosts each quarter. Complete this short application to see if we're the right fit.
                      </p>
                    )}

                    {/* Progress */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs uppercase tracking-widest text-[#02AAF5] font-semibold">
                          Step {step + 1} of {QUESTIONS.length}
                        </span>
                        <span className="text-xs text-white/50">
                          {Math.round(((step + 1) / QUESTIONS.length) * 100)}%
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#02AAF5] to-[#0066cc] shadow-[0_0_10px_rgba(2,170,245,0.8)]"
                          initial={false}
                          animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Honeypot */}
                    <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                      <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                          {QUESTIONS[step].title}
                        </h2>

                        <Textarea
                          value={current}
                          onChange={(e) => updateAnswer(e.target.value)}
                          placeholder={QUESTIONS[step].placeholder}
                          className="min-h-44 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[#02AAF5] focus-visible:border-[#02AAF5]/60 transition-all rounded-xl text-base resize-none"
                          autoFocus
                        />

                        <div className="flex items-center justify-between mt-3 text-xs">
                          <span
                            className={
                              valid
                                ? "text-[#02AAF5]"
                                : current.length > 0
                                ? "text-white/50"
                                : "text-white/30"
                            }
                          >
                            {valid
                              ? "Looks good"
                              : remaining > 0
                              ? `${remaining} more characters needed`
                              : ""}
                          </span>
                          <span
                            className={
                              charCount >= MAX_CHARS
                                ? "text-red-400"
                                : "text-white/40"
                            }
                          >
                            {charCount} / {MAX_CHARS}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-3 mt-8">
                      {step > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep((s) => s - 1)}
                          className="text-white/70 hover:text-white hover:bg-white/5"
                          disabled={isSubmitting}
                        >
                          <ArrowLeft size={16} className="mr-2" /> Back
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="lg"
                        onClick={handleNext}
                        disabled={!valid || isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#02AAF5] to-[#0088cc] hover:from-[#02AAF5] hover:to-[#02AAF5] text-white font-semibold shadow-[0_0_30px_rgba(2,170,245,0.4)] hover:shadow-[0_0_40px_rgba(2,170,245,0.7)] transition-all disabled:opacity-40 disabled:shadow-none"
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Submitting...
                          </>
                        ) : isLast ? (
                          "DOMINATE →"
                        ) : (
                          "Continue →"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Connect;
