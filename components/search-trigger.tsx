"use client";

import { SEARCH_OPEN_EVENT } from "@/lib/ui-state";

export function SearchTrigger() {
  return (
    <button
      className="search-trigger"
      onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
      type="button"
    >
      <span>Search</span>
      <span className="search-shortcut">/</span>
    </button>
  );
}
