import Link from "next/link";

export function PrevNextNav({
  previous,
  next
}: {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  return (
    <div className="prev-next">
      {previous ? (
        <Link className="card link-card" href={`/blog/${previous.slug}`}>
          <div className="meta-label">Previous</div>
          <h3 className="card-title">{previous.title}</h3>
        </Link>
      ) : (
        <div className="card link-card">
          <div className="meta-label">Previous</div>
          <p className="empty-copy">Start of the current visible archive.</p>
        </div>
      )}
      {next ? (
        <Link className="card link-card" href={`/blog/${next.slug}`}>
          <div className="meta-label">Next</div>
          <h3 className="card-title">{next.title}</h3>
        </Link>
      ) : (
        <div className="card link-card">
          <div className="meta-label">Next</div>
          <p className="empty-copy">Latest node reached.</p>
        </div>
      )}
    </div>
  );
}

