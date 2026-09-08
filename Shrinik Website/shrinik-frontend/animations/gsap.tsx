"use client";

import gsap from "gsap";

export { gsap };

export const EASE = {
  smooth: "power3.out",
  expo: "expo.out",
  soft: "power2.out",
  elastic: "elastic.out(1, 0.5)",
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  cinematic: 1.4,
} as const;

export function animateIn(
  target: gsap.TweenTarget,
  options: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 40,
      ...options.from,
    },
    {
      opacity: 1,
      y: 0,
      duration: DURATION.normal,
      ease: EASE.smooth,
      ...options,
    },
  );
}

export function fadeIn(
  target: gsap.TweenTarget,
  options: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: DURATION.normal,
      ease: EASE.smooth,
      ...options,
    },
  );
}