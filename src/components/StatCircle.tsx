import { useEffect, useRef, useState } from "react";

interface StatCircleProps {
  value: string;
  label: string;
  percentage: number;
  color: "blue" | "purple" | "cyan";
  delay?: number;
}

const StatCircle = ({ value, label, percentage, color, delay = 0 }: StatCircleProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    blue: "hsl(var(--primary))",
    purple: "hsl(280, 70%, 60%)",
    cyan: "hsl(190, 70%, 60%)",
  };

  const strokeColor = colorMap[color];
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const targetNumber = parseInt(value.replace(/\D/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatCount = (num: number) => {
    if (value.includes("M")) {
      return `${(num / 1000000).toFixed(1)}M+`;
    }
    if (value.includes("K")) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    return `${num}+`;
  };

  return (
    <div
      ref={circleRef}
      className="flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="liquid-glass-element liquid-glass-element--dark relative w-64 h-64 rounded-full flex items-center justify-center mb-6 hover-lift">
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl transition-opacity duration-500"
          style={{
            background: strokeColor,
            opacity: isVisible ? 0.3 : 0,
          }}
        />

        {/* SVG Ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Track circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            opacity="0.2"
          />
          
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{
              transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: `drop-shadow(0 0 8px ${strokeColor})`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            {isVisible ? formatCount(count) : "0+"}
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-lg md:text-xl font-medium text-foreground/90">{label}</p>
    </div>
  );
};

export default StatCircle;
