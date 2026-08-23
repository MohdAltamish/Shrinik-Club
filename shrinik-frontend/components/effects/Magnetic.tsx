"use client";

import {
  MouseEvent,
  ReactNode,
  useRef,
} from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  const handleMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const element = ref.current;

    if (
      !element ||
      window.innerWidth < 768
    ) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    tween.current?.kill();

    tween.current = gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.25,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleLeave = () => {
    const element = ref.current;

    if (!element) {
      return;
    }

    tween.current?.kill();

    tween.current = gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </div>
  );
}