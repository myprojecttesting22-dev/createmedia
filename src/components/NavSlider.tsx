import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const OPTIONS = [
  { path: "/", label: "Home" },
  { path: "/core-story", label: "Core Story" },
  { path: "/create-suite", label: "Create Suite" },
  { path: "/visionlab", label: "VisionLab" },
  { path: "/snapcuts", label: "SnapCuts" },
  { path: "/trust-frame", label: "Trust Frame" },
  { path: "/connect", label: "Connect" },
];

const pillSpring = { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.8 };

const NavSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [tabRects, setTabRects] = useState<{ left: number; width: number }[]>([]);

  const routeIndex = Math.max(0, OPTIONS.findIndex((o) => o.path === location.pathname));
  const [activeIndex, setActiveIndex] = useState(routeIndex);

  useEffect(() => {
    setActiveIndex(routeIndex);
  }, [routeIndex]);

  useEffect(() => {
    const measureTabs = () => {
      if (!trackRef.current) return;
      const children = trackRef.current.querySelectorAll(".nav-tab-item");
      setTabRects(
        Array.from(children).map((child) => ({
          left: (child as HTMLElement).offsetLeft,
          width: (child as HTMLElement).offsetWidth,
        }))
      );
    };
    measureTabs();
    window.addEventListener("resize", measureTabs);
    return () => window.removeEventListener("resize", measureTabs);
  }, []);

  const pillLeft = useMotionValue(0);
  const pillWidth = useMotionValue(0);
  const panVelocityX = useMotionValue(0);
  const scaleX = useTransform(panVelocityX, [-3000, 0, 3000], [1.25, 1, 1.25]);
  const scaleY = useTransform(panVelocityX, [-3000, 0, 3000], [0.85, 1, 0.85]);

  useEffect(() => {
    const rect = tabRects[activeIndex];
    if (!rect) return;
    animate(pillLeft, rect.left, pillSpring);
    animate(pillWidth, rect.width, pillSpring);
  }, [activeIndex, tabRects, pillLeft, pillWidth]);

  const handlePan = (_e: unknown, info: { velocity: { x: number }; point: { x: number } }) => {
    panVelocityX.set(info.velocity.x);
    if (!trackRef.current || tabRects.length === 0) return;
    const trackLeft = trackRef.current.getBoundingClientRect().left;
    const relativeX = info.point.x - trackLeft;

    let closestIndex = 0;
    let minDistance = Infinity;
    tabRects.forEach((rect, idx) => {
      const distance = Math.abs(relativeX - (rect.left + rect.width / 2));
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    const targetTab = tabRects[closestIndex];
    const last = tabRects[tabRects.length - 1];
    const leftBound = tabRects[0].left;
    const rightBound = last.left + last.width - targetTab.width;
    const clampedX = Math.max(leftBound, Math.min(rightBound, relativeX - targetTab.width / 2));

    pillLeft.set(clampedX);
    pillWidth.set(targetTab.width);
    setActiveIndex(closestIndex);
  };

  const handlePanEnd = () => {
    animate(panVelocityX, 0, { type: "spring", stiffness: 300, damping: 20 });
    const rect = tabRects[activeIndex];
    if (rect) {
      animate(pillLeft, rect.left, pillSpring);
      animate(pillWidth, rect.width, pillSpring);
    }
    const target = OPTIONS[activeIndex];
    if (target && target.path !== location.pathname) navigate(target.path);
  };

  return (
    <motion.div
      ref={trackRef}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className="hidden md:flex flex-row items-center relative select-none cursor-grab active:cursor-grabbing min-w-0"
    >
      <motion.div
        style={{ left: pillLeft, width: pillWidth, scaleX, scaleY, originX: 0.5 }}
        className="absolute top-0 h-full z-0 pointer-events-none rounded-full bg-primary/25 border border-primary/45 shadow-[inset_0_1px_2px_hsl(0_0%_100%/0.2),0_2px_10px_hsl(var(--primary)/0.2)]"
      />
      {OPTIONS.map((opt, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={opt.path}
            type="button"
            onClick={() => {
              setActiveIndex(idx);
              navigate(opt.path);
            }}
            className={`nav-tab-item relative z-10 px-4 py-2 bg-transparent border-none outline-none cursor-pointer whitespace-nowrap text-sm font-semibold tracking-wide transition-colors duration-200 ${
              isActive ? "text-white" : "text-white/55"
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
