import type { Metadata } from "next";
import "./globals.css";
import { seoConfig } from "@/lib/seo";
import { THEME_STORAGE_KEY } from "@/lib/ui-state";

const documentInitScript = `(function(){try{var storedTheme=window.localStorage.getItem("${THEME_STORAGE_KEY}");var nextTheme=storedTheme==="dark"||storedTheme==="light"?storedTheme:"light";document.documentElement.dataset.theme=nextTheme;document.documentElement.style.colorScheme=nextTheme;var pathname=window.location.pathname||"/";document.documentElement.lang=pathname==="/en"||pathname.startsWith("/en/")?"en":"zh-CN";}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";document.documentElement.lang="zh-CN";}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.origin),
  applicationName: seoConfig.siteName,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo/icon.png",
    shortcut: "/logo/icon.png",
    apple: "/logo/icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme="light" lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: documentInitScript }} />
        {children}
      </body>
    </html>
  );
}
