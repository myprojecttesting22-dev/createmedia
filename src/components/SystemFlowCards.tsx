import { useEffect, useRef, useState } from "react";

interface CardData {
  title: string;
  text: string[];
  visual: React.ReactNode;
}

const WaveformVisual = () => (
  <svg viewBox="0 0 120 60" className="w-full h-16 opacity-80">
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(198, 100%, 48%)" stopOpacity="0.3" />
        <stop offset="50%" stopColor="hsl(198, 100%, 48%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(198, 100%, 48%)" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Waveform bars */}
    {[...Array(24)].map((_, i) => {
      const height = Math.sin(i * 0.5) * 15 + 20 + Math.random() * 10;
      return (
        <rect
          key={i}
          x={i * 5}
          y={30 - height / 2}
          width="3"
          height={height}
          rx="1.5"
          fill="url(#waveGradient)"
          className="animate-pulse"
          style={{ animationDelay: `${i * 50}ms` }}
        />
      );
    })}
    {/* Microphone icon */}
    <circle cx="60" cy="50" r="6" fill="none" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <rect x="58" y="44" width="4" height="8" rx="2" fill="hsl(198, 100%, 48%)" opacity="0.8" />
  </svg>
);

const TimelineVisual = () => (
  <svg viewBox="0 0 120 60" className="w-full h-16 opacity-80">
    <defs>
      <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(198, 100%, 48%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(198, 100%, 48%)" stopOpacity="1" />
      </linearGradient>
    </defs>
    {/* Timeline track */}
    <rect x="10" y="28" width="100" height="4" rx="2" fill="hsl(0, 0%, 20%)" />
    <rect x="10" y="28" width="70" height="4" rx="2" fill="url(#timelineGradient)" />
    
    {/* Cut markers */}
    <line x1="25" y1="20" x2="25" y2="40" stroke="hsl(198, 100%, 48%)" strokeWidth="2" />
    <line x1="50" y1="20" x2="50" y2="40" stroke="hsl(198, 100%, 48%)" strokeWidth="2" />
    <line x1="80" y1="20" x2="80" y2="40" stroke="hsl(198, 100%, 48%)" strokeWidth="2" opacity="0.5" />
    
    {/* Aspect ratio frames */}
    <rect x="15" y="45" width="20" height="12" rx="2" fill="none" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.6" />
    <rect x="40" y="45" width="12" height="16" rx="2" fill="none" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.8" />
    <rect x="58" y="46" width="16" height="10" rx="2" fill="none" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.7" />
  </svg>
);

const RepurposeVisual = () => (
  <svg viewBox="0 0 120 60" className="w-full h-16 opacity-80">
    <defs>
      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(198, 100%, 48%)" />
        <stop offset="100%" stopColor="hsl(198, 100%, 60%)" />
      </linearGradient>
    </defs>
    {/* Core block */}
    <rect x="50" y="22" width="20" height="16" rx="3" fill="url(#nodeGradient)" />
    
    {/* Connecting lines */}
    <path d="M50 30 L25 15" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <path d="M50 30 L20 30" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <path d="M50 30 L25 45" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <path d="M70 30 L95 15" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <path d="M70 30 L100 30" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    <path d="M70 30 L95 45" stroke="hsl(198, 100%, 48%)" strokeWidth="1.5" opacity="0.6" />
    
    {/* Output nodes */}
    <circle cx="20" cy="12" r="6" fill="hsl(198, 100%, 48%)" opacity="0.7" />
    <circle cx="15" cy="30" r="5" fill="hsl(198, 100%, 48%)" opacity="0.5" />
    <circle cx="20" cy="48" r="6" fill="hsl(198, 100%, 48%)" opacity="0.6" />
    <circle cx="100" cy="12" r="5" fill="hsl(198, 100%, 48%)" opacity="0.6" />
    <circle cx="105" cy="30" r="6" fill="hsl(198, 100%, 48%)" opacity="0.7" />
    <circle cx="100" cy="48" r="5" fill="hsl(198, 100%, 48%)" opacity="0.5" />
  </svg>
);

const AnalyticsVisual = () => (
  <svg viewBox="0 0 120 60" className="w-full h-16 opacity-80">
    <defs>
      <linearGradient id="graphGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="hsl(198, 100%, 48%)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="hsl(198, 100%, 48%)" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Dashboard blocks */}
    <rect x="10" y="8" width="30" height="20" rx="3" fill="hsl(0, 0%, 15%)" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.6" />
    <rect x="45" y="8" width="30" height="20" rx="3" fill="hsl(0, 0%, 15%)" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.6" />
    <rect x="80" y="8" width="30" height="20" rx="3" fill="hsl(0, 0%, 15%)" stroke="hsl(198, 100%, 48%)" strokeWidth="1" opacity="0.6" />
    
    {/* Mini stats in blocks */}
    <text x="25" y="20" fontSize="8" fill="hsl(198, 100%, 48%)" textAnchor="middle">+24%</text>
    <text x="60" y="20" fontSize="8" fill="hsl(198, 100%, 48%)" textAnchor="middle">1.2M</text>
    <text x="95" y="20" fontSize="8" fill="hsl(198, 100%, 48%)" textAnchor="middle">89%</text>
    
    {/* Rising graph */}
    <path d="M10 55 Q30 50, 45 45 T75 38 T110 30" stroke="hsl(198, 100%, 48%)" strokeWidth="2" fill="none" />
    <path d="M10 55 Q30 50, 45 45 T75 38 T110 30 L110 55 L10 55 Z" fill="url(#graphGradient)" />
  </svg>
);

