import { getCanonicalUrl, getFeedUrl, seoConfig } from "./seo.js";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatPubDate(value) {
  const candidate = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value;
  const parsed = new Date(candidate);

  return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

export function buildFeedXml(posts = [], options = {}) {
  const normalizedPosts = Array.isArray(posts) ? posts.filter(Boolean) : [];
  const siteUrl = options.siteUrl ?? getCanonicalUrl("/");
  const feedUrl = options.feedUrl ?? getFeedUrl();
  const title = options.title ?? seoConfig.siteName;
  const description = options.description ?? seoConfig.siteDescription;
  const language = options.language ?? "zh-CN";
  const lastBuildDate = formatPubDate(normalizedPosts[0]?.publishedAt ?? new Date().toISOString());

  const items = normalizedPosts
    .map((post) => {
      const link = getCanonicalUrl(`/blog/${post.slug}`);
      const categories = (Array.isArray(post.tags) ? post.tags : [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid>${escapeXml(link)}</guid>`,
        `      <pubDate>${formatPubDate(post.publishedAt)}</pubDate>`,
        `      <description>${escapeXml(post.description ?? post.excerpt ?? "")}</description>`,
        categories,
        "    </item>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${escapeXml(siteUrl)}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${escapeXml(language)}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    items,
    "  </channel>",
    "</rss>"
  ]
    .filter(Boolean)
    .join("\n");
}