import { AboutPageContent, getAboutPageMetadata } from "@/components/pages/about-page";

export const metadata = getAboutPageMetadata("zh");

export default function ChineseAboutPage() {
  return <AboutPageContent locale="zh" />;
}