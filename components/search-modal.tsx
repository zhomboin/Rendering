"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const OPEN_EVENT = "rendering:open-search";

export function SearchModal() {
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

    window.addEventListener(OPEN_EVENT, openFromEvent);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener(OPEN_EVENT, openFromEvent);
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
      setResults(loaded);
      setActiveIndex(0);
      setLoading(false);
    }, 160);

    return () => window.clearTimeout(id);
  }, [open, query]);

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
        aria-modal="true"
        className="search-modal"
        onClick={(event) => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
      >
        <div className="search-modal-header">
          <div>
            <div className="section-kicker">Global Search</div>
            <h2 className="search-modal-title">Search the Rendering archive</h2>
          </div>
          <button className="search-close" onClick={closeSearch} type="button">
            Esc
          </button>
        </div>

        <input
          aria-label="Search the archive"
          autoComplete="off"
          className="search-input search-modal-input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by topic, term, or phrase"
          ref={inputRef}
          value={query}
        />

        <div className="search-shortcuts">
          <span className="meta-pill">/ focus</span>
          <span className="meta-pill">Ctrl/Cmd + K open</span>
          <span className="meta-pill">↑ ↓ move</span>
          <span className="meta-pill">Enter open</span>
        </div>

        <div className="search-results" role="listbox">
          {!query ? <p className="empty-copy">Start typing to search across the live MDX archive.</p> : null}
          {loading ? <p className="empty-copy">Querying the Pagefind index...</p> : null}
          {!loading && query && !hasResults ? <p className="empty-copy">No matching signal found for this query.</p> : null}
          {!loading && hasResults
            ? results.map((result, index) => {
                const title = result.meta?.title || result.sub_results?.[0]?.title || result.url;
                const tags = result.meta?.tags;
                return (
                  <button
                    className={`search-result${index === activeIndex ? " is-active" : ""}`}
                    key={`${result.url}-${index}`}
                    onClick={() => window.location.assign(result.url)}
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
