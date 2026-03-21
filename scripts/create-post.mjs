import fs from "node:fs";
import path from "node:path";
import { buildPostTemplate, normalizePostSlug, normalizePostTags } from "../lib/post-template.js";

const slugInput = process.argv[2];
const tagsInput = process.argv[3] ?? "";

if (!slugInput) {
  console.error("Usage: npm run create-post -- <slug> [tag1,tag2]");
  process.exit(1);
}

const slug = normalizePostSlug(slugInput);
const tags = normalizePostTags(tagsInput.split(","));
const publishedAt = new Date().toISOString().slice(0, 10);
const filePath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${slug}`);
  process.exit(1);
}

const template = buildPostTemplate({
  slug,
  publishedAt,
  tags
});

fs.writeFileSync(filePath, template, "utf8");
console.log(`Created ${filePath}`);