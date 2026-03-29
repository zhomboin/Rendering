"use client";

import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { SEARCH_OPEN_EVENT } from "@/lib/ui-state";

export function SearchTrigger({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <button
      aria-controls="site-search-dialog"
      aria-haspopup="dialog"
      aria-label={messages.search.trigger}
      className="search-trigger"
      title={messages.search.trigger}
      onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
      type="button"
    >
      <span aria-hidden="true" className="search-trigger-icon">
        <svg fill="none" height="18" viewBox="0 0 18 18" width="18">
          <circle cx="8" cy="8" r="4.75" stroke="currentColor" strokeWidth="1.8" />
          <path d="M11.5 11.5L15.25 15.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      </span>
      <span className="search-trigger-label">{messages.search.trigger}</span>
      <span aria-hidden="true" className="search-shortcut">
        /
      </span>
    </button>
  );
}
