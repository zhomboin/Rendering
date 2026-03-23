import assert from "node:assert/strict";
import { buildTagShowcase, splitArchivePosts } from "./archive-layout.js";
import { createGalleryModel, stepGalleryIndex } from "./article-media.js";
import { buildTagFilterLinks, resolveTagFilter } from "./tag-discovery.js";

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

const showcaseTags = [
  { name: "motion", slug: "motion", count: 2 },
  { name: "writing", slug: "writing", count: 1 },
  { name: "empty", slug: "empty", count: 0 }
];

const showcase = buildTagShowcase(showcaseTags, (slug) => {
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

const twoUpGallery = createGalleryModel([
  { src: "/images/blog/performance-rhythm-1.svg", alt: "Signal flow sketch", caption: "Signals first." },
  { src: "/images/blog/performance-rhythm-2.svg", caption: "Cadence second." },
  { alt: "Missing source should be ignored" }
]);

assert.equal(twoUpGallery.layout, "gallery--two", "two valid items should render as a two-up gallery");
assert.deepEqual(
  twoUpGallery.items,
  [
    {
      src: "/images/blog/performance-rhythm-1.svg",
      alt: "Signal flow sketch",
      caption: "Signals first."
    },
    {
      src: "/images/blog/performance-rhythm-2.svg",
      alt: "Gallery image 2",
      caption: "Cadence second."
    }
  ],
  "gallery items should normalize alt text, captions, and drop invalid entries"
);

const threeUpGallery = createGalleryModel([
  { src: "/images/blog/performance-rhythm-1.svg" },
  { src: "/images/blog/performance-rhythm-2.svg" },
  { src: "/images/blog/performance-rhythm-3.svg" }
]);

assert.equal(threeUpGallery.layout, "gallery--three", "three items should render as a three-up gallery");
assert.equal(threeUpGallery.items[2].alt, "Gallery image 3", "fallback alt text should use the normalized index");

const singleFigure = createGalleryModel([{ src: "/images/blog/performance-rhythm-hero.svg", alt: "Hero figure" }]);
assert.equal(singleFigure.layout, "gallery--single", "one item should stay in single-column mode");

assert.equal(stepGalleryIndex(0, 1, 3), 1, "next should move forward by one slot");
assert.equal(stepGalleryIndex(2, 1, 3), 0, "next should wrap from the last image to the first");
assert.equal(stepGalleryIndex(0, -1, 3), 2, "previous should wrap from the first image to the last");
assert.equal(stepGalleryIndex(6, -2, 4), 0, "navigation should normalize an out-of-range current index before stepping");
assert.equal(stepGalleryIndex(0, 1, 0), null, "empty galleries should not produce a navigation index");

const tagFilters = [
  { name: "design", slug: "design", count: 2 },
  { name: "ux", slug: "ux", count: 1 },
  { name: "rendering", slug: "rendering", count: 3 }
];

const activeFilter = resolveTagFilter("DESIGN", tagFilters);
assert.equal(activeFilter.activeTag?.slug, "design", "tag filters should be case-insensitive");
assert.equal(activeFilter.hasRequestedTag, true, "tag filters should remember that a request was made");

const arrayFilter = resolveTagFilter(["ux", "design"], tagFilters);
assert.equal(arrayFilter.activeTag?.slug, "ux", "tag filters should use the first tag when multiple values are provided");

const missingFilter = resolveTagFilter("missing-tag", tagFilters);
assert.equal(missingFilter.activeTag, null, "unknown tag filters should resolve to null");
assert.equal(missingFilter.requestedSlug, "missing-tag", "unknown tag filters should keep the requested slug");

const filterLinks = buildTagFilterLinks(tagFilters, "ux");
assert.equal(filterLinks[0].href, "/blog?tag=design", "tag filter links should point at the blog archive query route");
assert.equal(filterLinks[1].isActive, true, "the active tag chip should be marked in the generated model");
assert.equal(filterLinks[2].isActive, false, "inactive tag chips should stay inactive");

console.log("archive model assertions passed");