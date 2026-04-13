
"use client";

import { useState } from "react";
import type { TocEntry } from "@/lib/content";

interface TableOfContentsProps {
  toc: TocEntry[];
  locale: string;
  messages: any; 
}

export function TableOfContents({ toc, locale, messages }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!toc || toc.length === 0) {
    return null;
  }

  const toggleToc = () => setIsOpen(!isOpen);
  const closeToc = () => setIsOpen(false);

  return (
    <div className="toc-mobile-container">
      <button
        className="toc-fab"
        onClick={toggleToc}
        aria-label={messages.article.toc}
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      </button>

      {isOpen && (
        <>
          <div className="toc-backdrop" onClick={closeToc}></div>
          <div className="toc-bottom-sheet">
            <div className="toc-header">
              <h3>{messages.article.toc}</h3>
              <button onClick={closeToc} aria-label={messages.site.closeAriaLabel}>&times;</button>
            </div>
            <nav aria-label="Table of Contents">
              <ul>
                {toc.map((entry) => (
                  <li key={entry.slug} style={{ paddingLeft: `${(entry.level - 1) * 16}px` }}>
                    <a href={`#${entry.slug}`} onClick={closeToc}>
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
