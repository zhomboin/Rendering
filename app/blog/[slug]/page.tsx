import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleMeta } from "@/components/article-meta";
import { mdxComponents } from "@/components/mdx-components";
import { PrevNextNav } from "@/components/prev-next-nav";
import { ReadingProgress } from "@/components/reading-progress";
import { TocPanel } from "@/components/toc-panel";
import { getAdjacentPosts, getAllPostSlugs, getPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found"
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.metadata.publishedAt,
      tags: post.metadata.tags
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const adjacent = getAdjacentPosts(post.slug);
  const Content = post.Content;
  const articleId = `article-${post.slug}`;

  return (
    <>
      <ReadingProgress targetId={articleId} />

      <section className="section-band article-header-band">
        <div className="article-headline-row">
          <div className="section-kicker">Story Capsule</div>
          <span className="meta-pill">{post.metadata.coverLabel}</span>
        </div>
        <h1 className="article-title" data-pagefind-meta="title">
          {post.metadata.title}
        </h1>
        <p className="article-intro">{post.metadata.description}</p>
        <p data-pagefind-meta="tags" hidden>
          {post.metadata.tags.join(", ")}
        </p>
        <ArticleMeta publishedAt={post.metadata.publishedAt} readingTime={post.metadata.readingTime} tags={post.metadata.tags} />
      </section>

      <section className="article-layout section">
        <article className="article-shell article-body mdx-body" id={articleId}>
          <Content components={mdxComponents} />
          <PrevNextNav next={adjacent.next} previous={adjacent.previous} />
        </article>
        <TocPanel sections={post.headings} />
      </section>
    </>
  );
}
