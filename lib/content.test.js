import assert from "node:assert/strict";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getTagSummaries
} from "./content.js";

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

console.log("content repository assertions passed");
