import { DEFAULT_LOCALE, getLocalizedPath, getMessages, normalizeLocale, SUPPORTED_LOCALES } from "./i18n.js";

const SITE_ORIGIN = "https://rendering.me";
const SITE_NAME = "Rendering";
const AUTHOR_NAME = "Rendering Author";

function createTagDescription(locale, tagName, count) {
  return normalizeLocale(locale) === "zh"
    ? `浏览 Rendering 中归入 ${tagName} 的 ${count} 篇文章。`
    : `Explore ${count} article${count === 1 ? "" : "s"} on Rendering filed under ${tagName}.`;
}

export function getCanonicalUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}

export function getSiteDescription(locale = DEFAULT_LOCALE) {
  return getMessages(locale).site.description;
}

export function buildSiteJsonLd(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      description: messages.site.description,
      url: getCanonicalUrl(getLocalizedPath("/", normalizedLocale))
    },
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR_NAME,
      url: getCanonicalUrl(getLocalizedPath("/about", normalizedLocale)),
      description: messages.site.description
    }
  };
}

export function buildArticleJsonLd(post, locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale);
  const articlePath = getLocalizedPath(`/blog/${post.slug}`, normalizedLocale);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getCanonicalUrl(articlePath),
    datePublished: post.publishedAt,
    keywords: Array.isArray(post.tags) ? post.tags : [],
    timeRequired: post.readingTime,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: getCanonicalUrl(getLocalizedPath("/about", normalizedLocale))
    },
    mainEntityOfPage: getCanonicalUrl(articlePath)
  };
}

export function buildTagArchiveJsonLd(tag, posts = [], locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPosts = Array.isArray(posts) ? posts.filter(Boolean) : [];

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: normalizeLocale(locale) === "zh" ? `${tag.name} 标签归档` : `${tag.name} articles`,
    description: createTagDescription(normalizedLocale, tag.name, normalizedPosts.length),
    url: getCanonicalUrl(getLocalizedPath(`/tags/${tag.slug}`, normalizedLocale)),
    isPartOf: getCanonicalUrl(getLocalizedPath("/tags", normalizedLocale)),
    about: {
      "@type": "Thing",
      name: tag.name
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: normalizedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCanonicalUrl(getLocalizedPath(`/blog/${post.slug}`, normalizedLocale)),
        name: post.title
      }))
    }
  };
}

export function buildSitemapEntries(posts = [], tags = []) {
  const staticPaths = ["/", "/blog", "/tags", "/about"];

  const staticEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: getCanonicalUrl(getLocalizedPath(path, locale)),
      lastModified: undefined
    }))
  );

  const tagEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    (Array.isArray(tags) ? tags : [])
      .filter(Boolean)
      .map((tag) => {
        const slug = typeof tag === "string" ? tag : tag.slug;
        const lastModified = typeof tag === "string" ? undefined : tag.lastModified;

        return {
          url: getCanonicalUrl(getLocalizedPath(`/tags/${slug}`, locale)),
          lastModified
        };
      })
  );

  const articleEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    (Array.isArray(posts) ? posts : []).map((post) => ({
      url: getCanonicalUrl(getLocalizedPath(`/blog/${post.slug}`, locale)),
      lastModified: post.publishedAt
    }))
  );

  return [...staticEntries, ...tagEntries, ...articleEntries];
}

export const seoConfig = {
  authorName: AUTHOR_NAME,
  origin: SITE_ORIGIN,
  siteDescription: getSiteDescription(DEFAULT_LOCALE),
  siteName: SITE_NAME
};