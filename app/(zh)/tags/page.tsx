import { getTagsPageMetadata, TagsPageContent } from "@/components/pages/tags-page";

export const metadata = getTagsPageMetadata("zh");

export default function ChineseTagsPage() {
  return <TagsPageContent locale="zh" />;
}