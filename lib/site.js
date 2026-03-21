import { getLocalizedPath, getMessages, normalizeLocale } from "./i18n.js";

function padMetricValue(value) {
  return String(value).padStart(2, "0");
}

export function getLocalizedRoute(locale, pathname = "/") {
  return getLocalizedPath(pathname, locale);
}

export function getBlogPostPath(locale, slug) {
  return getLocalizedPath(`/blog/${slug}`, locale);
}

export function getTagArchivePath(locale, slug) {
  return getLocalizedPath(`/tags/${slug}`, locale);
}

export function getSiteNavigation(locale) {
  const messages = getMessages(locale);

  return [
    { href: getLocalizedRoute(locale, "/"), label: messages.navigation.home },
    { href: getLocalizedRoute(locale, "/blog"), label: messages.navigation.blog },
    { href: getLocalizedRoute(locale, "/tags"), label: messages.navigation.tags },
    { href: getLocalizedRoute(locale, "/about"), label: messages.navigation.about }
  ];
}

export function getSiteMetrics(locale, { postCount, tagCount }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const homeMetrics = messages.home.metrics;

  return [
    {
      label: homeMetrics.articles.label,
      value: padMetricValue(postCount),
      detail: homeMetrics.articles.detail
    },
    {
      label: homeMetrics.tags.label,
      value: padMetricValue(tagCount),
      detail: homeMetrics.tags.detail
    },
    {
      label: homeMetrics.themes.label,
      value: homeMetrics.themes.value,
      detail: homeMetrics.themes.detail
    },
    {
      label: homeMetrics.progress.label,
      value: homeMetrics.progress.value,
      detail: homeMetrics.progress.detail
    }
  ];
}

export function formatArticleCount(locale, count, noun = "article") {
  const normalizedLocale = normalizeLocale(locale);

  if (normalizedLocale === "zh") {
    return `${count} 篇文章`;
  }

  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}