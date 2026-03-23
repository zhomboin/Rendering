import assert from "node:assert/strict";
import {
  getAdjacentPosts,
  getAllPosts,
  getAllTagSlugs,
  getPostBySlug,
  getTagSummaries,
  getTagSummaryBySlug,
  validatePostMetadata
} from "./content.js";
import { buildPostTemplate, normalizePostSlug } from "./post-template.js";

const allPosts = getAllPosts();
assert.ok(allPosts.length >= 4, "public posts should be loaded from content files");
assert.equal(
  allPosts[0].publishedAt >= allPosts[1].publishedAt,
  true,
  "posts should be sorted by published date descending"
);
assert.equal(
  allPosts.some((post) => post.slug === "draft-system-notes"),
  false,
  "draft posts should not appear in public results"
);

assert.throws(
  () => validatePostMetadata({ description: "Missing title", publishedAt: "2026-03-21", tags: ["database"] }, "missing-title"),
  /title/i,
  "missing titles should be rejected"
);

assert.throws(
  () => validatePostMetadata({ title: "Broken date", description: "Bad date", publishedAt: "yesterday", tags: ["database"] }, "bad-date"),
  /publishedAt/i,
  "invalid publishedAt values should be rejected"
);

assert.deepEqual(
  validatePostMetadata(
    {
      title: "  Valid Post  ",
      description: "  Helpful description.  ",
      publishedAt: "2026-03-21",
      tags: ["database", " systems "]
    },
    "valid-post"
  ),
  {
    title: "Valid Post",
    description: "Helpful description.",
    publishedAt: "2026-03-21",
    tags: ["database", "systems"],
    draft: false
  },
  "valid metadata should be normalized into the current content contract"
);

const targetPost = await getPostBySlug("designing-a-terminal-first-blog");
assert.equal(
  targetPost?.metadata.title,
  "Designing a Terminal-First Blog Experience",
  "slug lookup should resolve the expected MDX article"
);

const adjacentPosts = getAdjacentPosts("motion-without-noise");
assert.equal(
  adjacentPosts.previous?.slug,
  "designing-a-terminal-first-blog",
  "previous post should match published-order navigation"
);
assert.equal(
  adjacentPosts.next?.slug,
  "rendering-streams-and-reading-rhythm",
  "next post should match published-order navigation"
);

const tagSummaries = getTagSummaries();
const renderingTag = tagSummaries.find((tag) => tag.slug === "rendering");
assert.ok((renderingTag?.count ?? 0) > 0, "rendering tag should exist and aggregate counts");
assert.deepEqual(
  getAllTagSlugs(),
  tagSummaries.map((tag) => tag.slug),
  "tag slugs should reuse the canonical public tag ordering"
);
assert.equal(
  getTagSummaryBySlug("design")?.count,
  2,
  "tag lookup should resolve an existing public tag summary"
);
assert.equal(getTagSummaryBySlug("missing-tag"), null, "unknown tags should resolve to null");

assert.equal(normalizePostSlug(" Redis Sentinel Guide "), "redis-sentinel-guide", "slugs should be trimmed and kebab-cased");
assert.equal(normalizePostSlug("mysql_mvcc notes"), "mysql-mvcc-notes", "underscores and spaces should normalize into hyphens");

const template = buildPostTemplate({
  slug: "redis-sentinel-guide",
  publishedAt: "2026-03-21",
  tags: ["database", "systems"]
});

assert.match(template, /^---/, "templates should start with frontmatter");
assert.match(template, /title: "Redis Sentinel Guide"/, "the default title should be inferred from the slug");
assert.match(template, /publishedAt: "2026-03-21"/, "the published date should be injected into frontmatter");
assert.match(template, /tags:\n  - database\n  - systems/, "provided tags should be rendered in the template");
assert.match(template, /draft: true/, "newly scaffolded posts should default to draft mode");
assert.match(template, /## Why this matters/, "the template should include an editorial body scaffold");

console.log("content repository assertions passed");