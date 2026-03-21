"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedPath, getMessages, getOppositeLocale, normalizeLocale } from "@/lib/i18n";

export function LanguageToggle({ locale }: { locale: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const pathname = usePathname() || "/";
  const targetLocale = getOppositeLocale(normalizedLocale);
  const messages = getMessages(normalizedLocale);
  const targetMessages = getMessages(targetLocale);
  const href = getLocalizedPath(pathname, targetLocale);

  return (
    <Link aria-label={`${messages.language.label}: ${targetMessages.locale.label}`} className="language-toggle" href={href}>
      <span className="theme-toggle-copy">
        <span className="theme-toggle-kicker">{messages.language.label}</span>
        <span className="language-toggle-value">{messages.locale.label}</span>
      </span>
      <span aria-hidden="true" className="language-toggle-pill">
        {targetMessages.locale.label}
      </span>
    </Link>
  );
}