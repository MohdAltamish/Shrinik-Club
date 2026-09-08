"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/* ============================================================
   SCROLLTRIGGER REGISTRATION
============================================================ */

export function registerScrollTrigger() {
  if (typeof window === "undefined") {
    return;
  }

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export { ScrollTrigger };

/* ============================================================
   SCROLL ANIMATION
============================================================ */

export function createScrollAnimation(
  target: gsap.TweenTarget,
  options: gsap.TweenVars & {
    trigger?: gsap.DOMTarget;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {},
) {
  registerScrollTrigger();

  const {
    trigger = target,
    start = "top 85%",
    end = "bottom 20%",
    scrub = false,
    ...animation
  } = options;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      ...animation,

      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        end,
        scrub,
      },
    },
  );
}