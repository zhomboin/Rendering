import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase, splitArchivePosts } from "@/lib/archive-layout";
import { getAllTagSlugs, getPostsByTag, getTagSummaries, getTagSummaryBySlug } from "@/lib/content";
import { buildTagArchiveJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllTagSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagSummaryBySlug(slug);

  if (!tag) {
    return {
      title: "Tag Not Found"
    };
  }

  const description = `Browse ${tag.count} Rendering article${tag.count === 1 ? "" : "s"} filed under ${tag.name}.`;

  return {
    title: `${tag.name} tag archive`,
    description,
    alternates: { canonical: `/tags/${tag.slug}` },
    openGraph: {
      title: `${tag.name} tag archive`,
      description,
      url: `/tags/${tag.slug}`
    },
    twitter: {
      title: `${tag.name} tag archive`,
      description
    }
  };
}

export default async function TagArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = getTagSummaryBySlug(slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag.slug);
  const { featured, archive } = splitArchivePosts(posts, 1);
  const relatedTags = buildTagShowcase(
    getTagSummaries().filter((candidate) => candidate.slug !== tag.slug).slice(0, 4),
    getPostsByTag
  );
  const leadPost = posts[0] ?? null;
  const featuredGridClassName = ["archive-featured-grid", featured.length === 1 ? "archive-featured-grid--single" : ""]
    .filter(Boolean)
    .join(" ");
  const tagJsonLd = buildTagArchiveJsonLd(tag, posts);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(tagJsonLd) }} type="application/ld+json" />

      <section className="section-band tag-archive-band">
        <div className="section-kicker">Tag Archive</div>
        <h1 className="page-title">{tag.name}</h1>
        <p className="page-copy">
          This archive cluster gathers {tag.count} published article{tag.count === 1 ? "" : "s"} around {tag.name}. It is
          meant to be the clean, shareable entry point for this thread of the blog.
        </p>
        <div className="hero-actions section" style={{ marginTop: 18 }}>
          <Link className="button-link button-link--primary" href={`/blog?tag=${encodeURIComponent(tag.slug)}`}>
            Open Filtered Blog View
          </Link>
          <Link className="button-link button-link--secondary" href="/tags">
            Back to Tag Map
          </Link>
        </div>
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <article className="panel archive-guide">
              <div className="meta-label">Tag Snapshot</div>
              <h2 className="section-title">A tighter cluster of articles with one clear starting point.</h2>
              <p className="section-copy">
                Dedicated tag pages are for deeper browsing. They keep the archive playful, but make one theme feel more coherent,
                easier to share, and easier to revisit later.
              </p>
              <div className="archive-stats">
                <div className="archive-stat">
                  <span className="archive-stat-value">{posts.length}</span>
                  <span className="archive-stat-label">articles in this tag</span>
                </div>
                <div className="archive-stat">
                  <span className="archive-stat-value">{leadPost?.readingTime ?? "--"}</span>
                  <span className="archive-stat-label">lead reading time</span>
                </div>
              </div>
              {leadPost ? (
                <div className="tag-card-lead section">
                  <span className="tag-card-lead-label">Lead article</span>
                  <Link className="tag-card-lead-link" href={`/blog/${leadPost.slug}`}>
                    {leadPost.title}
                  </Link>
                  <p className="metric-detail">{leadPost.excerpt}</p>
                </div>
              ) : null}
            </article>

            {relatedTags.length ? (
              <article className="panel archive-signal-band">
                <div className="meta-label">Nearby Tags</div>
                <h2 className="section-title">Keep moving through adjacent topics.</h2>
                <div className="archive-signal-list">
                  {relatedTags.map((relatedTag) => (
                    <Link className="archive-signal-link" href={`/tags/${relatedTag.slug}`} key={relatedTag.slug}>
                      <span className="archive-signal-name">{relatedTag.name}</span>
                      <span className="archive-signal-meta">{relatedTag.articleCountLabel}</span>
                      <span className="archive-signal-lead">{relatedTag.leadPost?.title ?? "More writing is coming soon."}</span>
                    </Link>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </aside>

        <div className="archive-main">
          <SectionHeading
            kicker="Tag Spotlight"
            title={`Begin with the story that opens up ${tag.name}.`}
            copy="The first card acts like a strong editorial doorway. After that, the rest of the stack keeps the same theme going without losing reading rhythm."
          />
          <div className={featuredGridClassName}>
            {featured.map((post, index) => (
              <PostCard key={post.slug} post={post} spotlight={index === 0} variant="featured" />
            ))}
          </div>

          {archive.length ? (
            <section className="archive-stack section">
              <div className="archive-stack-heading">
                <div>
                  <div className="meta-label">More In This Tag</div>
                  <h2 className="section-title">Continue through the rest of the cluster.</h2>
                  <p className="section-copy">
                    Once the lead story gives you the shape of the topic, the remaining cards keep the same thread readable in a lighter, faster rhythm.
                  </p>
                </div>
                <span className="meta-pill">{archive.length} more post{archive.length === 1 ? "" : "s"}</span>
              </div>
              <div className="post-list post-list--archive">
                {archive.map((post) => (
                  <PostCard key={post.slug} post={post} variant="archive" />
                ))}
              </div>
            </section>
          ) : (
            <section className="panel archive-empty-panel section">
              <div className="meta-label">Single Article Cluster</div>
              <h2 className="section-title">This tag currently resolves to one published article.</h2>
              <p className="section-copy">
                That can still be a useful bookmark. You can keep this archive URL as the canonical entry point for the topic and return when more writing lands.
              </p>
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--secondary" href="/blog">
                  Browse Full Archive
                </Link>
                <Link className="button-link button-link--secondary" href="/tags">
                  Explore More Tags
                </Link>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}