"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import Parallax from "@/components/effects/Parallax";
import SectionHeading from "@/components/effects/SectionHeading";

const pillars = [
  {
    number: "01",
    label: "Technology",
    description:
      "Building, experimenting and turning ideas into working experiences.",
  },
  {
    number: "02",
    label: "Creativity",
    description:
      "Design, media and ideas that give every Shrinik experience its identity.",
  },
  {
    number: "03",
    label: "Culture",
    description:
      "Music, dance, events and the community that brings everything together.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
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
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Burgundy glow */}

        <div
          className="
            absolute
            left-[-18%]
            top-[15%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#650018]/10
            blur-[150px]
          "
        />

        {/* Gold glow */}

        <div
          className="
            absolute
            bottom-[5%]
            right-[-15%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#C6922E]/[0.035]
            blur-[160px]
          "
        />

        {/* Central atmosphere */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#650018]/[0.025]
            blur-[130px]
          "
        />

        {/* Technical grid */}

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
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            SECTION HEADING
        ==================================================== */}

        <SectionHeading
          eyebrow="About Shrinik"
          title="More than"
          highlight="a club."
          description="Shrinik is a student-driven community at G.L. Bajaj where technology, creativity and culture come together."
        />

        {/* ===================================================
            MAIN SPLIT
        ==================================================== */}

        <div
          className="
            mt-20
            grid
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-center
            lg:gap-20
          "
        >

          {/* =================================================
              LEFT VISUAL
          ================================================= */}

          <ScrollReveal y={90}>

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-[2.2rem]
                border
                border-white/[0.08]
                bg-[#12070A]
                shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              "
            >

              <Parallax speed={45}>

                <div
                  className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                  "
                >

                  {/* Background */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-[#650018]
                      via-[#25070D]
                      to-[#050505]
                    "
                  />

                  {/* Grid */}

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-[0.1]
                    "
                    style={{
                      backgroundImage:
                        `
                        linear-gradient(
                          rgba(255,255,255,.15) 1px,
                          transparent 1px
                        ),
                        linear-gradient(
                          90deg,
                          rgba(255,255,255,.15) 1px,
                          transparent 1px
                        )
                        `,
                      backgroundSize: "50px 50px",
                    }}
                  />

                  {/* Large ambient glow */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-72
                      w-72
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-[#C6922E]/10
                      blur-[100px]
                      transition-all
                      duration-1000
                      group-hover:bg-[#C6922E]/15
                    "
                  />

                  {/* =================================================
                      LOGO ORBIT
                  ================================================== */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-[43%]
                      h-60
                      w-60
                      -translate-x-1/2
                      -translate-y-1/2
                      sm:h-72
                      sm:w-72
                    "
                  >

                    {/* Outer orbit */}

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#C6922E]/20
                      "
                    />

                    {/* Dashed orbit */}

                    <div
                      className="
                        absolute
                        inset-7
                        rounded-full
                        border
                        border-dashed
                        border-[#C6922E]/15
                      "
                    />

                    {/* Inner orbit */}

                    <div
                      className="
                        absolute
                        inset-14
                        rounded-full
                        border
                        border-[#C6922E]/25
                      "
                    />

                    {/* Logo */}

                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        flex
                        h-36
                        w-36
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/10
                        sm:h-44
                        sm:w-44
                      "
                    >

                      <img
                        src="/assets/favicon.png"
                        alt="Shrinik"
                        className="
                          relative
                          z-10
                          h-32
                          w-32
                          object-contain
                          drop-shadow-[0_0_35px_rgba(198,146,46,.3)]
                          transition-transform
                          duration-1000
                          ease-out
                          group-hover:scale-105
                          group-hover:rotate-2
                          sm:h-36
                          sm:w-36
                        "
                      />

                    </div>

                    {/* Orbit points */}

                    <span
                      className="
                        absolute
                        left-1/2
                        top-[-3px]
                        h-1.5
                        w-1.5
                        -translate-x-1/2
                        rounded-full
                        bg-[#C6922E]
                        shadow-[0_0_12px_rgba(198,146,46,.7)]
                      "
                    />

                    <span
                      className="
                        absolute
                        bottom-[18%]
                        right-[3%]
                        h-1
                        w-1
                        rounded-full
                        bg-[#C6922E]/70
                      "
                    />

                    <span
                      className="
                        absolute
                        bottom-[25%]
                        left-[3%]
                        h-1
                        w-1
                        rounded-full
                        bg-[#C6922E]/50
                      "
                    />

                  </div>

                  {/* =================================================
                      TOP LABEL
                  ================================================== */}

                  <div
                    className="
                      absolute
                      left-7
                      right-7
                      top-7
                      flex
                      items-start
                      justify-between
                    "
                  >

                    <div>

                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.35em]
                          text-[#C6922E]
                        "
                      >
                        G.L. Bajaj
                      </span>

                      <p
                        className="
                          mt-2
                          text-[8px]
                          uppercase
                          tracking-[0.25em]
                          text-white/25
                        "
                      >
                        Student community
                      </p>

                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        text-[9px]
                        text-white/30
                      "
                    >
                      01
                    </div>

                  </div>

                  {/* =================================================
                      BOTTOM TEXT
                  ================================================== */}

                  <div
                    className="
                      absolute
                      bottom-7
                      left-7
                      right-7
                    "
                  >

                    <div className="mb-5 h-px w-12 bg-[#C6922E]/60" />

                    <p
                      className="
                        text-3xl
                        font-medium
                        leading-[0.95]
                        tracking-[-0.04em]
                        text-[#F5F1E8]
                        sm:text-4xl
                      "
                    >
                      Technology.
                      <br />
                      Creativity.
                      <br />
                      Culture.
                    </p>

                  </div>

                </div>

              </Parallax>

              {/* Border highlight */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[2.2rem]
                  border
                  border-white/[0.04]
                  transition-colors
                  duration-700
                  group-hover:border-[#C6922E]/20
                "
              />

            </div>

          </ScrollReveal>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="space-y-10">

            {/* Identity */}

            <ScrollReveal delay={0.08}>

              <div
                className="
                  relative
                  border-l
                  border-[#C6922E]/30
                  pl-6
                "
              >

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-[#C6922E]
                  "
                >
                  Our identity
                </span>

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-xl
                    leading-9
                    text-[#F5F1E8]/80
                    md:text-2xl
                    md:leading-10
                  "
                >
                  A space where students don't
                  just participate —
                  <span className="text-[#C6922E]">
                    {" "}
                    they create.
                  </span>
                </p>

              </div>

            </ScrollReveal>

            {/* Description */}

            <ScrollReveal delay={0.16}>

              <p
                className="
                  max-w-2xl
                  text-sm
                  leading-8
                  text-white/35
                  md:text-base
                  md:leading-8
                "
              >
                From building technology and
                organising events to creating music,
                dance, media and campaigns, Shrinik
                brings different talents together
                under one community.
              </p>

            </ScrollReveal>

            {/* =================================================
                PILLARS
            ================================================== */}

            <ScrollReveal delay={0.24}>

              <div className="grid gap-3 sm:grid-cols-3">

                {pillars.map(
                  (
                    pillar,
                    index
                  ) => (
                    <div
                      key={pillar.number}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[1.4rem]
                        border
                        border-white/[0.07]
                        bg-white/[0.015]
                        p-5
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-[#C6922E]/30
                        hover:bg-[#C6922E]/[0.025]
                      "
                    >

                      {/* Number */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            text-xs
                            text-[#C6922E]
                          "
                        >
                          {pillar.number}
                        </span>

                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-white/10
                            transition-all
                            duration-500
                            group-hover:bg-[#C6922E]
                            group-hover:shadow-[0_0_10px_rgba(198,146,46,.5)]
                          "
                        />

                      </div>

                      {/* Label */}

                      <p
                        className="
                          mt-10
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          text-white/55
                          transition-colors
                          duration-500
                          group-hover:text-[#F5F1E8]
                        "
                      >
                        {pillar.label}
                      </p>

                      {/* Description */}

                      <p
                        className="
                          mt-3
                          text-[11px]
                          leading-5
                          text-white/20
                          transition-colors
                          duration-500
                          group-hover:text-white/35
                        "
                      >
                        {pillar.description}
                      </p>

                      {/* Bottom line */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-5
                          h-px
                          w-0
                          bg-[#C6922E]
                          transition-all
                          duration-500
                          group-hover:w-[calc(100%-2.5rem)]
                        "
                      />

                    </div>
                  )
                )}

              </div>

            </ScrollReveal>

            {/* =================================================
                STATEMENT
            ================================================== */}

            <ScrollReveal delay={0.32}>

              <div
                className="
                  flex
                  items-center
                  gap-5
                  border-t
                  border-white/[0.07]
                  pt-7
                "
              >

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-[#C6922E]/70
                  "
                >
                  2026–27
                </span>

                <span className="h-px flex-1 bg-white/[0.07]" />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-white/20
                  "
                >
                  Built by students
                </span>

              </div>

            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}