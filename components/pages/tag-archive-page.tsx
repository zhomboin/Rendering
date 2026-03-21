import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase, splitArchivePosts } from "@/lib/archive-layout";
import { getPostsByTag, getTagSummaries, getTagSummaryBySlug } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { buildTagArchiveJsonLd } from "@/lib/seo";
import { formatArticleCount, getBlogPostPath, getLocalizedRoute, getTagArchivePath } from "@/lib/site";

function createTagDescription(locale: string, tagName: string, count: number) {
  return normalizeLocale(locale) === "zh"
    ? `浏览 Rendering 中归入 ${tagName} 的 ${count} 篇文章。`
    : `Browse ${count} Rendering article${count === 1 ? "" : "s"} filed under ${tagName}.`;
}

function createTagHeroCopy(locale: string, tagName: string, count: number, fallback: string) {
  return normalizeLocale(locale) === "zh"
    ? `这个归档簇会把围绕 ${tagName} 的 ${count} 篇公开文章整理到同一个入口里，让它更适合被分享、收藏和回访。`
    : fallback;
}

function createSpotlightTitle(locale: string, tagName: string, prefix: string) {
  return normalizeLocale(locale) === "zh" ? `先从打开 ${tagName} 的这篇文章开始。` : `${prefix} ${tagName}.`;
}

function mapRelatedTags(locale: string, currentSlug: string) {
  const messages = getMessages(locale);
  return buildTagShowcase(
    getTagSummaries().filter((candidate) => candidate.slug !== currentSlug).slice(0, 4),
    getPostsByTag
  ).map((tag) => ({
    ...tag,
    articleCountLabel: formatArticleCount(locale, tag.count),
    leadExcerpt: tag.leadPost?.excerpt ?? messages.common.moreComing
  }));
}

export async function getTagArchivePageMetadata(locale = DEFAULT_LOCALE, slug: string): Promise<Metadata> {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const tag = getTagSummaryBySlug(slug);

  if (!tag) {
    return {
      title: normalizedLocale === "zh" ? "未找到标签" : "Tag Not Found"
    };
  }

  const description = createTagDescription(normalizedLocale, tag.name, tag.count);
  const canonicalPath = getTagArchivePath(normalizedLocale, tag.slug);

  return {
    title: `${tag.name} ${messages.tagArchive.metadataSuffix}`,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates(`/tags/${tag.slug}`)
    },
    openGraph: {
      title: `${tag.name} ${messages.tagArchive.metadataSuffix}`,
      description,
      locale: messages.locale.ogLocale,
      url: canonicalPath
    },
    twitter: {
      title: `${tag.name} ${messages.tagArchive.metadataSuffix}`,
      description
    }
  };
}

export async function TagArchivePageContent({ locale = DEFAULT_LOCALE, slug }: { locale?: string; slug: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const tag = getTagSummaryBySlug(slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag.slug);
  const { featured, archive } = splitArchivePosts(posts, 1);
  const relatedTags = mapRelatedTags(normalizedLocale, tag.slug);
  const leadPost = posts[0] ?? null;
  const featuredGridClassName = ["archive-featured-grid", featured.length === 1 ? "archive-featured-grid--single" : ""]
    .filter(Boolean)
    .join(" ");
  const tagJsonLd = buildTagArchiveJsonLd(tag, posts, normalizedLocale);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(tagJsonLd) }} type="application/ld+json" />

      <section className="section-band tag-archive-band">
        <div className="section-kicker">{messages.tagArchive.heroKicker}</div>
        <h1 className="page-title">{tag.name}</h1>
        <p className="page-copy">{createTagHeroCopy(normalizedLocale, tag.name, tag.count, messages.tagArchive.heroCopy)}</p>
        <div className="hero-actions section" style={{ marginTop: 18 }}>
          <Link className="button-link button-link--primary" href={getLocalizedPath(`/blog?tag=${encodeURIComponent(tag.slug)}`, normalizedLocale)}>
            {messages.common.openFilteredBlogView}
          </Link>
          <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/tags")}>
            {messages.common.backToTagMap}
          </Link>
        </div>
      </section>

      <section className="section archive-layout-grid">
        <aside className="archive-rail">
          <div className="archive-rail-stack">
            <article className="panel archive-guide">
              <div className="meta-label">{messages.tagArchive.snapshotKicker}</div>
              <h2 className="section-title">{messages.tagArchive.snapshotTitle}</h2>
              <p className="section-copy">{messages.tagArchive.snapshotCopy}</p>
              <div className="archive-stats">
                <div className="archive-stat">
                  <span className="archive-stat-value">{posts.length}</span>
                  <span className="archive-stat-label">{messages.tagArchive.articlesInTag}</span>
                </div>
                <div className="archive-stat">
                  <span className="archive-stat-value">{leadPost?.readingTime ?? "--"}</span>
                  <span className="archive-stat-label">{messages.tagArchive.leadReadingTime}</span>
                </div>
              </div>
              {leadPost ? (
                <div className="tag-card-lead section">
                  <span className="tag-card-lead-label">{messages.tagArchive.leadArticle}</span>
                  <Link className="tag-card-lead-link" href={getBlogPostPath(normalizedLocale, leadPost.slug)}>
                    {leadPost.title}
                  </Link>
                  <p className="metric-detail">{leadPost.excerpt}</p>
                </div>
              ) : null}
            </article>

            {relatedTags.length ? (
              <article className="panel archive-signal-band">
                <div className="meta-label">{messages.tagArchive.nearbyKicker}</div>
                <h2 className="section-title">{messages.tagArchive.nearbyTitle}</h2>
                <div className="archive-signal-list">
                  {relatedTags.map((relatedTag) => (
                    <Link className="archive-signal-link" href={getTagArchivePath(normalizedLocale, relatedTag.slug)} key={relatedTag.slug}>
                      <span className="archive-signal-name">{relatedTag.name}</span>
                      <span className="archive-signal-meta">{relatedTag.articleCountLabel}</span>
                      <span className="archive-signal-lead">{relatedTag.leadPost?.title ?? messages.common.moreComing}</span>
                    </Link>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </aside>

        <div className="archive-main">
          <SectionHeading
            kicker={messages.tagArchive.spotlightKicker}
            title={createSpotlightTitle(normalizedLocale, tag.name, messages.tagArchive.spotlightTitlePrefix)}
            copy={messages.tagArchive.spotlightCopy}
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
                  <div className="meta-label">{messages.tagArchive.moreKicker}</div>
                  <h2 className="section-title">{messages.tagArchive.moreTitle}</h2>
                  <p className="section-copy">{messages.tagArchive.moreCopy}</p>
                </div>
                <span className="meta-pill">{formatArticleCount(normalizedLocale, archive.length, "more post")}</span>
              </div>
              <div className="post-list post-list--archive">
                {archive.map((post) => (
                  <PostCard key={post.slug} locale={normalizedLocale} post={post} variant="archive" />
                ))}
              </div>
            </section>
          ) : (
            <section className="panel archive-empty-panel section">
              <div className="meta-label">{messages.common.singleArticleCluster}</div>
              <h2 className="section-title">{messages.tagArchive.singleTitle}</h2>
              <p className="section-copy">{messages.tagArchive.singleCopy}</p>
              <div className="hero-actions section" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
                  {messages.common.browseFullArchive}
                </Link>
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/tags")}>
                  {messages.common.exploreMoreTags}
                </Link>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}