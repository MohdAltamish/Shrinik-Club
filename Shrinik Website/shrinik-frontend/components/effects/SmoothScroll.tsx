"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    /*
     * Keep ScrollTrigger synchronized
     * with Lenis scrolling.
     */
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    /*
     * Drive Lenis from GSAP's ticker.
     * GSAP provides the animation clock,
     * keeping both systems synchronized.
     */
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    /*
     * Keep GSAP's default lag protection.
     *
     * Do NOT disable lag smoothing globally.
     * This helps prevent aggressive catch-up
     * when the browser temporarily becomes busy.
     */

    /*
     * Refresh ScrollTrigger after the page
     * has loaded and layout dimensions are
     * available.
     */
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener(
        "load",
        refresh,
      );

      gsap.ticker.remove(update);

      lenis.off("scroll", handleScroll);

      lenis.destroy();
    };
  }, []);

  return null;
}