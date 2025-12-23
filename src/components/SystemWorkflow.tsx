import { useEffect, useRef, useState } from "react";
import { Camera, MonitorPlay, Share2, BarChart3 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "You Only Need to Shoot",
    description: "You record 1–3 hours of video. That's it. Just show up and talk.",
    icon: Camera,
  },
  {
    id: "02",
    title: "Post-Production & SEO",
    description: "We handle video editing, thumbnail creation, and SEO optimization. We also edit the full long-form video and turn it into shorts.",
    icon: MonitorPlay,
  },
  {
    id: "03",
    title: "Repurposing & Distribution",
    description: "Your content is repurposed and distributed across platforms — short-form, long-form, and written content.",
    icon: Share2,
  },
  {
    id: "04",
    title: "Analytics & Monthly Report",
    description: "Every month, you get a clear breakdown: what worked, what didn't, and what to scale next.",
    icon: BarChart3,
  },
];

// Initial tilted rotations for each card
const initialRotations = [
  { rotateZ: -8, rotateY: 15, translateY: 20 },
  { rotateZ: -3, rotateY: 8, translateY: -15 },
  { rotateZ: 4, rotateY: -8, translateY: 10 },
  { rotateZ: 9, rotateY: -15, translateY: -20 },
];

export const SystemWorkflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the card visibility
            steps.forEach((_, index) => {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });

            // Lock cards after all animations complete
            setTimeout(() => {
              setIsLocked(true);
            }, steps.length * 150 + 600);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#0B0F17] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            A seamless system from recording to results
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[2px] -translate-y-1/2 z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
            {/* Animated pulse */}
            <div 
              className={`absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent transition-opacity duration-500 ${isLocked ? 'opacity-50' : 'opacity-0'}`}
              style={{
                animation: isLocked ? 'pulseMove 3s ease-in-out infinite' : 'none',
              }}
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const rotation = initialRotations[index];
              
              return (
                <div
                  key={step.id}
                  className="relative flex justify-center"
                  style={{ perspective: "1000px" }}
                >
                  {/* Connector chevron - between cards on desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#3B82F6]/40">
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
                        <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  
                  <div
                    className={`
                      group relative w-full p-8 rounded-[20px] 
                      bg-[#1E293B] border border-[#3B82F6]/50
                      shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]
                      transition-all duration-700 ease-out
                      ${cardsVisible[index] ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                      transform: cardsVisible[index]
                        ? isLocked
                          ? 'rotateZ(0deg) rotateY(0deg) translateY(0px)'
                          : `rotateZ(${rotation.rotateZ}deg) rotateY(${rotation.rotateY}deg) translateY(${rotation.translateY}px)`
                        : `rotateZ(${rotation.rotateZ * 1.5}deg) rotateY(${rotation.rotateY * 1.5}deg) translateY(60px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0B0F17] border border-[#3B82F6]/50 rounded-full flex items-center justify-center text-[#3B82F6] font-mono text-sm font-bold shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)] z-10">
                      {step.id}
                    </div>

                    {/* Icon Container */}
                    <div className="mb-6 p-4 bg-[#3B82F6]/10 rounded-xl w-fit border border-[#3B82F6]/20">
                      <Icon className="w-8 h-8 text-[#3B82F6]" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-[#94A3B8] leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyframes for pulse animation */}
      <style>{`
        @keyframes pulseMove {
          0%, 100% { 
            left: 0%; 
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% { 
            left: calc(100% - 5rem); 
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SystemWorkflow;
