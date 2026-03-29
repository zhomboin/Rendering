"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_LOCALE,
  getMessages,
  getSearchResultKey,
  localizeSearchResultUrl,
  normalizeLocale
} from "@/lib/i18n";
import { SEARCH_OPEN_EVENT } from "@/lib/ui-state";

type SearchResult = {
  url: string;
  excerpt: string;
  meta?: {
    title?: string;
    tags?: string;
  };
  sub_results?: Array<{
    url: string;
    title?: string;
    excerpt?: string;
  }>;
};

function dedupeAndLocalizeResults(results: SearchResult[], locale: string) {
  const seen = new Set<string>();

  return results.reduce<SearchResult[]>((accumulator, result) => {
    const key = getSearchResultKey(result.url);

    if (seen.has(key)) {
      return accumulator;
    }

    seen.add(key);
    accumulator.push({
      ...result,
      url: localizeSearchResultUrl(result.url, locale)
    });
    return accumulator;
  }, []);
}

export function SearchModal({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const pagefindRef = useRef<any>(null);
  const initPromiseRef = useRef<Promise<any> | null>(null);

  const hasResults = results.length > 0;
  const activeResult = useMemo(() => results[activeIndex] ?? null, [activeIndex, results]);
  const titleId = `site-search-title-${normalizedLocale}`;

  useEffect(() => {
    const openFromEvent = () => openSearch();

    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget = Boolean(
        target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
      );

      if (!open && !isTypingTarget && (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"))) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (!open) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        return;
      }

      if (event.key === "Enter" && activeResult) {
        event.preventDefault();
        window.location.assign(activeResult.url);
        return;
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    };

    window.addEventListener(SEARCH_OPEN_EVENT, openFromEvent);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener(SEARCH_OPEN_EVENT, openFromEvent);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeResult, open, results.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const id = window.setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const pagefind = await getPagefind();
      const search = await pagefind.search(query, { excerptLength: 18 });
      const loaded = await Promise.all(search.results.slice(0, 8).map((result: any) => result.data()));
      setResults(dedupeAndLocalizeResults(loaded, normalizedLocale));
      setActiveIndex(0);
      setLoading(false);
    }, 160);

    return () => window.clearTimeout(id);
  }, [normalizedLocale, open, query]);

  function getResultId(index: number) {
    return `site-search-result-${index}`;
  }

  function openSearch() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function closeSearch() {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
    lastFocusedRef.current?.focus();
  }

  async function getPagefind() {
    if (pagefindRef.current) {
      return pagefindRef.current;
    }

    if (!initPromiseRef.current) {
      const runtimeImport = new Function('return import("/pagefind/pagefind.js")') as () => Promise<any>;
      initPromiseRef.current = runtimeImport().then(async (pagefind) => {
        if (typeof pagefind.options === "function") {
          await pagefind.options({ bundlePath: "/pagefind/", baseUrl: "/" });
        }
        if (typeof pagefind.init === "function") {
          await pagefind.init();
        }
        pagefindRef.current = pagefind;
        return pagefind;
      });
    }

    return initPromiseRef.current;
  }

  function trapFocus(event: KeyboardEvent) {
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusables || focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div aria-hidden={!open} className="search-overlay" data-pagefind-ignore onClick={closeSearch}>
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="search-modal"
        id="site-search-dialog"
        onClick={(event) => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
      >
        <div className="search-modal-header">
          <div>
            <div className="section-kicker">{messages.search.globalKicker}</div>
            <h2 className="search-modal-title" id={titleId}>
              {messages.search.modalTitle}
            </h2>
          </div>
          <button aria-label={messages.search.modalClose} className="search-close" onClick={closeSearch} title={messages.search.modalClose} type="button">
            <svg aria-hidden="true" className="search-close-icon" viewBox="0 0 24 24" fill="none">
              <path d="M7 7L17 17" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M17 7L7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
            </svg>
          </button>
        </div>

        <input
          aria-label={messages.search.inputLabel}
          autoComplete="off"
          className="search-input search-modal-input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={messages.search.inputPlaceholder}
          ref={inputRef}
          value={query}
        />

        <div className="search-shortcuts-row">
          <span className="meta-pill">{messages.search.shortcuts.focus}</span>
          <span className="meta-pill">Ctrl/Cmd + K</span>
          <span className="meta-pill">{messages.search.shortcuts.move}</span>
          <span className="meta-pill">{messages.search.shortcuts.open}</span>
        </div>

        <div
          aria-activedescendant={hasResults ? getResultId(activeIndex) : undefined}
          className="search-results"
          role="listbox"
        >
          {!query ? <p className="empty-copy">{messages.search.emptyPrompt}</p> : null}
          {loading ? <p className="empty-copy">{messages.search.loading}</p> : null}
          {!loading && query && !hasResults ? <p className="empty-copy">{messages.search.noResults}</p> : null}
          {!loading && hasResults
            ? results.map((result, index) => {
                const title = result.meta?.title || result.sub_results?.[0]?.title || result.url;
                const tags = result.meta?.tags;
                return (
                  <button
                    aria-selected={index === activeIndex}
                    className={`search-result${index === activeIndex ? " is-active" : ""}`}
                    id={getResultId(index)}
                    key={`${result.url}-${index}`}
                    onClick={() => window.location.assign(result.url)}
                    role="option"
                    type="button"
                  >
                    <div className="search-result-header">
                      <span className="card-label">{result.url}</span>
                      {tags ? <span className="meta-pill">{tags}</span> : null}
                    </div>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-excerpt" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}