"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  getPreferredTheme,
  toggleTheme
} from "@/lib/ui-state";

function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

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

  const themeLabel = theme === "dark" ? messages.theme.dark : messages.theme.light;
  const ariaLabel = theme === "dark" ? messages.theme.toggleToLight : messages.theme.toggleToDark;

  return (
    <button aria-label={ariaLabel} className="theme-toggle" onClick={handleToggle} type="button">
      <span className="theme-toggle-copy">
        <span className="theme-toggle-kicker">{messages.theme.kicker}</span>
        <span className="theme-toggle-value">{themeLabel}</span>
      </span>
      <span aria-hidden="true" className={`theme-toggle-orb theme-toggle-orb--${theme}`}>
        <span className="theme-toggle-spark" />
      </span>
    </button>
  );
}