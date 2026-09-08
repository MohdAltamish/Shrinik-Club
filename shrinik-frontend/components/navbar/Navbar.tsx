"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const tickingRef = useRef(false);
  const previousScrollState = useRef(false);

  /*
   * ============================================================
   * REDUCED MOTION
   * ============================================================
   */

  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    reducedMotionRef.current = mediaQuery.matches;

    const handleChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /*
   * ============================================================
   * SCROLL STATE
   * ============================================================
   *
   * requestAnimationFrame prevents React state from being
   * updated unnecessarily on every raw scroll event.
   */

  useEffect(() => {
    const updateScrollState = () => {
      tickingRef.current = false;

      const nextScrolled =
        window.scrollY > 40;

      if (
        previousScrollState.current !==
        nextScrolled
      ) {
        previousScrollState.current =
          nextScrolled;

        setScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      requestAnimationFrame(
        updateScrollState
      );
    };

    updateScrollState();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ============================================================
   * ACTIVE SECTION DETECTION
   * ============================================================
   */

  useEffect(() => {
    const sections = NAV_ITEMS.map(
      (item) => {
        try {
          return document.querySelector(
            item.href
          );
        } catch {
          return null;
        }
      }
    ).filter(
      (section): section is HTMLElement =>
        section instanceof HTMLElement
    );

    if (!sections.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries.filter(
              (entry) =>
                entry.isIntersecting
            );

          if (!visibleEntries.length)
            return;

          const mostVisible =
            visibleEntries.reduce(
              (previous, current) =>
                current.intersectionRatio >
                previous.intersectionRatio
                  ? current
                  : previous
            );

          const id =
            mostVisible.target instanceof
            HTMLElement
              ? mostVisible.target.id
              : "";

          if (!id) return;

          setActiveSection((current) =>
            current === id
              ? current
              : id
          );
        },
        {
          root: null,
          rootMargin:
            "-25% 0px -55% 0px",
          threshold: [
            0,
            0.1,
            0.25,
            0.5,
          ],
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * ============================================================
   * NAVBAR ENTRANCE
   * ============================================================
   */

  useLayoutEffect(() => {
    const navbar =
      document.querySelector(
        ".navbar-inner"
      );

    if (!navbar) return;

    if (reducedMotionRef.current) {
      gsap.set(navbar, {
        clearProps:
          "opacity,transform,filter",
      });

      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navbar,
        {
          y: -25,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ============================================================
   * ESCAPE KEY
   * ============================================================
   */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  /*
   * ============================================================
   * BODY SCROLL LOCK
   * ============================================================
   */

  useEffect(() => {
    const isMobile =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    if (!open || !isMobile) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /*
   * ============================================================
   * MOBILE MENU ANIMATION
   * ============================================================
   */

  useLayoutEffect(() => {
    if (!open) return;

    const menu =
      document.querySelector(
        ".mobile-menu"
      );

    if (!menu) return;

    if (reducedMotionRef.current) {
      gsap.set(menu, {
        clearProps:
          "opacity,transform",
      });

      return;
    }

    const ctx = gsap.context(() => {
      const timeline =
        gsap.timeline();

      timeline.fromTo(
        menu,
        {
          opacity: 0,
          y: -10,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );

      timeline.fromTo(
        ".mobile-nav-item",
        {
          opacity: 0,
          x: -12,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.045,
          ease: "power3.out",
        },
        "-=0.15"
      );
    });

    return () => {
      ctx.revert();
    };
  }, [open]);

  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */

  const handleNavigation =
    useCallback(
      (href: string) => {
        setOpen(false);

        if (!href.startsWith("#"))
          return;

        const target =
          document.querySelector(href);

        if (!(target instanceof HTMLElement))
          return;

        const navbarHeight =
          document.querySelector(
            ".navbar-inner"
          )?.getBoundingClientRect()
            .height ?? 0;

        const targetTop =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          navbarHeight -
          18;

        window.scrollTo({
          top: Math.max(
            0,
            targetTop
          ),
          behavior:
            reducedMotionRef.current
              ? "auto"
              : "smooth",
        });
      },
      []
    );

  /*
   * ============================================================
   * LOGO CLICK
   * ============================================================
   */

  const handleLogoClick =
    useCallback(() => {
      handleNavigation("#home");
    }, [handleNavigation]);

  /*
   * ============================================================
   * MOBILE TOGGLE
   * ============================================================
   */

  const toggleMenu =
    useCallback(() => {
      setOpen((current) => !current);
    }, []);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        px-4
        pt-4
        md:px-8
      "
    >
      <nav
        className={`
          navbar-inner
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          rounded-full
          border
          px-5
          py-3
          transition-[background-color,border-color,box-shadow]
          duration-500
          md:px-7
          ${
            scrolled
              ? `
                border-[#C6922E]/15
                bg-[#080808]/80
                shadow-[0_15px_60px_rgba(0,0,0,0.35)]
              `
              : `
                border-white/10
                bg-black/35
              `
          }
          backdrop-blur-2xl
        `}
      >
        {/* ====================================================
            LOGO
        ===================================================== */}

        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Go to homepage"
          className="
            group
            flex
            items-center
            gap-3
            outline-none
          "
        >
          <div
            className="
              relative
              flex
              h-8
              w-8
              items-center
              justify-center
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-[#C6922E]/10
                blur-md
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            <img
              src="/assets/favicon.png"
              alt="Shrinik Logo"
              width={32}
              height={32}
              fetchPriority="high"
              decoding="async"
              className="
                relative
                z-10
                h-8
                w-8
                object-contain
                transition-transform
                duration-500
                group-hover:scale-110
                group-hover:rotate-2
              "
            />
          </div>

          <span
            className="
              text-sm
              font-semibold
              tracking-[0.28em]
              text-[#F5F1E8]
            "
          >
            SHRINIK
          </span>
        </button>

        {/* ====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const sectionId =
              item.href.replace(
                "#",
                ""
              );

            const isActive =
              activeSection ===
              sectionId;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() =>
                  handleNavigation(
                    item.href
                  )
                }
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className="
                  group
                  relative
                  px-1
                  py-2
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  outline-none
                "
              >
                <span
                  className={`
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "text-[#F5F1E8]"
                        : "text-white/45 group-hover:text-[#F5F1E8]"
                    }
                  `}
                >
                  {item.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    -translate-x-1/2
                    bg-[#C6922E]
                    transition-[width,opacity]
                    duration-300
                    ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60"
                    }
                  `}
                />
              </button>
            );
          })}

          {/* ==================================================
              CONNECT
          =================================================== */}

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                "#contact"
              )
            }
            className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#C6922E]/35
              bg-[#C6922E]/[0.03]
              px-4
              py-2
              text-xs
              uppercase
              tracking-[0.15em]
              text-[#F5F1E8]
              transition-[border-color,background-color,box-shadow]
              duration-300
              hover:border-[#C6922E]
              hover:bg-[#C6922E]/10
              hover:shadow-[0_0_25px_rgba(198,146,46,0.08)]
            "
          >
            Connect

            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* ====================================================
            MOBILE BUTTON
        ===================================================== */}

        <button
          type="button"
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.02]
            text-white
            transition-[border-color,background-color,transform]
            duration-300
            hover:border-[#C6922E]/40
            hover:bg-[#C6922E]/[0.05]
            active:scale-95
            md:hidden
          "
        >
          <span
            aria-hidden="true"
            className={`
              absolute
              transition-[transform,opacity]
              duration-300
              ${
                open
                  ? "rotate-90 opacity-0"
                  : "rotate-0 opacity-100"
              }
            `}
          >
            <Menu size={18} />
          </span>

          <span
            aria-hidden="true"
            className={`
              absolute
              transition-[transform,opacity]
              duration-300
              ${
                open
                  ? "rotate-0 opacity-100"
                  : "-rotate-90 opacity-0"
              }
            `}
          >
            <X size={18} />
          </span>
        </button>
      </nav>

      {/* ======================================================
          MOBILE MENU
      ======================================================= */}

      {open && (
        <div
          id="mobile-navigation"
          className="
            mobile-menu
            mx-2
            mt-2
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-[#100306]/95
            p-3
            shadow-[0_30px_100px_rgba(0,0,0,0.5)]
            backdrop-blur-2xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const sectionId =
                item.href.replace(
                  "#",
                  ""
                );

              const isActive =
                activeSection ===
                sectionId;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    handleNavigation(
                      item.href
                    )
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`
                    mobile-nav-item
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-5
                    py-4
                    text-left
                    text-sm
                    uppercase
                    tracking-[0.16em]
                    transition-[background-color,color]
                    duration-300
                    ${
                      isActive
                        ? "bg-[#C6922E]/10 text-[#C6922E]"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >
                  <span>
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`
                      h-1.5
                      w-1.5
                      rounded-full
                      transition-[background-color,box-shadow]
                      duration-300
                      ${
                        isActive
                          ? "bg-[#C6922E] shadow-[0_0_10px_rgba(198,146,46,0.6)]"
                          : "bg-white/10"
                      }
                    `}
                  />
                </button>
              );
            })}

            {/* Mobile connect */}

            <button
              type="button"
              onClick={() =>
                handleNavigation(
                  "#contact"
                )
              }
              className="
                mobile-nav-item
                mt-2
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-[#C6922E]/20
                bg-[#C6922E]/[0.05]
                px-5
                py-4
                text-sm
                uppercase
                tracking-[0.16em]
                text-[#C6922E]
                transition-[border-color,background-color]
                duration-300
                hover:border-[#C6922E]/50
                hover:bg-[#C6922E]/10
              "
            >
              <span>
                Connect
              </span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Mobile footer */}

          <div className="mt-4 border-t border-white/[0.06] px-5 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                Shrinik Club
              </span>

              <span className="text-[8px] uppercase tracking-[0.25em] text-[#C6922E]/40">
                2026–27
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}