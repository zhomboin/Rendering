export function MetricPanel({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="panel metric-card">
      <div className="metric-top">
        <div className="meta-label">{label}</div>
        <span aria-hidden="true" className="metric-dot" />
      </div>
      <div className="metric-value">{value}</div>
      <p className="metric-detail">{detail}</p>
    </article>
  );
}
