export const transition = {
  duration: {
    fast: 0.25,
    normal: 0.5,
    slow: 0.8,
    cinematic: 1.2,
  },

  ease: {
    smooth: "power3.out",
    soft: "power2.out",
    expo: "expo.out",
    inOut: "power3.inOut",
  },

  page: {
    enter: {
      opacity: 0,
      y: 20,
    },

    exit: {
      opacity: 0,
      y: -20,
    },
  },

  hover: {
    duration: 0.3,
    ease: "power2.out",
  },
} as const;