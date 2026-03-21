import type { MetadataRoute } from "next";
import { getAllPosts, getAllTagSlugs } from "@/lib/content";
import { buildSitemapEntries } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(getAllPosts(), getAllTagSlugs()).map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined
  }));
}