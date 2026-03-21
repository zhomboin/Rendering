import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase, splitArchivePosts } from "@/lib/archive-layout";
import { getAllPosts, getPostsByTag, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { buildTagFilterLinks, resolveTagFilter } from "@/lib/tag-discovery";
import { formatArticleCount, getLocalizedRoute, getTagArchivePath } from "@/lib/site";

type BlogIndexSearchParams = {
  tag?: string | string[];
};

function createTagDescription(locale: string, name: string, count: number) {
  return normalizeLocale(locale) === "zh"
    ? `浏览 Rendering 中归入 ${name} 的 ${count} 篇文章。`
    : `Browse ${count} Rendering article${count === 1 ? "" : "s"} filed under ${name}.`;
}

function createFilteredFeaturedTitle(locale: string, tagName: string) {
  return normalizeLocale(locale) === "zh" ? `先从 ${tagName} 里的主文章开始。` : `Start with the lead story inside ${tagName}.`;
}

function createFilteredStackTitle(locale: string, tagName: string) {
  return normalizeLocale(locale) === "zh" ? `继续沿着 ${tagName} 往下读。` : `Keep going through the rest of ${tagName}.`;
}

function createMissingTagCopy(locale: string, requestedSlug: string, fallback: string) {
  return normalizeLocale(locale) === "zh" ? `标签 “${requestedSlug}” 目前还没有公开内容，因此仍然展示完整归档。` : fallback;
}

function mapTagShowcase(locale: string, tags: ReturnType<typeof getTagSummaries>) {
  const messages = getMessages(locale);
  return buildTagShowcase(tags, getPostsByTag).map((tag) => ({
    ...tag,
    articleCountLabel: formatArticleCount(locale, tag.count),
    leadExcerpt: tag.leadPost?.excerpt ?? messages.common.moreComing
  }));
}

export function getBlogIndexPageMetadata(locale = DEFAULT_LOCALE, searchParams: BlogIndexSearchParams = {}): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const tags = getTagSummaries();
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
        title: `${messages.site.name} ${messages.blogArchive.metadataTitle}`,
        description: messages.blogArchive.metadataDescription,
        locale: messages.locale.ogLocale,
        url: canonicalPath
      },
      twitter: {
        title: `${messages.site.name} ${messages.blogArchive.metadataTitle}`,
        description: messages.blogArchive.metadataDescription
      }
    };
  }

  const description = createTagDescription(normalizedLocale, activeTag.name, activeTag.count);
  const canonicalPath = getTagArchivePath(normalizedLocale, activeTag.slug);

  return {
    title: `${activeTag.name} ${messages.blogArchive.metadataTitle}`,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates(`/tags/${activeTag.slug}`)
    },
    robots: {
      index: false,
      follow: true
    },
    openGraph: {
      title: `${activeTag.name} ${messages.common.openTagArchive}`,
      description,
      locale: messages.locale.ogLocale,
      url: canonicalPath
    },
    twitter: {
      title: `${activeTag.name} ${messages.common.openTagArchive}`,
      description
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
  const quickSignals = mapTagShowcase(normalizedLocale, tags.slice(0, 4));
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
        <div className="section-kicker">{messages.blogArchive.heroKicker}</div>
        <h1 className="page-title">{messages.blogArchive.heroTitle}</h1>
        <p className="page-copy">{messages.blogArchive.heroCopy}</p>
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <SearchBar locale={normalizedLocale} />

            <article className="panel archive-guide">
              <div className="meta-label">{messages.blogArchive.guideKicker}</div>
              <h2 className="section-title">{messages.blogArchive.guideTitle}</h2>
              <p className="section-copy">{messages.blogArchive.guideCopy}</p>
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
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/tags")}>
                  {messages.common.openTagMap}
                </Link>
              </div>
            </article>

            <article className="panel archive-filter-panel">
              <div className="meta-label">{messages.blogArchive.filterKicker}</div>
              <h2 className="section-title">{messages.blogArchive.filterTitle}</h2>
              <p className="section-copy">{messages.blogArchive.filterCopy}</p>
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

            <article className="panel archive-signal-band">
              <div className="meta-label">{messages.blogArchive.quickSignalsKicker}</div>
              <h2 className="section-title">{messages.blogArchive.quickSignalsTitle}</h2>
              <div className="archive-signal-list">
                {quickSignals.map((tagItem) => (
                  <Link className="archive-signal-link" href={getTagArchivePath(normalizedLocale, tagItem.slug)} key={tagItem.slug}>
                    <span className="archive-signal-name">{tagItem.name}</span>
                    <span className="archive-signal-meta">{tagItem.articleCountLabel}</span>
                    <span className="archive-signal-lead">{tagItem.leadPost?.title ?? messages.common.moreComing}</span>
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
                  <div className="meta-label">{messages.blogArchive.filteredSummaryKicker}</div>
                  <h2 className="section-title">{activeTag.name}</h2>
                </div>
                <span className="meta-pill">{formatArticleCount(normalizedLocale, filteredPosts.length, "visible essay")}</span>
              </div>
              <p className="section-copy archive-filter-summary-copy">{messages.blogArchive.filteredSummaryCopy}</p>
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--primary" href={getTagArchivePath(normalizedLocale, activeTag.slug)}>
                  {messages.common.openTagArchive}
                </Link>
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
                  {messages.common.clearFilter}
                </Link>
              </div>
            </section>
          ) : null}

          <SectionHeading
            kicker={activeTag ? messages.blogArchive.filteredFeaturedKicker : messages.blogArchive.featuredKicker}
            title={activeTag ? createFilteredFeaturedTitle(normalizedLocale, activeTag.name) : messages.blogArchive.featuredTitle}
            copy={activeTag ? messages.blogArchive.filteredFeaturedCopy : messages.blogArchive.featuredCopy}
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
                  <div className="meta-label">{messages.blogArchive.stackKicker}</div>
                  <h2 className="section-title">{activeTag ? createFilteredStackTitle(normalizedLocale, activeTag.name) : messages.blogArchive.stackTitle}</h2>
                  <p className="section-copy">{activeTag ? messages.blogArchive.filteredStackCopy : messages.blogArchive.stackCopy}</p>
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