import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { splitArchivePosts } from "@/lib/archive-layout";
import { getAllPosts, getPostsByTag, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { buildBlogArchiveCopy } from "@/lib/page-copy";
import { formatArticleCount, getLocalizedRoute } from "@/lib/site";
import { getSiteSocialImageUrl, getSocialImageSize } from "@/lib/seo";
import { buildTagFilterLinks, resolveTagFilter } from "@/lib/tag-discovery";

type BlogIndexSearchParams = {
  tag?: string | string[];
};

function hasText(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

function createTagDescription(locale: string, name: string, count: number) {
  return normalizeLocale(locale) === "zh"
    ? `浏览 Rendering 中归类到 ${name} 的 ${count} 篇文章。`
    : `Browse ${count} Rendering article${count === 1 ? "" : "s"} filed under ${name}.`;
}

function createMissingTagCopy(locale: string, requestedSlug: string, fallback: string) {
  return normalizeLocale(locale) === "zh"
    ? `标签“${requestedSlug}”当前还没有公开内容，因此仍然展示完整文章归档。`
    : fallback;
}

export function getBlogIndexPageMetadata(locale = DEFAULT_LOCALE, searchParams: BlogIndexSearchParams = {}): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const tags = getTagSummaries();
  const socialImage = getSiteSocialImageUrl(normalizedLocale);
  const socialImageSize = getSocialImageSize();
  const { activeTag } = resolveTagFilter(searchParams.tag, tags);

  if (!activeTag) {
    const canonicalPath = getLocalizedPath("/blog", normalizedLocale);
    return {
      title: messages.blogArchive.metadataTitle,
      description: messages.blogArchive.metadataDescription,
      alternates: {
        canonical: canonicalPath,
        languages: getLocalizedAlternates("/blog")
      },
      openGraph: {
        type: "website",
        title: `${messages.site.name} ${messages.blogArchive.metadataTitle}`,
        description: messages.blogArchive.metadataDescription,
        locale: messages.locale.ogLocale,
        url: canonicalPath,
        images: [
          {
            url: socialImage,
            ...socialImageSize,
            alt: `${messages.site.name} preview`
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: `${messages.site.name} ${messages.blogArchive.metadataTitle}`,
        description: messages.blogArchive.metadataDescription,
        images: [socialImage]
      }
    };
  }

  const description = createTagDescription(normalizedLocale, activeTag.name, activeTag.count);
  const canonicalPath = getLocalizedPath(`/blog?tag=${encodeURIComponent(activeTag.slug)}`, normalizedLocale);

  return {
    title: `${activeTag.name} | ${messages.blogArchive.metadataTitle}`,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates(`/blog?tag=${encodeURIComponent(activeTag.slug)}`)
    },
    robots: {
      index: false,
      follow: true
    },
    openGraph: {
      type: "website",
      title: `${activeTag.name} | ${messages.blogArchive.metadataTitle}`,
      description,
      locale: messages.locale.ogLocale,
      url: canonicalPath,
      images: [
        {
          url: socialImage,
          ...socialImageSize,
          alt: `${messages.site.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${activeTag.name} | ${messages.blogArchive.metadataTitle}`,
      description,
      images: [socialImage]
    }
  };
}

export function BlogIndexPageContent({
  locale = DEFAULT_LOCALE,
  searchParams = {}
}: {
  locale?: string;
  searchParams?: BlogIndexSearchParams;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const allPosts = getAllPosts();
  const tags = getTagSummaries();
  const { activeTag, hasRequestedTag, requestedSlug } = resolveTagFilter(searchParams.tag, tags);
  const filteredPosts = activeTag ? getPostsByTag(activeTag.slug) : allPosts;
  const { featured, archive } = splitArchivePosts(filteredPosts, activeTag ? 1 : 2);
  const archiveCopy = buildBlogArchiveCopy(normalizedLocale, {
    allPosts,
    visiblePosts: filteredPosts,
    tags,
    activeTag,
    featuredCount: featured.length,
    archiveCount: archive.length
  });
  const filterLinks = buildTagFilterLinks(tags, activeTag?.slug ?? "").map((tagLink) => ({
    ...tagLink,
    href: getLocalizedPath(tagLink.href, normalizedLocale)
  }));
  const featuredGridClassName = ["archive-featured-grid", featured.length === 1 ? "archive-featured-grid--single" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <section className="section-band archive-hero-band">
        {hasText(messages.blogArchive.heroKicker) ? <div className="section-kicker">{messages.blogArchive.heroKicker}</div> : null}
        {hasText(archiveCopy.hero.title) ? <h1 className="page-title">{archiveCopy.hero.title}</h1> : null}
        {hasText(archiveCopy.hero.copy) ? <p className="page-copy">{archiveCopy.hero.copy}</p> : null}
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <SearchBar locale={normalizedLocale} />

            <article className="panel archive-guide">
              {hasText(messages.blogArchive.guideKicker) ? <div className="meta-label">{messages.blogArchive.guideKicker}</div> : null}
              {hasText(archiveCopy.guide.title) ? <h2 className="section-title">{archiveCopy.guide.title}</h2> : null}
              {hasText(archiveCopy.guide.copy) ? <p className="section-copy">{archiveCopy.guide.copy}</p> : null}
              <div className="archive-stats">
                <div className="archive-stat">
                  <span className="archive-stat-value">{filteredPosts.length}</span>
                  <span className="archive-stat-label">{activeTag ? messages.blogArchive.visibleEssays : messages.blogArchive.publicEssays}</span>
                </div>
                <div className="archive-stat">
                  <span className="archive-stat-value">{tags.length}</span>
                  <span className="archive-stat-label">{messages.blogArchive.topicTags}</span>
                </div>
              </div>
            </article>

            <article className="panel archive-filter-panel">
              {hasText(messages.blogArchive.filterKicker) ? <div className="meta-label">{messages.blogArchive.filterKicker}</div> : null}
              {hasText(archiveCopy.filter.title) ? <h2 className="section-title">{archiveCopy.filter.title}</h2> : null}
              {hasText(archiveCopy.filter.copy) ? <p className="section-copy">{archiveCopy.filter.copy}</p> : null}
              <div className="archive-filter-list">
                <Link className={`tag-chip archive-filter-chip${activeTag ? "" : " archive-filter-chip--active"}`} href={getLocalizedRoute(normalizedLocale, "/blog")}>
                  <span>{messages.blogArchive.allEssays}</span>
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
                <p className="archive-filter-note">{createMissingTagCopy(normalizedLocale, requestedSlug, messages.blogArchive.filterMissing)}</p>
              ) : null}
            </article>
          </div>
        </aside>

        <div className="archive-main">
          {activeTag ? (
            <section className="panel archive-filter-summary">
              <div className="archive-summary-heading">
                <div>
                  {hasText(messages.blogArchive.filteredSummaryKicker) ? <div className="meta-label">{messages.blogArchive.filteredSummaryKicker}</div> : null}
                  <h2 className="section-title">{activeTag.name}</h2>
                </div>
                <span className="meta-pill">{formatArticleCount(normalizedLocale, filteredPosts.length, "visible essay")}</span>
              </div>
              {hasText(archiveCopy.filteredSummary.copy) ? (
                <p className="section-copy archive-filter-summary-copy">{archiveCopy.filteredSummary.copy}</p>
              ) : null}
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
                  {messages.common.clearFilter}
                </Link>
              </div>
            </section>
          ) : null}

          <SectionHeading
            kicker={activeTag ? messages.blogArchive.filteredFeaturedKicker : messages.blogArchive.featuredKicker}
            title={archiveCopy.featured.title}
            copy={archiveCopy.featured.copy}
          />
          <div className={featuredGridClassName}>
            {featured.map((post, index) => (
              <PostCard key={post.slug} locale={normalizedLocale} post={post} spotlight={index === 0} variant="featured" />
            ))}
          </div>

          {archive.length ? (
            <section className="archive-stack section">
              <div className="archive-stack-heading">
                <div>
                  {hasText(messages.blogArchive.stackKicker) ? <div className="meta-label">{messages.blogArchive.stackKicker}</div> : null}
                  {hasText(archiveCopy.stack.title) ? <h2 className="section-title">{archiveCopy.stack.title}</h2> : null}
                  {hasText(archiveCopy.stack.copy) ? <p className="section-copy">{archiveCopy.stack.copy}</p> : null}
                </div>
                <span className="meta-pill">{formatArticleCount(normalizedLocale, archive.length, "more post")}</span>
              </div>
              <div className="post-list post-list--archive">
                {archive.map((post) => (
                  <PostCard key={post.slug} locale={normalizedLocale} post={post} variant="archive" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </>
  );
}