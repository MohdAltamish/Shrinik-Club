"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
}

export default function StaggerReveal({
  children,
  className = "",
  selector = ".stagger-item",
  stagger = 0.12,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items =
        gsap.utils.toArray<HTMLElement>(
          selector,
          container,
        );

      if (items.length === 0) {
        return;
      }

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 45,
          scale: 0.97,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [selector, stagger]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}