import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase, splitArchivePosts } from "@/lib/archive-layout";
import { getAllPosts, getPostsByTag, getTagSummaries } from "@/lib/content";
import { buildTagFilterLinks, resolveTagFilter } from "@/lib/tag-discovery";

type BlogIndexPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

const archiveDescription = "Browse the Rendering archive of playful technical essays on frontend systems, motion, reading UX, and design engineering.";

function createTagDescription(name: string, count: number) {
  return `Browse ${count} Rendering article${count === 1 ? "" : "s"} filed under ${name}.`;
}

export async function generateMetadata({ searchParams }: BlogIndexPageProps): Promise<Metadata> {
  const { tag } = await searchParams;
  const tags = getTagSummaries();
  const { activeTag } = resolveTagFilter(tag, tags);

  if (!activeTag) {
    return {
      title: "Blog",
      description: archiveDescription,
      alternates: { canonical: "/blog" },
      openGraph: {
        title: "Rendering Blog Archive",
        description: archiveDescription,
        url: "/blog"
      },
      twitter: {
        title: "Rendering Blog Archive",
        description: archiveDescription
      }
    };
  }

  const description = createTagDescription(activeTag.name, activeTag.count);

  return {
    title: `${activeTag.name} filter`,
    description,
    alternates: { canonical: `/tags/${activeTag.slug}` },
    robots: {
      index: false,
      follow: true
    },
    openGraph: {
      title: `${activeTag.name} archive`,
      description,
      url: `/tags/${activeTag.slug}`
    },
    twitter: {
      title: `${activeTag.name} archive`,
      description
    }
  };
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const tags = getTagSummaries();
  const { activeTag, hasRequestedTag, requestedSlug } = resolveTagFilter(tag, tags);
  const filteredPosts = activeTag ? getPostsByTag(activeTag.slug) : allPosts;
  const { featured, archive } = splitArchivePosts(filteredPosts, activeTag ? 1 : 2);
  const quickSignals = buildTagShowcase(tags.slice(0, 4), getPostsByTag);
  const filterLinks = buildTagFilterLinks(tags, activeTag?.slug ?? "");
  const featuredGridClassName = ["archive-featured-grid", featured.length === 1 ? "archive-featured-grid--single" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <section className="section-band archive-hero-band">
        <div className="section-kicker">Archive Playground</div>
        <h1 className="page-title">Move through the archive with a little more direction.</h1>
        <p className="page-copy">
          Featured essays still lead the way, but the archive now has a real tag shelf too. You can browse broadly,
          narrow the stack to one signal, or jump straight into a dedicated tag archive when you want a cleaner entry point.
        </p>
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <SearchBar />

            <article className="panel archive-guide">
              <div className="meta-label">Archive Guide</div>
              <h2 className="section-title">Start broad, then tighten the archive around one theme.</h2>
              <p className="section-copy">
                The rail now works like a browsing toolbelt. Keep the full archive visible when you want serendipity, or
                use a tag filter to pull one topic into focus without losing the layered card rhythm.
              </p>
              <div className="archive-stats">
                <div className="archive-stat">
                  <span className="archive-stat-value">{filteredPosts.length}</span>
                  <span className="archive-stat-label">{activeTag ? "visible essays" : "public essays"}</span>
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

            <article className="panel archive-filter-panel">
              <div className="meta-label">Filter Shelf</div>
              <h2 className="section-title">Shape the archive around one tag.</h2>
              <p className="section-copy">
                Quick filters are for when you already know the thread you want to follow. The dedicated tag page stays
                richer and more shareable, but this view keeps the archive nimble.
              </p>
              <div className="archive-filter-list">
                <Link className={`tag-chip archive-filter-chip${activeTag ? "" : " archive-filter-chip--active"}`} href="/blog">
                  <span>All essays</span>
                  <span className="archive-filter-chip-count">{allPosts.length}</span>
                </Link>
                {filterLinks.map((tagLink) => (
                  <Link
                    className={`tag-chip archive-filter-chip${tagLink.isActive ? " archive-filter-chip--active" : ""}`}
                    href={tagLink.href}
                    key={tagLink.slug}
                  >
                    <span>{tagLink.name}</span>
                    <span className="archive-filter-chip-count">{tagLink.count}</span>
                  </Link>
                ))}
              </div>
              {hasRequestedTag && !activeTag ? (
                <p className="archive-filter-note">
                  The tag "{requestedSlug}" is not public yet, so the full archive is shown instead.
                </p>
              ) : null}
            </article>

            <article className="panel archive-signal-band">
              <div className="meta-label">Quick Signals</div>
              <h2 className="section-title">Jump straight into a full tag archive.</h2>
              <div className="archive-signal-list">
                {quickSignals.map((tagItem) => (
                  <Link className="archive-signal-link" href={`/tags/${tagItem.slug}`} key={tagItem.slug}>
                    <span className="archive-signal-name">{tagItem.name}</span>
                    <span className="archive-signal-meta">{tagItem.articleCountLabel}</span>
                    <span className="archive-signal-lead">{tagItem.leadPost?.title ?? "More writing is coming soon."}</span>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </aside>

        <div className="archive-main">
          {activeTag ? (
            <section className="panel archive-filter-summary">
              <div className="archive-summary-heading">
                <div>
                  <div className="meta-label">Filter On</div>
                  <h2 className="section-title">{activeTag.name}</h2>
                </div>
                <span className="meta-pill">{filteredPosts.length} visible essay{filteredPosts.length === 1 ? "" : "s"}</span>
              </div>
              <p className="section-copy archive-filter-summary-copy">
                This filtered archive keeps only the essays filed under {activeTag.name}. If you want the cleaner,
                shareable version of the same cluster, open the dedicated tag archive next.
              </p>
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--primary" href={`/tags/${activeTag.slug}`}>
                  Open Tag Archive
                </Link>
                <Link className="button-link button-link--secondary" href="/blog">
                  Clear Filter
                </Link>
              </div>
            </section>
          ) : null}

          <SectionHeading
            kicker={activeTag ? "Filtered Spotlight" : "Featured Now"}
            title={
              activeTag
                ? `Start with the lead story inside ${activeTag.name}.`
                : "Start with the two essays carrying the most visual and editorial weight."
            }
            copy={
              activeTag
                ? "A filtered view trims the archive to one clear thread. The first card does the heavy lifting, then the remaining notes keep the story moving."
                : "The archive still opens with a pair of heavier cards so the first decision feels easy, then relaxes into a lighter stack for quicker scanning."
            }
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
                  <div className="meta-label">Archive Stack</div>
                  <h2 className="section-title">
                    {activeTag ? `Keep going through the rest of ${activeTag.name}.` : "Continue through the lighter archive stack."}
                  </h2>
                  <p className="section-copy">
                    {activeTag
                      ? "The cards below are still part of the same theme, just tuned for faster scanning once the lead story has done its job."
                      : "This layer keeps enough context for confident decisions while letting the archive feel breezier and more browseable."}
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
          ) : null}
        </div>
      </section>
    </>
  );
}