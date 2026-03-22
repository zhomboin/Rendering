import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";

export function SiteFooter({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="inline-list">
          <span aria-hidden="true" className="status-dot" />
          <span className="footer-copy">{messages.footer.copy}</span>
        </div>
        <div className="footer-links">
          <Link className="nav-link" href={getLocalizedRoute(normalizedLocale, "/about")}>
            {messages.footer.about}
          </Link>
        </div>
      </div>
    </footer>
  );
}