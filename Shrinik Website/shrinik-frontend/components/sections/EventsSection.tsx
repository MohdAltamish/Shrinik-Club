"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  X,
} from "lucide-react";

import ScrollReveal from "@/components/effects/ScrollReveal";

interface EventItem {
  id: string;
  number: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;

  // Right-side event information
  highlight: string;
  type: string;
  community: string;

  // Gallery images
  images: string[];

  // Full visual used as the left timeline card
  coverImage: string;
}

/* =========================================================
   EVENTS DATA
========================================================= */

const events: EventItem[] = [
  {
    id: "valorant-gameplay",
    number: "01",
    date: "14 APR 2025",
    title: "Valorant Gameplay",
    subtitle: "COMPETE · CONNECT · PLAY",
    description:
      "A competitive gaming experience bringing students together through strategy, teamwork and competition.",

    highlight: "Where strategy met teamwork.",
    type: "Gaming Event",
    community: "Shrinik Community",

    coverImage:
      "/images/events/valorant-gameplay/valorant-cover.png",

    images: [
      "/images/events/valorant-gameplay/WhatsApp Image 2026-04-03 at 4.10.48 PM.webp",
      "/images/events/valorant-gameplay/WhatsApp Image 2026-04-03 at 4.10.50 PM.webp",
      "/images/events/valorant-gameplay/WhatsApp Image 2026-04-03 at 4.11.23 PM (1).webp",
      "/images/events/valorant-gameplay/WhatsApp Image 2026-04-03 at 4.11.23 PM.webp",
    ],
  },

  {
    id: "aurora-orientation",
    number: "02",
    date: "21 SEP 2025",
    title: "Aurora Orientation",
    subtitle: "A NEW BEGINNING",
    description:
      "An orientation experience bringing students together and marking the beginning of a new chapter.",

    highlight: "Where new journeys began.",
    type: "Orientation",
    community: "Shrinik Community",

    coverImage:
      "/images/events/aurora-orientation/aurora-cover.png",

    images: [
      "/images/events/aurora-orientation/IMG_20250913_151116.webp",
      "/images/events/aurora-orientation/IMG_20250913_143340451.webp",
      "/images/events/aurora-orientation/IMG_20250913_145037469.webp",
      "/images/events/aurora-orientation/IMG_20250913_150655550.webp",
      "/images/events/aurora-orientation/IMG_20250913_150828995.webp",
      "/images/events/aurora-orientation/IMG_20250913_152309564.webp",
      "/images/events/aurora-orientation/IMG20250913150734.webp",
      "/images/events/aurora-orientation/IMG20250913163142.webp",
      "/images/events/aurora-orientation/IMG_8215.webp",
    ],
  },

  {
    id: "nukkad-naatak",
    number: "03",
    date: "07 NOV 2025",
    title: "Nukkad Naatak",
    subtitle: "AWARENESS · PERFORMANCE · EXPRESSION",
    description:
      "A street-play initiative using performance and expression as a powerful medium for awareness and engagement.",

    highlight: "Stories that speak. Messages that stay.",
    type: "Cultural Event",
    community: "Shrinik Community",

    coverImage:
      "/images/events/nukkad-naatak/nukkad-cover.png",

    images: [
      "/images/events/nukkad-naatak/IMG_2350.webp",
      "/images/events/nukkad-naatak/nukkad-01.webp",
      "/images/events/nukkad-naatak/IMG20251031124328.webp",
      "/images/events/nukkad-naatak/IMG_2337.webp",
    ],
  },

  {
    id: "sansad-25",
    number: "04",
    date: "18 NOV 2025",
    title: "Sansad '25",
    subtitle: "IDEAS · VOICES · DEBATE",
    description:
      "A platform for students to express ideas, exchange perspectives and engage in meaningful debate.",

    highlight: "Ideas. Voices. Meaningful debate.",
    type: "Debate & Discussion",
    community: "Shrinik Community",

    coverImage:
      "/images/events/sansad-25/sansad-cover.png",

    images: [
      "/images/events/sansad-25/IMG_9574.webp",
      "/images/events/sansad-25/IMG20251108140908.webp",
      "/images/events/sansad-25/IMG20251108142702.webp",
      "/images/events/sansad-25/IMG_3036.webp",
      "/images/events/sansad-25/IMG_9501.webp",
      "/images/events/sansad-25/IMG_9514.webp",
      "/images/events/sansad-25/IMG_9515.webp",
    ],
  },

  {
    id: "farewell-batch-26",
    number: "05",
    date: "2026",
    title: "Farewell Batch 26",
    subtitle: "CELEBRATING THE JOURNEY",
    description:
      "A celebration of memories, friendships and the journey shared by the graduating batch.",

    highlight: "Goodbyes today. Memories forever.",
    type: "Farewell",
    community: "Shrinik Community",

    coverImage:
      "/images/events/farewell-batch-26/farewell-cover.webp",

    images: [
      "/images/events/farewell-batch-26/DSC05377.webp",
      "/images/events/farewell-batch-26/DSC05390.webp",
      "/images/events/farewell-batch-26/DSC05393.webp",
      "/images/events/farewell-batch-26/DSC05396.webp",
      "/images/events/farewell-batch-26/DSC05415.webp",
      "/images/events/farewell-batch-26/DSC05426.webp",
      "/images/events/farewell-batch-26/DSC05441.webp",
      "/images/events/farewell-batch-26/DSC05456.webp",
      "/images/events/farewell-batch-26/DSC05470.webp",
      "/images/events/farewell-batch-26/DSC05527.webp",
      "/images/events/farewell-batch-26/DSC05529.webp",
      "/images/events/farewell-batch-26/DSC05541.webp",
      "/images/events/farewell-batch-26/DSC05547.webp",
      "/images/events/farewell-batch-26/DSC05550.webp",
      "/images/events/farewell-batch-26/DSC05551.webp",
      "/images/events/farewell-batch-26/DSC05552.webp",
      "/images/events/farewell-batch-26/DSC05606.webp",
      "/images/events/farewell-batch-26/IMG_20260526_165253.webp",
      "/images/events/farewell-batch-26/IMG_20260526_165343.webp",
      "/images/events/farewell-batch-26/IMG_20260526_165419.webp",
    ],
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] =
    useState<EventItem | null>(null);

  const [currentImage, setCurrentImage] = useState(0);

  const [zoomedImage, setZoomedImage] =
    useState<string | null>(null);

  /* =======================================================
     OPEN EVENT
  ======================================================= */

  const openEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setCurrentImage(0);
  };

  /* =======================================================
     CLOSE EVENT
  ======================================================= */

  const closeEvent = () => {
    setSelectedEvent(null);
    setCurrentImage(0);
  };

  /* =======================================================
     NEXT IMAGE
  ======================================================= */

  const nextImage = () => {
    if (!selectedEvent?.images.length) return;

    setCurrentImage((prev) =>
      prev === selectedEvent.images.length - 1
        ? 0
        : prev + 1,
    );
  };

  /* =======================================================
     PREVIOUS IMAGE
  ======================================================= */

  const previousImage = () => {
    if (!selectedEvent?.images.length) return;

    setCurrentImage((prev) =>
      prev === 0
        ? selectedEvent.images.length - 1
        : prev - 1,
    );
  };

  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoomedImage) {
          setZoomedImage(null);
        } else if (selectedEvent) {
          closeEvent();
        }
      }

      if (selectedEvent && !zoomedImage) {
        if (event.key === "ArrowRight") {
          nextImage();
        }

        if (event.key === "ArrowLeft") {
          previousImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedEvent, zoomedImage]);

  /* =======================================================
     LOCK BODY SCROLL WHEN MODAL IS OPEN
  ======================================================= */

  useEffect(() => {
    if (selectedEvent || zoomedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent, zoomedImage]);

  return (
    <>
      {/* =====================================================
          EVENTS SECTION
      ====================================================== */}

      <section
        id="events"
        className="
          relative
          overflow-hidden
          bg-[#080808]
          px-6
          py-32
          md:px-12
          md:py-40
        "
      >
        {/* =================================================
            BACKGROUND GLOW
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-15%]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#650018]/10
            blur-[150px]
          "
        />

        <div
          className="
            pointer-events-none
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

        {/* Background grid */}

        <div
          className="
            pointer-events-none
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

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <ScrollReveal>
            <div className="max-w-3xl">
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
                    tracking-[0.35em]
                    text-[#C6922E]
                  "
                >
                  Our Journey
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
                  md:text-7xl
                "
              >
                Moments
                <br />

                <span className="text-white/25">
                  that shaped us.
                </span>
              </h2>

              <p
                className="
                  mt-7
                  max-w-xl
                  text-sm
                  leading-7
                  text-white/40
                  md:text-base
                "
              >
                From competition and orientation to
                expression, debate and celebration —
                these moments form the journey of
                Shrinik.
              </p>
            </div>
          </ScrollReveal>

          {/* =================================================
              TIMELINE
          ================================================== */}

          <div className="relative mt-24">

            {/* Central line */}

            <div
              className="
                absolute
                bottom-0
                left-5
                top-0
                w-px
                bg-gradient-to-b
                from-transparent
                via-[#C6922E]/30
                to-transparent
                md:left-1/2
                md:-translate-x-1/2
              "
            />

            <div className="space-y-20 md:space-y-28">

              {events.map((event, index) => (
                <ScrollReveal
                  key={event.id}
                  delay={index * 0.05}
                  y={45}
                >
                  <div
                    className="
                      relative
                      grid
                      grid-cols-[40px_1fr]
                      gap-6
                      md:grid-cols-[1fr_40px_1fr]
                      md:gap-10
                      lg:gap-16
                    "
                  >

                    {/* =================================================
                        MOBILE NODE
                    ================================================== */}

                    <div
                      className="
                        absolute
                        left-[13px]
                        top-8
                        z-20
                        h-3
                        w-3
                        rounded-full
                        border
                        border-[#C6922E]
                        bg-[#080808]
                        shadow-[0_0_20px_rgba(198,146,46,0.35)]
                        md:hidden
                      "
                    >
                      <div
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          h-1
                          w-1
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          bg-[#C6922E]
                        "
                      />
                    </div>

                    {/* =================================================
                        LEFT — EVENT IMAGE CARD
                    ================================================== */}

                    <div
                      className="
                        col-start-2
                        md:col-start-1
                      "
                    >
                      <TimelineCard
                        event={event}
                        onClick={() => openEvent(event)}
                      />
                    </div>

                    {/* =================================================
                        CENTER — DESKTOP NODE
                    ================================================== */}

                    <div
                      className="
                        absolute
                        left-1/2
                        top-8
                        z-30
                        hidden
                        h-4
                        w-4
                        -translate-x-1/2
                        rounded-full
                        border
                        border-[#C6922E]
                        bg-[#080808]
                        shadow-[0_0_25px_rgba(198,146,46,0.3)]
                        md:block
                      "
                    >
                      <div
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          h-1.5
                          w-1.5
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          bg-[#C6922E]
                        "
                      />
                    </div>

                    {/* =================================================
                        RIGHT — EVENT SPECIFIC CONTENT
                    ================================================== */}

                    <div
                      className="
                        hidden
                        md:col-start-3
                        md:block
                      "
                    >
                      <EventInformation
                        event={event}
                      />
                    </div>

                    {/* =================================================
                        MOBILE EVENT INFORMATION
                    ================================================== */}

                    <div
                      className="
                        col-start-2
                        mt-[-8px]
                        md:hidden
                      "
                    >
                      <MobileEventInformation
                        event={event}
                      />
                    </div>

                  </div>
                </ScrollReveal>
              ))}

            </div>
          </div>

          {/* =================================================
              END OF TIMELINE
          ================================================== */}

          <ScrollReveal delay={0.2}>
            <div
              className="
                mt-20
                flex
                flex-col
                items-center
                gap-4
              "
            >
              <div
                className="
                  h-12
                  w-px
                  bg-gradient-to-b
                  from-[#C6922E]/30
                  to-transparent
                "
              />

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.35em]
                  text-white/15
                "
              >
                More memories ahead
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          EVENT GALLERY MODAL
      ====================================================== */}

      {selectedEvent && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            backdrop-blur-xl
            md:p-8
          "
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeEvent();
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-4xl
              overflow-hidden
              rounded-[2rem]
              border
              border-[#C6922E]/20
              bg-[#100608]
              shadow-[0_40px_140px_rgba(0,0,0,0.8)]
            "
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closeEvent}
              aria-label="Close event gallery"
              className="
                absolute
                right-5
                top-5
                z-40
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/60
                text-white/50
                backdrop-blur-xl
                transition-all
                hover:border-[#C6922E]/40
                hover:bg-[#C6922E]/10
                hover:text-[#C6922E]
              "
            >
              <X size={17} />
            </button>

            {/* MODAL HEADER */}

            <div
              className="
                px-6
                pb-5
                pt-7
                md:px-8
              "
            >
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
                    tracking-[0.3em]
                    text-[#C6922E]
                  "
                >
                  {selectedEvent.date}
                </span>

                <span
                  className="
                    h-px
                    w-7
                    bg-[#C6922E]/40
                  "
                />

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/25
                  "
                >
                  {selectedEvent.subtitle}
                </span>
              </div>

              <h3
                className="
                  mt-3
                  pr-12
                  text-3xl
                  font-medium
                  tracking-[-0.04em]
                  text-[#F5F1E8]
                  md:text-4xl
                "
              >
                {selectedEvent.title}
              </h3>
            </div>

            {/* CAROUSEL */}

            {selectedEvent.images.length > 0 ? (
              <div
                className="
                  px-4
                  pb-6
                  md:px-8
                "
              >
                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-white/[0.07]
                    bg-black
                  "
                >

                  {/* Main image */}

                  <img
                    key={
                      selectedEvent.images[
                        currentImage
                      ]
                    }
                    src={
                      selectedEvent.images[
                        currentImage
                      ]
                    }
                    alt={`${selectedEvent.title} photo ${
                      currentImage + 1
                    }`}
                    className="
                      h-full
                      w-full
                      cursor-zoom-in
                      object-contain
                      transition-transform
                      duration-500
                      hover:scale-[1.015]
                    "
                    onClick={() =>
                      setZoomedImage(
                        selectedEvent.images[
                          currentImage
                        ],
                      )
                    }
                  />

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous photo"
                    className="
                      absolute
                      left-4
                      top-1/2
                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-black/55
                      text-white/60
                      backdrop-blur-xl
                      transition-all
                      hover:border-[#C6922E]/50
                      hover:bg-[#C6922E]/10
                      hover:text-[#C6922E]
                    "
                  >
                    <ArrowLeft size={17} />
                  </button>

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next photo"
                    className="
                      absolute
                      right-4
                      top-1/2
                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-black/55
                      text-white/60
                      backdrop-blur-xl
                      transition-all
                      hover:border-[#C6922E]/50
                      hover:bg-[#C6922E]/10
                      hover:text-[#C6922E]
                    "
                  >
                    <ArrowRight size={17} />
                  </button>

                  {/* IMAGE COUNTER */}

                  <div
                    className="
                      absolute
                      bottom-4
                      left-1/2
                      -translate-x-1/2
                      rounded-full
                      border
                      border-white/10
                      bg-black/65
                      px-4
                      py-2
                      text-[9px]
                      tracking-[0.2em]
                      text-white/50
                      backdrop-blur-xl
                    "
                  >
                    {String(
                      currentImage + 1,
                    ).padStart(2, "0")}

                    {" / "}

                    {String(
                      selectedEvent.images.length,
                    ).padStart(2, "0")}
                  </div>
                </div>

                {/* CAROUSEL DOTS */}

                <div
                  className="
                    mt-5
                    flex
                    max-w-full
                    items-center
                    justify-center
                    gap-1.5
                    overflow-hidden
                  "
                >
                  {selectedEvent.images.map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setCurrentImage(index)
                        }
                        aria-label={`View photo ${
                          index + 1
                        }`}
                        className={`
                          h-1
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            index === currentImage
                              ? "w-7 bg-[#C6922E]"
                              : "w-1.5 bg-white/20 hover:bg-white/40"
                          }
                        `}
                      />
                    ),
                  )}
                </div>
              </div>
            ) : (
              /* NO PHOTOS */

              <div
                className="
                  mx-4
                  mb-6
                  flex
                  aspect-[16/8]
                  items-center
                  justify-center
                  rounded-[1.5rem]
                  border
                  border-dashed
                  border-white/[0.08]
                  bg-black/20
                  md:mx-8
                "
              >
                <div className="text-center">
                  <CalendarDays
                    size={24}
                    className="
                      mx-auto
                      text-[#C6922E]/40
                    "
                  />

                  <p
                    className="
                      mt-4
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-white/25
                    "
                  >
                    Event gallery
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      text-white/15
                    "
                  >
                    Photos coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          FULL PHOTO ZOOM
      ====================================================== */}

      {zoomedImage && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            backdrop-blur-2xl
          "
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="
              relative
              max-h-[90vh]
              max-w-[90vw]
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#C6922E]/25
              bg-[#100608]
              shadow-[0_40px_120px_rgba(0,0,0,0.8)]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setZoomedImage(null)
              }
              aria-label="Close full photo"
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/60
                text-white/50
                backdrop-blur-xl
                transition-all
                hover:border-[#C6922E]/40
                hover:text-[#C6922E]
              "
            >
              <X size={15} />
            </button>

            {/* Full photo */}

            <img
              src={zoomedImage}
              alt="Full event photo"
              className="
                max-h-[85vh]
                max-w-[85vw]
                object-contain
              "
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   EVENT INFORMATION — DESKTOP
============================================================ */

interface EventInformationProps {
  event: EventItem;
}

function EventInformation({
  event,
}: EventInformationProps) {
  return (
    <div
      className="
        relative
        flex
        min-h-[330px]
        flex-col
        justify-center
        px-4
        py-8
        lg:px-8
      "
    >
      {/* Small label */}

      <div
        className="
          flex
          items-center
          gap-4
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
          Event Highlight
        </span>

        <span
          className="
            h-px
            w-12
            bg-[#C6922E]/35
          "
        />
      </div>

      {/* Highlight */}

      <h3
        className="
          mt-7
          max-w-lg
          text-3xl
          font-medium
          leading-[1]
          tracking-[-0.045em]
          text-[#F5F1E8]
          lg:text-4xl
        "
      >
        {event.highlight}
      </h3>

      {/* Description */}

      <p
        className="
          mt-6
          max-w-lg
          text-sm
          leading-7
          text-white/30
        "
      >
        {event.description}
      </p>

      {/* Metadata */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-x-8
          gap-y-6
          border-t
          border-white/[0.07]
          pt-6
          lg:grid-cols-3
        "
      >
        {/* Date */}

        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            Date
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-white/55
            "
          >
            {event.date}
          </p>
        </div>

        {/* Type */}

        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            Type
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-white/55
            "
          >
            {event.type}
          </p>
        </div>

        {/* Community */}

        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            Community
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-white/55
            "
          >
            {event.community}
          </p>
        </div>
      </div>

      {/* Decorative line */}

      <div
        className="
          mt-8
          h-px
          w-16
          bg-[#C6922E]/40
        "
      />
    </div>
  );
}

/* ============================================================
   EVENT INFORMATION — MOBILE
============================================================ */

function MobileEventInformation({
  event,
}: EventInformationProps) {
  return (
    <div
      className="
        border-l
        border-[#C6922E]/20
        pl-5
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.3em]
          text-[#C6922E]
        "
      >
        Event Highlight
      </span>

      <h4
        className="
          mt-3
          text-2xl
          font-medium
          tracking-[-0.035em]
          text-[#F5F1E8]
        "
      >
        {event.highlight}
      </h4>

      <p
        className="
          mt-4
          text-xs
          leading-6
          text-white/30
        "
      >
        {event.description}
      </p>

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-x-6
          gap-y-3
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          {event.date}
        </span>

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          {event.type}
        </span>

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          {event.community}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   TIMELINE EVENT CARD — IMAGE POSTER
============================================================ */

interface TimelineCardProps {
  event: EventItem;
  onClick: () => void;
}

function TimelineCard({
  event,
  onClick,
}: TimelineCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${event.title}`}
      className="
        group
        relative
        block
        w-full
        overflow-hidden
        rounded-[2rem]
        border
        border-white/[0.08]
        bg-[#12070A]
        text-left
        shadow-[0_25px_80px_rgba(0,0,0,0.25)]
        transition-all
        duration-700
        hover:-translate-y-2
        hover:border-[#C6922E]/45
        hover:shadow-[0_35px_100px_rgba(0,0,0,0.55)]
        focus:outline-none
        focus:ring-1
        focus:ring-[#C6922E]/50
      "
    >
      {/* =================================================
          IMAGE
      ================================================== */}

      <div
        className="
          relative
          aspect-[16/9]
          w-full
          overflow-hidden
          bg-[#100608]
        "
      >
        <img
          src={event.coverImage}
          alt={`${event.title} cover`}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-[1.035]
          "
        />

        {/* =================================================
            CINEMATIC OVERLAY
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-black/[0.02]
            to-black/10
          "
        />

        {/* =================================================
            EDGE VIGNETTE
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.32)_100%)]
            opacity-60
          "
        />

        {/* =================================================
            SUBTLE GOLD LIGHT
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#C6922E]/10
            blur-[70px]
            transition-opacity
            duration-700
            group-hover:opacity-100
            opacity-40
          "
        />

        {/* =================================================
            TOP META
        ================================================== */}

        <div
          className="
            absolute
            left-6
            right-6
            top-5
            z-10
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-black/25
              px-3
              py-1.5
              backdrop-blur-md
            "
          >
            <span
              className="
                text-[9px]
                tracking-[0.25em]
                text-[#C6922E]
              "
            >
              {event.number}
            </span>

            <span
              className="
                h-px
                w-5
                bg-[#C6922E]/40
              "
            />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/60
              "
            >
              {event.date}
            </span>
          </div>

          {/* Arrow */}

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
              bg-black/25
              text-white/60
              backdrop-blur-md
              transition-all
              duration-500
              group-hover:border-[#C6922E]/50
              group-hover:bg-[#C6922E]/10
              group-hover:text-[#C6922E]
            "
          >
            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-500
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* =================================================
            BOTTOM EVENT LABEL
        ================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            z-10
          "
        >
          <div
            className="
              mb-3
              h-px
              w-10
              bg-[#C6922E]
              transition-all
              duration-500
              group-hover:w-20
            "
          />

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/65
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
            "
          >
            {event.subtitle}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-medium
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]
              md:text-3xl
            "
          >
            {event.title}
          </h3>
        </div>

        {/* =================================================
            HOVER GOLD LINE
        ================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            z-20
            h-[2px]
            w-0
            bg-[#C6922E]
            transition-all
            duration-700
            group-hover:w-full
          "
        />
      </div>

      {/* =================================================
          CARD FOOTER
      ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-white/[0.06]
          bg-[#100608]/95
          px-6
          py-4
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
          Explore event
        </span>

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#C6922E]/65
            transition-colors
            group-hover:text-[#C6922E]
          "
        >
          View gallery →
        </span>
      </div>
    </button>
  );
}