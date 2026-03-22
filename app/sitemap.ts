import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { buildSitemapEntries } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(getAllPosts()).map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined
  }));
}