"use client";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/shrinik_glbajaj/",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/shrinik-club/",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:shrinikclub@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#080808] px-6 py-16 md:px-12 md:py-20">

      {/* Background glow */}

      <div className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#650018]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">

          {/* =================================================
              BRAND
          ================================================== */}

          <div>

            <a
              href="#home"
              className="group inline-flex items-center gap-4"
            >

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#C6922E]/25 bg-[#12070A] transition-all duration-500 group-hover:border-[#C6922E]/50 group-hover:shadow-[0_0_30px_rgba(198,146,46,0.12)]">

                <img
                  src="/assets/favicon.png"
                  alt="Shrinik Club"
                  className="h-10 w-10 object-contain"
                />

              </div>

              <div>

                <p className="text-lg font-semibold tracking-[0.3em] text-[#F5F1E8]">
                  SHRINIK
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-[#C6922E]/70">
                  G.L. Bajaj
                </p>

              </div>

            </a>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/30">
              A student-driven community where technology,
              creativity and culture come together.
            </p>

            {/* Location */}

            <div className="mt-7 flex max-w-md items-start gap-3">

              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-[#C6922E]/70"
              />

              <p className="text-xs leading-6 text-white/30">
                G.L. Bajaj Institute of Technology and Management, Greater Noida
              </p>

            </div>

          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <div>

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#C6922E]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-3">

              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 hover:text-[#F5F1E8]"
                >
                  {link.label}

                  <ArrowUpRight
                    size={11}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}

            </nav>

          </div>

          {/* =================================================
              CONNECT
          ================================================== */}

          <div>

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#C6922E]">
              Connect
            </p>

            <div className="mt-6 flex flex-col gap-4">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/35 transition-colors duration-300 hover:text-[#F5F1E8]"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 group-hover:border-[#C6922E]/40 group-hover:bg-[#C6922E]/10 group-hover:text-[#C6922E]">
                      <Icon size={15} />
                    </span>

                    <span>{social.label}</span>

                    <ArrowUpRight
                      size={12}
                      className="ml-auto opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />

                  </a>
                );
              })}

            </div>

          </div>

        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div className="my-12 h-px bg-white/[0.07]" />

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
            © {new Date().getFullYear()} Shrinik Club · G.L. Bajaj
          </p>

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-[#C6922E] shadow-[0_0_10px_rgba(198,146,46,0.7)]" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-[#C6922E]/40">
              Technology · Creativity · Culture
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}