import { getAllTagSlugs } from "@/lib/content";
import { getTagArchivePageMetadata, TagArchivePageContent } from "@/components/pages/tag-archive-page";

export function generateStaticParams() {
  return getAllTagSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return getTagArchivePageMetadata("zh", slug);
}

export default async function ChineseTagArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TagArchivePageContent locale="zh" slug={slug} />;
}