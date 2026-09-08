"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

const EXIT_DURATION = 700;

export default function IntroScreen({
  onComplete,
}: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCanPlay = () => {
    setIsReady(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !video.duration) {
      return;
    }

    const percentage =
      (video.currentTime / video.duration) * 100;

    setProgress(Math.min(percentage, 100));
  };

  const handleVideoEnd = () => {
    setProgress(100);
    setIsLeaving(true);

    window.setTimeout(() => {
      onComplete();
    }, EXIT_DURATION);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
      } catch {
        // Browser may delay autoplay until enough data is available.
      }
    };

    if (video.readyState >= 3) {
      setIsReady(true);
      attemptPlay();
    }
  }, []);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[100]
        overflow-hidden
        bg-[#080808]
        transition-opacity
        duration-700
        ${
          isLeaving
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }
      `}
    >
      {/* =====================================================
          VIDEO
      ====================================================== */}

      <video
        ref={videoRef}
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-contain
          md:object-cover
          transition-opacity
          duration-500
          ${isReady ? "opacity-100" : "opacity-0"}
        `}
       // src="/videos/shrinik-intro.mp4"
          src="https://res.cloudinary.com/dgrzeojzd/video/upload/v1787422660/shrinik-intro_xxvbv5.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        aria-hidden="true"
      />

      {/* =====================================================
          LOADING BACKGROUND
      ====================================================== */}

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#C6922E]" />
        </div>
      )}

      {/* =====================================================
          CINEMATIC OVERLAY
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/10
        "
      />

      {/* =====================================================
          VIGNETTE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]
        "
      />

      {/* =====================================================
          LOADING / VIDEO PROGRESS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-10
          left-1/2
          z-10
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.45em]
            text-white/40
          "
        >
          {isReady
            ? "Entering Shrinik"
            : "Loading Shrinik"}
        </span>

        <div
          className="
            relative
            h-px
            w-32
            overflow-hidden
            bg-white/10
          "
        >
          <div
            className="
              absolute
              inset-y-0
              left-0
              bg-[#C6922E]
              transition-[width]
              duration-100
              ease-linear
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
