import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

const DISCORD_INVITE_URL = "https://discord.gg/your-invite-link"; // Replace with actual Discord invite
const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook"; // Replace with actual webhook

interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: "single" | "multi";
  options: string[];
  required?: boolean;
  blockIfNot?: string; // Block submission unless this option is selected
}

const questions: Question[] = [
  {
    id: "role",
    title: "What best describes you?",
    type: "single",
    options: [
      "Video Editor (I actually deliver on time)",
      "Short-form Creator (Reels, Shorts, TikToks)",
      "Real Estate Content Specialist (brokers love me)",
      "Beginner (no ego, just hunger)",
    ],
  },
  {
    id: "experience",
    title: "How long have you been editing or creating content?",
    type: "single",
    options: [
      "Less than 6 months (don't roast me)",
      "6–12 months (learning fast)",
      "1–3 years (I know my stuff)",
      "3+ years (yes, I've suffered)",
    ],
  },
  {
    id: "tools",
    title: "What tools do you actually use?",
    subtitle: "(Select all that apply — lying here is pointless)",
    type: "multi",
    options: ["CapCut", "DaVinci Resolve", "Premiere Pro", "After Effects", "Other"],
  },
  {
    id: "niche_experience",
    title: "Have you worked with real estate or personal brands before?",
    type: "single",
    options: [
      "Yes, real estate (I get the niche)",
      "Yes, other niches (skills transfer)",
      "No, but I'm grinding hard",
      "No, and honestly… what even is real estate?",
    ],
  },
  {
    id: "motivation",
    title: "Be honest — why do you want to join SnapCuts?",
    type: "single",
    options: [
      "I want to earn money (to pay my rent)",
      "I want to get better at editing (in 2026)",
      "I want access to real opportunities and people (not another dead Discord)",
      "I want to build a portfolio that looks serious (not random gigs on Fiverr)",
      "All of the above (hell yes)",
    ],
  },
  {
    id: "integrity",
    title: "Pick the statement that sounds most like you:",
    type: "single",
    options: [
      "I follow rules and don't act like a clown",
      "I don't steal clients, content, or ideas",
      "I don't spam DMs like a desperate freelancer",
      "Yes, all of the above",
    ],
  },
  {
    id: "agreement",
    title: "Final check:",
    subtitle:
      "By joining, you acknowledge SnapCuts may share opportunities, standards, and internal knowledge, and you agree not to misuse or redistribute them outside the community and not act like a dumbass.",
    type: "single",
    options: ["Yes, I agree. Let me in.", "No (close this form, respectfully)"],
    required: true,
    blockIfNot: "Yes, I agree. Let me in.",
  },
];

type Answers = Record<string, string | string[]>;

const SnapCutsForm = () => {
  const [step, setStep] = useState<"intro" | number | "submitting" | "complete">("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = typeof step === "number" ? questions[step] : null;
  const totalQuestions = questions.length;

  const canProceed = useCallback(() => {
    if (step === "intro") return true;
    if (typeof step !== "number") return false;

    const question = questions[step];
    const answer = answers[question.id];

    if (question.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  }, [step, answers]);

  const handleNext = useCallback(() => {
    if (!canProceed()) return;

    if (step === "intro") {
      setStep(0);
      return;
    }

    if (typeof step === "number") {
      const question = questions[step];

      // Check for blockIfNot condition
      if (question.blockIfNot) {
        const answer = answers[question.id];
        if (answer !== question.blockIfNot) {
          toast.error("You must agree to continue.");
          return;
        }
      }

      if (step < totalQuestions - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  }, [step, canProceed, answers, totalQuestions]);

  const handleBack = () => {
    if (typeof step === "number" && step > 0) {
      setStep(step - 1);
    } else if (step === 0) {
      setStep("intro");
    }
  };

  const handleSelect = (option: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "multi") {
      const current = (answers[currentQuestion.id] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: option });
    }
  };

  const handleSubmit = async () => {
    setStep("submitting");
    setIsSubmitting(true);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        page: "SnapCuts",
        ...answers,
      };

      // Send to webhook
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors", // For cross-origin webhooks
      });

      setStep("complete");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
      setStep(totalQuestions - 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscordRedirect = () => {
    window.open(DISCORD_INVITE_URL, "_blank");
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canProceed()) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canProceed, handleNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        {typeof step === "number" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between text-muted-foreground text-sm mb-3">
              <span>Question {step + 1} of {totalQuestions}</span>
              <span>{Math.round(((step + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait" custom={1}>
          {/* Intro Screen */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="liquid-glass rounded-3xl p-10 md:p-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>

                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Welcome to <span className="text-primary">CREATE MEDIA</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10">
                  SnapCuts – Join Network <span className="text-muted-foreground/60">(I promise this is short)</span>
                </p>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-primary-foreground transition-all duration-300 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(198 100% 58%) 100%)",
                    boxShadow: "0 0 40px hsl(var(--primary) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="relative z-10">Start Application</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Question Screens */}
          {typeof step === "number" && currentQuestion && (
            <motion.div
              key={step}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="liquid-glass rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {currentQuestion.title}
              </h2>

              {currentQuestion.subtitle && (
                <p className="text-muted-foreground mb-8">{currentQuestion.subtitle}</p>
              )}

              <div className="space-y-3 mb-10">
                {currentQuestion.options.map((option, index) => {
                  const isSelected =
                    currentQuestion.type === "multi"
                      ? ((answers[currentQuestion.id] as string[]) || []).includes(option)
                      : answers[currentQuestion.id] === option;

                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleSelect(option)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-card/50 border-border hover:border-primary/50 text-foreground hover:bg-card"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/50"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className="text-base md:text-lg">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>

                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  whileHover={canProceed() ? { scale: 1.02 } : {}}
                  whileTap={canProceed() ? { scale: 0.98 } : {}}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {step === totalQuestions - 1 ? "Submit" : "Continue"}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <p className="text-center text-muted-foreground/60 text-sm mt-6">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter ↵</kbd> to continue
              </p>
            </motion.div>
          )}

          {/* Submitting Screen */}
          {step === "submitting" && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="liquid-glass rounded-3xl p-12 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-xl text-foreground">Submitting your application...</p>
            </motion.div>
          )}

          {/* Complete Screen */}
          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="liquid-glass rounded-3xl p-10 md:p-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                  You're in. Don't be weird. Build something real.
                </h2>

                <motion.button
                  onClick={handleDiscordRedirect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-primary-foreground transition-all duration-300 mt-8"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(198 100% 58%) 100%)",
                    boxShadow: "0 0 40px hsl(var(--primary) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  Join the SnapCuts Discord Community
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SnapCutsForm;
