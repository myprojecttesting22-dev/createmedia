import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center w-[52px] h-[28px] rounded-full border border-white/15 transition-all duration-250 ease-in-out shrink-0"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.08)",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="absolute top-[3px] flex items-center justify-center w-[22px] h-[22px] rounded-full transition-all duration-250 ease-in-out"
        style={{
          left: isDark ? "3px" : "27px",
          background: isDark
            ? "rgba(255,255,255,0.9)"
            : "rgba(0,0,0,0.85)",
        }}
      >
        {isDark ? (
          <Moon size={12} className="text-black" />
        ) : (
          <Sun size={12} className="text-white" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
