import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getTagArchivePath } from "@/lib/site";

export function TagChip({ label, locale = DEFAULT_LOCALE }: { label: string; locale?: string }) {
  return (
    <Link className="tag-chip" href={getTagArchivePath(locale, encodeURIComponent(label))}>
      {label}
    </Link>
  );
}