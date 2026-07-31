import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const OPTIONS = [
  { path: "/", label: "Home" },
  { path: "/core-story", label: "Core Story" },
  { path: "/create-suite", label: "Create Suite" },
  { path: "/visionlab", label: "VisionLab" },
  { path: "/snapcuts", label: "SnapCuts" },
  { path: "/trust-frame", label: "Trust Frame" },
  { path: "/connect", label: "Connect" },
];

type Rect = { left: number; width: number };

const NavSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [rects, setRects] = useState<Rect[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const activeIndex = Math.max(0, OPTIONS.findIndex((o) => o.path === location.pathname));
  const targetIndex = hoveredIndex ?? focusedIndex ?? activeIndex;

  const measure = useCallback(() => {
    const next = itemRefs.current.map((el) => ({
      left: el?.offsetLeft ?? 0,
      width: el?.offsetWidth ?? 0,
    }));
    setRects(next);
  }, []);

  // Measure before paint so the pill is correct on first render (no x=0 animation).
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(track);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    // Re-measure once webfonts settle.
    if (typeof document !== "undefined" && "fonts" in document) {
      (document as Document & { fonts: FontFaceSet }).fonts.ready.then(measure).catch(() => {});
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const target = rects[targetIndex];
  const ready = !!target && target.width > 0;

  return (
    <motion.div
      ref={trackRef}
      onMouseLeave={() => setHoveredIndex(null)}
      className="hidden md:flex flex-row items-center relative select-none min-w-0"
    >
      {/* ONE shared pill for the whole nav */}
      <motion.div
        aria-hidden
        className="absolute top-0 h-full z-0 pointer-events-none rounded-full bg-primary/25 border border-primary/45 shadow-[inset_0_1px_2px_hsl(0_0%_100%/0.2),0_2px_10px_hsl(var(--primary)/0.2)]"
        initial={false}
        style={{ opacity: ready ? 1 : 0, left: 0 }}
        animate={{ x: target?.left ?? 0, width: target?.width ?? 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 480, damping: 40, mass: 0.85 }
        }
      />
      {OPTIONS.map((opt, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={opt.path}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            onMouseEnter={() => setHoveredIndex(idx)}
            onFocus={() => setFocusedIndex(idx)}
            onBlur={() => setFocusedIndex(null)}
            onClick={() => navigate(opt.path)}
            aria-current={isActive ? "page" : undefined}
            className={`nav-tab-item relative z-10 px-4 py-2 bg-transparent border-none outline-none cursor-pointer whitespace-nowrap text-sm font-semibold tracking-wide transition-colors duration-200 ${
              isActive || idx === targetIndex ? "text-white" : "text-white/55"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default NavSlider;
