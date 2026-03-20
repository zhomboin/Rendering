import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase, splitArchivePosts } from "@/lib/archive-layout";
import { getAllPosts, getPostsByTag, getTagSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse the Rendering archive of playful technical essays on frontend systems, motion, reading UX, and design engineering.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Rendering Blog Archive",
    description: "Browse the Rendering archive of playful technical essays on frontend systems, motion, reading UX, and design engineering.",
    url: "/blog"
  },
  twitter: {
    title: "Rendering Blog Archive",
    description: "Browse the Rendering archive of playful technical essays on frontend systems, motion, reading UX, and design engineering."
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getTagSummaries();
  const { featured, archive } = splitArchivePosts(posts, 2);
  const quickSignals = buildTagShowcase(tags.slice(0, 4), getPostsByTag);

  return (
    <>
      <section className="section-band archive-hero-band">
        <div className="section-kicker">Archive Playground</div>
        <h1 className="page-title">逛逛最近写下来的文章、方法和灵感</h1>
        <p className="page-copy">
          归档页现在会先把最值得点开的内容轻轻顶出来，再把剩下的文章整理成更利于扫读的卡片堆栈。这样你可以先被吸引，再慢慢判断要不要往下读。
        </p>
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <SearchBar />

            <article className="panel archive-guide">
              <div className="meta-label">Archive Guide</div>
              <h2 className="section-title">先看两张主卡，再顺着主题慢慢潜进去</h2>
              <p className="section-copy">
                这页不想像数据库一样把所有内容平铺出来。最新、最有代表性的两篇会成为主卡，后面的文章再回到更轻一点、更适合快速判断的归档节奏。
              </p>
              <div className="archive-stats">
                <div className="archive-stat">
                  <span className="archive-stat-value">{posts.length}</span>
                  <span className="archive-stat-label">public essays</span>
                </div>
                <div className="archive-stat">
                  <span className="archive-stat-value">{tags.length}</span>
                  <span className="archive-stat-label">topic tags</span>
                </div>
              </div>
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--secondary" href="/tags">
                  Open Tag Map
                </Link>
              </div>
            </article>

            <article className="panel archive-signal-band">
              <div className="meta-label">Quick Signals</div>
              <h2 className="section-title">先从几个最活跃的话题入手</h2>
              <div className="archive-signal-list">
                {quickSignals.map((tag) => (
                  <Link className="archive-signal-link" href={`/tags#${tag.slug}`} key={tag.slug}>
                    <span className="archive-signal-name">{tag.name}</span>
                    <span className="archive-signal-meta">{tag.articleCountLabel}</span>
                    <span className="archive-signal-lead">{tag.leadPost?.title ?? "More writing is coming soon."}</span>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </aside>

        <div className="archive-main">
          <SectionHeading
            kicker="Featured Now"
            title="先从更有分量的两张文章主卡开始"
            copy="主卡会承担更多情绪和视觉重量，让标题、摘要和阅读决策信息先抓住你。"
          />
          <div className="archive-featured-grid">
            {featured.map((post, index) => (
              <PostCard key={post.slug} post={post} spotlight={index === 0} variant="featured" />
            ))}
          </div>

          {archive.length ? (
            <section className="archive-stack section">
              <div className="archive-stack-heading">
                <div>
                  <div className="meta-label">Archive Stack</div>
                  <h2 className="section-title">继续浏览更轻一点的归档卡</h2>
                  <p className="section-copy">
                    这里保留足够的信息密度，方便你快速决定下一篇该读什么，同时不让每一张卡都争着当主角。
                  </p>
                </div>
                <span className="meta-pill">{archive.length} more posts</span>
              </div>
              <div className="post-list post-list--archive">
                {archive.map((post) => (
                  <PostCard key={post.slug} post={post} variant="archive" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </>
  );
}