import fs from "node:fs";
import path from "node:path";
import { compileMdx, parseMdxSource } from "./mdx.js";

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts() {
  return getAllPostFiles()
    .map((fileName) => createSummaryFromFile(fileName))
    .filter((post) => !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRecentPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getFeaturedPosts(limit = 2) {
  return getAllPosts().slice(0, limit);
}

export function getAllPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getTagSummaries() {
  const counts = new Map();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}


export function getAllTagSlugs() {
  return getTagSummaries().map((tag) => tag.slug);
}

export function getTagSummaryBySlug(tagSlug) {
  return getTagSummaries().find((tag) => tag.slug === tagSlug) ?? null;
}

export function getPostsByTag(tagSlug) {
  return getAllPosts().filter((post) => post.tags.includes(tagSlug));
}

export function getAdjacentPosts(slug) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null
  };
}

export async function getPostBySlug(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const parsed = parseMdxSource(source);
  const validatedMetadata = validatePostMetadata(parsed.metadata, slug);
  validatePostContent(parsed.content, slug);

  if (validatedMetadata.draft) {
    return null;
  }

  const Content = await compileMdx(parsed.content);
  const summary = createSummaryFromParsed(slug, validatedMetadata, parsed.content);

  return {
    ...summary,
    metadata: summary,
    headings: parsed.headings,
    Content
  };
}

export function validatePostMetadata(metadata = {}, slug = "unknown") {
  const title = normalizeRequiredString(metadata.title, "title", slug);
  const description = normalizeRequiredString(metadata.description, "description", slug);
  const publishedAt = normalizePublishedAt(metadata.publishedAt, slug);
  const tags = normalizeTags(metadata.tags);
  const draft = Boolean(metadata.draft);

  if (!draft && tags.length === 0) {
    throw new Error(`Post "${slug}" must define at least one tag`);
  }

  return {
    title,
    description,
    publishedAt,
    tags,
    draft
  };
}

export function validateAllPostFiles() {
  return getAllPostFiles().map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const source = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
    const parsed = parseMdxSource(source);
    validatePostContent(parsed.content, slug);

    return {
      slug,
      metadata: validatePostMetadata(parsed.metadata, slug)
    };
  });
}

export function validatePostContent(content = "", slug = "unknown") {
  const normalizedContent = typeof content === "string" ? content : "";
  const expectedPrefix = `/images/blog/${slug}/`;
  const localImageRefs = [
    ...normalizedContent.matchAll(/!\[[^\]]*]\((\/[^)\s]+\.(?:png|jpe?g|gif|webp|svg|avif))(?:\s+"[^"]*")?\)/gi),
    ...normalizedContent.matchAll(/\bsrc=["'](\/[^"']+\.(?:png|jpe?g|gif|webp|svg|avif))["']/gi)
  ].map((match) => match[1]);

  for (const imageRef of localImageRefs) {
    if (!imageRef.startsWith(expectedPrefix)) {
      throw new Error(`Post "${slug}" must store article images under "${expectedPrefix}"`);
    }
  }

  return true;
}

function getAllPostFiles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs.readdirSync(CONTENT_DIR).filter((fileName) => fileName.endsWith(".mdx"));
}

function createSummaryFromFile(fileName) {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const parsed = parseMdxSource(source);
  return createSummaryFromParsed(slug, parsed.metadata, parsed.content);
}

function createSummaryFromParsed(slug, metadata, content) {
  const validatedMetadata = validatePostMetadata(metadata, slug);
  const { title, description, publishedAt, tags, draft } = validatedMetadata;

  return {
    slug,
    title,
    excerpt: description,
    description,
    publishedAt,
    tags,
    draft,
    coverLabel: formatCoverLabel(tags[0] ?? "signal"),
    readingTime: estimateReadingTime(content)
  };
}

function normalizeRequiredString(value, fieldName, slug) {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized) {
    throw new Error(`Post "${slug}" is missing required field "${fieldName}"`);
  }

  return normalized;
}

function normalizePublishedAt(value, slug) {
  if (value === undefined || value === null || value === "") {
    throw new Error(`Post "${slug}" is missing required field "publishedAt"`);
  }

  const normalized = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized) || Number.isNaN(Date.parse(`${normalized}T00:00:00Z`))) {
    throw new Error(`Post "${slug}" has an invalid publishedAt value`);
  }

  return normalized;
}

function normalizeTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 160))} min`;
}

function formatCoverLabel(value) {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
