import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getTagSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Browse the Rendering archive of technical essays on frontend systems, motion, rendering, and engineering writing.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Rendering Blog Archive",
    description: "Browse the Rendering archive of technical essays on frontend systems, motion, rendering, and engineering writing.",
    url: "/blog"
  },
  twitter: {
    title: "Rendering Blog Archive",
    description: "Browse the Rendering archive of technical essays on frontend systems, motion, rendering, and engineering writing."
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getTagSummaries();

  return (
    <>
      <section className="section-band">
        <div className="section-kicker">Archive Index</div>
        <h1 className="page-title">Browse the thought stream</h1>
        <p className="page-copy">
          The blog index is denser and more operational than the homepage. It privileges title scanability, excerpt clarity, and topic navigation.
        </p>
      </section>

      <section className="content-grid section">
        <div>
          <SearchBar />
          <div className="section-band section">
            <SectionHeading kicker="Signals" title="Filter vocabulary" copy="Real content now powers the archive index, and the visible topic model is ready for search integration later." />
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
            title="Current public archive"
            copy="Each card keeps the cyber shell but gives most of the visual weight back to the words."
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
