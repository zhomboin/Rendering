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
  return theme === "dark" ? "切换到亮色" : "切换到暗色";
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
  const readableDistance = Math.max(safeHeight - viewportHeight * 0.35, 1);
  const rawProgress = ((scrollY - start) / readableDistance) * 100;

  return Math.round(clamp(rawProgress, 0, 100));
}
