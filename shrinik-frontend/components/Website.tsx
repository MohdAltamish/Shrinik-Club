"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { FaLinkedinIn } from "react-icons/fa6";
import gsap from "gsap";

import IntroScreen from "@/components/intro/IntroScreen";
import SmoothScroll from "@/components/effects/SmoothScroll";

import Navbar from "@/components/navbar/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import TeamSection from "@/components/team/TeamSection";
import Footer from "@/components/footer/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

export default function Website() {
  const [introComplete, setIntroComplete] =
    useState(false);

  const heroRef =
    useRef<HTMLElement>(null);

  const mouseFrame =
    useRef<number | null>(null);

  const mousePosition =
    useRef({
      x: 0,
      y: 0,
    });

  const mouseActive =
    useRef(false);

  /*
   * ============================================================
   * INTRO
   * ============================================================
   */

  const handleIntroComplete =
    useCallback(() => {
      setIntroComplete(true);
    }, []);

  /*
   * ============================================================
   * HERO ANIMATION
   * ============================================================
   */

  useLayoutEffect(() => {
    if (
      !introComplete ||
      !heroRef.current
    ) {
      return;
    }

    const hero = heroRef.current;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const ctx = gsap.context(() => {
      const letters =
        gsap.utils.toArray<HTMLElement>(
          ".hero-letter",
        );

      const logo =
        hero.querySelector(
          ".hero-logo",
        );

      const eyebrow =
        hero.querySelector(
          ".hero-eyebrow",
        );

      const titleSweep =
        hero.querySelector(
          ".hero-title-sweep",
        );

      const titleLine =
        hero.querySelector(
          ".hero-title-line",
        );

      const titleGlow =
        hero.querySelector(
          ".hero-title-glow",
        );

      const heroLine =
        hero.querySelector(
          ".hero-line",
        );

      const description =
        hero.querySelector(
          ".hero-description",
        );

      const buttons =
        hero.querySelector(
          ".hero-buttons",
        );

      const scroll =
        hero.querySelector(
          ".hero-scroll",
        );

      /*
       * Reduced motion
       */

      if (reducedMotion) {
        gsap.set(
          [
            logo,
            eyebrow,
            ...letters,
            heroLine,
            description,
            buttons,
            scroll,
          ].filter(Boolean),
          {
            opacity: 1,
            clearProps:
              "transform,filter,textShadow",
          },
        );

        gsap.set(
          [titleSweep, titleLine].filter(
            Boolean,
          ),
          {
            clearProps:
              "transform,opacity",
          },
        );

        return;
      }

      /*
       * Initial states
       */

      gsap.set(letters, {
        opacity: 0,
        y: 70,
        rotationX: -65,
        rotationY: 18,
        rotateZ: 2,
        scale: 0.8,
        filter: "blur(10px)",
        transformOrigin:
          "50% 100%",
        transformPerspective: 900,
        willChange: "transform,opacity",
      });

      gsap.set(titleSweep, {
        xPercent: -180,
        opacity: 0,
        willChange:
          "transform,opacity",
      });

      gsap.set(titleLine, {
        xPercent: -120,
        willChange: "transform",
      });

      /*
       * Main timeline
       */

      const timeline =
        gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

      /*
       * Logo
       */

      timeline.fromTo(
        logo,
        {
          opacity: 0,
          scale: 0.76,
          rotate: -8,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
        },
      );

      /*
       * Eyebrow
       */

      timeline.fromTo(
        eyebrow,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.45",
      );

      /*
       * SHRINIK
       */

      timeline.to(
        letters,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotateZ: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.62,
          stagger: 0.045,
          ease: "power4.out",
        },
        "-=0.12",
      );

      /*
       * Title glow
       */

      timeline.to(
        letters,
        {
          textShadow:
            "0 0 18px rgba(245,241,232,0.12), 0 0 40px rgba(198,146,46,0.08)",
          duration: 0.8,
          stagger: 0.035,
        },
        "-=0.55",
      );

      /*
       * Title shine
       */

      timeline.to(
        letters,
        {
          backgroundPosition:
            "100% 50%",
          duration: 1.25,
          stagger: 0.035,
          ease: "power2.inOut",
        },
        "-=0.55",
      );

      /*
       * Baseline
       */

      timeline.to(
        titleLine,
        {
          xPercent: 500,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.9",
      );

      /*
       * Light sweep
       */

      timeline.to(
        titleSweep,
        {
          xPercent: 650,
          opacity: 1,
          duration: 0.95,
          ease: "power2.inOut",
        },
        "-=0.9",
      );

      timeline.to(
        titleSweep,
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.12",
      );

      /*
       * Divider
       */

      timeline.fromTo(
        heroLine,
        {
          scaleX: 0,
          transformOrigin:
            "left center",
        },
        {
          scaleX: 1,
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.35",
      );

      /*
       * Description
       */

      timeline.fromTo(
        description,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.7",
      );

      /*
       * Buttons
       */

      timeline.fromTo(
        buttons,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.25",
      );

      /*
       * Scroll indicator
       */

      timeline.fromTo(
        scroll,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.15",
      );

      /*
       * Continuous title atmosphere
       */

      if (titleGlow) {
        timeline.call(() => {
          gsap.to(
            titleGlow,
            {
              opacity: 0.55,
              scale: 1.05,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            },
          );
        });
      }
    }, hero);

    return () => {
      ctx.revert();

      if (
        mouseFrame.current !==
        null
      ) {
        cancelAnimationFrame(
          mouseFrame.current,
        );

        mouseFrame.current = null;
      }

      mouseActive.current = false;
    };
  }, [introComplete]);

  /*
   * ============================================================
   * HERO PARALLAX
   * ============================================================
   */

  useEffect(() => {
    if (
      !introComplete ||
      !heroRef.current
    ) {
      return;
    }

    const hero = heroRef.current;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const coarsePointer =
      window.matchMedia(
        "(pointer: coarse)",
      ).matches;

    /*
     * Mouse parallax is intentionally
     * disabled on touch devices.
     */

    if (
      reducedMotion ||
      coarsePointer
    ) {
      return;
    }

    const logo =
      hero.querySelector<HTMLElement>(
        ".hero-logo-parallax",
      );

    const content =
      hero.querySelector<HTMLElement>(
        ".hero-content-parallax",
      );

    const goldGlow =
      hero.querySelector<HTMLElement>(
        ".hero-gold-glow",
      );

    const burgundyGlow =
      hero.querySelector<HTMLElement>(
        ".hero-burgundy-glow",
      );

    const titleGlow =
      hero.querySelector<HTMLElement>(
        ".hero-title-glow",
      );

    const letters =
      Array.from(
        hero.querySelectorAll<HTMLElement>(
          ".hero-letter",
        ),
      );

    const parallaxElements =
      [
        logo,
        content,
        goldGlow,
        burgundyGlow,
        titleGlow,
      ].filter(
        (
          element,
        ): element is HTMLElement =>
          element !== null,
      );

    /*
     * Use GSAP quickTo instead of creating
     * new GSAP tweens for every mouse frame.
     */

    const quickSetters = {
      logoX: logo
        ? gsap.quickTo(logo, "x", {
          duration: 0.45,
          ease: "power3.out",
        })
        : null,

      logoY: logo
        ? gsap.quickTo(logo, "y", {
          duration: 0.45,
          ease: "power3.out",
        })
        : null,

      contentX: content
        ? gsap.quickTo(content, "x", {
          duration: 0.5,
          ease: "power3.out",
        })
        : null,

      contentY: content
        ? gsap.quickTo(content, "y", {
          duration: 0.5,
          ease: "power3.out",
        })
        : null,

      goldX: goldGlow
        ? gsap.quickTo(goldGlow, "x", {
          duration: 0.65,
          ease: "power3.out",
        })
        : null,

      goldY: goldGlow
        ? gsap.quickTo(goldGlow, "y", {
          duration: 0.65,
          ease: "power3.out",
        })
        : null,

      burgundyX: burgundyGlow
        ? gsap.quickTo(
          burgundyGlow,
          "x",
          {
            duration: 0.65,
            ease: "power3.out",
          },
        )
        : null,

      burgundyY: burgundyGlow
        ? gsap.quickTo(
          burgundyGlow,
          "y",
          {
            duration: 0.65,
            ease: "power3.out",
          },
        )
        : null,

      titleX: titleGlow
        ? gsap.quickTo(titleGlow, "x", {
          duration: 0.55,
          ease: "power3.out",
        })
        : null,

      titleY: titleGlow
        ? gsap.quickTo(titleGlow, "y", {
          duration: 0.55,
          ease: "power3.out",
        })
        : null,
    };

    const letterSetters =
      letters.map((letter) => ({
        x: gsap.quickTo(letter, "x", {
          duration: 0.4,
          ease: "power3.out",
        }),

        y: gsap.quickTo(letter, "y", {
          duration: 0.4,
          ease: "power3.out",
        }),

        rotationX: gsap.quickTo(
          letter,
          "rotationX",
          {
            duration: 0.4,
            ease: "power3.out",
          },
        ),

        rotationY: gsap.quickTo(
          letter,
          "rotationY",
          {
            duration: 0.4,
            ease: "power3.out",
          },
        ),
      }));

    const updateParallax =
      () => {
        mouseFrame.current =
          null;

        if (
          !mouseActive.current
        ) {
          return;
        }

        const {
          x,
          y,
        } =
          mousePosition.current;

        quickSetters.logoX?.(
          x * 16,
        );

        quickSetters.logoY?.(
          y * 16,
        );

        quickSetters.contentX?.(
          x * -7,
        );

        quickSetters.contentY?.(
          y * -7,
        );

        quickSetters.goldX?.(
          x * 28,
        );

        quickSetters.goldY?.(
          y * 28,
        );

        quickSetters.burgundyX?.(
          x * -20,
        );

        quickSetters.burgundyY?.(
          y * -20,
        );

        quickSetters.titleX?.(
          x * 18,
        );

        quickSetters.titleY?.(
          y * 12,
        );

        letterSetters.forEach(
          (
            setter,
            index,
          ) => {
            const center =
              index -
              (letters.length -
                1) /
              2;

            setter.x(
              x *
              (2.5 +
                Math.abs(
                  center,
                ) *
                0.35),
            );

            setter.y(
              y *
              (1.8 +
                Math.abs(
                  center,
                ) *
                0.25),
            );

            setter.rotationY(
              x * 2.5,
            );

            setter.rotationX(
              y * -1.5,
            );
          },
        );
      };

    const handleMouseMove =
      (event: MouseEvent) => {
        const rect =
          hero.getBoundingClientRect();

        if (
          event.clientX <
          rect.left ||
          event.clientX >
          rect.right ||
          event.clientY <
          rect.top ||
          event.clientY >
          rect.bottom
        ) {
          return;
        }

        mousePosition.current = {
          x:
            (event.clientX -
              rect.left) /
            rect.width -
            0.5,

          y:
            (event.clientY -
              rect.top) /
            rect.height -
            0.5,
        };

        mouseActive.current =
          true;

        if (
          mouseFrame.current ===
          null
        ) {
          mouseFrame.current =
            requestAnimationFrame(
              updateParallax,
            );
        }
      };

    /*
     * Reset parallax when mouse leaves hero.
     */

    const resetParallax =
      () => {
        mouseActive.current =
          false;

        if (
          mouseFrame.current !==
          null
        ) {
          cancelAnimationFrame(
            mouseFrame.current,
          );

          mouseFrame.current =
            null;
        }

        /*
         * Reset normal parallax.
         */

        gsap.to(
          parallaxElements,
          {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            overwrite: true,
          },
        );

        /*
         * Reset letter position.
         */

        gsap.to(
          letters,
          {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          },
        );

        /*
         * Reset 3D rotation.
         *
         * Kept as a separate tween so the
         * existing GSAP 3D animation is not
         * disrupted.
         */

        letters.forEach(
          (letter) => {
            gsap.to(
              letter,
              {
                rotationX: 0,
                rotationY: 0,
                duration: 0.55,
                ease: "power3.out",
                overwrite: true,
              },
            );
          },
        );
      };

    hero.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      },
    );

    hero.addEventListener(
      "mouseleave",
      resetParallax,
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      hero.removeEventListener(
        "mouseleave",
        resetParallax,
      );

      if (
        mouseFrame.current !==
        null
      ) {
        cancelAnimationFrame(
          mouseFrame.current,
        );

        mouseFrame.current =
          null;
      }

      mouseActive.current =
        false;

      /*
       * Kill only the tweens created
       * by this parallax instance.
       */

      gsap.killTweensOf(
        parallaxElements,
      );

      gsap.killTweensOf(
        letters,
      );
    };
  }, [introComplete]);

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>
      <SmoothScroll />

      {!introComplete && (
        <IntroScreen
          onComplete={
            handleIntroComplete
          }
        />
      )}

      <main
        id="main-content"
        className={`
          overflow-x-clip
          bg-[#080808]
          transition-opacity
          duration-700
          ${introComplete
            ? "opacity-100"
            : "pointer-events-none opacity-0"
          }
        `}
      >
        {/* ======================================================
            NAVBAR
        ====================================================== */}

        <Navbar />

        {/* ======================================================
            HERO
        ====================================================== */}

        <section
          ref={heroRef}
          id="home"
          className="
            relative
            flex
            min-h-screen
            items-center
            overflow-hidden
            bg-[#080808]
            px-6
            md:px-12
          "
        >
          {/* BACKGROUND VIDEO */}

          <video
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              h-full
              w-full
              object-cover
            "
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source
              src="/videos/shrinik-tech-background.mp4"
              type="video/mp4"
            />
          </video>

          {/* DARK OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[1]
              bg-[#080808]/60
            "
          />

          {/* BURGUNDY ATMOSPHERE */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[2]
              bg-gradient-to-br
              from-[#3A0712]/35
              via-transparent
              to-[#080808]/80
            "
          />

          {/* ==================================================
              AMBIENT LIGHTS
          ================================================== */}

          <div className="pointer-events-none absolute inset-0 z-[3]">
            <div
              className="
                hero-gold-glow
                absolute
                left-[3%]
                top-[18%]
                h-[380px]
                w-[380px]
                rounded-full
                bg-[#C6922E]/10
                blur-[140px]
                will-change-transform
              "
            />

            <div
              className="
                hero-burgundy-glow
                absolute
                right-[-10%]
                top-[10%]
                h-[650px]
                w-[650px]
                rounded-full
                bg-[#7A001B]/15
                blur-[170px]
                will-change-transform
              "
            />

            <div
              className="
                absolute
                bottom-[-25%]
                left-1/2
                h-[500px]
                w-[800px]
                -translate-x-1/2
                rounded-full
                bg-[#650018]/[0.07]
                blur-[140px]
              "
            />

            {/* TECH GRID */}

            <div className="absolute inset-0 opacity-[0.035]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(255,255,255,0.45) 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      90deg,
                      rgba(255,255,255,0.45) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize:
                    "80px 80px",
                }}
              />
            </div>

            {/* DOTS */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.035]
              "
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(198,146,46,0.8) 1px, transparent 1px)",
                backgroundSize:
                  "38px 38px",
              }}
            />
          </div>

          {/* ==================================================
              HERO CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-7xl
            "
          >
            <div
              className="
                grid
                items-center
                gap-14
                lg:grid-cols-[0.8fr_1.5fr]
              "
            >
              {/* =================================================
                  LOGO
              ================================================= */}

              <div className="flex justify-center lg:justify-start">
                <div className="hero-logo relative">
                  <div
                    className="
                      hero-logo-parallax
                      relative
                      will-change-transform
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-[-35px]
                        rounded-full
                        bg-[#C6922E]/10
                        blur-[55px]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-[-18px]
                        rounded-full
                        border
                        border-[#C6922E]/10
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-[-8px]
                        rounded-full
                        border
                        border-[#C6922E]/[0.06]
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        aspect-square
                        w-[230px]
                        items-center
                        justify-center
                        rounded-full
                        sm:w-[270px]
                        md:w-[310px]
                        lg:w-[350px]
                      "
                    >
                      <img
                        src="/assets/favicon.png"
                        alt="Shrinik Club G.L. Bajaj"
                        width={350}
                        height={350}
                        fetchPriority="high"
                        decoding="async"
                        className="
                          relative
                          z-10
                          h-full
                          w-full
                          object-contain
                          drop-shadow-[0_0_40px_rgba(198,146,46,0.25)]
                        "
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  HERO TEXT
              ================================================= */}

              <div
                className="
                  hero-content-parallax
                  text-center
                  will-change-transform
                  lg:text-left
                "
              >
                {/* EYEBROW */}

                <div className="hero-eyebrow">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      lg:justify-start
                    "
                  >
                    <span className="h-px w-8 bg-[#C6922E]" />

                    <span
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.4em]
                        text-[#C6922E]
                        sm:text-xs
                      "
                    >
                      Technology · Creativity · Culture
                    </span>
                  </div>
                </div>

                {/* SHRINIK */}

                <div
                  className="
                    hero-title-wrap
                    relative
                    mt-7
                  "
                >
                  {/* PEARL GLOW */}

                  <div
                    className="
                      hero-title-glow
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      z-0
                      h-[190px]
                      w-[90%]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-[#E5EAF0]/[0.07]
                      blur-[95px]
                      will-change-transform
                    "
                  />

                  {/* BURGUNDY GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      z-0
                      h-[140px]
                      w-[75%]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-[#7A2438]/20
                      blur-[80px]
                    "
                  />

                  {/* LIGHT SWEEP */}

                  <div
                    className="
                      hero-title-sweep
                      pointer-events-none
                      absolute
                      inset-y-[-15%]
                      left-[-30%]
                      z-20
                      w-[16%]
                      skew-x-[-18deg]
                      bg-gradient-to-r
                      from-transparent
                      via-[#FFFFFF]/70
                      to-transparent
                      opacity-0
                      blur-xl
                    "
                  />

                  {/* TITLE */}

                  <h1
                    className="
                      hero-title
                      relative
                      z-10
                      flex
                      justify-center
                      lg:justify-start
                      whitespace-nowrap
                      text-[clamp(3rem,8vw,9rem)]
                      font-semibold
                      leading-[0.78]
                      tracking-[-0.07em]
                    "
                    aria-label="SHRINIK"
                  >
                    {"SHRINIK".split("").map(
                      (
                        letter,
                        index,
                      ) => (
                        <span
                          key={`${letter}-${index}`}
                          className="
                            hero-letter
                            relative
                            inline-block
                            bg-[linear-gradient(120deg,#FFFFFF_0%,#F5F1E8_30%,#C9CED4_52%,#F5F1E8_70%,#8B3148_100%)]
                            bg-[length:250%_250%]
                            bg-clip-text
                            text-transparent
                            will-change-transform
                          "
                        >
                          {letter}
                        </span>
                      ),
                    )}
                  </h1>

                  {/* BASELINE */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-5
                      left-0
                      h-px
                      w-full
                      overflow-hidden
                      bg-[#C6922E]/10
                    "
                  >
                    <div
                      className="
                        hero-title-line
                        h-full
                        w-1/4
                        bg-gradient-to-r
                        from-transparent
                        via-[#C6922E]
                        to-transparent
                      "
                    />
                  </div>
                </div>

                {/* DIVIDER */}

                <div
                  className="
                    hero-line
                    mx-auto
                    mt-9
                    h-px
                    w-24
                    bg-[#C6922E]/70
                    lg:mx-0
                    lg:w-32
                  "
                />

                {/* DESCRIPTION */}

                <div className="hero-description">
                  <p
                    className="
                      mx-auto
                      mt-7
                      max-w-xl
                      text-sm
                      leading-7
                      text-white/45
                      md:text-base
                      lg:mx-0
                    "
                  >
                    Where technology meets culture.
                    <br />

                    <span className="text-white/25">
                      A student-driven community at
                      G.L. Bajaj built around creativity,
                      technology and expression.
                    </span>
                  </p>
                </div>

                {/* BUTTONS */}

                <div
                  className="
                    hero-buttons
                    mt-10
                    flex
                    flex-wrap
                    justify-center
                    gap-3
                    lg:justify-start
                  "
                >
                  <a
                    href="#about"
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-full
                      bg-[#C6922E]
                      px-7
                      py-3.5
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#080808]
                      transition-all
                      duration-300
                      hover:scale-[1.03]
                      hover:bg-[#D8AA4D]
                      hover:shadow-[0_0_40px_rgba(198,146,46,0.2)]
                    "
                  >
                    <span className="relative z-10">
                      Explore Shrinik
                    </span>

                    <span
                      className="
                        absolute
                        inset-0
                        -translate-x-full
                        bg-white/20
                        transition-transform
                        duration-500
                        group-hover:translate-x-full
                      "
                    />
                  </a>

                  <a
                    href="#team"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.015]
                      px-7
                      py-3.5
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-white/65
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#C6922E]/50
                      hover:bg-[#C6922E]/[0.06]
                      hover:text-[#F5F1E8]
                    "
                  >
                    Our Team

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* SCROLL */}

          <div
            className="
              hero-scroll
              absolute
              bottom-8
              left-1/2
              z-10
              -translate-x-1/2
            "
          >
            <a
              href="#about"
              className="
                group
                flex
                flex-col
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.4em]
                  text-white/25
                  transition-colors
                  duration-300
                  group-hover:text-[#C6922E]/70
                "
              >
                Scroll
              </span>

              <span
                className="
                  relative
                  h-10
                  w-px
                  overflow-hidden
                  bg-white/10
                "
              >
                <span
                  className="
                    absolute
                    left-0
                    top-0
                    h-1/2
                    w-full
                    bg-gradient-to-b
                    from-[#C6922E]
                    to-transparent
                    animate-pulse
                  "
                />
              </span>
            </a>
          </div>

          {/* CORNER DETAILS */}

          <div
            className="
              absolute
              bottom-8
              left-6
              hidden
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/15
              md:block
              md:left-12
            "
          >
            G.L. BAJAJ · GREATER NOIDA
          </div>

          <div
            className="
              absolute
              bottom-8
              right-6
              hidden
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/15
              md:block
              md:right-12
            "
          >
            EST. · SHRINIK
          </div>
        </section>

        {/* ======================================================
            ABOUT
        ====================================================== */}

        <AboutSection />

        {/* ======================================================
            HOD
        ====================================================== */}

        <section
          id="hod"
          className="
            relative
            overflow-hidden
            bg-[#080808]
            px-6
            py-28
            md:px-12
            md:py-36
          "
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="
                absolute
                left-[-15%]
                top-[10%]
                h-[400px]
                w-[400px]
                rounded-full
                bg-[#650018]/10
                blur-[140px]
              "
            />

            <div
              className="
                absolute
                right-[-10%]
                bottom-[-15%]
                h-[450px]
                w-[450px]
                rounded-full
                bg-[#C6922E]/[0.05]
                blur-[150px]
              "
            />

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#C6922E]/30
                to-transparent
              "
            />

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#C6922E]/20
                to-transparent
              "
            />
          </div>

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-7xl
            "
          >
            <div className="mb-12">
              <div className="flex items-center gap-3">
                <span
                  className="
                    h-px
                    w-8
                    bg-[#C6922E]
                  "
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.4em]
                    text-[#C6922E]
                  "
                >
                  Academic Leadership
                </span>
              </div>

              <h2
                className="
                  mt-6
                  text-5xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-[#F5F1E8]
                  sm:text-6xl
                  md:text-7xl
                "
              >
                Meet Our
                <br />

                <span className="text-white/25">
                  HOD.
                </span>
              </h2>
            </div>

            <article
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/[0.09]
                bg-gradient-to-br
                from-[#120A0C]
                via-[#0D0B0B]
                to-[#080808]
                p-6
                shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                transition-all
                duration-500
                hover:border-[#C6922E]/25
                md:p-10
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-10%]
                  top-[-30%]
                  h-[450px]
                  w-[450px]
                  rounded-full
                  bg-[#650018]/10
                  blur-[120px]
                  transition-opacity
                  duration-500
                  group-hover:opacity-75
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-35%]
                  left-[-15%]
                  h-[350px]
                  w-[350px]
                  rounded-full
                  bg-[#C6922E]/[0.04]
                  blur-[100px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  grid
                  items-center
                  gap-10
                  lg:grid-cols-[1fr_320px]
                  xl:grid-cols-[1fr_360px]
                "
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        h-px
                        w-7
                        bg-[#C6922E]/70
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.35em]
                        text-[#C6922E]
                      "
                    >
                      Head of Department
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5
                      text-4xl
                      font-medium
                      leading-[0.95]
                      tracking-[-0.045em]
                      text-[#F5F1E8]
                      sm:text-5xl
                      md:text-6xl
                    "
                  >
                    Dr. Sansar S. Chauhan
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-2xl
                      text-base
                      leading-7
                      text-white/45
                      md:text-lg
                      md:leading-8
                    "
                  >
                    Head of the Department of Computer
                    Science and Engineering at G.L. Bajaj,
                    dedicated to fostering excellence in
                    teaching, research and innovation.
                  </p>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm
                      leading-7
                      text-white/25
                    "
                  >
                    His experience and academic vision
                    continue to inspire students and
                    faculty towards meaningful growth
                    and holistic development.
                  </p>

                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-3
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.25em]
                        text-white/25
                      "
                    >
                      G.L. Bajaj
                    </span>

                    <span
                      className="
                        h-1
                        w-1
                        rounded-full
                        bg-[#C6922E]/60
                      "
                    />

                    <span
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.25em]
                        text-white/25
                      "
                    >
                      Computer Science & Engineering
                    </span>
                  </div>

                  <div className="mt-9">
                    <a
                      href="https://www.linkedin.com/in/sansar-s-chauhan-ph-d-4969b223/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dr. Sansar S. Chauhan on LinkedIn"
                      title="View LinkedIn Profile"
                      className="
                        group/linkedin
                        inline-flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.02]
                        text-[#F5F1E8]/70
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#C6922E]/50
                        hover:bg-[#C6922E]/10
                        hover:text-[#F5F1E8]
                        hover:shadow-[0_0_30px_rgba(198,146,46,0.15)]
                      "
                    >
                      <FaLinkedinIn
                        size={21}
                        className="
                          transition-transform
                          duration-300
                          group-hover/linkedin:scale-110
                        "
                      />
                    </a>
                  </div>
                </div>

                <div className="mx-auto w-full max-w-[330px]">
                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-full
                      border
                      border-[#C6922E]/35
                      bg-gradient-to-br
                      from-[#3A0712]
                      via-[#16090C]
                      to-[#050505]
                      p-2
                      shadow-[0_0_70px_rgba(198,146,46,0.08)]
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-3
                        z-20
                        rounded-full
                        border
                        border-[#E3C477]/20
                      "
                    />

                    <img
                      src="/images/hod-sansar-chauhan.jpg"
                      alt="Dr. Sansar S. Chauhan"
                      width={360}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-full
                        w-full
                        rounded-full
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        group-hover:scale-[1.035]
                      "
                      draggable={false}
                    />
                  </div>

                  <div className="mt-5 text-center">
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.3em]
                        text-white/20
                      "
                    >
                      Academic Leadership · Shrinik
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ======================================================
            TEAM
        ====================================================== */}

        <TeamSection />

        {/* ======================================================
            EVENTS
        ====================================================== */}

        <EventsSection />

        {/* ======================================================
            GALLERY
        ====================================================== */}

        <GallerySection />

        {/* ======================================================
            CONTACT
        ====================================================== */}

        <ContactSection />

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <Footer />
      </main>

      {/* ======================================================
          AI CHATBOT
      ====================================================== */}
      {introComplete && <Chatbot />}
    </>
  );
}
