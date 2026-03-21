import { enMessages } from "./messages/en.js";
import { zhMessages } from "./messages/zh.js";

export const SUPPORTED_LOCALES = ["zh", "en"];
export const DEFAULT_LOCALE = "zh";

const localeDictionary = {
  zh: zhMessages,
  en: enMessages
};

function ensureLeadingSlash(pathname) {
  if (typeof pathname !== "string" || pathname.length === 0) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function splitPathAndSuffix(pathname) {
  const normalized = ensureLeadingSlash(pathname);
  const match = normalized.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || ""
  };
}

export function normalizeLocale(locale) {
  return locale === "en" ? "en" : DEFAULT_LOCALE;
}

export function getMessages(locale) {
  return localeDictionary[normalizeLocale(locale)];
}

export function getLocaleDefinition(locale) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return {
    code: normalizedLocale,
    htmlLang: messages.locale.htmlLang,
    label: messages.locale.label,
    ogLocale: messages.locale.ogLocale,
    prefix: normalizedLocale === "en" ? "/en" : ""
  };
}

export function getLocaleFromPathname(pathname = "/") {
  const { pathname: normalizedPathname } = splitPathAndSuffix(pathname);

  return normalizedPathname === "/en" || normalizedPathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname = "/") {
  const { pathname: normalizedPathname, suffix } = splitPathAndSuffix(pathname);

  if (normalizedPathname === "/en") {
    return `/${suffix}`.replace(/\/([?#])/, "$1") || "/";
  }

  if (normalizedPathname.startsWith("/en/")) {
    return `${normalizedPathname.slice(3) || "/"}${suffix}`;
  }

  return `${normalizedPathname}${suffix}`;
}

export function getLocalizedPath(pathname = "/", locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale);
  const strippedPath = stripLocalePrefix(pathname);
  const { pathname: basePathname, suffix } = splitPathAndSuffix(strippedPath);

  if (normalizedLocale === "en") {
    return `${basePathname === "/" ? "/en" : `/en${basePathname}`}${suffix}`;
  }

  return `${basePathname}${suffix}`;
}

export function getOppositeLocale(locale) {
  return normalizeLocale(locale) === "en" ? DEFAULT_LOCALE : "en";
}

export function getLocalizedAlternates(pathname = "/") {
  const canonicalPath = stripLocalePrefix(pathname);

  return {
    "zh-CN": getLocalizedPath(canonicalPath, "zh"),
    en: getLocalizedPath(canonicalPath, "en"),
    "x-default": getLocalizedPath(canonicalPath, "zh")
  };
}

export function toRelativePath(url = "/") {
  if (typeof url !== "string" || url.length === 0) {
    return "/";
  }

  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url, "https://rendering.me");
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return ensureLeadingSlash(url);
  }
}

export function getSearchResultKey(url = "/") {
  return stripLocalePrefix(toRelativePath(url));
}

export function localizeSearchResultUrl(url = "/", locale = DEFAULT_LOCALE) {
  return getLocalizedPath(toRelativePath(url), locale);
}