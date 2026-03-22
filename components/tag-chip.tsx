import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getBlogTagFilterPath } from "@/lib/site";

export function TagChip({ label, locale = DEFAULT_LOCALE }: { label: string; locale?: string }) {
  return (
    <Link className="tag-chip" href={getBlogTagFilterPath(locale, label)}>
      {label}
    </Link>
  );
}