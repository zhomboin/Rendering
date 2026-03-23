"use client";

import { useState } from "react";
import Link from "next/link";
import { getBlogTagFilterPath } from "@/lib/site";

type TagSummary = {
  name: string;
  slug: string;
  count: number;
};

function getToggleAriaLabel(locale: string, expanded: boolean, hiddenCount: number) {
  if (locale === "zh") {
    return expanded ? "收起标签" : `展开更多标签${hiddenCount > 0 ? `（${hiddenCount}）` : ""}`;
  }

  return expanded ? "Show fewer tags" : `Show more tags${hiddenCount > 0 ? ` (${hiddenCount})` : ""}`;
}

function DoubleChevronIcon({ expanded }: { expanded: boolean }) {
  return expanded ? (
    <svg aria-hidden="true" className="home-tag-toggle-icon" viewBox="0 0 24 24" fill="none">
      <path d="M6 15L12 9L18 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <path d="M6 20L12 14L18 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="home-tag-toggle-icon" viewBox="0 0 24 24" fill="none">
      <path d="M6 4L12 10L18 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  );
}

export function HomeTagExplorer({
  locale,
  tags,
  topicLabel,
  countSuffix,
  collapsedCount = 6
}: {
  locale: string;
  tags: TagSummary[];
  topicLabel: string;
  countSuffix: string;
  collapsedCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleTags = expanded || tags.length <= collapsedCount ? tags : tags.slice(0, collapsedCount);
  const hiddenCount = Math.max(tags.length - collapsedCount, 0);
  const shouldCollapse = hiddenCount > 0;

  return (
    <div className="home-tag-explorer">
      <div className="tag-grid home-stagger home-stagger--tags">
        {visibleTags.map((tag) => (
          <Link className="panel tag-card tag-card--link" href={getBlogTagFilterPath(locale, tag.slug)} id={tag.slug} key={tag.slug}>
            <div className="meta-label">{topicLabel}</div>
            <h3 className="card-title">{tag.name}</h3>
            <p className="metric-detail">{`${tag.count} ${countSuffix}`}</p>
          </Link>
        ))}
      </div>

      {shouldCollapse ? (
        <div className="home-tag-actions">
          <button
            className="button-link button-link--secondary home-tag-toggle"
            type="button"
            aria-expanded={expanded}
            aria-label={getToggleAriaLabel(locale, expanded, hiddenCount)}
            onClick={() => setExpanded((value) => !value)}
          >
            <DoubleChevronIcon expanded={expanded} />
          </button>
        </div>
      ) : null}
    </div>
  );
}