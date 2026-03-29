import { ReadingProgress } from "@/components/reading-progress";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";

export function TocPanel({
  sections,
  locale = DEFAULT_LOCALE,
  targetId
}: {
  sections: Array<{ id: string; heading: string }>;
  locale?: string;
  targetId: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <aside className="panel toc-panel">
      <ReadingProgress locale={normalizedLocale} targetId={targetId} />
      <div className="section-kicker">{messages.article.tocKicker}</div>
      <h2 className="toc-title">{messages.article.tocTitle}</h2>
      {sections.length ? (
        <ul className="toc-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a className="toc-link" href={`#${section.id}`}>
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-copy">{messages.article.tocEmpty}</p>
      )}
    </aside>
  );
}
