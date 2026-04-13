
"use client";

import { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Avoid division by zero on pages that don't scroll
    if (totalHeight <= 0) {
      setProgress(0);
      return;
    }
    const scrollPosition = window.scrollY;
    const scrollProgress = (scrollPosition / totalHeight) * 100;
    setProgress(scrollProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call handler once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="reading-progress-bar-container">
      <div
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
