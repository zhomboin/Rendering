import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase } from "@/lib/archive-layout";
import { getPostsByTag, getTagSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse Rendering by topic clusters, tag counts, and colorful entry points into the current blog archive.",
  alternates: { canonical: "/tags" },
  openGraph: {
    title: "Rendering Tags",
    description: "Browse Rendering by topic clusters, tag counts, and colorful entry points into the current blog archive.",
    url: "/tags"
  },
  twitter: {
    title: "Rendering Tags",
    description: "Browse Rendering by topic clusters, tag counts, and colorful entry points into the current blog archive."
  }
};

export default function TagsPage() {
  const tagShowcase = buildTagShowcase(getTagSummaries(), getPostsByTag);
  const spotlightTag = tagShowcase[0] ?? null;
  const remainingTags = tagShowcase.slice(1);

  return (
    <>
      <section className="section-band tag-map-band">
        <div className="section-kicker">Tag Candy Jar</div>
        <h1 className="page-title">Browse the archive through topic clusters.</h1>
        <p className="page-copy">
          The tag map is no longer just a count board. Every theme now opens into its own archive page, so you can share,
          revisit, and explore a topic without losing the playful shape of the blog.
        </p>
      </section>

      <section className="section">
        <SectionHeading
          kicker="Signal Groups"
          title="Start from the topic that feels most alive, then open its full archive."
          copy="Representative essays still help you get the vibe of a tag quickly, but the primary action now takes you into a dedicated tag archive built for deeper browsing."
        />

        {spotlightTag ? (
          <div className="tags-explorer-grid">
            <article className="panel tag-card tag-card--spotlight" id={spotlightTag.slug}>
              <div className="tag-card-top">
                <span className="meta-label">{spotlightTag.articleCountLabel}</span>
                <span className="meta-pill">Spotlight</span>
              </div>
              <h2 className="card-title">{spotlightTag.name}</h2>
              <p className="metric-detail tag-card-summary">
                The loudest topic gets the roomiest card so the page still has a clear place to begin. It acts like a front
                door into a stronger, shareable archive for that theme.
              </p>
              {spotlightTag.leadPost ? (
                <div className="tag-card-lead">
                  <span className="tag-card-lead-label">Representative read</span>
                  <Link className="tag-card-lead-link" href={`/blog/${spotlightTag.leadPost.slug}`}>
                    {spotlightTag.leadPost.title}
                  </Link>
                  <p className="metric-detail">{spotlightTag.leadExcerpt}</p>
                </div>
              ) : null}
              <div className="tag-card-footer section tag-card-links" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--primary" href={`/tags/${spotlightTag.slug}`}>
                  Open Tag Archive
                </Link>
                {spotlightTag.leadPost ? (
                  <Link className="button-link button-link--secondary" href={`/blog/${spotlightTag.leadPost.slug}`}>
                    Read Lead Article
                  </Link>
                ) : null}
              </div>
            </article>

            <div className="tag-grid tag-grid--showcase">
              {remainingTags.map((tag) => (
                <article className="panel tag-card tag-card--showcase" id={tag.slug} key={tag.slug}>
                  <div className="tag-card-top">
                    <span className="meta-label">{tag.articleCountLabel}</span>
                    {tag.leadPost ? <span className="meta-pill">Representative post</span> : null}
                  </div>
                  <h2 className="card-title">{tag.name}</h2>
                  <p className="metric-detail tag-card-summary">{tag.leadExcerpt}</p>
                  {tag.leadPost ? (
                    <Link className="tag-card-lead-link" href={`/blog/${tag.leadPost.slug}`}>
                      {tag.leadPost.title}
                    </Link>
                  ) : null}
                  <div className="tag-card-footer">
                    <Link className="button-link button-link--secondary" href={`/tags/${tag.slug}`}>
                      Open Archive
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}