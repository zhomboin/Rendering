import assert from "node:assert/strict";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  getLocalizedPath,
  getOppositeLocale,
  normalizeLocale,
  stripLocalePrefix
} from "./i18n.js";
import {
  calculateReadingProgress,
  getPreferredTheme,
  getThemeToggleLabel,
  toggleTheme
} from "./ui-state.js";
import { buildBlogArchiveCopy, buildHomePageCopy } from "./page-copy.js";

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
    scrollY: 950,
    offset: 100
  }),
  50,
  "progress should calculate the midpoint between the reading start and the article bottom reaching the viewport"
);

assert.equal(
  calculateReadingProgress({
    articleTop: 500,
    articleHeight: 1800,
    viewportHeight: 800,
    scrollY: 1500,
    offset: 100
  }),
  100,
  "progress should reach 100 when the article bottom reaches the viewport bottom"
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

const posts = [
  {
    slug: "mysql-mvcc-read-view-explained",
    title: "MySQL MVCC 详解",
    publishedAt: "2026-03-21",
    tags: ["mysql", "database", "systems"]
  },
  {
    slug: "mysql-isolation-levels-in-practice",
    title: "数据库AICD特性之--隔离性 Isolation",
    publishedAt: "2026-03-20",
    tags: ["mysql", "database", "systems"]
  },
  {
    slug: "redis-sentinel-with-docker",
    title: "Redis 哨兵模式部署--docker版本",
    publishedAt: "2026-03-19",
    tags: ["redis", "servers", "docker"]
  }
];

const tags = [
  { name: "mysql", slug: "mysql", count: 2 },
  { name: "database", slug: "database", count: 2 },
  { name: "servers", slug: "servers", count: 1 },
  { name: "docker", slug: "docker", count: 1 }
];

const homeZh = buildHomePageCopy("zh", posts, tags);
assert.equal(
  homeZh.hero.copy,
  "当前公开归档已经收录 3 篇文章，最近更新于 2026-03-21，主题覆盖 mysql、database、servers。",
  "Chinese homepage hero copy should summarize real post count, latest date, and representative tags"
);
assert.deepEqual(
  homeZh.hero.badges,
  ["3 篇公开文章", "4 个主题标签", "最近更新 2026-03-21"],
  "Chinese homepage hero badges should reflect real archive facts"
);
assert.equal(homeZh.featured.title, "先从最新发布的 2 篇文章开始", "Chinese featured heading should depend on the real featured count");
assert.equal(homeZh.tags.title, "从 4 个主题切入当前 3 篇公开文章", "Chinese tag heading should use the real post and tag counts");

const homeEn = buildHomePageCopy("en", posts, tags);
assert.equal(
  homeEn.hero.copy,
  "The public archive currently includes 3 published posts, was most recently updated on 2026-03-21, and currently spans mysql, database, and servers.",
  "English homepage hero copy should summarize real post count, latest date, and representative tags"
);
assert.deepEqual(
  homeEn.hero.badges,
  ["3 published posts", "4 topic tags", "Updated 2026-03-21"],
  "English homepage hero badges should reflect real archive facts"
);

const blogZh = buildBlogArchiveCopy("zh", {
  allPosts: posts,
  visiblePosts: posts,
  tags,
  activeTag: null,
  featuredCount: 2,
  archiveCount: 1
});
assert.equal(blogZh.hero.title, "当前共 3 篇公开文章，可按 4 个主题筛选", "Chinese blog hero title should use real archive totals");
assert.equal(
  blogZh.filter.copy,
  "目前可用的主题包括 mysql、database、servers。",
  "Chinese filter copy should come from the real public tags"
);
assert.equal(blogZh.stack.title, "继续阅读其余 1 篇文章", "Chinese archive stack title should depend on the remaining real post count");

const blogEnFiltered = buildBlogArchiveCopy("en", {
  allPosts: posts,
  visiblePosts: posts.slice(0, 2),
  tags,
  activeTag: { name: "mysql", slug: "mysql", count: 2 },
  featuredCount: 1,
  archiveCount: 1
});
assert.equal(blogEnFiltered.hero.title, "Viewing 2 published posts filed under mysql", "English filtered hero should reflect the active tag and filtered count");
assert.equal(blogEnFiltered.filteredSummary.copy, "There are 2 published posts in mysql right now.", "English filtered summary should use the real filtered count");
assert.equal(blogEnFiltered.featured.title, "Start with the newest post in mysql", "English filtered featured title should follow the active tag");
assert.equal(blogEnFiltered.stack.title, "Continue with the remaining 1 post", "English filtered stack title should use the remaining filtered count");

const homeEmpty = buildHomePageCopy("zh", [], []);
assert.equal(
  homeEmpty.hero.copy,
  "公开归档还在准备中，等第一篇文章发布后，这里会自动显示真实的数量、时间和主题。",
  "Homepage should expose a readable empty-state fallback when no posts exist"
);
assert.deepEqual(homeEmpty.hero.badges, ["0 篇公开文章", "0 个主题标签", "等待首次发布"], "Empty homepage badges should still stay factual");

const blogEmpty = buildBlogArchiveCopy("en", {
  allPosts: [],
  visiblePosts: [],
  tags: [],
  activeTag: null,
  featuredCount: 0,
  archiveCount: 0
});
assert.equal(blogEmpty.hero.title, "The public archive is still warming up", "Blog archive should expose an English empty-state title when no posts exist");
assert.equal(
  blogEmpty.hero.copy,
  "Once the first post is published, this page will automatically reflect the real archive size, latest update, and usable topics.",
  "Blog archive should expose an English empty-state copy when no posts exist"
);

console.log("site state assertions passed");