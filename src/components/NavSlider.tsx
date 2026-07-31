import { useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const activeIndex = Math.max(
    0,
    OPTIONS.findIndex((o) => o.path === location.pathname)
  );

  const panVelocityX = useMotionValue(0);
  const scaleX = useTransform(panVelocityX, [-3000, 0, 3000], [1.25, 1, 1.25]);
  const scaleY = useTransform(panVelocityX, [-3000, 0, 3000], [0.85, 1, 0.85]);

  const handlePan = (_event: unknown, info: { velocity: { x: number }; point: { x: number } }) => {
    panVelocityX.set(info.velocity.x);
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const segmentWidth = rect.width / OPTIONS.length;
    if (segmentWidth <= 0) return;
    const relativeX = info.point.x - rect.left;
    const targetIndex = Math.floor(relativeX / segmentWidth);
    const clampedIndex = Math.max(0, Math.min(OPTIONS.length - 1, targetIndex));
    if (clampedIndex !== activeIndex) {
      navigate(OPTIONS[clampedIndex].path);
    }
  };

  const handlePanEnd = () => {
    setIsDragging(false);
    animate(panVelocityX, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <motion.div
      ref={trackRef}
      onPanStart={() => setIsDragging(true)}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className="hidden md:flex flex-row relative select-none cursor-grab active:cursor-grabbing rounded-full p-1 border border-primary/20 bg-primary/5 backdrop-blur-xl min-w-0 flex-1 max-w-[640px]"
    >
      {OPTIONS.map((opt, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={opt.path}
            type="button"
            onClick={() => navigate(opt.path)}
            className="flex-1 relative z-10 flex items-center justify-center px-2 lg:px-3 py-2 bg-transparent border-none outline-none cursor-pointer"
          >
            {isActive && (
              <motion.div
                layoutId="nav-tactile-pill"
                transition={pillSpring}
                style={{ scaleX, scaleY, originX: 0.5 }}
                className={`absolute inset-0 z-0 rounded-full backdrop-blur-md border transition-colors duration-200 ${
                  isDragging
                    ? "bg-primary/15 border-primary/25"
                    : "bg-primary/35 border-primary/50 shadow-[inset_0_1px_2px_hsl(0_0%_100%/0.25),0_2px_10px_hsl(var(--primary)/0.25)]"
                }`}
              />
            )}
            <span
              className={`relative z-10 pointer-events-none whitespace-nowrap text-[11px] lg:text-xs font-medium tracking-wide transition-colors duration-200 ${
                isActive ? "text-white" : "text-white/55"
              }`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
};

export default NavSlider;
