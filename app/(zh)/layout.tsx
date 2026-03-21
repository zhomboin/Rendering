import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { getMessages } from "@/lib/i18n";

const messages = getMessages("zh");

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
    description: messages.site.description
  },
  twitter: {
    card: "summary_large_image",
    title: messages.site.name,
    description: messages.site.description
  }
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <LocaleShell locale="zh">{children}</LocaleShell>;
}