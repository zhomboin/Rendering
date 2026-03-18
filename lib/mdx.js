import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";

export function parseMdxSource(source) {
  const { content, data } = matter(source);
  return {
    content,
    metadata: data,
    headings: extractHeadings(content)
  };
}

export async function compileMdx(source) {
  const evaluated = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm]
  });

  return evaluated.default;
}

function extractHeadings(source) {
  const headings = [];
  const lines = source.split(/\r?\n/);
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(##)\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const heading = match[2].trim();
    headings.push({
      id: slugifyHeading(heading),
      heading
    });
  }

  return headings;
}

function slugifyHeading(value) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
