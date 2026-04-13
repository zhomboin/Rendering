"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getMessages, normalizeLocale, stripLocalePrefix } from "@/lib/i18n";
import { getLocalizedRoute, getSiteNavigation } from "@/lib/site";
import { LanguageToggle } from "@/components/language-toggle";
import { SearchTrigger } from "@/components/search-trigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const navigation = getSiteNavigation(normalizedLocale);
  const pathname = usePathname() || getLocalizedRoute(normalizedLocale, "/");
  const currentPath = stripLocalePrefix(pathname);

  function isActiveNavigationItem(href: string) {
    const targetPath = stripLocalePrefix(href);

    if (targetPath === "/") {
      return currentPath === "/";
    }

    if (targetPath === "/blog") {
      return currentPath === "/blog" || currentPath.startsWith("/blog/");
    }

    return currentPath === targetPath;
  }

  return (
    <header className="site-header">
      <Link className="brand" href={getLocalizedRoute(normalizedLocale, "/")}>
        <Image src="/logo/icon.png" alt={messages.site.name} width={40} height={40} />
        <span className="brand-name">{messages.site.name}</span>
      </Link>

      <div className="header-controls">
        <nav aria-label="Primary" className="nav-links">
          {navigation.map((item) => {
            const isActive = isActiveNavigationItem(item.href);

            return (
              <Link
                key={item.href}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "nav-link nav-link--active" : "nav-link"}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <SearchTrigger locale={normalizedLocale} />
          <LanguageToggle locale={normalizedLocale} />
          <ThemeToggle locale={normalizedLocale} />
          <MobileNav locale={normalizedLocale} />
        </div>
      </div>
    </header>
  );
}
