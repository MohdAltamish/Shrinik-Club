"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  teamGroups,
  type TeamMember,
} from "@/data/team";

gsap.registerPlugin(ScrollTrigger);

/*
 * ============================================================
 * TEAM COVER IMAGES
 * ============================================================
 *
 * VISUAL ONLY:
 * Team/member data and all existing functionality remain
 * unchanged.
 *
 * Put these images in:
 * public/images/team-covers/
 * ============================================================
 */

const teamCoverImages: Record<string, string> = {
  "core team": "/images/team-covers/core-team.png",
  "tech team": "/images/team-covers/tech-team.png",
  "technical team": "/images/team-covers/tech-team.png",
  "design & media team":
    "/images/team-covers/design-media-team.png",
  "design and media team":
    "/images/team-covers/design-media-team.png",
  "editorial team":
    "/images/team-covers/editorial-team.png",
  "pr team":
    "/images/team-covers/pr-team.png",
  "social media team":
    "/images/team-covers/social-media-team.png",
  "event management team":
    "/images/team-covers/event-management-team.png",
  "dance avenue":
    "/images/team-covers/dance-avenue.png",
  "music avenue":
    "/images/team-covers/music-avenue.png",
};

const teamCoverByCategory: Record<string, string> = {
  core: "/images/team-covers/core-team.png",
  technical: "/images/team-covers/tech-team.png",
  creative: "/images/team-covers/design-media-team.png",
  management: "/images/team-covers/pr-team.png",
  cultural: "/images/team-covers/dance-avenue.png",
};

function getTeamCoverImage(
  teamName: string,
  category: string,
) {
  const normalizedName = teamName
    .trim()
    .toLowerCase();

  return (
    teamCoverImages[normalizedName] ??
    teamCoverByCategory[category] ??
    "/images/team-covers/core-team.png"
  );
}


/*
 * ============================================================
 * TEAM SECTION
 * ============================================================
 */

