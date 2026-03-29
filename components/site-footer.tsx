import Link from "next/link";
import { FooterRssButton } from "@/components/footer-rss-button";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getFeedUrl } from "@/lib/seo";
import { getLocalizedRoute } from "@/lib/site";

const GITHUB_REPO_URL = "https://github.com/zhomboin/Rendering";

function getFooterFollowCopy() {
  return {
    github: "GitHub"
  };
}

function AboutIcon() {
  return (
    <svg aria-hidden="true" className="footer-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8.1" r="3.15" stroke="currentColor" strokeWidth="1.9" />
      <path d="M6.7 18.4C7.8 15.7 9.66 14.45 12 14.45C14.34 14.45 16.2 15.7 17.3 18.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="footer-icon" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3.2C7.14 3.2 3.2 7.16 3.2 12.04C3.2 15.95 5.73 19.26 9.24 20.43C9.68 20.52 9.84 20.24 9.84 20V18.43C7.4 18.97 6.89 17.39 6.89 17.39C6.49 16.35 5.9 16.08 5.9 16.08C5.09 15.52 5.96 15.53 5.96 15.53C6.86 15.59 7.34 16.46 7.34 16.46C8.13 17.82 9.42 17.43 9.95 17.2C10.03 16.62 10.26 16.22 10.51 15.99C8.56 15.77 6.51 15.01 6.51 11.6C6.51 10.63 6.85 9.84 7.43 9.22C7.34 8.99 7.04 8.05 7.52 6.78C7.52 6.78 8.27 6.54 9.82 7.59C10.54 7.39 11.31 7.29 12.08 7.29C12.85 7.29 13.62 7.39 14.35 7.59C15.89 6.54 16.63 6.78 16.63 6.78C17.12 8.05 16.82 8.99 16.73 9.22C17.32 9.84 17.66 10.63 17.66 11.6C17.66 15.02 15.61 15.77 13.66 15.98C13.98 16.25 14.26 16.77 14.26 17.57V20C14.26 20.25 14.42 20.53 14.87 20.43C18.38 19.26 20.9 15.95 20.9 12.04C20.9 7.16 16.96 3.2 12 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const followCopy = getFooterFollowCopy();
  const feedUrl = getFeedUrl();

  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="inline-list">
          <span aria-hidden="true" className="status-dot" />
          <span className="footer-copy">{messages.footer.copy}</span>
        </div>
        <div className="footer-links">
          <Link
            aria-label={messages.footer.about}
            className="nav-link footer-icon-link"
            data-tooltip={messages.footer.about}
            href={getLocalizedRoute(normalizedLocale, "/about")}
          >
            <AboutIcon />
          </Link>
          <a
            aria-label={followCopy.github}
            className="nav-link footer-icon-link"
            data-tooltip={followCopy.github}
            href={GITHUB_REPO_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon />
          </a>
          <FooterRssButton feedUrl={feedUrl} locale={normalizedLocale} />
        </div>
      </div>
    </footer>
  );
}
