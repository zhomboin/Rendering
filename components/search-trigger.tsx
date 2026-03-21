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
      className="search-trigger"
      onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
      type="button"
    >
      <span>{messages.search.trigger}</span>
      <span aria-hidden="true" className="search-shortcut">
        /
      </span>
    </button>
  );
}