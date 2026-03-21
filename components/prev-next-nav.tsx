import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getBlogPostPath } from "@/lib/site";

export function PrevNextNav({
  previous,
  next,
  locale = DEFAULT_LOCALE
}: {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  locale?: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <div className="prev-next">
      {previous ? (
        <Link className="card link-card" href={getBlogPostPath(normalizedLocale, previous.slug)}>
          <div className="meta-label">{messages.article.previous}</div>
          <h3 className="card-title">{previous.title}</h3>
        </Link>
      ) : (
        <div className="card link-card">
          <div className="meta-label">{messages.article.previous}</div>
          <p className="empty-copy">{messages.article.previousEmpty}</p>
        </div>
      )}
      {next ? (
        <Link className="card link-card" href={getBlogPostPath(normalizedLocale, next.slug)}>
          <div className="meta-label">{messages.article.next}</div>
          <h3 className="card-title">{next.title}</h3>
        </Link>
      ) : (
        <div className="card link-card">
          <div className="meta-label">{messages.article.next}</div>
          <p className="empty-copy">{messages.article.nextEmpty}</p>
        </div>
      )}
    </div>
  );
}