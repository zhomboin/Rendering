import { DEFAULT_LOCALE, getLocalizedPath, getMessages, normalizeLocale, SUPPORTED_LOCALES } from "./i18n.js";

const SITE_ORIGIN = "https://rendering.me";
const SITE_NAME = "Rendering";
const AUTHOR_NAME = "zhomboin";
const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630
};

function createTagDescription(locale, tagName, count) {
  return normalizeLocale(locale) === "zh"
    ? `浏览 Rendering 中归入 ${tagName} 的 ${count} 篇文章。`
    : `Explore ${count} article${count === 1 ? "" : "s"} on Rendering filed under ${tagName}.`;
}

function createTagArchiveTitle(locale, tagName) {
  return normalizeLocale(locale) === "zh" ? `${tagName} 标签归档` : `${tagName} articles`;
}

function buildSocialImageQuery(params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim()) {
      searchParams.set(key, value.trim());
    }
  }

  return searchParams.toString();
}

export function getCanonicalUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}

export function getFeedUrl() {
  return getCanonicalUrl("/feed.xml");
}

export function getManifestUrl() {
  return getCanonicalUrl("/manifest.webmanifest");
}

export function getSiteDescription(locale = DEFAULT_LOCALE) {
  return getMessages(locale).site.description;
}

export function getSocialImageSize() {
  return { ...SOCIAL_IMAGE_SIZE };
}

export function getSiteSocialImageUrl(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale);
  return getCanonicalUrl(`/api/og?${buildSocialImageQuery({ kind: "site", locale: normalizedLocale })}`);
}

export function getArticleSocialImageUrl(locale = DEFAULT_LOCALE, post = {}) {
  const normalizedLocale = normalizeLocale(locale);
  const meta = [post.publishedAt, post.readingTime].filter((value) => typeof value === "string" && value.trim()).join(" · ");

  return getCanonicalUrl(
    `/api/og?${buildSocialImageQuery({
      kind: "post",
      locale: normalizedLocale,
      title: post.title,
      slug: post.slug,
      meta
    })}`
  );
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
      url: getCanonicalUrl(getLocalizedPath("/", normalizedLocale)),
      image: getSiteSocialImageUrl(normalizedLocale)
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
    image: getArticleSocialImageUrl(normalizedLocale, post),
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
    name: createTagArchiveTitle(normalizedLocale, tag.name),
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

export function buildSitemapEntries(posts = []) {
  const staticPaths = ["/", "/blog", "/about"];

  const staticEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: getCanonicalUrl(getLocalizedPath(path, locale)),
      lastModified: undefined
    }))
  );

  const articleEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    (Array.isArray(posts) ? posts : []).map((post) => ({
      url: getCanonicalUrl(getLocalizedPath(`/blog/${post.slug}`, locale)),
      lastModified: post.publishedAt
    }))
  );

  return [...staticEntries, ...articleEntries];
}

export const seoConfig = {
  authorName: AUTHOR_NAME,
  feedUrl: getFeedUrl(),
  manifestUrl: getManifestUrl(),
  origin: SITE_ORIGIN,
  siteDescription: getSiteDescription(DEFAULT_LOCALE),
  siteName: SITE_NAME,
  socialImageSize: { ...SOCIAL_IMAGE_SIZE }
};