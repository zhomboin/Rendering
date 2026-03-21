function normalizeTagQuery(tagParam) {
  const rawTag = Array.isArray(tagParam) ? tagParam[0] : tagParam;

  if (typeof rawTag !== "string") {
    return "";
  }

  try {
    return decodeURIComponent(rawTag).trim().toLowerCase();
  } catch {
    return rawTag.trim().toLowerCase();
  }
}

export function resolveTagFilter(tagParam, tags = []) {
  const requestedSlug = normalizeTagQuery(tagParam);
  const activeTag = requestedSlug ? tags.find((tag) => tag.slug === requestedSlug) ?? null : null;

  return {
    activeTag,
    hasRequestedTag: requestedSlug.length > 0,
    requestedSlug
  };
}

export function buildTagFilterLinks(tags = [], activeSlug = "") {
  const normalizedTags = Array.isArray(tags) ? tags.filter(Boolean) : [];

  return normalizedTags.map((tag) => ({
    ...tag,
    href: `/blog?tag=${encodeURIComponent(tag.slug)}`,
    isActive: tag.slug === activeSlug
  }));
}