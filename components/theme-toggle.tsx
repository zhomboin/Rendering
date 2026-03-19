"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  getPreferredTheme,
  getThemeToggleLabel,
  toggleTheme
} from "@/lib/ui-state";

function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const nextTheme = getPreferredTheme(storedTheme, window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }, []);

  function handleToggle() {
    setTheme((currentTheme) => {
      const nextTheme = toggleTheme(currentTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
  }

  return (
    <button aria-label={getThemeToggleLabel(theme)} className="theme-toggle" onClick={handleToggle} type="button">
      <span className="theme-toggle-copy">
        <span className="theme-toggle-kicker">Theme</span>
        <span className="theme-toggle-value">{theme === "dark" ? "Dark" : "Light"}</span>
      </span>
      <span aria-hidden="true" className={`theme-toggle-orb theme-toggle-orb--${theme}`}>
        <span className="theme-toggle-spark" />
      </span>
    </button>
  );
}