export default function TeamSection() {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);

  const [selectedMember, setSelectedMember] =
    useState<TeamMember | null>(null);

  const [selectedMemberTeam, setSelectedMemberTeam] =
    useState<string>("");

  const sectionRef = useRef<HTMLElement>(null);
  const teamTrackRef = useRef<HTMLDivElement>(null);
  const memberTrackRef = useRef<HTMLDivElement>(null);

  const activeTeam = teamGroups[activeTeamIndex];

  const members = useMemo(
    () => activeTeam?.members ?? [],
    [activeTeam],
  );

  /*
   * ==========================================================
   * REDUCED MOTION
   * ==========================================================
   */

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = () => {
      prefersReducedMotion.current = mediaQuery.matches;
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /*
   * ==========================================================
   * SCROLL HELPER
   * ==========================================================
   */

  const scrollTrackToIndex = useCallback(
    (
      track: HTMLDivElement | null,
      selector: string,
      index: number,
    ) => {
      if (!track) return;

      const items =
        track.querySelectorAll<HTMLElement>(selector);

      const item = items[index];

      if (!item) return;

      const trackRect = track.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const visible =
        itemRect.left >= trackRect.left + 10 &&
        itemRect.right <= trackRect.right - 10;

      if (visible) return;

      const targetLeft =
        item.offsetLeft -
        track.clientWidth / 2 +
        item.offsetWidth / 2;

      track.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: prefersReducedMotion.current
          ? "auto"
          : "smooth",
      });
    },
    [],
  );

  /*
   * ==========================================================
   * TEAM NAVIGATION
   * ==========================================================
   */

  const changeTeam = useCallback(
    (index: number) => {
      if (!teamGroups.length) return;

      const next =
        (index + teamGroups.length) %
        teamGroups.length;

      if (next === activeTeamIndex) return;

      setActiveTeamIndex(next);
      setActiveMemberIndex(0);

      requestAnimationFrame(() => {
        scrollTrackToIndex(
          teamTrackRef.current,
          ".team-category-card",
          next,
        );
      });
    },
    [
      activeTeamIndex,
      scrollTrackToIndex,
    ],
  );

  const previousTeam = useCallback(() => {
    changeTeam(activeTeamIndex - 1);
  }, [activeTeamIndex, changeTeam]);

  const nextTeam = useCallback(() => {
    changeTeam(activeTeamIndex + 1);
  }, [activeTeamIndex, changeTeam]);

  /*
   * ==========================================================
   * MEMBER NAVIGATION
   * ==========================================================
   */

  const changeMember = useCallback(
    (index: number) => {
      if (!members.length) return;

      const next =
        (index + members.length) %
        members.length;

      setActiveMemberIndex(next);

      requestAnimationFrame(() => {
        scrollTrackToIndex(
          memberTrackRef.current,
          ".team-member-card",
          next,
        );
      });
    },
    [
      members.length,
      scrollTrackToIndex,
    ],
  );

  const previousMember = useCallback(() => {
    if (!members.length) return;

    changeMember(activeMemberIndex - 1);
  }, [
    activeMemberIndex,
    changeMember,
    members.length,
  ]);

  const nextMember = useCallback(() => {
    if (!members.length) return;

    changeMember(activeMemberIndex + 1);
  }, [
    activeMemberIndex,
    changeMember,
    members.length,
  ]);

  /*
   * ==========================================================
   * RESET MEMBER POSITION
   * ==========================================================
   */

  useEffect(() => {
    setActiveMemberIndex(0);

    const frame = requestAnimationFrame(() => {
      const track = memberTrackRef.current;

      if (!track) return;

      track.scrollTo({
        left: 0,
        behavior: "auto",
      });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [activeTeamIndex]);

  /*
   * ==========================================================
   * KEYBOARD NAVIGATION
   * ==========================================================
   */

  useEffect(() => {
    const handleKeyboard = (
      event: KeyboardEvent,
    ) => {
      const target =
        event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      const section = sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const visible =
        rect.bottom > 0 &&
        rect.top < window.innerHeight;

      if (!visible) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousMember();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextMember();
      }

      if (event.key === "Escape") {
        setSelectedMember(null);
        setSelectedMemberTeam("");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, [
    previousMember,
    nextMember,
  ]);

  /*
   * ==========================================================
   * PHOTO MODAL LOCK
   * ==========================================================
   */

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedMember]);

  /*
   * ==========================================================
   * SECTION ENTRANCE
   * ==========================================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion.current) {
        gsap.set(
          [
            ".team-eyebrow",
            ".team-heading",
            ".team-description",
            ".team-category-card",
          ],
          {
            opacity: 1,
            y: 0,
            clearProps:
              "filter,transform",
          },
        );

        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .fromTo(
          ".team-eyebrow",
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
          },
        )
        .fromTo(
          ".team-heading",
          {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .fromTo(
          ".team-description",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".team-category-card",
          {
            opacity: 0,
            y: 30,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ==========================================================
   * TEAM CHANGE ANIMATION
   * ==========================================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (prefersReducedMotion.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const elements =
        section.querySelectorAll<HTMLElement>(
          ".team-content-animate",
        );

      const cards =
        section.querySelectorAll<HTMLElement>(
          ".team-member-card",
        );

      gsap.killTweensOf([
        elements,
        cards,
      ]);

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power3.out",
          overwrite: true,
        },
      );

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.045,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [activeTeamIndex]);

  if (!activeTeam) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="team"
      className="
        relative
        overflow-hidden
        bg-[#080707]
        px-6
        py-28
        md:px-12
        md:py-36
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            left-[-15%]
            top-[8%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#650018]/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            right-[-15%]
            top-[32%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#C6922E]/[0.035]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            left-1/2
            h-[450px]
            w-[750px]
            -translate-x-1/2
            rounded-full
            bg-[#650018]/[0.05]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.4) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.4) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-8
            md:flex-row
            md:items-end
          "
        >
          <div>

            <div
              className="
                team-eyebrow
                flex
                items-center
                gap-3
              "
            >
              <span className="h-px w-8 bg-[#C6922E]" />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.4em]
                  text-[#C6922E]
                "
              >
                The People
              </span>
            </div>

            <h2
              className="
                team-heading
                mt-6
                text-5xl
                font-medium
                leading-[0.88]
                tracking-[-0.055em]
                text-[#F5F1E8]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Meet the
              <br />
              <span className="text-white/25">
                people behind Shrinik.
              </span>
            </h2>

          </div>

          <div
            className="
              team-description
              max-w-sm
              md:pb-1
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-white/35
                md:text-base
              "
            >
              One community. Different skills.
              Different ideas. One team building
              the Shrinik experience.
            </p>
          </div>
        </div>

        {/* ====================================================
            TEAM CATEGORY SELECTOR
        ===================================================== */}

        <div className="team-content-animate mt-20">

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-white/20
                "
              >
                Select team
              </span>

              <span className="h-px w-8 bg-white/10" />
            </div>

            <div className="flex gap-2">
              <RoundButton
                label="Previous team"
                onClick={previousTeam}
              >
                <ArrowLeft size={15} />
              </RoundButton>

              <RoundButton
                label="Next team"
                onClick={nextTeam}
              >
                <ArrowRight size={15} />
              </RoundButton>
            </div>

          </div>

          <div
            ref={teamTrackRef}
            className="
              flex
              snap-x
              snap-mandatory
              gap-5
              overflow-x-auto
              px-1
              pb-8
              scrollbar-hide
              md:gap-6
              scroll-smooth
              overscroll-x-contain
            "
          >
            {teamGroups.map(
              (team, index) => (
                <TeamVisualCard
                  key={team.id}
                  team={team}
                  index={index}
                  active={
                    index ===
                    activeTeamIndex
                  }
                  onClick={() =>
                    changeTeam(index)
                  }
                />
              ),
            )}
          </div>
        </div>

        {/* ====================================================
            SELECTED TEAM
        ===================================================== */}

        <div
          className="
            team-content-animate
            mt-8
            border-t
            border-white/[0.08]
            pt-10
          "
        >

          <div
            className="
              flex
              items-end
              justify-between
              gap-8
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-[#C6922E]
                  "
                >
                  Selected team
                </span>

                <span className="h-px w-10 bg-[#C6922E]/30" />

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/20
                  "
                >
                  {teamCategoryLabel(
                    activeTeam.category,
                  )}
                </span>
              </div>

              <h3
                className="
                  mt-4
                  text-4xl
                  font-medium
                  tracking-[-0.04em]
                  text-[#F5F1E8]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                {activeTeam.name}
              </h3>

            </div>

            <div
              className="
                hidden
                text-right
                md:block
              "
            >
              <span
                className="
                  text-4xl
                  font-light
                  text-[#C6922E]
                "
              >
                {String(
                  members.length,
                ).padStart(2, "0")}
              </span>

              <p
                className="
                  mt-1
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-white/25
                "
              >
                Active members
              </p>
            </div>

          </div>
        </div>

        {/* ====================================================
            MEMBER CAROUSEL
        ===================================================== */}

        <div
          className="
            team-content-animate
            relative
            mt-12
          "
        >

          <button
            type="button"
            aria-label="Previous member"
            onClick={previousMember}
            className="
              absolute
              left-0
              top-1/2
              z-30
              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-[#080707]/80
              text-white/40
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-[#C6922E]/50
              hover:bg-[#C6922E]/10
              hover:text-[#C6922E]
              active:scale-95
              lg:flex
            "
          >
            <ArrowLeft size={17} />
          </button>

          <div
            ref={memberTrackRef}
            className="
              flex
              snap-x
              snap-mandatory
              gap-5
              overflow-x-auto
              px-1
              pb-8
              scrollbar-hide
              scroll-smooth
              overscroll-x-contain
              lg:px-20
            "
          >

            {members.map(
              (member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  active={
                    index ===
                    activeMemberIndex
                  }
                  onClick={() =>
                    changeMember(index)
                  }
                  onPhotoClick={() => {
                    setSelectedMember(member);
                    setSelectedMemberTeam(
                      activeTeam.category,
                    );
                  }}
                />
              ),
            )}

          </div>

          <button
            type="button"
            aria-label="Next member"
            onClick={nextMember}
            className="
              absolute
              right-0
              top-1/2
              z-30
              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-[#080707]/80
              text-white/40
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-[#C6922E]/50
              hover:bg-[#C6922E]/10
              hover:text-[#C6922E]
              active:scale-95
              lg:flex
            "
          >
            <ArrowRight size={17} />
          </button>

        </div>

        {/* ====================================================
            MEMBER NAVIGATION
        ===================================================== */}

        <div
          className="
            team-content-animate
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-6
          "
        >

          <button
            type="button"
            onClick={previousMember}
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/30
              transition-colors
              hover:text-[#C6922E]
              active:scale-95
              lg:hidden
            "
          >
            <ChevronLeft size={13} />
            Previous
          </button>

          <div
            className="
              flex
              max-w-[60vw]
              items-center
              gap-1.5
              overflow-hidden
            "
          >
            {members.map(
              (member, index) => (
                <button
                  key={member.id}
                  type="button"
                  aria-label={`View ${member.name}`}
                  aria-current={
                    index ===
                    activeMemberIndex
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    changeMember(index)
                  }
                  className={`
                    h-1.5
                    shrink-0
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      index ===
                      activeMemberIndex
                        ? "w-8 bg-[#C6922E]"
                        : "w-1.5 bg-white/15 hover:bg-white/30"
                    }
                  `}
                />
              ),
            )}
          </div>

          <button
            type="button"
            onClick={nextMember}
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/30
              transition-colors
              hover:text-[#C6922E]
              active:scale-95
              lg:hidden
            "
          >
            Next
            <ChevronRight size={13} />
          </button>

        </div>

        {/* ====================================================
            PHOTO MODAL
        ===================================================== */}

        {selectedMember && (
          <MemberPhotoModal
            member={selectedMember}
            teamCategory={
              selectedMemberTeam
            }
            onClose={() => {
              setSelectedMember(null);
              setSelectedMemberTeam("");
            }}
          />
        )}

      </div>
    </section>
  );
}

/*
 * ============================================================
 * TEAM VISUAL CARD
 * ============================================================
 */

function TeamVisualCard({
  team,
  index,
  active,
  onClick,
}: {
  team: (typeof teamGroups)[number];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const cardRef =
    useRef<HTMLButtonElement>(null);

  const artworkRef =
    useRef<HTMLDivElement>(null);

  const glowRef =
    useRef<HTMLDivElement>(null);

  const rafRef =
    useRef<number | null>(null);

  const pointerRef =
    useRef({
      x: 0,
      y: 0,
    });

  const moveCard = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (
      !cardRef.current ||
      window.innerWidth < 768 ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    pointerRef.current.x =
      event.clientX;

    pointerRef.current.y =
      event.clientY;

    if (rafRef.current !== null) {
      return;
    }

    rafRef.current =
      requestAnimationFrame(() => {
        rafRef.current = null;

        if (!cardRef.current) {
          return;
        }

        const rect =
          cardRef.current.getBoundingClientRect();

        const x =
          pointerRef.current.x -
          rect.left -
          rect.width / 2;

        const y =
          pointerRef.current.y -
          rect.top -
          rect.height / 2;

        gsap.to(
          cardRef.current,
          {
            rotationX:
              -(y / rect.height) * 4,
            rotationY:
              (x / rect.width) * 4,
            scale: active
              ? 1.018
              : 1.008,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          },
        );

        if (artworkRef.current) {
          gsap.to(
            artworkRef.current,
            {
              x:
                (x / rect.width) * 10,
              y:
                (y / rect.height) * 8,
              scale: 1.045,
              duration: 0.5,
              ease: "power3.out",
              overwrite: true,
            },
          );
        }

        if (glowRef.current) {
          gsap.to(
            glowRef.current,
            {
              x: x * 0.08,
              y: y * 0.08,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
            },
          );
        }
      });
  };

  const resetCard = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(
        rafRef.current,
      );

      rafRef.current = null;
    }

    if (cardRef.current) {
      gsap.to(
        cardRef.current,
        {
          rotationX: 0,
          rotationY: 0,
          scale: active
            ? 1.005
            : 1,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    if (artworkRef.current) {
      gsap.to(
        artworkRef.current,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    if (glowRef.current) {
      gsap.to(
        glowRef.current,
        {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current,
        );
      }
    };
  }, []);

  const theme =
    teamVisualTheme(team.category);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={moveCard}
      onMouseLeave={resetCard}
      style={{
        transformStyle:
          "preserve-3d",
        perspective:
          "1400px",
        willChange:
          "transform",
      }}
      className={`
        team-category-card
        group
        relative
        h-[430px]
        min-w-[310px]
        snap-center
        overflow-hidden
        rounded-[1.6rem]
        border
        text-left
        transition-[border-color,box-shadow,opacity]
        duration-500
        sm:min-w-[350px]
        md:h-[470px]
        md:min-w-[380px]
        ${
          active
            ? `${theme.border} ${theme.shadow}`
            : "border-white/[0.08] opacity-[0.78] hover:border-[#C6922E]/35 hover:opacity-100"
        }
      `}
    >

      {/* ====================================================
          POSTER ARTWORK
      ===================================================== */}

      <div
        ref={artworkRef}
        className="
          absolute
          inset-[-3%]
        "
        style={{
          willChange:
            "transform",
        }}
      >

        <TeamArtwork
          category={
            team.category
          }
          teamName={
            team.name
          }
        />

      </div>

      {/* ====================================================
          GRAIN
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          opacity-[0.08]
          mix-blend-screen
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ====================================================
          TOP CINEMATIC VIGNETTE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          bg-gradient-to-b
          from-black/55
          via-transparent
          to-black/85
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          bg-gradient-to-r
          from-black/35
          via-transparent
          to-black/20
        "
      />

      {/* ====================================================
          CURSOR LIGHT
      ===================================================== */}

      <div
        ref={glowRef}
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          z-10
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[100px]
          ${theme.glow}
        `}
      />

      {/* ====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          absolute
          left-6
          right-6
          top-6
          z-40
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.38em]
                  text-[#F0B83F]
                "
              >
                Team{" "}
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>

              <span
                className="
                  h-px
                  w-9
                  bg-[#F0B83F]/60
                "
              />
            </div>

            <p
              className="
                mt-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-white/60
              "
            >
              {teamCategoryLabel(
                team.category,
              )}
            </p>

          </div>

          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-500
              ${
                active
                  ? "border-[#F0B83F]/60 bg-[#F0B83F] text-black"
                  : "border-white/20 bg-black/20 text-white/60 group-hover:border-[#F0B83F]/60 group-hover:text-[#F0B83F]"
              }
            `}
          >
            <ArrowUpRight
              size={19}
            />
          </div>

        </div>
      </div>

      {/* ====================================================
          MICRO POSTER MARK
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[150px]
          left-6
          z-30
          flex
          items-center
          gap-2
        "
      >
        <span
          className={`
            text-[8px]
            uppercase
            tracking-[0.3em]
            ${theme.accentText}
          `}
        >
          {theme.eyebrow}
        </span>

        <span
          className="
            h-px
            w-5
            bg-white/20
          "
        />
      </div>

      {/* ====================================================
          BOTTOM TYPOGRAPHIC PANEL
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-40
          p-6
        "
      >

        <div
          className="
            mb-5
            h-px
            w-full
            bg-gradient-to-r
            from-[#F0B83F]/70
            via-white/15
            to-transparent
          "
        />

        <div
          className="
            flex
            items-end
            justify-between
            gap-5
          "
        >

          <div>

            <h4
              className="
                max-w-[300px]
                text-[2.55rem]
                font-medium
                leading-[0.88]
                tracking-[-0.055em]
                text-[#FFF8EB]
                transition-transform
                duration-500
                group-hover:-translate-y-1
                md:text-[2.8rem]
              "
            >
              {team.name}
            </h4>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.27em]
                  text-white/45
                "
              >
                {String(
                  team.members.length,
                ).padStart(2, "0")}{" "}
                Active Members
              </span>

              <span className="h-1 w-1 rounded-full bg-[#F0B83F]" />

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.22em]
                  text-white/25
                "
              >
                {String(
                  index + 1,
                ).padStart(2, "0")}
                {" / "}
                {String(
                  teamGroups.length,
                ).padStart(2, "0")}
              </span>
            </div>

          </div>

          <div
            className="
              hidden
              text-right
              sm:block
            "
          >
            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.28em]
                text-white/25
              "
            >
              SHRNK
            </span>

            <span
              className="
                mt-1
                block
                text-[7px]
                uppercase
                tracking-[0.25em]
                text-[#F0B83F]/60
              "
            >
              2026
            </span>
          </div>

        </div>
      </div>

      {/* ====================================================
          ACTIVE EDGE
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          z-50
          rounded-[1.6rem]
          border
          transition-opacity
          duration-500
          ${
            active
              ? "border-[#F0B83F]/25 opacity-100"
              : "border-transparent opacity-0"
          }
        `}
      />

    </button>
  );
}

/*
 * ============================================================
 * TEAM ARTWORK
 * ============================================================
 *
 * IMPORTANT:
 *
 * This component is where the visual identity lives.
 *
 * Data is NOT changed.
 * Team names are NOT changed.
 * Member data is NOT changed.
 *
 * Only the cover artwork is different.
 * ============================================================
 */

function TeamArtwork({
  category,
  teamName,
}: {
  category: string;
  teamName: string;
}) {
  const imageSrc = getTeamCoverImage(
    teamName,
    category,
  );

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-[#080707]
      "
    >
      {/* ====================================================
          REAL TEAM COVER IMAGE
          ==================================================== */}

      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          object-center
          transition-transform
          duration-1000
          ease-out
          group-hover:scale-[1.045]
        "
        style={{
          willChange: "transform",
        }}
      />

      {/* ====================================================
          CINEMATIC IMAGE OVERLAYS
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/35
          via-transparent
          to-black/85
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/30
          via-transparent
          to-black/20
        "
      />

      {/* ====================================================
          DEPTH GLOW
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[55%]
          w-[55%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[70px]
          transition-opacity
          duration-500
          group-hover:opacity-80
        "
      />

      {/* ====================================================
          PREMIUM INNER POSTER FRAME
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-4
          rounded-[1.15rem]
          border
          border-white/[0.12]
          opacity-70
          transition-all
          duration-500
          group-hover:inset-3
          group-hover:border-white/[0.2]
        "
      />

      {/* ====================================================
          CORNER MARKS
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-7
          top-7
          h-7
          w-7
          border-l
          border-t
          border-[#F0B83F]/45
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-7
          top-7
          h-7
          w-7
          border-r
          border-t
          border-[#F0B83F]/35
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          left-7
          h-7
          w-7
          border-b
          border-l
          border-[#F0B83F]/30
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          right-7
          h-7
          w-7
          border-b
          border-r
          border-[#F0B83F]/30
        "
      />

      {/* ====================================================
          SUBTLE GRAIN
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          mix-blend-screen
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/*
 * ============================================================
 * MEMBER CARD
 * ============================================================
 */

function MemberCard({
  member,
  active,
  onClick,
  onPhotoClick,
}: {
  member: TeamMember;
  active: boolean;
  onClick: () => void;
  onPhotoClick: () => void;
}) {
  const cardRef =
    useRef<HTMLElement>(null);

  const imageRef =
    useRef<HTMLDivElement>(null);

  const initials =
    member.name
      .split(" ")
      .map(
        (word) =>
          word[0],
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const leadership =
    /director|president|head|lead|organizer|secretary|coordinator|expert|web master/i.test(
      member.role,
    );

  const moveCard = (
    event: MouseEvent<HTMLElement>,
  ) => {
    if (
      !cardRef.current ||
      window.innerWidth < 768
    ) {
      return;
    }

    const rect =
      cardRef.current.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    gsap.to(
      cardRef.current,
      {
        rotateX:
          -(y / rect.height) * 3,
        rotateY:
          (x / rect.width) * 3,
        scale: active
          ? 1.015
          : 1.005,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      },
    );

    if (imageRef.current) {
      gsap.to(
        imageRef.current,
        {
          x:
            (x / rect.width) * 5,
          y:
            (y / rect.height) * 5,
          scale: 1.025,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }
  };

  const resetCard = () => {
    if (cardRef.current) {
      gsap.to(
        cardRef.current,
        {
          rotateX: 0,
          rotateY: 0,
          scale: active
            ? 1.005
            : 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    if (imageRef.current) {
      gsap.to(
        imageRef.current,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }
  };

  return (
    <article
      ref={cardRef}
      className="
        team-member-card
        group
        relative
        min-w-[270px]
        snap-center
        overflow-hidden
        rounded-[1.5rem]
        border
        border-white/[0.08]
        bg-[#10090A]
        transition-all
        duration-500
        sm:min-w-[300px]
        md:min-w-[320px]
      "
      onMouseMove={moveCard}
      onMouseLeave={resetCard}
      style={{
        transformStyle:
          "preserve-3d",
        perspective:
          "1200px",
      }}
    >

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#650018]/20
          via-transparent
          to-[#C6922E]/[0.04]
        "
      />

      <div
        ref={imageRef}
        className="
          relative
          aspect-[4/4.7]
          overflow-hidden
          bg-[#120607]
        "
      >

        {member.image ? (
          <button
            type="button"
            onClick={onPhotoClick}
            aria-label={`View full photo of ${member.name}`}
            className="
              absolute
              inset-0
              h-full
              w-full
              cursor-zoom-in
            "
          >
            <img
              src={member.image}
              alt={member.name}
              className="
                h-full
                w-full
                object-cover
                object-center
                grayscale-[0.12]
                transition-all
                duration-700
                group-hover:scale-[1.045]
                group-hover:grayscale-0
              "
              loading="lazy"
              draggable={false}
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#100608]
                via-transparent
                to-transparent
              "
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={onPhotoClick}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-[#3A0712]
              via-[#150509]
              to-[#050505]
            "
          >
            <span
              className="
                text-7xl
                font-medium
                tracking-[-0.08em]
                text-[#C6922E]/40
              "
            >
              {initials}
            </span>
          </button>
        )}

        <div
          className="
            pointer-events-none
            absolute
            left-5
            top-5
            h-8
            w-8
            border-l
            border-t
            border-[#C6922E]/40
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-5
            top-5
            h-8
            w-8
            border-r
            border-t
            border-[#C6922E]/40
          "
        />

      </div>

      <div
        className="
          relative
          z-10
          border-t
          border-white/[0.07]
          px-5
          py-5
        "
      >

        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-[#C6922E]
          "
        >
          {leadership
            ? "Leadership"
            : "Shrinik Team"}
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-medium
            tracking-[-0.035em]
            text-[#F5F1E8]
            sm:text-2xl
          "
        >
          {member.name}
        </h3>

        <p
          className="
            mt-2
            text-[9px]
            uppercase
            tracking-[0.22em]
            text-white/35
          "
        >
          {member.role}
        </p>

      </div>

      {active && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[1.5rem]
            border
            border-[#C6922E]/20
          "
        />
      )}

    </article>
  );
}

/*
 * ============================================================
 * FULL MEMBER PHOTO MODAL
 * ============================================================
 */

function MemberPhotoModal({
  member,
  teamCategory,
  onClose,
}: {
  member: TeamMember;
  teamCategory: string;
  onClose: () => void;
}) {
  const initials =
    member.name
      .split(" ")
      .map(
        (word) =>
          word[0],
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const leadership =
    /director|president|head|lead|organizer|secretary|coordinator|expert|web master/i.test(
      member.role,
    );

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/85
        p-3
        backdrop-blur-md
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-label={`Full photo of ${member.name}`}
      onMouseDown={
        handleBackdropClick
      }
    >

      <div
        className="
          relative
          w-full
          max-w-lg
          overflow-hidden
          rounded-[1.5rem]
          border
          border-[#C6922E]/30
          bg-[#100608]
          shadow-[0_40px_140px_rgba(0,0,0,0.8)]
        "
      >

        <button
          type="button"
          onClick={onClose}
          aria-label="Close full photo"
          className="
            absolute
            right-4
            top-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/60
            text-xl
            text-white/70
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-[#C6922E]/50
            hover:text-[#C6922E]
            active:scale-95
          "
        >
          ×
        </button>

        <div
          className="
            relative
            aspect-[4/5]
            max-h-[72vh]
            w-full
            overflow-hidden
            bg-[#12070A]
          "
        >

          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="
                h-full
                w-full
                object-cover
                object-center
              "
              draggable={false}
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-[#3A0712]
                via-[#150509]
                to-[#050505]
              "
            >
              <span
                className="
                  text-8xl
                  font-medium
                  tracking-[-0.08em]
                  text-[#C6922E]/40
                "
              >
                {initials}
              </span>
            </div>
          )}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-48
              bg-gradient-to-t
              from-[#100608]
              via-[#100608]/30
              to-transparent
            "
          />

        </div>

        <div
          className="
            relative
            z-10
            flex
            items-end
            justify-between
            gap-6
            border-t
            border-white/[0.07]
            px-6
            py-5
            sm:px-8
            sm:py-6
          "
        >

          <div>

            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-[#C6922E]
              "
            >
              {leadership
                ? "Leadership"
                : "Shrinik Team"}
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-medium
                tracking-[-0.035em]
                text-[#F5F1E8]
                sm:text-3xl
              "
            >
              {member.name}
            </h3>

            <p
              className="
                mt-2
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/35
              "
            >
              {member.role}
            </p>

            <p
              className="
                mt-3
                text-[7px]
                uppercase
                tracking-[0.25em]
                text-[#C6922E]/40
              "
            >
              {teamCategoryLabel(
                teamCategory,
              )}
            </p>

          </div>

          <span
            className="
              hidden
              shrink-0
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/20
              sm:block
            "
          >
            Press Esc to close
          </span>

        </div>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * ROUND BUTTON
 * ============================================================
 */

function RoundButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        text-white/40
        transition-all
        duration-300
        hover:border-[#C6922E]/50
        hover:bg-[#C6922E]/10
        hover:text-[#C6922E]
        active:scale-95
      "
    >
      {children}
    </button>
  );
}

/*
 * ============================================================
 * TEAM VISUAL THEME
 * ============================================================
 */

function teamVisualTheme(
  category: string,
) {
  switch (category) {
    case "core":
      return {
        border:
          "border-[#C6922E]/55",
        shadow:
          "shadow-[0_25px_90px_rgba(122,0,25,0.22)]",
        glow:
          "bg-[#D89B37]/12",
        accentText:
          "text-[#E7C66B]/75",
        eyebrow:
          "COMMAND · STEER",
      };

    case "technical":
      return {
        border:
          "border-cyan-400/35",
        shadow:
          "shadow-[0_25px_90px_rgba(0,210,230,0.12)]",
        glow:
          "bg-cyan-400/10",
        accentText:
          "text-cyan-200/70",
        eyebrow:
          "SYSTEM · BUILD",
      };

    case "creative":
      return {
        border:
          "border-fuchsia-300/35",
        shadow:
          "shadow-[0_25px_90px_rgba(217,70,239,0.13)]",
        glow:
          "bg-fuchsia-400/10",
        accentText:
          "text-fuchsia-200/70",
        eyebrow:
          "FRAME · CREATE",
      };

    case "management":
      return {
        border:
          "border-emerald-300/35",
        shadow:
          "shadow-[0_25px_90px_rgba(16,185,129,0.12)]",
        glow:
          "bg-emerald-400/10",
        accentText:
          "text-emerald-200/70",
        eyebrow:
          "CONNECT · ALIGN",
      };

    case "cultural":
      return {
        border:
          "border-orange-300/35",
        shadow:
          "shadow-[0_25px_90px_rgba(234,88,12,0.14)]",
        glow:
          "bg-orange-400/10",
        accentText:
          "text-orange-200/70",
        eyebrow:
          "RHYTHM · ENERGY",
      };

    default:
      return {
        border:
          "border-[#C6922E]/35",
        shadow:
          "shadow-[0_25px_90px_rgba(198,146,46,0.1)]",
        glow:
          "bg-[#C6922E]/10",
        accentText:
          "text-[#E3C477]/70",
        eyebrow:
          "SHRNK · TEAM",
      };
  }
}

/*
 * ============================================================
 * TEAM CATEGORY LABEL
 * ============================================================
 */

function teamCategoryLabel(
  category: string,
) {
  switch (category) {
    case "core":
      return "Leadership";

    case "technical":
      return "Technology";

    case "creative":
      return "Creative";

    case "management":
      return "Management";

    case "cultural":
      return "Culture";

    default:
      return "Shrinik";
  }
}
