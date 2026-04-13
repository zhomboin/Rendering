
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getMessages, normalizeLocale, stripLocalePrefix } from "@/lib/i18n";
import { getLocalizedRoute, getSiteNavigation } from "@/lib/site";

export function MobileNav({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const navigation = getSiteNavigation(normalizedLocale);
  const pathname = usePathname() || getLocalizedRoute(normalizedLocale, "/");
  const currentPath = stripLocalePrefix(pathname);

  const toggleMenu = () => setIsOpen(!isOpen);

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

  // Filter out the home link as per user request
  const mobileNavigation = navigation.filter(item => item.href !== getLocalizedRoute(normalizedLocale, "/"));

  return (
    <div className="mobile-nav">
      <button
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label={messages.site.mobileNavAriaLabel}
        aria-expanded={isOpen}
      >
        <span className="hamburger-icon" />
      </button>
      {isOpen && (
        <div className="mobile-menu">
          <nav aria-label="Primary mobile" className="mobile-nav-links">
            {mobileNavigation.map((item) => {
              const isActive = isActiveNavigationItem(item.href);
              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "mobile-nav-link mobile-nav-link--active" : "mobile-nav-link"}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
