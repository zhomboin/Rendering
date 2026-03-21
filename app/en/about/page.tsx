import { AboutPageContent, getAboutPageMetadata } from "@/components/pages/about-page";

export const metadata = getAboutPageMetadata("en");

export default function EnglishAboutPage() {
  return <AboutPageContent locale="en" />;
}