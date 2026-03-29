"use client";

import { useEffect, useState } from "react";

function getRssCopy(locale: string, copied: boolean) {
  if (locale === "zh") {
    return copied
      ? { label: "\u5df2\u590d\u5236", ariaLabel: "\u5df2\u590d\u5236 RSS \u8ba2\u9605\u5730\u5740" }
      : { label: "RSS \u8ba2\u9605", ariaLabel: "\u590d\u5236 RSS \u8ba2\u9605\u5730\u5740" };
  }

  return copied ? { label: "Copied", ariaLabel: "Copied RSS feed URL" } : { label: "RSS Feed", ariaLabel: "Copy RSS feed URL" };
}

function RssIcon() {
  return (
    <svg aria-hidden="true" className="footer-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="6.5" cy="17.5" fill="currentColor" r="1.85" />
      <path d="M5.2 11.2C8.83 11.2 11.8 14.17 11.8 17.8" stroke="currentColor" strokeLinecap="round" strokeWidth="2.15" />
      <path d="M5.2 6.2C11.61 6.2 16.8 11.39 16.8 17.8" stroke="currentColor" strokeLinecap="round" strokeWidth="2.15" />
    </svg>
  );
}

export function FooterRssButton({ feedUrl, locale }: { feedUrl: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const copy = getRssCopy(locale, copied);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = feedUrl;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  return (
    <button
      aria-label={copy.ariaLabel}
      className={
        copied ? "nav-link footer-icon-link footer-icon-link--copied" : "nav-link footer-icon-link"
      }
      data-tooltip={copy.label}
      onClick={handleCopy}
      type="button"
    >
      <RssIcon />
    </button>
  );
}
