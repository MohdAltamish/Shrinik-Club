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
import ContactSection from "@/components/sections/ContactSection";
import TeamSection from "@/components/team/TeamSection";
import Footer from "@/components/footer/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

export default function Website() {
  const [introComplete, setIntroComplete] = useState(false);

  const [hodPhotoOpen, setHodPhotoOpen] = useState(false);
  const [facultyPhotoOpen, setFacultyPhotoOpen] = useState(false);
  const [kiranPhotoOpen, setKiranPhotoOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);

  const mouseFrame = useRef<number | null>(null);

  const mousePosition = useRef({
    x: 0,
    y: 0,
  });

  const mouseActive = useRef(false);

  /*
   * ============================================================
   * INTRO
   * ============================================================
   */

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /*
   * ============================================================
   * HERO ANIMATION
   * ============================================================
   */

  useLayoutEffect(() => {
    if (!introComplete || !heroRef.current) {
      return;
    }

    const hero = heroRef.current;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");

      const logo = hero.querySelector(".hero-logo");

      const eyebrow = hero.querySelector(".hero-eyebrow");

      const titleSweep = hero.querySelector(".hero-title-sweep");

      const titleLine = hero.querySelector(".hero-title-line");

      const titleGlow = hero.querySelector(".hero-title-glow");

      const heroLine = hero.querySelector(".hero-line");

      const description = hero.querySelector(".hero-description");

      const buttons = hero.querySelector(".hero-buttons");

      const scroll = hero.querySelector(".hero-scroll");

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
            clearProps: "transform,filter,textShadow",
          },
        );

        gsap.set([titleSweep, titleLine].filter(Boolean), {
          clearProps: "transform,opacity",
        });

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
        transformOrigin: "50% 100%",
        transformPerspective: 900,
        willChange: "transform,opacity",
      });

      gsap.set(titleSweep, {
        xPercent: -180,
        opacity: 0,
        willChange: "transform,opacity",
      });

      gsap.set(titleLine, {
        xPercent: -120,
        willChange: "transform",
      });

      /*
       * Main timeline
       */

      const timeline = gsap.timeline({
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
          backgroundPosition: "100% 50%",
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
          transformOrigin: "left center",
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
          gsap.to(titleGlow, {
            opacity: 0.55,
            scale: 1.05,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, hero);

    return () => {
      ctx.revert();

      if (mouseFrame.current !== null) {
        cancelAnimationFrame(mouseFrame.current);

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
    if (!introComplete || !heroRef.current) {
      return;
    }

    const hero = heroRef.current;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    /*
     * Mouse parallax is intentionally
     * disabled on touch devices.
     */

    if (reducedMotion || coarsePointer) {
      return;
    }

    const logo = hero.querySelector<HTMLElement>(".hero-logo-parallax");

    const content = hero.querySelector<HTMLElement>(".hero-content-parallax");

    const goldGlow = hero.querySelector<HTMLElement>(".hero-gold-glow");

    const burgundyGlow = hero.querySelector<HTMLElement>(".hero-burgundy-glow");

    const titleGlow = hero.querySelector<HTMLElement>(".hero-title-glow");

    const letters = Array.from(
      hero.querySelectorAll<HTMLElement>(".hero-letter"),
    );

    const parallaxElements = [
      logo,
      content,
      goldGlow,
      burgundyGlow,
      titleGlow,
    ].filter((element): element is HTMLElement => element !== null);

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
        ? gsap.quickTo(burgundyGlow, "x", {
            duration: 0.65,
            ease: "power3.out",
          })
        : null,

      burgundyY: burgundyGlow
        ? gsap.quickTo(burgundyGlow, "y", {
            duration: 0.65,
            ease: "power3.out",
          })
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

    const letterSetters = letters.map((letter) => ({
      x: gsap.quickTo(letter, "x", {
        duration: 0.4,
        ease: "power3.out",
      }),

      y: gsap.quickTo(letter, "y", {
        duration: 0.4,
        ease: "power3.out",
      }),

      rotationX: gsap.quickTo(letter, "rotationX", {
        duration: 0.4,
        ease: "power3.out",
      }),

      rotationY: gsap.quickTo(letter, "rotationY", {
        duration: 0.4,
        ease: "power3.out",
      }),
    }));

    const updateParallax = () => {
      mouseFrame.current = null;

      if (!mouseActive.current) {
        return;
      }

      const { x, y } = mousePosition.current;

      quickSetters.logoX?.(x * 16);

      quickSetters.logoY?.(y * 16);

      quickSetters.contentX?.(x * -7);

      quickSetters.contentY?.(y * -7);

      quickSetters.goldX?.(x * 28);

      quickSetters.goldY?.(y * 28);

      quickSetters.burgundyX?.(x * -20);

      quickSetters.burgundyY?.(y * -20);

      quickSetters.titleX?.(x * 18);

      quickSetters.titleY?.(y * 12);

      letterSetters.forEach((setter, index) => {
        const center = index - (letters.length - 1) / 2;

        setter.x(x * (2.5 + Math.abs(center) * 0.35));

        setter.y(y * (1.8 + Math.abs(center) * 0.25));

        setter.rotationY(x * 2.5);

        setter.rotationX(y * -1.5);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }

      mousePosition.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,

        y: (event.clientY - rect.top) / rect.height - 0.5,
      };

      mouseActive.current = true;

      if (mouseFrame.current === null) {
        mouseFrame.current = requestAnimationFrame(updateParallax);
      }
    };

    /*
     * Reset parallax when mouse leaves hero.
     */

    const resetParallax = () => {
      mouseActive.current = false;

      if (mouseFrame.current !== null) {
        cancelAnimationFrame(mouseFrame.current);

        mouseFrame.current = null;
      }

      /*
       * Reset normal parallax.
       */

      gsap.to(parallaxElements, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
      });

      /*
       * Reset letter position.
       */

      gsap.to(letters, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });

      /*
       * Reset 3D rotation.
       *
       * Kept as a separate tween so the
       * existing GSAP 3D animation is not
       * disrupted.
       */

      letters.forEach((letter) => {
        gsap.to(letter, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.55,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    hero.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    hero.addEventListener("mouseleave", resetParallax);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);

      hero.removeEventListener("mouseleave", resetParallax);

      if (mouseFrame.current !== null) {
        cancelAnimationFrame(mouseFrame.current);

        mouseFrame.current = null;
      }

      mouseActive.current = false;

      /*
       * Kill only the tweens created
       * by this parallax instance.
       */

      gsap.killTweensOf(parallaxElements);

      gsap.killTweensOf(letters);
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

      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}

      <main
        id="main-content"
        className={`
          overflow-x-clip
          bg-[#080808]
          transition-opacity
          duration-700
          ${introComplete ? "opacity-100" : "pointer-events-none opacity-0"}
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
                  backgroundSize: "80px 80px",
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
                backgroundSize: "38px 38px",
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
                    aria-label="SHRINIK CLUB"
                  >
                    {"SHRINIK CLUB".split("").map((letter, index) => (
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
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
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
                      A student-driven community at G.L. Bajaj built around
                      creativity, technology and expression.
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
                    <span className="relative z-10">Explore Shrinik</span>

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
            FACULTY + DEPARTMENT
        ====================================================== */}

        <section
          id="hod"
          className="
            relative
            overflow-hidden
            bg-[#080808]
            px-6
            py-24
            md:px-12
            md:py-32
          "
        >
          {/* ATMOSPHERE */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="
                absolute
                left-[-12%]
                top-[5%]
                h-[430px]
                w-[430px]
                rounded-full
                bg-[#650018]/10
                blur-[140px]
              "
            />
            <div
              className="
                absolute
                right-[-12%]
                top-[30%]
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#C6922E]/[0.045]
                blur-[155px]
              "
            />
            <div
              className="
                absolute
                bottom-[-20%]
                left-[35%]
                h-[420px]
                w-[420px]
                rounded-full
                bg-[#650018]/[0.06]
                blur-[135px]
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
                via-[#C6922E]/35
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

          <div className="relative z-10 mx-auto max-w-7xl">
            {/* SECTION HEADER */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C6922E]" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#C6922E]">
                  Faculty &amp; Department
                </span>
              </div>

              <h2
                className="
                  mt-6
                  max-w-4xl
                  text-5xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-[#F5F1E8]
                  sm:text-6xl
                  md:text-7xl
                "
              >
                Academic leadership.
                <br />
                <span className="text-white/25">The foundation behind us.</span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 md:text-base md:leading-8">
                The people guiding the Computer Science &amp; Engineering
                community at G.L. Bajaj — with Shrinik growing alongside that
                ecosystem.
              </p>
            </div>

            {/* HOD FEATURE CARD */}
            <article
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/[0.09]
                bg-gradient-to-br
                from-[#14090C]
                via-[#0D0A0B]
                to-[#080808]
                shadow-[0_30px_100px_rgba(0,0,0,0.38)]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-8%]
                  top-[-25%]
                  h-[480px]
                  w-[480px]
                  rounded-full
                  bg-[#650018]/12
                  blur-[125px]
                "
              />
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[-30%]
                  left-[-8%]
                  h-[340px]
                  w-[340px]
                  rounded-full
                  bg-[#C6922E]/[0.035]
                  blur-[110px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  grid
                  items-center
                  gap-10
                  p-6
                  sm:p-8
                  md:p-10
                  lg:grid-cols-[1fr_420px]
                  xl:grid-cols-[1fr_450px]
                "
              >
                {/* HOD CONTENT */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C6922E]/80" />
                    <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6922E]">
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
                    Prof. (Dr.) Sansar Singh Chauhan
                  </h3>

                  <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#C6922E]/90 md:text-base">
                    Professor &amp; Head, Department of Computer Science &amp;
                    Engineering
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
                    A Mentor for Innovation, Technology and Student Growth.
                    Prof. (Dr.) Sansar Singh Chauhan contributes to building an
                    environment where students are encouraged to learn
                    continuously, explore emerging technologies and transform
                    ideas into practical solutions.
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/35 md:text-base md:leading-8">
                    His academic and research contributions span contemporary
                    computing and communication technologies, including wireless
                    sensor networks, artificial intelligence, blockchain and
                    6G-enabled applications.
                  </p>

                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {[
                      "Wireless Sensor Networks",
                      "Artificial Intelligence",
                      "Blockchain",
                      "6G-enabled Applications",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6922E] shadow-[0_0_10px_rgba(198,146,46,0.55)]" />
                        <span className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-white/[0.07] pt-6">
                    <p className="text-sm leading-7 text-white/38 md:text-[15px] md:leading-8">
                      Dr. Chauhan has also been associated with research and
                      innovation activities at GL Bajaj, including the Council
                      of Science &amp; Technology, Uttar Pradesh-supported
                      project “Emotion Detection and Aiding Mental Health,”
                      where he served as Project Coordinator.
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#C6922E]/10 bg-[#C6922E]/[0.025] p-5">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#C6922E]/75">
                      Shrinik Mentorship
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/40 md:text-[15px] md:leading-8">
                      Dr. Sansar Singh Chauhan has played an important role in
                      nurturing Shrinik Club as a platform for student growth,
                      innovation and practical learning. His guidance encourages
                      students to explore emerging technologies, strengthen
                      their technical and problem-solving skills, and approach
                      new challenges with confidence.
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                      G.L. Bajaj Institute of Technology &amp; Management
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#C6922E]/65" />
                    <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                      CSE Department
                    </span>
                  </div>

                  <div className="mt-8">
                    <a
                      href="https://www.linkedin.com/in/sansar-s-chauhan-ph-d-4969b223/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dr. Sansar S. Chauhan on LinkedIn"
                      title="View LinkedIn Profile"
                      className="
                        inline-flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.02]
                        px-5
                        py-3
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-white/55
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-[#C6922E]/50
                        hover:bg-[#C6922E]/[0.07]
                        hover:text-[#F5F1E8]
                      "
                    >
                      <FaLinkedinIn size={15} />
                      LinkedIn Profile
                      <span className="text-[#C6922E]">↗</span>
                    </a>
                  </div>
                </div>

                {/* HOD PHOTO */}
                <div className="mx-auto w-full max-w-[410px]">
                  <button
                    type="button"
                    onClick={() => setHodPhotoOpen(true)}
                    aria-label="View enlarged photo of Prof. (Dr.) Sansar Singh Chauhan"
                    className="group relative block w-full cursor-zoom-in rounded-[1.75rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
                  >
                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        rounded-[1.75rem]
                        border
                        border-[#C6922E]/35
                        bg-gradient-to-br
                        from-[#3A0712]
                        via-[#16090C]
                        to-[#050505]
                        p-2
                        shadow-[0_0_70px_rgba(198,146,46,0.10)]
                      "
                    >
                      <div className="pointer-events-none absolute inset-2 z-20 rounded-[1.3rem] border border-[#E3C477]/20" />
                      <img
                        src="/images/hod-sansar-chauhan.webp"
                        alt="Prof. (Dr.) Sansar Singh Chauhan, Professor & Head of Department"
                        width={450}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full rounded-[1.3rem] object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                        draggable={false}
                      />
                    </div>
                  </button>
                  <p className="mt-4 text-center text-[8px] uppercase tracking-[0.28em] text-white/22">
                    Academic Leadership · Shrinik
                  </p>
                </div>
              </div>
            </article>

            {/* FACULTY COORDINATORS */}

            <div className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C6922E]/70" />
                <span className="text-[10px] uppercase tracking-[0.34em] text-[#C6922E]">
                  Faculty Coordinators
                </span>
                <span className="h-px flex-1 bg-white/[0.07]" />
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* SAIJSHREE SHRIVASTAVA */}
                <article
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.75rem]
                    border
                    border-white/[0.08]
                    bg-gradient-to-br
                    from-[#10080A]
                    via-[#0C090A]
                    to-[#080808]
                    p-6
                    sm:p-8
                  "
                >
                  <div className="pointer-events-none absolute right-[-18%] top-[-28%] h-64 w-64 rounded-full bg-[#650018]/10 blur-[90px]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-7 bg-[#C6922E]/70" />
                      <span className="text-[9px] uppercase tracking-[0.34em] text-[#C6922E]">
                        Faculty Coordinator
                      </span>
                    </div>

                    <div className="mt-6 grid items-center gap-6 sm:grid-cols-[220px_1fr]">
                      <button
                        type="button"
                        onClick={() => setFacultyPhotoOpen(true)}
                        aria-label="View enlarged photo of Faculty Coordinator Saijshree Shrivastava"
                        className="group relative block w-full cursor-zoom-in rounded-[1.35rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[#C6922E]/30 bg-[#16090C] p-2 shadow-[0_0_55px_rgba(198,146,46,0.07)]">
                          <div className="pointer-events-none absolute inset-1.5 z-20 rounded-[1.05rem] border border-white/10" />
                          <img
                            src="/images/faculty-coordinator.webp"
                            alt="Saijshree Shrivastava, Faculty Coordinator"
                            width={360}
                            height={360}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full rounded-[1.05rem] object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                            draggable={false}
                          />
                        </div>
                      </button>

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-white/25">
                          Faculty Coordinator
                        </p>
                        <h3 className="mt-2 text-3xl font-medium tracking-[-0.035em] text-[#F5F1E8] sm:text-4xl">
                          Saijshree Shrivastava
                        </h3>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#C6922E]/80">
                          Faculty Coordinator · Shrinik Club
                        </p>
                        <p className="mt-4 text-sm leading-7 text-white/40">
                          Faculty guidance and support for the Shrinik student
                          community, helping students turn ideas into meaningful
                          initiatives and experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* KIRAN SINGH */}
                <article
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.75rem]
                    border
                    border-white/[0.08]
                    bg-gradient-to-br
                    from-[#10080A]
                    via-[#0C090A]
                    to-[#080808]
                    p-6
                    sm:p-8
                  "
                >
                  <div className="pointer-events-none absolute right-[-18%] top-[-28%] h-64 w-64 rounded-full bg-[#650018]/10 blur-[90px]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-7 bg-[#C6922E]/70" />
                      <span className="text-[9px] uppercase tracking-[0.34em] text-[#C6922E]">
                        Faculty Coordinator
                      </span>
                    </div>

                    <div className="mt-6 grid items-center gap-6 sm:grid-cols-[220px_1fr]">
                      <button
                        type="button"
                        onClick={() => setKiranPhotoOpen(true)}
                        aria-label="View enlarged photo of Faculty Coordinator Ms. Kiran Singh"
                        className="group relative block w-full cursor-zoom-in rounded-[1.35rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[#C6922E]/30 bg-[#16090C] p-2 shadow-[0_0_55px_rgba(198,146,46,0.07)]">
                          <div className="pointer-events-none absolute inset-1.5 z-20 rounded-[1.05rem] border border-white/10" />
                          <img
                            src="/images/kiran-singh.webp"
                            alt="Ms. Kiran Singh, Faculty Coordinator"
                            width={360}
                            height={360}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full rounded-[1.05rem] object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                            draggable={false}
                          />
                        </div>
                      </button>

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-white/25">
                          Faculty Coordinator
                        </p>
                        <h3 className="mt-2 text-3xl font-medium tracking-[-0.035em] text-[#F5F1E8] sm:text-4xl">
                          Ms. Kiran Singh
                        </h3>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#C6922E]/80">
                          Assistant Professor · Department of CSE
                        </p>
                        <p className="mt-4 text-sm leading-7 text-white/40">
                          As Faculty Coordinator, she provides direction,
                          encouragement and student-first mentorship while
                          helping Shrinik students turn ideas into action.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* ABOUT DEPARTMENT */}
            <article
              className="
                mt-10
                relative
                overflow-hidden
                rounded-[1.75rem]
                border
                border-[#C6922E]/15
                bg-gradient-to-br
                from-[#16090C]/85
                via-[#0F090A]
                to-black/70
                p-6
                sm:p-8
              "
            >
              <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-72 w-72 rounded-full bg-[#C6922E]/[0.04] blur-[100px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] uppercase tracking-[0.34em] text-[#C6922E]">
                    About Department
                  </span>
                  <span className="h-px flex-1 bg-white/[0.08]" />
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    CSE · GLBITM
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium leading-6 text-[#F5F1E8]/85 md:text-base md:leading-7">
                  B.Tech (4 Years), B.Tech.-Hindi (4 Years) &amp; M.Tech (2
                  Years), Approved by AICTE
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#C6922E]/75">
                  Affiliated to Dr. A.P.J. Abdul Kalam Technical University
                </p>

                <div className="mt-6 border-t border-white/[0.07] pt-6">
                  <p className="text-sm leading-7 text-white/40 md:text-[15px] md:leading-8">
                    The Department of Computer Science &amp; Engineering at GL
                    Bajaj Institute of Technology and Management was
                    established in the year 2005 with a vision to help the IT
                    boom and fulfil the need of dynamic Software Engineers
                    globally. Since then, especially in the last ten years of
                    the IT revolution, the department has taken long strides
                    and is now among one of the best department in the
                    college. The Department aims to nurture students in terms
                    of modern computer techniques and to prepare them, to cope
                    well with the technical advancements in future. Computer
                    Science being the flagship branch of Engineering takes
                    focus in scientific research, scientific programming, and
                    software engineering.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                    Official Contact
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#C6922E]/60" />
                  <a
                    href="mailto:hod.cse@glbitm.ac.in"
                    className="text-xs text-[#C6922E]/80 transition-colors hover:text-[#F5F1E8]"
                  >
                    hod.cse@glbitm.ac.in
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ======================================================
            FACULTY PHOTO LIGHTBOXES
        ====================================================== */}

        {hodPhotoOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged HOD photo"
            onClick={() => setHodPhotoOpen(false)}
          >
            <button
              type="button"
              onClick={() => setHodPhotoOpen(false)}
              aria-label="Close enlarged HOD photo"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-2xl leading-none text-white/75 transition-all duration-300 hover:border-[#C6922E]/50 hover:bg-[#C6922E]/10 hover:text-[#C6922E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60"
            >
              ×
            </button>

            <img
              src="/images/hod-sansar-chauhan.webp"
              alt="Prof. (Dr.) Sansar Singh Chauhan, Professor & Head of Department"
              width={1000}
              height={1000}
              className="max-h-[90vh] max-w-[92vw] rounded-[1.5rem] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}

        {kiranPhotoOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged Kiran Singh photo"
            onClick={() => setKiranPhotoOpen(false)}
          >
            <button
              type="button"
              onClick={() => setKiranPhotoOpen(false)}
              aria-label="Close enlarged Kiran Singh photo"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-2xl leading-none text-white/75 transition-all duration-300 hover:border-[#C6922E]/50 hover:bg-[#C6922E]/10 hover:text-[#C6922E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60"
            >
              ×
            </button>

            <img
              src="/images/kiran-singh.webp"
              alt="Ms. Kiran Singh, Faculty Coordinator"
              width={1000}
              height={1000}
              className="max-h-[90vh] max-w-[92vw] rounded-[1.5rem] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}

        {facultyPhotoOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged Faculty Coordinator photo"
            onClick={() => setFacultyPhotoOpen(false)}
          >
            <button
              type="button"
              onClick={() => setFacultyPhotoOpen(false)}
              aria-label="Close enlarged Faculty Coordinator photo"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-2xl leading-none text-white/75 transition-all duration-300 hover:border-[#C6922E]/50 hover:bg-[#C6922E]/10 hover:text-[#C6922E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922E]/60"
            >
              ×
            </button>

            <img
              src="/images/faculty-coordinator.webp"
              alt="Saijshree Shrivastava, Faculty Coordinator"
              width={1000}
              height={1000}
              className="max-h-[90vh] max-w-[92vw] rounded-[1.5rem] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}

        {/* ======================================================
            TEAM
        ====================================================== */}

        <TeamSection />

        {/* ======================================================
            EVENTS
        ====================================================== */}

        <EventsSection />

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
