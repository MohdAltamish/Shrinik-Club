"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import gsap from "gsap";

/* ================================================================
   TYPES
================================================================= */

export type DepthCarouselItem =
  | string
  | { image: string; alt?: string };

type TiltDirection = "left" | "right";

export interface DepthCarouselProps {
  items?: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  /** Tint colour overlaid on back cards */
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (
    index: number,
    item: { image: string; alt?: string },
  ) => void;
  className?: string;
}

/* ================================================================
   INTERNAL HELPERS
================================================================= */

interface CarouselConfig {
  count: number;
  depth: number;
  spread: number;
  tilt: number;
  tiltDirection: TiltDirection;
  visibleCards: number;
  falloff: number;
  blur: number;
  duration: number;
  ease: string;
  loop: boolean;
  cardWidth: number;
  autoplayDelay: number;
}

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: "/assets/gallery/campus.jpg",    alt: "Campus Life" },
  { image: "/assets/gallery/events.jpg",    alt: "Events"      },
  { image: "/assets/gallery/community.jpg", alt: "Community"   },
  { image: "/assets/gallery/campus.jpg",    alt: "Campus"      },
  { image: "/assets/gallery/events.jpg",    alt: "Moments"     },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const normalizeItem = (it: DepthCarouselItem) =>
  typeof it === "string" ? { image: it, alt: "" } : it;

