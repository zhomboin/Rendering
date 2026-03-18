import Link from "next/link";

export function HeroPanel() {
  return (
    <section className="panel hero-panel">
      <div className="hero-kicker">Rendering // Public Frontend Prototype</div>
      <h1 className="hero-title">A cold terminal for unfinished ideas.</h1>
      <p className="hero-copy">
        页面在加载，思想也在成形，永远进行时。This prototype turns the blog into a readable signal console for long-form technical writing.
      </p>
      <div className="hero-actions section">
        <Link className="button-link" href="/blog">
          Enter Archive
        </Link>
        <Link className="button-link" href="/about">
          Read the System Note
        </Link>
      </div>
    </section>
  );
}

