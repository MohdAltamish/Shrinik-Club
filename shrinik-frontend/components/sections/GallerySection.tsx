"use client";

import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ScrollReveal from "@/components/effects/ScrollReveal";
import Parallax from "@/components/effects/Parallax";
import SectionHeading from "@/components/effects/SectionHeading";

const galleryItems = [
  {
    number: "01",
    title: "Campus",
    label: "Campus life",
    image: "/assets/gallery/campus.jpg",
  },
  {
    number: "02",
    title: "Events",
    label: "Experiences",
    image: "/assets/gallery/events.jpg",
  },
  {
    number: "03",
    title: "Community",
    label: "Our people",
    image: "/assets/gallery/community.jpg",
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-[#0d0206]
        px-6
        py-32
        md:px-12
        md:py-40
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            left-[-18%]
            top-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#650018]/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            right-[-15%]
            bottom-[5%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#C6922E]/[0.035]
            blur-[160px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage:
              `
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

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}

        <SectionHeading
          eyebrow="Gallery"
          title="Moments"
          highlight="with Shrinik."
          description="The people, experiences and memories that make the club what it is."
        />

        {/* ===================================================
            GALLERY INTRO BAR
        ==================================================== */}

        <ScrollReveal delay={0.08}>

          <div
            className="
              mt-16
              flex
              flex-col
              gap-5
              border-y
              border-white/[0.07]
              py-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-center gap-3">

              <Camera
                size={14}
                className="text-[#C6922E]/70"
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/25
                "
              >
                Shrinik archive
              </span>

            </div>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/15
              "
            >
              2026 — 27
            </span>

          </div>

        </ScrollReveal>

        {/* ===================================================
            GALLERY CARDS
        ==================================================== */}

        <div
          className="
            mt-10
            grid
            gap-5
            md:grid-cols-3
          "
        >

          {galleryItems.map(
            (item, index) => (
              <GalleryCard
                key={item.title}
                item={item}
                index={index}
              />
            )
          )}

        </div>

        {/* ===================================================
            BOTTOM NAV
        ==================================================== */}

        <ScrollReveal delay={0.25}>

          <div
            className="
              mt-8
              flex
              items-center
              justify-between
              border-t
              border-white/[0.07]
              pt-6
            "
          >

            <div className="flex items-center gap-2">

              <button
                type="button"
                aria-label="Previous gallery"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/30
                  transition-all
                  duration-300
                  hover:border-[#C6922E]/40
                  hover:bg-[#C6922E]/10
                  hover:text-[#C6922E]
                "
              >
                <ChevronLeft size={15} />
              </button>

              <button
                type="button"
                aria-label="Next gallery"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/30
                  transition-all
                  duration-300
                  hover:border-[#C6922E]/40
                  hover:bg-[#C6922E]/10
                  hover:text-[#C6922E]
                "
              >
                <ChevronRight size={15} />
              </button>

            </div>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white/15
              "
            >
              More memories coming soon
            </span>

          </div>

        </ScrollReveal>

      </div>
    </section>
  );
}

/*
 * ============================================================
 * GALLERY CARD
 * ============================================================
 */

function GalleryCard({
  item,
  index,
}: {
  item: {
    number: string;
    title: string;
    label: string;
    image: string;
  };
  index: number;
}) {
  return (
    <ScrollReveal
      delay={index * 0.12}
      y={80}
    >
      <article
        className="
          group
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.08]
          bg-[#12070A]
          transition-all
          duration-700
          hover:-translate-y-2
          hover:border-[#C6922E]/30
          hover:shadow-[0_30px_90px_rgba(0,0,0,0.4)]
        "
      >

        <Parallax
          speed={
            index % 2 === 0
              ? 45
              : 65
          }
        >

          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
            "
          >

            {/* =================================================
                IMAGE
            ================================================== */}

            <GalleryImage
              src={item.image}
              alt={item.title}
            />

            {/* =================================================
                ATMOSPHERE
            ================================================== */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-black/20
                via-transparent
                to-[#080808]
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#080808]
                via-transparent
                to-transparent
                opacity-90
              "
            />

            {/* =================================================
                TOP INFO
            ================================================== */}

            <div
              className="
                absolute
                left-6
                right-6
                top-6
                z-20
                flex
                items-start
                justify-between
              "
            >

              <div>

                <span
                  className="
                    text-xs
                    text-[#C6922E]
                  "
                >
                  {item.number}
                </span>

                <p
                  className="
                    mt-2
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/35
                  "
                >
                  {item.label}
                </p>

              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-black/20
                  text-white/30
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:border-[#C6922E]/50
                  group-hover:bg-[#C6922E]/10
                  group-hover:text-[#C6922E]
                "
              >
                <ArrowUpRight size={15} />
              </div>

            </div>

            {/* =================================================
                CENTER PLACEHOLDER
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[44%]
                z-10
                -translate-x-1/2
                -translate-y-1/2
              "
            >

              <div
                className="
                  relative
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C6922E]/15
                  transition-all
                  duration-1000
                  group-hover:scale-110
                  group-hover:border-[#C6922E]/30
                "
              >

                <div
                  className="
                    absolute
                    inset-5
                    rounded-full
                    border
                    border-dashed
                    border-[#C6922E]/15
                    transition-transform
                    duration-1000
                    group-hover:rotate-45
                  "
                />

                <div
                  className="
                    absolute
                    h-16
                    w-16
                    rounded-full
                    bg-[#C6922E]/10
                    blur-[35px]
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    text-3xl
                    font-light
                    text-[#C6922E]/50
                  "
                >
                  {index === 0
                    ? "◌"
                    : index === 1
                      ? "✦"
                      : "∞"}
                </span>

              </div>

            </div>

            {/* =================================================
                BOTTOM
            ================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-20
                p-6
              "
            >

              <div
                className="
                  mb-5
                  h-px
                  w-10
                  bg-[#C6922E]/60
                  transition-all
                  duration-500
                  group-hover:w-20
                "
              />

              <h3
                className="
                  text-3xl
                  font-medium
                  tracking-[-0.04em]
                  text-[#F5F1E8]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/25
                "
              >
                Shrinik
              </p>

            </div>

          </div>

        </Parallax>

      </article>
    </ScrollReveal>
  );
}

/*
 * ============================================================
 * IMAGE WITH SAFE FALLBACK
 * ============================================================
 */

function GalleryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="absolute inset-0">

      <img
        src={src}
        alt={alt}
        className="
          h-[115%]
          w-full
          object-cover
          opacity-70
          grayscale-[40%]
          transition-all
          duration-1000
          group-hover:scale-105
          group-hover:opacity-100
          group-hover:grayscale-0
        "
        onError={(event) => {
          /*
           * Keep the website clean until actual gallery
           * photographs are added.
           */

          event.currentTarget.style.display =
            "none";
        }}
      />

      {/* Fallback */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-br
          from-[#650018]
          via-[#21070D]
          to-[#050505]
        "
      >

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
          "
          style={{
            backgroundImage:
              `
              linear-gradient(
                rgba(255,255,255,.2) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.2) 1px,
                transparent 1px
              )
              `,
            backgroundSize: "45px 45px",
          }}
        />

      </div>

    </div>
  );
}