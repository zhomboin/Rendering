import assert from "node:assert/strict";
import { buildBlogArchiveCopy, buildHomePageCopy } from "./page-copy.js";

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

console.log("page copy assertions passed");
