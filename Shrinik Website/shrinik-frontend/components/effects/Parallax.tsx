"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export default function Parallax({
  children,
  className = "",
  speed = 80,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          y: -speed / 2,
        },
        {
          y: speed / 2,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}