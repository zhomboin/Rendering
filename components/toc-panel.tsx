export function TocPanel({
  sections
}: {
  sections: Array<{ id: string; heading: string }>;
}) {
  return (
    <aside className="panel toc-panel">
      <div className="section-kicker">On This Page</div>
      <ul className="toc-list">
        {sections.map((section) => (
          <li key={section.id}>
            <a className="toc-link" href={`#${section.id}`}>
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

