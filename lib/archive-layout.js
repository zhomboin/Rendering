export function splitArchivePosts(posts, featuredCount = 2) {
  const normalizedPosts = Array.isArray(posts) ? posts.filter(Boolean) : [];
  const safeFeaturedCount = Math.max(0, Math.min(featuredCount, normalizedPosts.length));

  return {
    featured: normalizedPosts.slice(0, safeFeaturedCount),
    archive: normalizedPosts.slice(safeFeaturedCount)
  };
}

export function buildTagShowcase(tags, getPostsByTag) {
  const normalizedTags = Array.isArray(tags) ? tags.filter(Boolean) : [];

  return normalizedTags.map((tag, index) => {
    const posts = typeof getPostsByTag === "function" ? getPostsByTag(tag.slug) : [];
    const leadPost = posts[0] ?? null;
    const articleCountLabel = `${tag.count} article${tag.count === 1 ? "" : "s"}`;

    return {
      ...tag,
      spotlight: index === 0,
      leadPost,
      leadExcerpt: leadPost?.excerpt ?? "Signal not yet expanded.",
      articleCountLabel
    };
  });
}