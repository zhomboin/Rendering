import assert from "node:assert/strict";
import {
  calculateReadingProgress,
  getPreferredTheme,
  getThemeToggleLabel,
  toggleTheme
} from "./ui-state.js";

assert.equal(getPreferredTheme(null, false), "light", "default theme should stay light when nothing is stored");
assert.equal(getPreferredTheme(null, true), "light", "missing preference should still default to light");
assert.equal(getPreferredTheme("dark", false), "dark", "stored dark theme should win");
assert.equal(getPreferredTheme("unexpected", true), "light", "invalid storage should fall back to light");
assert.equal(toggleTheme("light"), "dark", "toggle should move light to dark");
assert.equal(toggleTheme("dark"), "light", "toggle should move dark to light");
assert.equal(getThemeToggleLabel("light"), "切换到暗色", "light mode should prompt switching to dark");
assert.equal(getThemeToggleLabel("dark"), "切换到亮色", "dark mode should prompt switching to light");

assert.equal(
  calculateReadingProgress({
    articleTop: 500,
    articleHeight: 1800,
    viewportHeight: 800,
    scrollY: 0,
    offset: 100
  }),
  0,
  "progress should stay at 0 before the article starts"
);

assert.equal(
  calculateReadingProgress({
    articleTop: 500,
    articleHeight: 1800,
    viewportHeight: 800,
    scrollY: 1160,
    offset: 100
  }),
  50,
  "progress should calculate the midpoint through the article"
);

assert.equal(
  calculateReadingProgress({
    articleTop: 500,
    articleHeight: 1800,
    viewportHeight: 800,
    scrollY: 2600,
    offset: 100
  }),
  100,
  "progress should clamp to 100 after the article ends"
);

console.log("ui state assertions passed");
