import { getHomePageMetadata, HomePageContent } from "@/components/pages/home-page";

export const metadata = getHomePageMetadata("en");

export default function EnglishHomePage() {
  return <HomePageContent locale="en" />;
}