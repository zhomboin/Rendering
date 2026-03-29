"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type FilterLink = {
  count: number;
  href: string;
  isActive: boolean;
  name: string;
  slug: string;
};

function getFilterCopy(locale: string) {
  if (locale === "zh") {
    return {
      button: "\u6253\u5f00\u6807\u7b7e\u7b5b\u9009",
      close: "\u6536\u8d77",
      title: "\u6807\u7b7e\u7b5b\u9009"
    };
  }

  return {
    button: "Open tag filters",
    close: "Close",
    title: "Tag filters"
  };
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" className="archive-mobile-filter-icon" viewBox="0 0 24 24" fill="none">
      <path d="M4 7H20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M7 12H17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M10 17H14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function ArchiveMobileFilter({
  activeTagSlug,
  allEssaysLabel,
  allPostsCount,
  allPostsHref,
  filterLinks,
  locale
}: {
  activeTagSlug?: string;
  allEssaysLabel: string;
  allPostsCount: number;
  allPostsHref: string;
  filterLinks: FilterLink[];
  locale: string;
}) {
  const copy = getFilterCopy(locale);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeTagSlug]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const dialogId = `archive-mobile-filter-${locale}`;
  const buttonClassName = [
    "button-link",
    "button-link--secondary",
    "archive-mobile-filter-fab",
    open ? "archive-mobile-filter-fab--open" : "",
    activeTagSlug ? "archive-mobile-filter-fab--active" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const popoverClassName = [
    "archive-mobile-filter-popover",
    open ? "archive-mobile-filter-popover--open" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="archive-mobile-filter" data-pagefind-ignore ref={rootRef}>
      <button
        aria-controls={dialogId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={copy.button}
        className={buttonClassName}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <FilterIcon />
        {activeTagSlug ? <span aria-hidden="true" className="archive-mobile-filter-indicator" /> : null}
      </button>

      <div aria-label={copy.title} className={popoverClassName} id={dialogId} role="dialog">
        <div className="archive-mobile-filter-header">
          <div className="archive-mobile-filter-title">{copy.title}</div>
          <button className="archive-mobile-filter-close" onClick={() => setOpen(false)} type="button">
            {copy.close}
          </button>
        </div>

        <div className="archive-mobile-filter-list">
          <Link className={`tag-chip archive-filter-chip${activeTagSlug ? "" : " archive-filter-chip--active"}`} href={allPostsHref}>
            <span>{allEssaysLabel}</span>
            <span className="archive-filter-chip-count">{allPostsCount}</span>
          </Link>
          {filterLinks.map((tagLink) => (
            <Link
              className={`tag-chip archive-filter-chip${tagLink.isActive ? " archive-filter-chip--active" : ""}`}
              href={tagLink.href}
              key={tagLink.slug}
            >
              <span>{tagLink.name}</span>
              <span className="archive-filter-chip-count">{tagLink.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