const cards: CardData[] = [
  {
    title: "Record Once",
    text: ["1–3 hours is all it takes.", "You speak. We capture everything."],
    visual: <WaveformVisual />,
  },
  {
    title: "Post-Production",
    text: ["Editing. Structure. Polish.", "Clean cuts, framing, platform-ready content."],
    visual: <TimelineVisual />,
  },
  {
    title: "Repurposing Engine",
    text: ["One source. Multiple outputs.", "Shorts, long-form, written content—everywhere."],
    visual: <RepurposeVisual />,
  },
  {
    title: "Monthly Analytics",
    text: ["Clarity, not guesswork.", "What worked. What scaled. What to double down on."],
    visual: <AnalyticsVisual />,
  },
];

const SystemFlowCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [cardStates, setCardStates] = useState<boolean[]>([false, false, false, false]);
  const [flowProgress, setFlowProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate scroll progress through the section
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight * 0.5)));

      // Trigger cards sequentially
      const newCardStates = cards.map((_, index) => {
        const threshold = 0.15 + index * 0.15;
        return scrollProgress > threshold;
      });
      setCardStates(newCardStates);

      // Update flow progress
      setFlowProgress(Math.min(1, scrollProgress * 1.5));

      // Lock when all cards are visible and section is near middle
      const allVisible = newCardStates.every(Boolean);
      const isNearCenter = sectionTop < viewportHeight * 0.3 && sectionTop > -sectionHeight * 0.3;
      setIsLocked(allVisible && isNearCenter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Content System
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One recording session becomes a complete content ecosystem
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Connecting Flow Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0">
            <div
              className="h-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 ease-out"
              style={{
                width: `${flowProgress * 100}%`,
                boxShadow: isLocked
                  ? "none"
                  : "0 0 20px hsl(198, 100%, 48%), 0 0 40px hsl(198, 100%, 48%, 0.5)",
              }}
            />
            {/* Animated pulse traveling along the line */}
            {!isLocked && flowProgress > 0.1 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary animate-pulse"
                style={{
                  left: `${flowProgress * 100 - 2}%`,
                  boxShadow: "0 0 15px hsl(198, 100%, 48%), 0 0 30px hsl(198, 100%, 48%)",
                }}
              />
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {cards.map((card, index) => {
              const isVisible = cardStates[index];
              const directions = [
                { x: -50, y: -30, rotate: -3 },
                { x: 50, y: -20, rotate: 2 },
                { x: -40, y: 30, rotate: 3 },
                { x: 60, y: 20, rotate: -2 },
              ];
              const dir = directions[index];

              return (
                <div
                  key={card.title}
                  className="relative"
                  style={{
                    transform: isVisible && isLocked
                      ? "translateX(0) translateY(0) rotate(0deg)"
                      : isVisible
                      ? `translateX(0) translateY(0) rotate(${dir.rotate * 0.3}deg)`
                      : `translateX(${dir.x}px) translateY(${dir.y}px) rotate(${dir.rotate}deg)`,
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms`,
                  }}
                >
                  {/* Card */}
                  <div
                    className="relative rounded-[20px] p-6 h-full"
                    style={{
                      background: "linear-gradient(135deg, hsl(0, 0%, 10%) 0%, hsl(0, 0%, 8%) 100%)",
                      border: "1px solid hsl(198, 100%, 48%, 0.3)",
                      boxShadow: isLocked
                        ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                        : "0 0 20px hsl(198, 100%, 48%, 0.15), 0 4px 30px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(ellipse at 50% 0%, hsl(198, 100%, 48%, 0.1) 0%, transparent 60%)",
                        opacity: isLocked ? 0 : 1,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Visual */}
                      <div className="mb-4">
                        {card.visual}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {card.title}
                      </h3>

                      {/* Text */}
                      <div className="space-y-1">
                        {card.text.map((line, i) => (
                          <p
                            key={i}
                            className="text-sm leading-relaxed"
                            style={{ color: "hsl(0, 0%, 70%)" }}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Connection dot for mobile */}
                    {index < cards.length - 1 && (
                      <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div
                          className="w-0.5 h-6 transition-all duration-500"
                          style={{
                            background: cardStates[index + 1]
                              ? "linear-gradient(to bottom, hsl(198, 100%, 48%), transparent)"
                              : "transparent",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemFlowCards;
