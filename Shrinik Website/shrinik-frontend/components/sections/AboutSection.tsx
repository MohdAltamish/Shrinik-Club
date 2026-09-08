"use client";

import { useState } from "react";
import {
  Code2,
  Lightbulb,
  Music2,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import ScrollReveal from "@/components/effects/ScrollReveal";

type PillarId = "technology" | "creativity" | "culture";

interface Pillar {
  id: PillarId;
  number: string;
  label: string;
  shortLabel: string;
  statement: string;
  description: string;
  process: string[];
  icon: typeof Code2;
}

const pillars: Pillar[] = [
  {
    id: "technology",
    number: "01",
    label: "Technology",
    shortLabel: "BUILD",
    statement: "We build things that didn't exist yesterday.",
    description:
      "From code and automation to digital experiences, technology gives Shrinik the tools to turn ambitious ideas into something real.",
    process: ["Code", "Build", "Experiment", "Deploy"],
    icon: Code2,
  },
  {
    id: "creativity",
    number: "02",
    label: "Creativity",
    shortLabel: "CREATE",
    statement: "We turn imagination into experiences.",
    description:
      "Design, media, storytelling and visual expression give every Shrinik experience its own identity.",
    process: ["Imagine", "Design", "Create", "Express"],
    icon: Lightbulb,
  },
  {
    id: "culture",
    number: "03",
    label: "Culture",
    shortLabel: "CONNECT",
    statement: "We create moments people remember.",
    description:
      "Music, dance, events and shared experiences bring different personalities and talents together as one community.",
    process: ["Gather", "Perform", "Celebrate", "Connect"],
    icon: Music2,
  },
];

const pillarPositions: Record<PillarId, string> = {
  technology: "top-[2%] left-1/2 -translate-x-1/2",
  creativity: "bottom-[10%] right-[2%]",
  culture: "bottom-[10%] left-[2%]",
};

export default function AboutSection() {
  const [activePillar, setActivePillar] =
    useState<PillarId>("technology");

  const active =
    pillars.find((pillar) => pillar.id === activePillar) ??
    pillars[0];

  const ActiveIcon = active.icon;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0d0206] px-6 py-32 md:px-12 md:py-40"
    >
      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[10%] h-[550px] w-[550px] rounded-full bg-[#650018]/10 blur-[150px]" />

        <div className="absolute bottom-[-10%] right-[-15%] h-[600px] w-[600px] rounded-full bg-[#C6922E]/[0.035] blur-[160px]" />

        <div className="absolute left-[25%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650018]/[0.04] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ===================================================
            TOP INTRO
        ==================================================== */}

        <ScrollReveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C6922E]" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6922E]">
                About Shrinik
              </span>
            </div>

            <h2 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.055em] text-[#F5F1E8] md:text-7xl">
              More than
              <br />
              <span className="text-white/25">a club.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/40 md:text-base">
              Shrinik is a student-driven community at G.L. Bajaj where
              technology, creativity and culture come together.
            </p>
          </div>
        </ScrollReveal>

        {/* ===================================================
            ECOSYSTEM
        ==================================================== */}

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
          {/* =================================================
              LEFT — INTERACTIVE ECOSYSTEM
          ================================================== */}

          <ScrollReveal y={70}>
            <div className="relative mx-auto aspect-square w-full max-w-[620px]">
              {/* Outer glow */}

              <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650018]/10 blur-[80px]" />

              {/* Orbit 1 */}

              <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C6922E]/10" />

              {/* Orbit 2 */}

              <div className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-[#C6922E]/15" />

              {/* Orbit 3 */}

              <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C6922E]/20" />

              {/* Rotating orbit dots */}

              <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 animate-[spin_28s_linear_infinite] rounded-full">
                <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#C6922E] shadow-[0_0_12px_rgba(198,146,46,.8)]" />

                <span className="absolute bottom-[8%] left-[8%] h-1 w-1 rounded-full bg-[#C6922E]/60" />

                <span className="absolute right-[12%] top-[22%] h-1 w-1 rounded-full bg-[#C6922E]/50" />
              </div>

              {/* Connection line — top */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[43%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-[#C6922E]/35 to-transparent" />

              {/* Connection line — right */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38%] w-px origin-top rotate-[120deg] bg-gradient-to-b from-[#C6922E]/30 to-transparent" />

              {/* Connection line — left */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38%] w-px origin-top -rotate-[120deg] bg-gradient-to-b from-[#C6922E]/30 to-transparent" />

              {/* =================================================
                  CENTRAL SHRINIK
              ================================================== */}

              <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="absolute inset-[-15%] rounded-full bg-[#C6922E]/5 blur-2xl" />

                <div className="absolute inset-0 rounded-full border border-[#C6922E]/40 shadow-[0_0_45px_rgba(198,146,46,.08)]" />

                <div className="absolute inset-[10%] rounded-full border border-[#C6922E]/15" />

                <div className="relative z-10 flex h-[75%] w-[75%] items-center justify-center rounded-full bg-[#0b0708]/90">
                  <img
                    src="/assets/favicon.png"
                    alt="Shrinik"
                    className="h-[70%] w-[70%] object-contain drop-shadow-[0_0_30px_rgba(198,146,46,.25)]"
                  />
                </div>
              </div>

              {/* =================================================
                  PILLAR NODES
              ================================================== */}

              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isActive = activePillar === pillar.id;

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    aria-label={`Explore ${pillar.label}`}
                    aria-pressed={isActive}
                    onClick={() => setActivePillar(pillar.id)}
                    onMouseEnter={() => setActivePillar(pillar.id)}
                    className={`absolute z-20 flex h-[27%] w-[27%] min-w-[105px] max-w-[155px] flex-col items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-500 ${pillarPositions[pillar.id]} ${
                      isActive
                        ? "border-[#C6922E]/60 bg-[#C6922E]/[0.08] shadow-[0_0_55px_rgba(198,146,46,.12)]"
                        : "border-white/[0.08] bg-black/30 hover:border-[#C6922E]/35 hover:bg-[#C6922E]/[0.04]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-[#C6922E]/50 text-[#C6922E]"
                          : "border-white/10 text-white/30"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <span
                      className={`mt-3 text-[7px] uppercase tracking-[0.3em] transition-colors ${
                        isActive
                          ? "text-[#C6922E]"
                          : "text-white/20"
                      }`}
                    >
                      {pillar.number}
                    </span>

                    <span
                      className={`mt-1 text-[9px] uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? "text-[#F5F1E8]"
                          : "text-white/40"
                      }`}
                    >
                      {pillar.label}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-4 h-1 w-1 rounded-full bg-[#C6922E] shadow-[0_0_10px_rgba(198,146,46,.8)]" />
                    )}
                  </button>
                );
              })}

              {/* Bottom instruction */}

              <div className="absolute bottom-[-2%] left-1/2 -translate-x-1/2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles
                    size={10}
                    className="text-[#C6922E]/50"
                  />

                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                    Explore our ecosystem
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* =================================================
              RIGHT — DYNAMIC CONTENT
          ================================================== */}

          <div>
            {/* Identity */}

            <ScrollReveal delay={0.08}>
              <div className="relative border-l border-[#C6922E]/30 pl-6">
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6922E]">
                  Our identity
                </span>

                <p className="mt-5 max-w-2xl text-xl leading-9 text-[#F5F1E8]/80 md:text-2xl md:leading-10">
                  A space where students don't just participate —
                  <span className="text-[#C6922E]"> they create.</span>
                </p>
              </div>
            </ScrollReveal>

            {/* Dynamic panel */}

            <ScrollReveal delay={0.16}>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#C6922E]/20 bg-gradient-to-br from-[#300711]/70 via-[#12070A]/90 to-black/70 shadow-[0_30px_100px_rgba(0,0,0,.25)]">
                {/* Panel header */}

                <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5 md:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6922E]/30 bg-[#C6922E]/[0.04]">
                      <ActiveIcon
                        size={15}
                        className="text-[#C6922E]"
                      />
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                        Active dimension
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]">
                        {active.label}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] tracking-[0.2em] text-[#C6922E]/60">
                    {active.number}
                  </span>
                </div>

                {/* Panel content */}

                <div className="p-6 md:p-7">
                  <h3
                    key={`${active.id}-statement`}
                    className="max-w-xl text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-[#F5F1E8] animate-[aboutTextIn_.5s_ease-out_both] md:text-4xl"
                  >
                    {active.statement}
                  </h3>

                  <p
                    key={`${active.id}-description`}
                    className="mt-6 max-w-xl text-sm leading-7 text-white/35 animate-[aboutTextIn_.5s_.05s_ease-out_both]"
                  >
                    {active.description}
                  </p>

                  {/* Process */}

                  <div className="mt-8 border-t border-white/[0.07] pt-7">
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                        From idea to impact
                      </span>

                      <span className="h-px w-8 bg-[#C6922E]/30" />
                    </div>

                    <div
                      key={active.id}
                      className="mt-6 flex flex-wrap items-center gap-y-5 animate-[aboutTextIn_.5s_.1s_ease-out_both]"
                    >
                      {active.process.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6922E]/20 bg-black/20 text-[8px] text-[#C6922E]">
                              0{index + 1}
                            </span>

                            <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">
                              {step}
                            </span>
                          </div>

                          {index < active.process.length - 1 && (
                            <ChevronRight
                              size={13}
                              className="mx-3 text-[#C6922E]/30"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Panel footer */}

                <div className="flex items-center justify-between border-t border-white/[0.07] px-6 py-4 md:px-7">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white/15">
                    Shrinik ecosystem
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="text-[#C6922E]/50"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* =================================================
                PILLAR SELECTOR
            ================================================== */}

            <ScrollReveal delay={0.24}>
              <div className="mt-5">
                <div className="grid grid-cols-3 gap-2">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    const isActive = activePillar === pillar.id;

                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        aria-label={`Select ${pillar.label}`}
                        aria-pressed={isActive}
                        onClick={() =>
                          setActivePillar(pillar.id)
                        }
                        onMouseEnter={() =>
                          setActivePillar(pillar.id)
                        }
                        className={`group relative overflow-hidden rounded-[1.2rem] border p-4 text-left transition-all duration-500 ${
                          isActive
                            ? "border-[#C6922E]/35 bg-[#C6922E]/[0.035]"
                            : "border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[9px] ${
                              isActive
                                ? "text-[#C6922E]"
                                : "text-white/20"
                            }`}
                          >
                            {pillar.number}
                          </span>

                          <Icon
                            size={13}
                            className={`transition-colors ${
                              isActive
                                ? "text-[#C6922E]"
                                : "text-white/15"
                            }`}
                          />
                        </div>

                        <p
                          className={`mt-7 text-[9px] uppercase tracking-[0.16em] ${
                            isActive
                              ? "text-[#F5F1E8]"
                              : "text-white/35"
                          }`}
                        >
                          {pillar.label}
                        </p>

                        <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/15">
                          {pillar.shortLabel}
                        </p>

                        <div
                          className={`absolute bottom-0 left-4 h-px bg-[#C6922E] transition-all duration-500 ${
                            isActive
                              ? "w-[calc(100%-2rem)]"
                              : "w-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Bottom statement */}

            <ScrollReveal delay={0.32}>
              <div className="mt-8 flex items-center gap-5 border-t border-white/[0.07] pt-7">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6922E]/70">
                  2026–27
                </span>

                <span className="h-px flex-1 bg-white/[0.07]" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Built by students
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style jsx>{`
        @keyframes aboutTextIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}