"use client";

import { useEffect, useState } from "react";
import { calculateReadingProgress } from "@/lib/ui-state";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

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
    <>
      <div aria-hidden="true" className="reading-progress-bar">
        <span className="reading-progress-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div aria-live="polite" className="reading-progress-pill">
        <div>
          <div className="reading-progress-copy">阅读进度</div>
          <div className="reading-progress-value">{progress}%</div>
        </div>
        <div aria-hidden="true" className="reading-progress-mini-track">
          <span className="reading-progress-mini-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </>
  );
}
