import Link from "next/link";

export function TagChip({ label }: { label: string }) {
  return (
    <Link className="tag-chip" href={`/tags#${label}`}>
      {label}
    </Link>
  );
}

