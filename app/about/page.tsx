import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Rendering: a public workspace for technical writing about frontend systems, rendering, performance, and interface behavior.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rendering",
    description: "A public workspace for technical writing about frontend systems, rendering, performance, and interface behavior.",
    url: "/about"
  },
  twitter: {
    title: "About Rendering",
    description: "A public workspace for technical writing about frontend systems, rendering, performance, and interface behavior."
  }
};

export default function AboutPage() {
  return (
    <>
      <section className="section-band">
        <div className="section-kicker">System Note</div>
        <h1 className="page-title">A blog shaped like an instrument panel</h1>
        <p className="page-copy">
          Rendering is positioned as a public workspace for technical writing about frontend systems, design clarity, performance, and interface behavior.
        </p>
      </section>

      <section className="about-grid section">
        <article className="panel about-panel">
          <div className="section-kicker">Author Profile</div>
          <h2 className="section-title">Cold surfaces, warm intent</h2>
          <p className="about-copy">
            The front-end direction pairs a controlled cyber aesthetic with high reading comfort. The goal is not to cosplay a sci-fi dashboard; it is to make the archive feel tuned, current, and unmistakably technical.
          </p>
          <p className="about-copy">
            This prototype keeps the public shell deliberately close to the PRD so later MDX, search, analytics, and CMS integrations can plug into a structure that already feels finished.
          </p>
        </article>
        <div className="post-list">
          <article className="panel about-panel">
            <div className="section-kicker">Working Principles</div>
            <p className="metric-detail">Readable long-form surfaces</p>
            <p className="metric-detail">Disciplined motion and glow</p>
            <p className="metric-detail">Stable metadata and tag systems</p>
            <p className="metric-detail">Performance language expressed visually</p>
          </article>
          <article className="panel about-panel">
            <div className="section-kicker">External Channels</div>
            <div className="post-list">
              <Link className="button-link" href="/blog">
                Read archive
              </Link>
              <Link className="button-link" href="/tags">
                Explore tags
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
