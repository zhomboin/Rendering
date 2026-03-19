import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-bar">
        <div className="inline-list">
          <span aria-hidden="true" className="status-dot" />
          <span className="footer-copy">Playful mode is live. Bright on the outside, calm for reading inside.</span>
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
