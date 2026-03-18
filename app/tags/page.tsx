import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getPostsByTag, getTagSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse Rendering by topic clusters, tag counts, and entry points into the current technical writing archive.",
  alternates: { canonical: "/tags" },
  openGraph: {
    title: "Rendering Tags",
    description: "Browse Rendering by topic clusters, tag counts, and entry points into the current technical writing archive.",
    url: "/tags"
  },
  twitter: {
    title: "Rendering Tags",
    description: "Browse Rendering by topic clusters, tag counts, and entry points into the current technical writing archive."
  }
};

export default function TagsPage() {
  const tags = getTagSummaries();

  return (
    <>
      <section className="section-band">
        <div className="section-kicker">Tag Matrix</div>
        <h1 className="page-title">Topic signals and archive density</h1>
        <p className="page-copy">Tags are presented as an active routing surface for the archive, not a leftover taxonomy list.</p>
      </section>

      <section className="section">
        <SectionHeading kicker="Signal Groups" title="Browse by cluster" copy="Every tag card exposes article counts and entry points into the current archive." />
        <div className="tag-grid">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag.slug);
            return (
              <article className="panel tag-card" id={tag.slug} key={tag.slug}>
                <div className="meta-label">{tag.count} articles</div>
                <h2 className="card-title">{tag.name}</h2>
                <p className="metric-detail">{posts[0]?.excerpt ?? "Signal not yet expanded."}</p>
                {posts[0] ? (
                  <div className="section" style={{ marginTop: 14 }}>
                    <Link className="button-link" href={`/blog/${posts[0].slug}`}>
                      Open {posts[0].title}
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
