import Link from "next/link";
import { TagChip } from "@/components/tag-chip";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  coverLabel: string;
  tags: string[];
};

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="card-label">{post.coverLabel}</span>
        <span className="meta-pill">{post.readingTime}</span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="card-title">{post.title}</h3>
      </Link>
      <p className="card-excerpt">{post.excerpt}</p>
      <div className="card-meta">
        <div className="tag-row">
          {post.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
        <span className="meta-pill">{post.publishedAt}</span>
      </div>
    </article>
  );
}

