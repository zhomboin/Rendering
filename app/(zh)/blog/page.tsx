import { BlogIndexPageContent, getBlogIndexPageMetadata } from "@/components/pages/blog-index-page";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  return getBlogIndexPageMetadata("zh", await searchParams);
}

export default async function ChineseBlogIndexPage({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  return <BlogIndexPageContent locale="zh" searchParams={await searchParams} />;
}