import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleMeta } from "@/components/article-meta";
import { getMdxComponents } from "@/components/mdx-components";
import { PrevNextNav } from "@/components/prev-next-nav";
import { TocPanel } from "@/components/toc-panel";
import { getAdjacentPosts, getPostBySlug } from "@/lib/content";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { TableOfContents } from "@/components/table-of-contents";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { buildArticleJsonLd, getArticleSocialImageUrl, getSocialImageSize } from "@/lib/seo";

export async function getBlogDetailPageMetadata(locale = DEFAULT_LOCALE, slug: string): Promise<Metadata> {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: normalizedLocale === "zh" ? "未找到文章" : "Article Not Found"
    };
  }

  const canonicalPath = getLocalizedPath(`/blog/${post.slug}`, normalizedLocale);
  const socialImage = getArticleSocialImageUrl(normalizedLocale, {
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    readingTime: post.metadata.readingTime
  });
  const socialImageSize = getSocialImageSize();

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates(`/blog/${post.slug}`)
    },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      locale: messages.locale.ogLocale,
      url: canonicalPath,
      publishedTime: post.metadata.publishedAt,
      tags: post.metadata.tags,
      images: [
        {
          url: socialImage,
          ...socialImageSize,
          alt: `${post.metadata.title} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [socialImage]
    }
  };
}

export async function BlogDetailPageContent({ locale = DEFAULT_LOCALE, slug }: { locale?: string; slug: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const adjacent = getAdjacentPosts(post.slug);
  const Content = post.Content;
  const articleId = `article-${post.slug}`;
  const articleJsonLd = buildArticleJsonLd({ ...post.metadata, slug: post.slug }, normalizedLocale);
  const mdxComponents = getMdxComponents(normalizedLocale);

  return (
    <>
      <ReadingProgressBar />
      <TableOfContents toc={post.headings} locale={normalizedLocale} messages={messages} />

      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} type="application/ld+json" />

      <div className="article-page">
        <section className="section-band article-header-band">
          <div className="article-content-column article-header-inner">
            <div className="article-headline-row">
              <div className="section-kicker">{messages.article.storyCapsule}</div>
              <span className="meta-pill">{post.metadata.coverLabel}</span>
            </div>
            <h1 className="article-title" data-pagefind-meta="title">
              {post.metadata.title}
            </h1>
            <p className="article-intro">{post.metadata.description}</p>
            <p data-pagefind-meta="tags" hidden>
              {post.metadata.tags.join(", ")}
            </p>
            <ArticleMeta locale={normalizedLocale} publishedAt={post.metadata.publishedAt} readingTime={post.metadata.readingTime} tags={post.metadata.tags} />
          </div>
        </section>

        <article className="article-shell" id={articleId}>
          <div className="article-content-column article-body mdx-body">
            <Content components={mdxComponents} />
            <PrevNextNav locale={normalizedLocale} next={adjacent.next} previous={adjacent.previous} />
          </div>
        </article>

        <TocPanel locale={normalizedLocale} sections={post.headings} targetId={articleId} />
      </div>
    </>
  );
}
