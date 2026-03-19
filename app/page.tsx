import type { Metadata } from "next";
import { HeroPanel } from "@/components/hero-panel";
import { MetricPanel } from "@/components/metric-panel";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedPosts, getRecentPosts, getTagSummaries } from "@/lib/content";
import { siteMetrics } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: "A playful personal blog homepage for frontend systems, reading experience, motion, and design notes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rendering",
    description: "A playful personal blog homepage for frontend systems, reading experience, motion, and design notes.",
    url: "/"
  },
  twitter: {
    title: "Rendering",
    description: "A playful personal blog homepage for frontend systems, reading experience, motion, and design notes."
  }
};

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(3);
  const tags = getTagSummaries();

  return (
    <>
      <section className="hero-grid">
        <HeroPanel />
        <div className="metric-grid">
          {siteMetrics.map((metric) => (
            <MetricPanel key={metric.label} detail={metric.detail} label={metric.label} value={metric.value} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          kicker="Featured Stories"
          title="先用黏土卡片把你吸引住，再把阅读体验稳稳接住"
          copy="首页不再假装自己是冰冷的控制台，而是更像一个会发光、会邀请你继续读下去的个人博客客厅。"
        />
        <div className="post-list">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="content-grid section">
        <div>
          <SectionHeading
            kicker="Latest Notes"
            title="最近写下来的灵感、方法和长一点的思考"
            copy="保留个人博客该有的轻盈感，卡片鲜活一点，信息密度克制一点，标题与摘要更容易一眼扫懂。"
          />
          <div className="post-list">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <div>
          <SearchBar />
          <div className="section-band section">
            <SectionHeading
              kicker="Tag Candy Jar"
              title="标签像一把彩色糖豆，也是阅读入口"
              copy="标签不是后台附属品，而是读者理解你在写什么、又能从哪里继续读下去的第一组线索。"
            />
            <div className="tag-grid">
              {tags.map((tag) => (
                <article className="panel tag-card" id={tag.slug} key={tag.slug}>
                  <div className="meta-label">Topic</div>
                  <h3 className="card-title">{tag.name}</h3>
                  <p className="metric-detail">{tag.count} 篇文章正在这个主题里等你点开。</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
