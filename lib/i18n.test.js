import assert from "node:assert/strict";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  getLocalizedPath,
  getOppositeLocale,
  normalizeLocale,
  stripLocalePrefix
} from "./i18n.js";

assert.equal(DEFAULT_LOCALE, "zh", "Chinese should remain the default locale");
assert.equal(normalizeLocale("en"), "en", "supported locales should stay unchanged");
assert.equal(normalizeLocale("anything"), "zh", "unknown locales should fall back to Chinese");

assert.equal(getLocaleFromPathname("/"), "zh", "root routes should resolve to Chinese");
assert.equal(getLocaleFromPathname("/blog"), "zh", "default archive routes should resolve to Chinese");
assert.equal(getLocaleFromPathname("/en"), "en", "the /en root should resolve to English");
assert.equal(getLocaleFromPathname("/en/tags/design"), "en", "mirrored English routes should resolve to English");

assert.equal(stripLocalePrefix("/en"), "/", "stripping the English root should return the Chinese root path");
assert.equal(stripLocalePrefix("/en/blog"), "/blog", "stripping the English prefix should recover the default route path");
assert.equal(stripLocalePrefix("/tags/design"), "/tags/design", "default Chinese paths should stay unchanged when stripping locale prefixes");

assert.equal(getLocalizedPath("/blog", "zh"), "/blog", "Chinese paths should keep the default route shape");
assert.equal(getLocalizedPath("/blog", "en"), "/en/blog", "English paths should gain the /en prefix");
assert.equal(getLocalizedPath("/en/blog", "zh"), "/blog", "switching back to Chinese should drop the /en prefix");
assert.equal(getLocalizedPath("/en", "zh"), "/", "switching the English root back to Chinese should produce the root path");
assert.equal(getLocalizedPath("/tags/design", "en"), "/en/tags/design", "nested paths should mirror cleanly into English");

assert.equal(getOppositeLocale("zh"), "en", "the Chinese opposite locale should be English");
assert.equal(getOppositeLocale("en"), "zh", "the English opposite locale should be Chinese");

console.log("i18n assertions passed");