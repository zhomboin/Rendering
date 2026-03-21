import { BlogIndexPageContent, getBlogIndexPageMetadata } from "@/components/pages/blog-index-page";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  return getBlogIndexPageMetadata("en", await searchParams);
}

export default async function EnglishBlogIndexPage({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> }) {
  return <BlogIndexPageContent locale="en" searchParams={await searchParams} />;
}