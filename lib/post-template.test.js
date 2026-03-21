import assert from "node:assert/strict";
import { buildPostTemplate, normalizePostSlug } from "./post-template.js";

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

console.log("post template assertions passed");