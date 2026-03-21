import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getMessages } from "@/lib/i18n";
import { getSiteSocialImageUrl, getSocialImageSize } from "@/lib/seo";

const messages = getMessages("zh");
const socialImage = getSiteSocialImageUrl("zh");
const socialImageSize = getSocialImageSize();

export const metadata: Metadata = {
  title: {
    default: messages.site.name,
    template: `%s | ${messages.site.name}`
  },
  description: messages.site.description,
  openGraph: {
    type: "website",
    siteName: messages.site.name,
    locale: messages.locale.ogLocale,
    title: messages.site.name,
    description: messages.site.description,
    images: [
      {
        url: socialImage,
        ...socialImageSize,
        alt: `${messages.site.name} preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: messages.site.name,
    description: messages.site.description,
    images: [socialImage]
  }
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <LocaleShell locale="zh">{children}</LocaleShell>;
}