import { TagChip } from "@/components/tag-chip";

export function ArticleMeta({
  publishedAt,
  readingTime,
  tags
}: {
  publishedAt: string;
  readingTime: string;
  tags: string[];
}) {
  return (
    <div className="article-meta">
      <div className="inline-list">
        <span className="meta-pill">Published {publishedAt}</span>
        <span className="meta-pill">{readingTime}</span>
      </div>
      <div className="article-tags">
        {tags.map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
