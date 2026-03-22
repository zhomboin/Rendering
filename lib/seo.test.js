import assert from "node:assert/strict";
import {
  buildArticleJsonLd,
  buildSiteJsonLd,
  buildSitemapEntries,
  getArticleSocialImageUrl,
  getCanonicalUrl,
  getFeedUrl,
  getManifestUrl,
  getSiteSocialImageUrl
} from "./seo.js";

const zhSiteJsonLd = buildSiteJsonLd("zh");
assert.equal(zhSiteJsonLd.website["@type"], "WebSite", "site structured data should expose a WebSite node");
assert.equal(zhSiteJsonLd.person["@type"], "Person", "site structured data should expose a Person node");
assert.equal(zhSiteJsonLd.website.url, "https://rendering.me/", "Chinese site JSON-LD should use the root canonical URL");
assert.ok(zhSiteJsonLd.website.description.length > 0, "Chinese site JSON-LD should include a localized description");

const enSiteJsonLd = buildSiteJsonLd("en");
assert.equal(enSiteJsonLd.website.url, "https://rendering.me/en", "English site JSON-LD should point at the /en homepage");
assert.equal(
  enSiteJsonLd.person.url,
  "https://rendering.me/en/about",
  "English site JSON-LD should localize the author profile URL"
);

const articleJsonLd = buildArticleJsonLd(
  {
    slug: "motion-without-noise",
    title: "Motion Without Noise",
    description: "How to make animation feel alive without making it loud.",
    publishedAt: "2026-03-18",
    tags: ["motion", "ux"],
    readingTime: "4 min"
  },
  "en"
);
assert.equal(articleJsonLd["@type"], "BlogPosting", "article structured data should expose a BlogPosting node");
assert.equal(articleJsonLd.url, "https://rendering.me/en/blog/motion-without-noise", "article JSON-LD should point at the localized article canonical URL");
assert.deepEqual(articleJsonLd.keywords, ["motion", "ux"], "article JSON-LD should reuse article tags as keywords");

const sitemapEntries = buildSitemapEntries([
  { slug: "motion-without-noise", publishedAt: "2026-03-18" },
  { slug: "rendering-streams-and-reading-rhythm", publishedAt: "2026-03-20" }
]);
assert.deepEqual(
  sitemapEntries.map((entry) => entry.url),
  [
    "https://rendering.me/",
    "https://rendering.me/blog",
    "https://rendering.me/about",
    "https://rendering.me/en",
    "https://rendering.me/en/blog",
    "https://rendering.me/en/about",
    "https://rendering.me/blog/motion-without-noise",
    "https://rendering.me/blog/rendering-streams-and-reading-rhythm",
    "https://rendering.me/en/blog/motion-without-noise",
    "https://rendering.me/en/blog/rendering-streams-and-reading-rhythm"
  ],
  "sitemap entries should only include the public home, blog, about, and article routes in both locales"
);
assert.equal(getCanonicalUrl("/blog"), "https://rendering.me/blog", "canonical URLs should normalize against the site origin");
assert.equal(getFeedUrl(), "https://rendering.me/feed.xml", "feed URL helper should point at the RSS route");
assert.equal(getManifestUrl(), "https://rendering.me/manifest.webmanifest", "manifest URL helper should point at the web manifest");
assert.match(getSiteSocialImageUrl("zh"), /\/api\/og\?kind=site&locale=zh$/, "site social image should point at the localized OG endpoint");
assert.match(
  getArticleSocialImageUrl("en", {
    title: "Motion Without Noise",
    slug: "motion-without-noise",
    publishedAt: "2026-03-18",
    readingTime: "4 min"
  }),
  /\/api\/og\?kind=post&locale=en&title=Motion\+Without\+Noise&slug=motion-without-noise&meta=2026-03-18\+%C2%B7\+4\+min$/,
  "article social image should encode localized article metadata in the OG endpoint URL"
);

console.log("seo assertions passed");