import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { toast } from "sonner";
import createMediaLogo from "@/assets/create-media-logo-2.png";

const WEBHOOK_URL = "https://auto-n8n.createmedia.pro/webhook-test/3d625327-069a-438c-8d34-47913e9062cf";

const DISCORD_INVITE_URL = "https://discord.com/channels/1243996870943182911/1243996871433785375";

interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: "single" | "multi";
  options: string[];
  required?: boolean;
  blockIfNot?: string;
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

interface BasicsData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

type Answers = Record<string, string | string[]>;

type Step = "intro" | "basics" | number | "submitting" | "complete";

interface SnapCutsFormProps {
  onClose?: () => void;
}

const SnapCutsForm = ({ onClose }: SnapCutsFormProps) => {
  const [step, setStep] = useState<Step>("intro");
  const [basics, setBasics] = useState<BasicsData>({ firstName: "", lastName: "", phone: "", email: "" });
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [flickerPhase, setFlickerPhase] = useState<"none" | "first" | "second">("none");

  const currentQuestion = typeof step === "number" ? questions[step] : null;
  const totalSteps = questions.length + 1; // +1 for basics

  const getCurrentStepNumber = () => {
    if (step === "basics") return 1;
    if (typeof step === "number") return step + 2;
    return 0;
  };

  const canProceedBasics = () => {
    return basics.firstName.trim() && basics.lastName.trim() && basics.phone.trim() && basics.email.trim();
  };

  const canProceed = useCallback(() => {
    if (step === "intro") return true;
    if (step === "basics") return canProceedBasics();
    if (typeof step !== "number") return false;

    const question = questions[step];
    const answer = answers[question.id];

    if (question.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  }, [step, answers, basics]);

  const handleNext = useCallback(() => {
    if (!canProceed()) return;

    if (step === "intro") {
      setStep("basics");
      return;
    }

    if (step === "basics") {
      setStep(0);
      return;
    }

    if (typeof step === "number") {
      const question = questions[step];

      if (question.blockIfNot) {
        const answer = answers[question.id];
        if (answer !== question.blockIfNot) {
          toast.error("You must agree to continue.");
          return;
        }
      }

      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  }, [step, canProceed, answers]);

  const handleBack = () => {
    if (typeof step === "number" && step > 0) {
      setStep(step - 1);
    } else if (step === 0) {
      setStep("basics");
    } else if (step === "basics") {
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
      // Single select with double flicker and auto-advance
      setSelectedOption(option);
      setFlickerPhase("first");
      setAnswers({ ...answers, [currentQuestion.id]: option });

      // First flicker (answer captured)
      setTimeout(() => {
        setFlickerPhase("second");
        
        // Second flicker (transition cue) then advance
        setTimeout(() => {
          setFlickerPhase("none");
          setSelectedOption(null);
          
          // Check if we can proceed and auto-advance
          const question = questions[step as number];
          if (question.blockIfNot && option !== question.blockIfNot) {
            toast.error("You must agree to continue.");
            return;
          }
          
          if ((step as number) < questions.length - 1) {
            setStep((step as number) + 1);
          } else {
            handleSubmit();
          }
        }, 150);
      }, 150);
    }
  };

  const handleSubmit = async () => {
    setStep("submitting");
    setIsSubmitting(true);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        source: "SnapCuts",
        firstName: basics.firstName,
        lastName: basics.lastName,
        phone: basics.phone,
        email: basics.email,
        role: answers.role || "",
        experience: answers.experience || "",
        tools: Array.isArray(answers.tools) ? answers.tools.join(", ") : answers.tools || "",
        niche_experience: answers.niche_experience || "",
        motivation: answers.motivation || "",
        integrity: answers.integrity || "",
        agreement: answers.agreement || "",
      };

      // Send to n8n webhook
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setStep("complete");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
      setStep(questions.length - 1);
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
      if (e.key === "Enter" && canProceed() && step !== "intro") {
        e.preventDefault();
        if (step === "basics" || (typeof step === "number" && currentQuestion?.type === "multi")) {
          handleNext();
        }
      }
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canProceed, handleNext, step, currentQuestion, onClose]);

  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="w-full max-w-2xl my-auto">
        {/* Progress Indicator */}
        {(step === "basics" || typeof step === "number") && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between text-muted-foreground text-sm mb-3">
              <span>Step {getCurrentStepNumber()} of {totalSteps}</span>
              <span>{Math.round((getCurrentStepNumber() / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(getCurrentStepNumber() / totalSteps) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
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
                  transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-8"
                >
                  <img 
                    src={createMediaLogo} 
                    alt="CREATE MEDIA" 
                    className="w-full h-full object-contain rounded-2xl"
                  />
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

          {/* Basics Step */}
          {step === "basics" && (
            <motion.div
              key="basics"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="liquid-glass rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Basics
              </h2>
              <p className="text-muted-foreground mb-8">
                Ensure these are correct, or you won't be able to join the community.
              </p>

              <div className="space-y-5 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      value={basics.firstName}
                      onChange={(e) => setBasics({ ...basics, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={basics.lastName}
                      onChange={(e) => setBasics({ ...basics, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={basics.phone}
                    onChange={(e) => setBasics({ ...basics, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    value={basics.email}
                    onChange={(e) => setBasics({ ...basics, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
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
                  disabled={!canProceedBasics()}
                  whileHover={canProceedBasics() ? { scale: 1.02 } : {}}
                  whileTap={canProceedBasics() ? { scale: 0.98 } : {}}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    canProceedBasics()
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <p className="text-center text-muted-foreground/60 text-sm mt-6">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter ↵</kbd> to continue
              </p>
            </motion.div>
          )}

          {/* Question Screens */}
          {typeof step === "number" && currentQuestion && (
            <motion.div
              key={step}
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

                  const isFlickering = selectedOption === option && flickerPhase !== "none";

                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleSelect(option)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: isFlickering ? (flickerPhase === "first" ? 1.02 : 0.98) : 1,
                      }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4 ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-card/50 border-border hover:border-primary/50 text-foreground hover:bg-card"
                      } ${isFlickering ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
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

                {currentQuestion.type === "multi" && (
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
                    {step === questions.length - 1 ? "Submit" : "Continue"}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {currentQuestion.type === "multi" && (
                <p className="text-center text-muted-foreground/60 text-sm mt-6">
                  Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter ↵</kbd> to continue
                </p>
              )}
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
                  transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
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
