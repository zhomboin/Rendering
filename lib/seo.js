const SITE_ORIGIN = "https://rendering.me";
const SITE_NAME = "Rendering";
const SITE_DESCRIPTION = "A playful personal blog about frontend systems, reading experience, motion, and design engineering.";
const AUTHOR_NAME = "Rendering Author";

export function getCanonicalUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}

export function buildSiteJsonLd() {
  return {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: getCanonicalUrl("/")
    },
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR_NAME,
      url: getCanonicalUrl("/about"),
      description: SITE_DESCRIPTION
    }
  };
}

export function buildArticleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getCanonicalUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    keywords: Array.isArray(post.tags) ? post.tags : [],
    timeRequired: post.readingTime,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: getCanonicalUrl("/about")
    },
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`)
  };
}

export function buildTagArchiveJsonLd(tag, posts = []) {
  const normalizedPosts = Array.isArray(posts) ? posts.filter(Boolean) : [];
  const articleLabel = `${normalizedPosts.length} article${normalizedPosts.length === 1 ? "" : "s"}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${tag.name} articles`,
    description: `Explore ${articleLabel} on Rendering filed under ${tag.name}.`,
    url: getCanonicalUrl(`/tags/${tag.slug}`),
    isPartOf: getCanonicalUrl("/tags"),
    about: {
      "@type": "Thing",
      name: tag.name
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: normalizedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCanonicalUrl(`/blog/${post.slug}`),
        name: post.title
      }))
    }
  };
}

export function buildSitemapEntries(posts = [], tags = []) {
  const staticEntries = ["/", "/blog", "/tags", "/about"].map((path) => ({
    url: getCanonicalUrl(path),
    lastModified: undefined
  }));

  const tagEntries = (Array.isArray(tags) ? tags : [])
    .filter(Boolean)
    .map((tag) => {
      const slug = typeof tag === "string" ? tag : tag.slug;
      const lastModified = typeof tag === "string" ? undefined : tag.lastModified;

      return {
        url: getCanonicalUrl(`/tags/${slug}`),
        lastModified
      };
    });

  const articleEntries = (Array.isArray(posts) ? posts : []).map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: post.publishedAt
  }));

  return [...staticEntries, ...tagEntries, ...articleEntries];
}

export const seoConfig = {
  authorName: AUTHOR_NAME,
  origin: SITE_ORIGIN,
  siteDescription: SITE_DESCRIPTION,
  siteName: SITE_NAME
};