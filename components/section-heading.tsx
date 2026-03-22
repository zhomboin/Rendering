function hasText(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

export function SectionHeading({
  kicker,
  title,
  copy
}: {
  kicker?: string;
  title?: string;
  copy?: string;
}) {
  if (!hasText(kicker) && !hasText(title) && !hasText(copy)) {
    return null;
  }

  return (
    <div className="section-heading">
      {hasText(kicker) ? <div className="section-kicker">{kicker}</div> : null}
      {hasText(title) ? <h2 className="section-title">{title}</h2> : null}
      {hasText(copy) ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}