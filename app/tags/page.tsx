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
        <h1 className="page-title">从主题标签继续往下逛</h1>
        <p className="page-copy">
          标签页现在更像一张兴趣地图。每个主题都会带出一篇代表文章，让你先感受到它的气质，再决定要不要顺着这个方向继续读下去。
        </p>
      </section>

      <section className="section">
        <SectionHeading
          kicker="Signal Groups"
          title="按主题浏览，也按代表内容快速进入"
          copy="标签卡不再只是计数器，它会告诉你这个主题现在最值得先点开哪一篇。"
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
                当前最活跃的主题会先被拉成一张更完整的主卡，让标签页也有更清楚的起点，而不是一排排同权重的信息块。
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
              <div className="tag-card-footer section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--primary" href={spotlightTag.leadPost ? `/blog/${spotlightTag.leadPost.slug}` : "/blog"}>
                  Read spotlight article
                </Link>
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
                    <Link className="button-link button-link--secondary" href={tag.leadPost ? `/blog/${tag.leadPost.slug}` : "/blog"}>
                      Read entry
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