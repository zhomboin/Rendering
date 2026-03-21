import assert from "node:assert/strict";
import {
  buildArticleJsonLd,
  buildSiteJsonLd,
  buildSitemapEntries,
  buildTagArchiveJsonLd,
  getCanonicalUrl
} from "./seo.js";

const siteJsonLd = buildSiteJsonLd();
assert.equal(siteJsonLd.website["@type"], "WebSite", "site structured data should expose a WebSite node");
assert.equal(siteJsonLd.person["@type"], "Person", "site structured data should expose a Person node");
assert.equal(siteJsonLd.website.url, "https://rendering.me/", "website JSON-LD should use the canonical site URL");

const articleJsonLd = buildArticleJsonLd({
  slug: "motion-without-noise",
  title: "Motion Without Noise",
  description: "How to make animation feel alive without making it loud.",
  publishedAt: "2026-03-18",
  tags: ["motion", "ux"],
  readingTime: "4 min"
});
assert.equal(articleJsonLd["@type"], "BlogPosting", "article structured data should expose a BlogPosting node");
assert.equal(articleJsonLd.url, "https://rendering.me/blog/motion-without-noise", "article JSON-LD should point at the article canonical URL");
assert.deepEqual(articleJsonLd.keywords, ["motion", "ux"], "article JSON-LD should reuse article tags as keywords");

const tagJsonLd = buildTagArchiveJsonLd(
  { name: "design", slug: "design" },
  [
    { slug: "motion-without-noise", title: "Motion Without Noise" },
    { slug: "rendering-streams-and-reading-rhythm", title: "Rendering Streams and Reading Rhythm" }
  ]
);
assert.equal(tagJsonLd["@type"], "CollectionPage", "tag archives should expose a collection page structured data node");
assert.equal(tagJsonLd.url, "https://rendering.me/tags/design", "tag structured data should point at the tag archive canonical URL");
assert.equal(tagJsonLd.mainEntity.itemListElement.length, 2, "tag structured data should enumerate articles inside the tag archive");

const sitemapEntries = buildSitemapEntries(
  [
    { slug: "motion-without-noise", publishedAt: "2026-03-18" },
    { slug: "rendering-streams-and-reading-rhythm", publishedAt: "2026-03-20" }
  ],
  ["design", "ux"]
);
assert.deepEqual(
  sitemapEntries.map((entry) => entry.url),
  [
    "https://rendering.me/",
    "https://rendering.me/blog",
    "https://rendering.me/tags",
    "https://rendering.me/about",
    "https://rendering.me/tags/design",
    "https://rendering.me/tags/ux",
    "https://rendering.me/blog/motion-without-noise",
    "https://rendering.me/blog/rendering-streams-and-reading-rhythm"
  ],
  "sitemap entries should include public top-level pages, tag archives, and each article page"
);
assert.equal(getCanonicalUrl("/tags"), "https://rendering.me/tags", "canonical URLs should normalize against the site origin");

console.log("seo assertions passed");