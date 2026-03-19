export function TocPanel({
  sections
}: {
  sections: Array<{ id: string; heading: string }>;
}) {
  return (
    <aside className="panel toc-panel">
      <div className="section-kicker">Story Map</div>
      <h2 className="toc-title">On this page</h2>
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
        <p className="empty-copy">This article unfolds in one continuous section.</p>
      )}
    </aside>
  );
}
