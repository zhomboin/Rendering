"use client";

import { Children, isValidElement, useEffect, useState, type HTMLAttributes, type ReactNode } from "react";

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Bash",
  conf: "Config",
  css: "CSS",
  html: "HTML",
  ini: "INI",
  java: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  md: "Markdown",
  markdown: "Markdown",
  plaintext: "Text",
  py: "Python",
  python: "Python",
  shell: "Shell",
  sh: "Shell",
  sql: "SQL",
  text: "Text",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
  yml: "YAML"
};

function getCopyLabel(locale: string, copied: boolean) {
  if (locale === "zh") {
    return copied ? "\u5df2\u590d\u5236" : "\u590d\u5236";
  }

  return copied ? "Copied" : "Copy";
}

function getLanguageFallback(locale: string) {
  return locale === "zh" ? "\u4ee3\u7801" : "Code";
}

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function extractCodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (!node) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractCodeText(child)).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractCodeText(node.props.children);
  }

  return "";
}

function findCodeElement(children: ReactNode) {
  return Children.toArray(children).find((child) => isValidElement(child) && child.type === "code") ?? null;
}

function getLanguageLabel(className: string | undefined, locale: string) {
  const token = className
    ?.split(/\s+/)
    .find((part) => part.startsWith("language-") || part.startsWith("lang-"))
    ?.replace(/^language-/, "")
    .replace(/^lang-/, "")
    .trim()
    .toLowerCase();

  if (!token) {
    return getLanguageFallback(locale);
  }

  return LANGUAGE_LABELS[token] ?? token.replace(/[-_]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg aria-hidden="true" className="article-code-copy-icon" fill="none" viewBox="0 0 20 20">
        <path d="M4.5 10.5L8 14L15.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="article-code-copy-icon" fill="none" viewBox="0 0 20 20">
      <rect height="9" rx="2.2" stroke="currentColor" strokeWidth="1.5" width="9" x="7" y="5" />
      <path d="M5 12.5H4.5C3.67157 12.5 3 11.8284 3 11V4.5C3 3.67157 3.67157 3 4.5 3H11C11.8284 3 12.5 3.67157 12.5 4.5V5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export function ArticleCodeBlock({
  children,
  className,
  locale = "zh",
  ...props
}: HTMLAttributes<HTMLPreElement> & { locale?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const codeElement = findCodeElement(children);
  const codeClassName = isValidElement<{ className?: string }>(codeElement) ? codeElement.props.className : undefined;
  const codeText = extractCodeText(isValidElement<{ children?: ReactNode }>(codeElement) ? codeElement.props.children : children).replace(/\n$/, "");
  const languageLabel = getLanguageLabel(codeClassName, locale);

  const handleCopy = async () => {
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
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
    <div className="article-code-frame">
      <div className="article-code-toolbar">
        <span className="article-code-language">{languageLabel}</span>
        <button aria-label={getCopyLabel(locale, copied)} className="article-code-copy" onClick={handleCopy} type="button">
          <CopyIcon copied={copied} />
          <span>{getCopyLabel(locale, copied)}</span>
        </button>
      </div>
      <pre className={mergeClassNames("article-code-block", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}
