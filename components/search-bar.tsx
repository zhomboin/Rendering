"use client";

import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";
import { SEARCH_OPEN_EVENT } from "@/lib/ui-state";

export function SearchBar({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const search = messages.search;

  return (
    <div className="search-panel">
      <div className="section-kicker">{search.sectionKicker}</div>
      <h2 className="section-title">{search.title}</h2>
      <p className="search-copy">{search.copy}</p>
      <div className="section" style={{ marginTop: 18 }}>
        <button
          aria-label={search.inputLabel}
          className="search-input search-input-button"
          onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
          type="button"
        >
          {search.placeholderButton}
        </button>
      </div>
      <div className="inline-list section" style={{ marginTop: 16 }}>
        <span className="meta-pill">{search.pills.pagefind}</span>
        <span className="meta-pill">{search.pills.archive}</span>
        <span className="meta-pill">Ctrl/Cmd + K</span>
      </div>
      <div className="hero-actions" style={{ marginTop: 18 }}>
        <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
          {search.openBlogIndex}
        </Link>
      </div>
    </div>
  );
}