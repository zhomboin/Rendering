import { getHomePageMetadata, HomePageContent } from "@/components/pages/home-page";

export const metadata = getHomePageMetadata("zh");

export default function ChineseHomePage() {
  return <HomePageContent locale="zh" />;
}