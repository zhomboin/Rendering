import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { TagChip } from "@/components/tag-chip";

export function ArticleMeta({
  publishedAt,
  readingTime,
  tags,
  locale = DEFAULT_LOCALE
}: {
  publishedAt: string;
  readingTime: string;
  tags: string[];
  locale?: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <div className="article-meta">
      <div className="inline-list">
        <span className="meta-pill">{`${messages.article.publishedPrefix} ${publishedAt}`}</span>
        <span className="meta-pill">{readingTime}</span>
      </div>
      <div className="article-tags">
        {tags.map((tag) => (
          <TagChip key={tag} label={tag} locale={normalizedLocale} />
        ))}
      </div>
    </div>
  );
}