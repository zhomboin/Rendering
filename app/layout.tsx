import type { Metadata } from "next";
import "./globals.css";
import { SearchModal } from "@/components/search-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildSiteJsonLd, seoConfig } from "@/lib/seo";
import { THEME_STORAGE_KEY } from "@/lib/ui-state";

const themeInitScript = `(function(){try{var storedTheme=window.localStorage.getItem("${THEME_STORAGE_KEY}");var nextTheme=storedTheme==="dark"||storedTheme==="light"?storedTheme:"light";document.documentElement.dataset.theme=nextTheme;document.documentElement.style.colorScheme=nextTheme;}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.origin),
  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.siteName}`
  },
  description: seoConfig.siteDescription,
  openGraph: {
    type: "website",
    siteName: seoConfig.siteName,
    locale: "zh_CN",
    title: seoConfig.siteName,
    description: seoConfig.siteDescription
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName,
    description: seoConfig.siteDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteJsonLd = buildSiteJsonLd();

  return (
    <html data-theme="light" lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd.website) }} type="application/ld+json" />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd.person) }} type="application/ld+json" />
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