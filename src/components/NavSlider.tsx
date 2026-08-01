import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

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
  const [ready, setReady] = useState(false);
  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const initialized = useRef(false);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const suppressClick = useRef(false);
  const settledIndex = useRef(0);
  const xAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const widthAnimation = useRef<ReturnType<typeof animate> | null>(null);

  const activeIndex = Math.max(0, OPTIONS.findIndex((o) => o.path === location.pathname));

  const measure = useCallback(() => {
    const next = itemRefs.current.map((el) => ({
      left: el?.offsetLeft ?? 0,
      width: el?.offsetWidth ?? 0,
    }));
    setRects(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    const activeRect = rects[activeIndex];
    if (!activeRect || activeRect.width <= 0 || initialized.current) return;

    x.set(activeRect.left);
    width.set(activeRect.width);
    settledIndex.current = activeIndex;
    initialized.current = true;
    setReady(true);
  }, [activeIndex, rects, width, x]);

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

  const moveTo = useCallback((index: number) => {
    const target = rects[index];
    if (!target || target.width <= 0) return;

    xAnimation.current?.stop();
    widthAnimation.current?.stop();
    settledIndex.current = index;

    if (reduceMotion) {
      x.set(target.left);
      width.set(target.width);
      return;
    }

    xAnimation.current = animate(x, target.left, {
      type: "spring",
      stiffness: 440,
      damping: 38,
      mass: 0.9,
    });
    widthAnimation.current = animate(width, target.width, {
      type: "spring",
      stiffness: 440,
      damping: 38,
      mass: 0.9,
    });
  }, [rects, reduceMotion, width, x]);

  useEffect(() => {
    if (!initialized.current || dragging.current || activeIndex === settledIndex.current) return;
    moveTo(activeIndex);
  }, [activeIndex, moveTo]);

  useEffect(() => () => {
    xAnimation.current?.stop();
    widthAnimation.current?.stop();
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !initialized.current) return;

    const track = trackRef.current;
    if (!track) return;

    const pointerX = event.clientX - track.getBoundingClientRect().left;
    const currentX = x.get();
    const currentWidth = width.get();
    if (pointerX < currentX || pointerX > currentX + currentWidth) return;

    xAnimation.current?.stop();
    widthAnimation.current?.stop();
    dragging.current = true;
    suppressClick.current = false;
    dragOffset.current = pointerX - currentX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const track = trackRef.current;
    if (!track) return;

    const pointerX = event.clientX - track.getBoundingClientRect().left;
    const minX = rects[0]?.left ?? 0;
    const lastRect = rects[rects.length - 1];
    const maxX = lastRect ? lastRect.left + lastRect.width - width.get() : minX;
    const nextX = Math.min(maxX, Math.max(minX, pointerX - dragOffset.current));

    if (Math.abs(nextX - x.get()) > 3) suppressClick.current = true;
    x.set(nextX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);

    const pillCenter = x.get() + width.get() / 2;
    const nearestIndex = rects.reduce((nearest, rect, index) => {
      const nearestRect = rects[nearest];
      if (!nearestRect) return index;
      const distance = Math.abs(rect.left + rect.width / 2 - pillCenter);
      const nearestDistance = Math.abs(nearestRect.left + nearestRect.width / 2 - pillCenter);
      return distance < nearestDistance ? index : nearest;
    }, 0);

    moveTo(nearestIndex);
    if (nearestIndex !== activeIndex) navigate(OPTIONS[nearestIndex].path);
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const handleItemClick = (index: number) => {
    if (suppressClick.current) return;
    moveTo(index);
    navigate(OPTIONS[index].path);
  };

  return (
    <motion.div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="hidden md:flex flex-row items-center relative select-none min-w-0"
    >
      <motion.div
        aria-hidden
        className="absolute top-0 h-full z-0 pointer-events-none rounded-full bg-primary/25 border border-primary/45 shadow-[inset_0_1px_2px_hsl(0_0%_100%/0.2),0_2px_10px_hsl(var(--primary)/0.2)]"
        style={{ x, width, left: 0, opacity: ready ? 1 : 0 }}
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
            onClick={() => handleItemClick(idx)}
            aria-current={isActive ? "page" : undefined}
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
