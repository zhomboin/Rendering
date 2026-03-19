import type { Metadata } from "next";
import "./globals.css";
import { SearchModal } from "@/components/search-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { THEME_STORAGE_KEY } from "@/lib/ui-state";

const themeInitScript = `(function(){try{var storedTheme=window.localStorage.getItem("${THEME_STORAGE_KEY}");var nextTheme=storedTheme==="dark"||storedTheme==="light"?storedTheme:"light";document.documentElement.dataset.theme=nextTheme;document.documentElement.style.colorScheme=nextTheme;}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://rendering.me"),
  title: {
    default: "Rendering",
    template: "%s | Rendering"
  },
  description: "A playful personal blog about frontend systems, reading experience, motion, and design engineering.",
  openGraph: {
    type: "website",
    siteName: "Rendering",
    locale: "zh_CN",
    title: "Rendering",
    description: "A playful personal blog about frontend systems, reading experience, motion, and design engineering."
  },
  twitter: {
    card: "summary_large_image",
    title: "Rendering",
    description: "A playful personal blog about frontend systems, reading experience, motion, and design engineering."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme="light" lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
