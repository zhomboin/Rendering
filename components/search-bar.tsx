"use client";

import Link from "next/link";
import { SEARCH_OPEN_EVENT } from "@/lib/ui-state";

export function SearchBar() {
  return (
    <div className="search-panel">
      <div className="section-kicker">Search Playground</div>
      <h2 className="section-title">想找哪篇文章，点一下就开搜</h2>
      <p className="search-copy">
        搜索入口保持轻松一点，但真正的检索仍然接到 Pagefind。首页负责邀请你探索，结果页负责帮你快速抵达。
      </p>
      <div className="section" style={{ marginTop: 18 }}>
        <button
          aria-label="Search articles"
          className="search-input search-input-button"
          onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
          type="button"
        >
          试试搜索 “motion”、“reading” 或 “frontend”
        </button>
      </div>
      <div className="inline-list section" style={{ marginTop: 16 }}>
        <span className="meta-pill">Pagefind</span>
        <span className="meta-pill">MDX Archive</span>
        <span className="meta-pill">Ctrl/Cmd + K</span>
      </div>
      <div className="hero-actions" style={{ marginTop: 18 }}>
        <Link className="button-link button-link--secondary" href="/blog">
          Open Blog Index
        </Link>
      </div>
    </div>
  );
}
