import type { Metadata } from "next";
import "./globals.css";
import { SearchModal } from "@/components/search-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://rendering.me"),
  title: {
    default: "Rendering",
    template: "%s | Rendering"
  },
  description: "Cold terminal cyber frontend for technical writing, rendering systems, and interface clarity.",
  openGraph: {
    type: "website",
    siteName: "Rendering",
    locale: "zh_CN",
    title: "Rendering",
    description: "Cold terminal cyber frontend for technical writing, rendering systems, and interface clarity."
  },
  twitter: {
    card: "summary_large_image",
    title: "Rendering",
    description: "Cold terminal cyber frontend for technical writing, rendering systems, and interface clarity."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="shell">
          <SiteHeader />
          <main data-pagefind-body>{children}</main>
          <SiteFooter />
          <SearchModal />
        </div>
      </body>
    </html>
  );
}
