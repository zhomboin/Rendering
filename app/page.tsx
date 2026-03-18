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
  description: "Rendering is a public blog node for frontend systems, rendering workflows, and readable interface design.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rendering",
    description: "Rendering is a public blog node for frontend systems, rendering workflows, and readable interface design.",
    url: "/"
  },
  twitter: {
    title: "Rendering",
    description: "Rendering is a public blog node for frontend systems, rendering workflows, and readable interface design."
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
          kicker="Featured Transmission"
          title="Editorial systems, motion discipline, and frontend clarity"
          copy="The homepage acts as the gateway node: fewer cards, stronger hierarchy, and just enough glow to signal the brand."
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
            kicker="Latest Entries"
            title="Recent signal from the archive"
            copy="A denser feed tuned for repeat reading, fast scanning, and strong metadata discipline."
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
              kicker="Tag Matrix"
              title="Topic clusters"
              copy="Taxonomy is treated as a visible signal map rather than a utility-only sidebar."
            />
            <div className="tag-grid">
              {tags.map((tag) => (
                <article className="panel tag-card" id={tag.slug} key={tag.slug}>
                  <div className="meta-label">Topic</div>
                  <h3 className="card-title">{tag.name}</h3>
                  <p className="metric-detail">{tag.count} linked articles in the current archive.</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
