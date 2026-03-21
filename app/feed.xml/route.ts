import { getAllPosts } from "@/lib/content";
import { buildFeedXml } from "@/lib/feed";

export const revalidate = 3600;

export function GET() {
  const xml = buildFeedXml(getAllPosts());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}