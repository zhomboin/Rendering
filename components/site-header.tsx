import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute, getSiteNavigation } from "@/lib/site";
import { LanguageToggle } from "@/components/language-toggle";
import { SearchTrigger } from "@/components/search-trigger";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const navigation = getSiteNavigation(normalizedLocale);

  return (
    <header className="site-header">
      <Link className="brand" href={getLocalizedRoute(normalizedLocale, "/")}>
        <span className="brand-mark">{messages.site.brandMark}</span>
        <span className="brand-name">{messages.site.name}</span>
      </Link>

      <div className="header-controls">
        <nav aria-label="Primary" className="nav-links">
          {navigation.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <SearchTrigger locale={normalizedLocale} />
          <LanguageToggle locale={normalizedLocale} />
          <ThemeToggle locale={normalizedLocale} />
        </div>
      </div>
    </header>
  );
}