/* ================================================================
   COMPONENT
================================================================= */

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 400,
  radius = 20,
  tint = "#080808",
  depth = 200,
  spread = 88,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.22,
  blur = 5,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
}: DepthCarouselProps) => {
  const data = useMemo(
    () =>
      (Array.isArray(items) ? items : []).map(normalizeItem),
    [items],
  );
  const count = data.length;

  const rootRef    = useRef<HTMLDivElement | null>(null);
  const stageRef   = useRef<HTMLDivElement | null>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef     = useRef(0);
  const focusRef   = useRef(0);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const scaleRef   = useRef(1);
  const cfgRef     = useRef<CarouselConfig>({} as CarouselConfig);
  const onChangeRef = useRef(onChange);

  const dragRef        = useRef<DragState | null>(null);
  const wheelTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef     = useRef(false);

  const [active, setActive] = useState(0);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  };

  /* ---------------------------------------------------------------
     LAYOUT
  ---------------------------------------------------------------- */

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n   = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === "left" ? -1 : 1;
    const sc  = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back  = Math.max(0, d);
      const az    = Math.abs(d);
      const shown = az <= cfg.visibleCards + 0.5;

      const tz = -cfg.depth * d;
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(
        0.15,
        1 - back * cfg.falloff,
      );
      const blurPx =
        cfg.blur > 0
          ? Math.min(
              cfg.blur,
              (back / Math.max(1, cfg.visibleCards)) * cfg.blur,
            )
          : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%,-50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity    = opacity.toFixed(3);
      el.style.filter     = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex     = String(zi);
      el.style.pointerEvents =
        shown && opacity > 0.05 ? "auto" : "none";

      const ov = overlayRefs.current[i];
      if (ov)
        ov.style.opacity = clamp(
          back * cfg.falloff * 1.25,
          0,
          0.86,
        ).toFixed(3);
    }
  }, []);

  /* ---------------------------------------------------------------
     NOTIFY
  ---------------------------------------------------------------- */

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data],
  );

  /* ---------------------------------------------------------------
     TWEEN TO
  ---------------------------------------------------------------- */

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const cfg   = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur   = animate && !reducedRef.current
        ? cfg.duration / 1000
        : 0;

      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0)
            posRef.current = ((posRef.current % n) + n) % n;
          layout(posRef.current);
        },
      });
    },
    [layout],
  );

  /* ---------------------------------------------------------------
     SET FOCUS
  ---------------------------------------------------------------- */

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const n   = cfg.count;
      if (!n) return;

      const idx = cfg.loop
        ? ((rawIndex % n) + n) % n
        : clamp(rawIndex, 0, n - 1);

      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }

      tweenTo(posRef.current + delta, animate);

      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify],
  );

  const navigateBy = useCallback(
    (step: number) => setFocus(focusRef.current + step, true),
    [setFocus],
  );

  /* ---------------------------------------------------------------
     RESIZE OBSERVER
  ---------------------------------------------------------------- */

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w   = entries[0].contentRect.width;
      const cfg = cfgRef.current;
      const needed =
        cfg.cardWidth + Math.abs(cfg.spread) * 2 + 120;
      scaleRef.current = clamp(w / needed, 0.4, 1);
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout]);

  /* ---------------------------------------------------------------
     WHEEL
  ---------------------------------------------------------------- */

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;
      e.preventDefault();
      tweenRef.current?.kill();
      const raw =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 24 : raw;
      const step  = clamp(
        delta / (cfg.cardWidth * 0.9),
        -0.6,
        0.6,
      );
      posRef.current += step;
      layout(posRef.current);
      if (wheelTimerRef.current)
        clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(
        () => setFocus(Math.round(posRef.current), true),
        130,
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current)
        clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  /* ---------------------------------------------------------------
     POINTER DRAG
  ---------------------------------------------------------------- */

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;
      tweenRef.current?.kill();
      dragRef.current = {
        x: e.clientX,
        startPos: posRef.current,
        lastX: e.clientX,
        lastT: performance.now(),
        v: 0,
        moved: false,
        id: e.pointerId,
      };
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const cfg    = cfgRef.current;
      const stepPx = Math.max(
        cfg.cardWidth * 0.55 * scaleRef.current,
        40,
      );
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt  = Math.max(now - drag.lastT, 1);
      drag.v     = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout],
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const cfg    = cfgRef.current;
    const stepPx = Math.max(
      cfg.cardWidth * 0.55 * scaleRef.current,
      40,
    );
    const projected =
      posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  /* ---------------------------------------------------------------
     KEYBOARD
  ---------------------------------------------------------------- */

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy],
  );

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
    },
    [setFocus],
  );

  /* ---------------------------------------------------------------
     AUTOPLAY
  ---------------------------------------------------------------- */

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!autoplay || reducedRef.current || count < 2) return;

    const root = rootRef.current;
    let hovered = false;
    let focused  = false;

    const stop  = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(cfgRef.current.autoplayDelay, 600));
    };

    const onEnter   = () => { hovered = true;  };
    const onLeave   = () => { hovered = false; };
    const onFocusIn  = () => { focused = true;  };
    const onFocusOut = () => { focused = false; };

    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin",    onFocusIn);
    root?.addEventListener("focusout",   onFocusOut);
    start();

    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin",    onFocusIn);
      root?.removeEventListener("focusout",   onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  /* ---------------------------------------------------------------
     RE-LAYOUT ON PROP CHANGES
  ---------------------------------------------------------------- */

  useEffect(() => {
    layout(posRef.current);
  }, [
    layout,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    cardWidth,
    cardHeight,
    radius,
    count,
  ]);

  /* ---------------------------------------------------------------
     CLEANUP
  ---------------------------------------------------------------- */

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current)
        clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current)
        clearInterval(autoTimerRef.current);
    },
    [],
  );

  /* ---------------------------------------------------------------
     RENDER
  ---------------------------------------------------------------- */

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none active:cursor-grabbing focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-[#C6922E]/50 focus-visible:[outline-offset:4px] ${className}`.trim()}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
        minHeight: cardHeight + 60,
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Gallery carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      {/* ---- 3-D Stage ---- */}
      <div
        ref={stageRef}
        style={{ transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {data.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden [transform-origin:center] [will-change:transform,opacity,filter]"
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: radius,
              background: "#12070A",
              boxShadow:
                "0 30px 70px -20px rgba(0,0,0,0.7), 0 8px 24px -10px rgba(0,0,0,0.5)",
            }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            {/* Image */}
            <img
              className="block h-full w-full select-none object-cover opacity-80 grayscale-[30%] transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 [pointer-events:none] [-webkit-user-drag:none]"
              src={item.image}
              alt={item.alt ?? ""}
              draggable={false}
              onError={(e) => {
                /* Fallback — keeps the card clean if assets are missing */
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Bottom gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.7) 35%, transparent 100%)",
                zIndex: 1,
              }}
            />

            {/* Card label */}
            {item.alt && (
              <div
                style={{
                  position: "absolute",
                  bottom: 22,
                  left: 22,
                  right: 22,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 32,
                    background: "#C6922E",
                    marginBottom: 10,
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "#F5F1E8",
                  }}
                >
                  {item.alt}
                </span>
              </div>
            )}

            {/* Tint overlay (depth darkening) */}
            <span
              ref={(el) => { overlayRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                background: tint,
                mixBlendMode: "multiply",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />

            {/* Active ring */}
            {active === i && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: radius,
                  border: "1.5px solid rgba(198,146,46,0.5)",
                  pointerEvents: "none",
                  zIndex: 4,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ---- Prev / Next Controls ---- */}
      {showControls && count > 1 && (
        <>
          <button
            type="button"
            id="depth-carousel-prev"
            className="absolute left-3 top-1/2 z-[3000] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-md transition-all duration-200 hover:border-[#C6922E]/50 hover:bg-[#C6922E]/10 hover:text-[#C6922E] active:scale-95"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            id="depth-carousel-next"
            className="absolute right-3 top-1/2 z-[3000] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-md transition-all duration-200 hover:border-[#C6922E]/50 hover:bg-[#C6922E]/10 hover:text-[#C6922E] active:scale-95"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* ---- Dot Indicators ---- */}
      {showIndicators && count > 1 && (
        <div
          className="absolute bottom-3 left-1/2 z-[3000] flex -translate-x-1/2 items-center gap-[7px] rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm"
          role="tablist"
          aria-label="Gallery slides"
        >
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              id={`depth-carousel-dot-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className="h-[6px] cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: active === i ? 22 : 6,
                background:
                  active === i
                    ? "#C6922E"
                    : "rgba(255,255,255,0.25)",
              }}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
