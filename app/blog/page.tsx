import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getTagSummaries } from "@/lib/content";

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

  return (
    <>
      <section className="section-band">
        <div className="section-kicker">Archive Playground</div>
        <h1 className="page-title">逛逛最近写下来的文章、方法和灵感</h1>
        <p className="page-copy">
          博客索引页会更直接一些。它需要好扫、好搜、好回看，同时保留一点 playful 的色彩和体块，让阅读入口别那么像冷冰冰的数据库。
        </p>
      </section>

      <section className="content-grid section">
        <div>
          <SearchBar />
          <div className="section-band section">
            <SectionHeading kicker="Signals" title="从标签开始挑感兴趣的方向" copy="真实内容已经接到归档页，标签会继续作为搜索之前的第一层导航。" />
            <div className="tag-row">
              {tags.map((tag) => (
                <a className="tag-chip" href={`#${tag.slug}`} key={tag.slug}>
                  {tag.name} ({tag.count})
                </a>
              ))}
            </div>
          </div>
        </div>
        <div>
          <SectionHeading
            kicker="All Posts"
            title="当前公开文章"
            copy="文章卡片会更有触感，但真正占主角的仍然是标题、摘要和阅读决策信息。"
          />
          <div className="post-list">
            {posts.map((post) => (
              <div id={post.tags[0]} key={post.slug}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
