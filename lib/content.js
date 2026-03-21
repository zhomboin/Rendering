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

  if (parsed.metadata.draft) {
    return null;
  }

  const Content = await compileMdx(parsed.content);
  const summary = createSummaryFromParsed(slug, parsed.metadata, parsed.content);

  return {
    ...summary,
    metadata: summary,
    headings: parsed.headings,
    Content
  };
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
  const tags = Array.isArray(metadata.tags) ? metadata.tags : [];
  const publishedAt = normalizePublishedAt(metadata.publishedAt);

  return {
    slug,
    title: metadata.title,
    excerpt: metadata.description,
    description: metadata.description,
    publishedAt,
    tags,
    draft: Boolean(metadata.draft),
    coverLabel: formatCoverLabel(tags[0] ?? "signal"),
    readingTime: estimateReadingTime(content)
  };
}

function normalizePublishedAt(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
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