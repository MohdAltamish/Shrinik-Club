"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  y = 55,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once,
          },
        },
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, [delay, duration, y, once]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}