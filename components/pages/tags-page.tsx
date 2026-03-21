import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { buildTagShowcase } from "@/lib/archive-layout";
import { getPostsByTag, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { formatArticleCount, getBlogPostPath, getTagArchivePath } from "@/lib/site";
import { getSiteSocialImageUrl, getSocialImageSize } from "@/lib/seo";

function mapTagShowcase(locale: string) {
  const messages = getMessages(locale);
  return buildTagShowcase(getTagSummaries(), getPostsByTag).map((tag) => ({
    ...tag,
    articleCountLabel: formatArticleCount(locale, tag.count),
    leadExcerpt: tag.leadPost?.excerpt ?? messages.common.moreComing
  }));
}

export function getTagsPageMetadata(locale = DEFAULT_LOCALE): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const canonicalPath = getLocalizedPath("/tags", normalizedLocale);
  const socialImage = getSiteSocialImageUrl(normalizedLocale);
  const socialImageSize = getSocialImageSize();

  return {
    title: messages.tags.metadataTitle,
    description: messages.tags.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates("/tags")
    },
    openGraph: {
      type: "website",
      title: `${messages.site.name} ${messages.tags.metadataTitle}`,
      description: messages.tags.metadataDescription,
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
      title: `${messages.site.name} ${messages.tags.metadataTitle}`,
      description: messages.tags.metadataDescription,
      images: [socialImage]
    }
  };
}

export function TagsPageContent({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const tagShowcase = mapTagShowcase(normalizedLocale);
  const spotlightTag = tagShowcase[0] ?? null;
  const remainingTags = tagShowcase.slice(1);

  return (
    <>
      <section className="section-band tag-map-band">
        <div className="section-kicker">{messages.tags.heroKicker}</div>
        <h1 className="page-title">{messages.tags.heroTitle}</h1>
        <p className="page-copy">{messages.tags.heroCopy}</p>
      </section>

      <section className="section">
        <SectionHeading
          kicker={messages.tags.groupsKicker}
          title={messages.tags.groupsTitle}
          copy={messages.tags.groupsCopy}
        />

        {spotlightTag ? (
          <div className="tags-explorer-grid">
            <article className="panel tag-card tag-card--spotlight" id={spotlightTag.slug}>
              <div className="tag-card-top">
                <span className="meta-label">{spotlightTag.articleCountLabel}</span>
                <span className="meta-pill">{messages.common.spotlight}</span>
              </div>
              <h2 className="card-title">{spotlightTag.name}</h2>
              <p className="metric-detail tag-card-summary">{messages.tags.spotlightCopy}</p>
              {spotlightTag.leadPost ? (
                <div className="tag-card-lead">
                  <span className="tag-card-lead-label">{messages.common.representativeRead}</span>
                  <Link className="tag-card-lead-link" href={getBlogPostPath(normalizedLocale, spotlightTag.leadPost.slug)}>
                    {spotlightTag.leadPost.title}
                  </Link>
                  <p className="metric-detail">{spotlightTag.leadExcerpt}</p>
                </div>
              ) : null}
              <div className="tag-card-footer section tag-card-links" style={{ marginTop: 18 }}>
                <Link className="button-link button-link--primary" href={getTagArchivePath(normalizedLocale, spotlightTag.slug)}>
                  {messages.common.openTagArchive}
                </Link>
                {spotlightTag.leadPost ? (
                  <Link className="button-link button-link--secondary" href={getBlogPostPath(normalizedLocale, spotlightTag.leadPost.slug)}>
                    {messages.common.readLeadArticle}
                  </Link>
                ) : null}
              </div>
            </article>

            <div className="tag-grid tag-grid--showcase">
              {remainingTags.map((tag) => (
                <article className="panel tag-card tag-card--showcase" id={tag.slug} key={tag.slug}>
                  <div className="tag-card-top">
                    <span className="meta-label">{tag.articleCountLabel}</span>
                    {tag.leadPost ? <span className="meta-pill">{messages.common.representativePost}</span> : null}
                  </div>
                  <h2 className="card-title">{tag.name}</h2>
                  <p className="metric-detail tag-card-summary">{tag.leadExcerpt}</p>
                  {tag.leadPost ? (
                    <Link className="tag-card-lead-link" href={getBlogPostPath(normalizedLocale, tag.leadPost.slug)}>
                      {tag.leadPost.title}
                    </Link>
                  ) : null}
                  <div className="tag-card-footer">
                    <Link className="button-link button-link--secondary" href={getTagArchivePath(normalizedLocale, tag.slug)}>
                      {messages.common.openArchive}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}