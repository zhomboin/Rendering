import assert from "node:assert/strict";
import { buildTagShowcase, splitArchivePosts } from "./archive-layout.js";

const posts = [
  { slug: "one", title: "One", excerpt: "First" },
  { slug: "two", title: "Two", excerpt: "Second" },
  { slug: "three", title: "Three", excerpt: "Third" },
  { slug: "four", title: "Four", excerpt: "Fourth" }
];

const split = splitArchivePosts(posts, 2);
assert.deepEqual(split.featured.map((post) => post.slug), ["one", "two"]);
assert.deepEqual(split.archive.map((post) => post.slug), ["three", "four"]);

const overflowSplit = splitArchivePosts(posts, 8);
assert.equal(overflowSplit.featured.length, 4);
assert.equal(overflowSplit.archive.length, 0);

const tags = [
  { name: "motion", slug: "motion", count: 2 },
  { name: "writing", slug: "writing", count: 1 },
  { name: "empty", slug: "empty", count: 0 }
];

const showcase = buildTagShowcase(tags, (slug) => {
  if (slug === "motion") {
    return [posts[1], posts[2]];
  }

  if (slug === "writing") {
    return [posts[3]];
  }

  return [];
});

assert.equal(showcase[0].spotlight, true);
assert.equal(showcase[1].spotlight, false);
assert.equal(showcase[0].leadPost?.slug, "two");
assert.equal(showcase[1].leadPost?.slug, "four");
assert.equal(showcase[2].leadPost, null);
assert.equal(showcase[2].leadExcerpt, "Signal not yet expanded.");
assert.equal(showcase[0].articleCountLabel, "2 articles");
assert.equal(showcase[1].articleCountLabel, "1 article");

console.log("archive layout assertions passed");