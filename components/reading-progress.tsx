"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, normalizeLocale } from "@/lib/i18n";
import { calculateReadingProgress } from "@/lib/ui-state";

export function ReadingProgress({ targetId, locale = DEFAULT_LOCALE }: { targetId: string; locale?: string }) {
  const [progress, setProgress] = useState(0);
  const normalizedLocale = normalizeLocale(locale);
  const label = normalizedLocale === "zh" ? "\u9605\u8bfb\u8fdb\u5ea6" : "Reading Progress";

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      const rect = target.getBoundingClientRect();
      const nextProgress = calculateReadingProgress({
        articleTop: rect.top + window.scrollY,
        articleHeight: target.offsetHeight,
        viewportHeight: window.innerHeight,
        scrollY: window.scrollY,
        offset: 140
      });

      setProgress((current) => (current === nextProgress ? current : nextProgress));
      frame = 0;
    };

    const requestProgressUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, [targetId]);

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-valuetext={`${progress}%`}
      className="reading-progress-inline"
      role="progressbar"
    >
      <span aria-hidden="true" className="reading-progress-inline-track">
        <span className="reading-progress-inline-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </span>
    </div>
  );
}
