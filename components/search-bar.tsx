import Link from "next/link";

export function SearchBar() {
  return (
    <div className="search-panel">
      <div className="section-kicker">Signal Search</div>
      <h2 className="section-title">Traverse the archive</h2>
      <p className="search-copy">
        This prototype keeps search presentation ready for Pagefind integration while the current archive is powered by local content.
      </p>
      <div className="section" style={{ marginTop: 18 }}>
        <input
          aria-label="Search articles"
          className="search-input"
          defaultValue="rendering, motion, reading systems"
          readOnly
        />
      </div>
      <div className="hero-actions" style={{ marginTop: 18 }}>
        <Link className="button-link" href="/blog">
          Open Blog Index
        </Link>
      </div>
    </div>
  );
}

