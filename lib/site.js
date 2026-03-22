import { getLocalizedPath, getMessages, normalizeLocale } from "./i18n.js";

export function getLocalizedRoute(locale, pathname = "/") {
  return getLocalizedPath(pathname, locale);
}

export function getBlogPostPath(locale, slug) {
  return getLocalizedPath(`/blog/${slug}`, locale);
}

export function getBlogTagFilterPath(locale, slug) {
  return getLocalizedPath(`/blog?tag=${encodeURIComponent(slug)}`, locale);
}

export function getSiteNavigation(locale) {
  const messages = getMessages(locale);

  return [
    { href: getLocalizedRoute(locale, "/"), label: messages.navigation.home },
    { href: getLocalizedRoute(locale, "/blog"), label: messages.navigation.blog },
    { href: getLocalizedRoute(locale, "/about"), label: messages.navigation.about }
  ];
}

export function formatArticleCount(locale, count, noun = "article") {
  const normalizedLocale = normalizeLocale(locale);

  if (normalizedLocale === "zh") {
    return `${count} 篇文章`;
  }

  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}