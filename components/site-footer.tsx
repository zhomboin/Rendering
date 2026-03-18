import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="inline-list">
          <span className="status-dot" aria-hidden="true" />
          <span className="footer-copy">Rendering public node active. Thoughts still forming.</span>
        </div>
        <div className="footer-links">
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/tags">
            Tags
          </Link>
        </div>
      </div>
    </footer>
  );
}

