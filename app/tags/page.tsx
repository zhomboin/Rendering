import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
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
  const tags = getTagSummaries();

  return (
    <>
      <section className="section-band">
        <div className="section-kicker">Tag Candy Jar</div>
        <h1 className="page-title">从主题标签继续往下逛</h1>
        <p className="page-copy">标签页不只是归档工具，它也应该有一点点收藏盒彩蛋的感觉，让探索路径更轻松、更有趣。</p>
      </section>

      <section className="section">
        <SectionHeading kicker="Signal Groups" title="Browse by cluster" copy="每个标签卡片都会显示主题数量和一个适合继续点击的入口。" />
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
                    <Link className="button-link button-link--secondary" href={`/blog/${posts[0].slug}`}>
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
