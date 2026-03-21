import { getAllPostSlugs } from "@/lib/content";
import { BlogDetailPageContent, getBlogDetailPageMetadata } from "@/components/pages/blog-detail-page";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return getBlogDetailPageMetadata("en", slug);
}

export default async function EnglishBlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailPageContent locale="en" slug={slug} />;
}