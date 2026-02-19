import { useEffect, useRef, useState } from "react";
import { Camera, MonitorPlay, Share2, BarChart3 } from "lucide-react";

const steps = [
  { id: "01", title: "You Only Need to Shoot", description: "You record 1–3 hours of video. That's it. Just show up and talk.", icon: Camera },
  { id: "02", title: "Post-Production & SEO", description: "We handle video editing, thumbnail creation, and SEO optimization. We also edit the full long-form video and turn it into shorts.", icon: MonitorPlay },
  { id: "03", title: "Repurposing & Distribution", description: "Your content is repurposed and distributed across platforms — short-form, long-form, and written content.", icon: Share2 },
  { id: "04", title: "Analytics & Monthly Report", description: "Every month, you get a clear breakdown: what worked, what didn't, and what to scale next.", icon: BarChart3 },
];

export const SystemWorkflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 130);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#0a0c10" }}
    >
      {/* Atmospheric radial glow behind cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(0,150,255,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-4 font-medium">
            Proven 4-Step System
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            How It Works
          </h2>
          <p className="text-base text-white/45 max-w-xl mx-auto leading-relaxed">
            A seamless system from recording to results
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="glass-step-card group"
                style={{
                  opacity: cardsVisible[index] ? 1 : 0,
                  transform: cardsVisible[index]
                    ? "translateY(0px)"
                    : "translateY(40px)",
                  transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
                }}
              >
                {/* Top row: icon + step number */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="glass-icon-box">
                    <Icon className="w-5 h-5" strokeWidth={1.6} style={{ color: "#02AAF5" }} />
                  </div>
                  <span
                    className="text-xs font-mono tracking-[0.2em] font-semibold"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {step.id}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold leading-snug mb-3"
                  style={{ color: "#ffffff" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9ea8b8", lineHeight: "1.75" }}
                >
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-8 h-px w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(2,170,245,0.5), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .glass-step-card {
          position: relative;
          border-radius: 28px;
          padding: 2rem;
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.075) 0%,
            rgba(255,255,255,0.025) 100%
          );
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow:
            0 25px 60px rgba(0,0,0,0.45),
            0 0 120px rgba(0,150,255,0.12),
            inset 0 1px 0 rgba(255,255,255,0.18);
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        /* Soft blue bottom glow inside each card */
        .glass-step-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 60%;
          background: radial-gradient(
            ellipse at bottom center,
            rgba(0,170,255,0.13) 0%,
            transparent 70%
          );
          pointer-events: none;
          border-radius: 0 0 28px 28px;
        }

        /* Top gloss highlight */
        .glass-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.25),
            transparent
          );
          pointer-events: none;
        }

        .glass-step-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow:
            0 35px 80px rgba(0,0,0,0.5),
            0 0 160px rgba(0,150,255,0.20),
            inset 0 1px 0 rgba(255,255,255,0.22);
        }

        .glass-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(2,170,245,0.18) 0%,
            rgba(2,170,245,0.08) 100%
          );
          border: 1px solid rgba(2,170,245,0.22);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.15),
            0 0 20px rgba(2,170,245,0.10);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
};

export default SystemWorkflow;
