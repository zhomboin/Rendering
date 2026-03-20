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

type PostCardVariant = "default" | "featured" | "archive";

export function PostCard({
  post,
  variant = "default",
  spotlight = false
}: {
  post: PostCardData;
  variant?: PostCardVariant;
  spotlight?: boolean;
}) {
  const isDefault = variant === "default";
  const label = variant === "featured" ? (spotlight ? "Lead Story" : "Fresh Pick") : post.coverLabel;
  const topMeta = isDefault ? post.readingTime : post.publishedAt;
  const bottomMeta = isDefault ? post.publishedAt : post.readingTime;
  const cardClassName = [
    "card",
    "post-card",
    `post-card--${variant}`,
    spotlight ? "post-card--spotlight" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      <div className="card-top">
        <span className="card-label">{label}</span>
        <span className="meta-pill">{topMeta}</span>
      </div>
      <Link className="card-link" href={`/blog/${post.slug}`}>
        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">{post.excerpt}</p>
        {isDefault ? null : (
          <span className="post-card-cta">
            {variant === "archive" ? "Read note" : "Read article"}
            <span aria-hidden="true" className="post-card-cta-arrow">
              →
            </span>
          </span>
        )}
      </Link>
      <div className="card-meta">
        <div className="tag-row post-card-tags">
          {post.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
        <span className="meta-pill">{bottomMeta}</span>
      </div>
    </article>
  );
}