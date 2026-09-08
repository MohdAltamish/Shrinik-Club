"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${
        centered ? "mx-auto text-center" : ""
      } max-w-3xl`}
    >
      <ScrollReveal>
        <div
          className={`flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-[#C6922E]" />

          <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6922E]">
            {eyebrow}
          </span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <h2 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.055em] text-[#F5F1E8] md:text-7xl">
          {title}

          {highlight && (
            <>
              <br />

              <span className="text-white/25">
                {highlight}
              </span>
            </>
          )}
        </h2>
      </ScrollReveal>

      {description && (
        <ScrollReveal delay={0.16}>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#A9AFB7] md:text-base">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}