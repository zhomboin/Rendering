export const DEFAULT_THEME = "light";
export const THEME_STORAGE_KEY = "rendering-theme";
export const SEARCH_OPEN_EVENT = "rendering:open-search";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getPreferredTheme(storedTheme, _systemPrefersDark) {
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return DEFAULT_THEME;
}

export function toggleTheme(theme) {
  return theme === "dark" ? "light" : "dark";
}

export function getThemeToggleLabel(theme) {
  return theme === "dark" ? "\u5207\u6362\u5230\u4eae\u8272" : "\u5207\u6362\u5230\u6697\u8272";
}

export function calculateReadingProgress({
  articleTop,
  articleHeight,
  viewportHeight,
  scrollY,
  offset = 0
}) {
  const safeHeight = Math.max(articleHeight, 1);
  const start = articleTop - offset;
  const end = articleTop + safeHeight - viewportHeight;

  if (end <= start) {
    return scrollY >= start ? 100 : 0;
  }

  const rawProgress = ((scrollY - start) / (end - start)) * 100;

  return Math.round(clamp(rawProgress, 0, 100));
}
