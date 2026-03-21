function ensureNonEmpty(value, message) {
  if (!value) {
    throw new Error(message);
  }

  return value;
}

export function normalizePostSlug(input) {
  const slug = String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return ensureNonEmpty(slug, "A post slug is required");
}

export function inferPostTitle(slug) {
  return normalizePostSlug(slug)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizePostTags(tags = []) {
  const normalized = Array.isArray(tags)
    ? tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

  return normalized.length > 0 ? normalized : ["untagged"];
}

export function buildPostTemplate({
  slug,
  title = inferPostTitle(slug),
  description = "Write a one-sentence summary for the article.",
  publishedAt,
  tags = ["untagged"]
}) {
  const normalizedSlug = normalizePostSlug(slug);
  const normalizedTitle = ensureNonEmpty(String(title ?? "").trim(), `A title is required for ${normalizedSlug}`);
  const normalizedDescription = ensureNonEmpty(String(description ?? "").trim(), `A description is required for ${normalizedSlug}`);
  const normalizedPublishedAt = ensureNonEmpty(String(publishedAt ?? "").trim(), `A publishedAt date is required for ${normalizedSlug}`);
  const normalizedTags = normalizePostTags(tags);
  const renderedTags = normalizedTags.map((tag) => `  - ${tag}`).join("\n");

  return `---\ntitle: "${normalizedTitle}"\ndescription: "${normalizedDescription}"\npublishedAt: "${normalizedPublishedAt}"\ntags:\n${renderedTags}\ndraft: true\n---\n\n## Why this matters\n\nSet the stakes for the reader in 2-3 sentences. Explain the real problem, where it appears, and why it is worth understanding now.\n\n## What is happening\n\nBreak down the core idea in plain language before going deep into commands, code, or diagrams.\n\n## Walkthrough\n\nUse this section for the main technical explanation. Add subheadings, code blocks, figures, or shell output where they clarify the topic.\n\n## Practical checks\n\nList the verification steps, expected outcomes, and edge cases a reader should watch for.\n\n## Closing notes\n\nWrap with the key takeaway, tradeoffs, or the next thing the reader should try.\n`;
}