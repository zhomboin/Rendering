import { getTagsPageMetadata, TagsPageContent } from "@/components/pages/tags-page";

export const metadata = getTagsPageMetadata("en");

export default function EnglishTagsPage() {
  return <TagsPageContent locale="en" />;
}