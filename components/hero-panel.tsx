import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";

type HeroContent = {
  kicker?: string;
  title?: string;
  copy?: string;
  badges?: string[];
  primaryAction?: string;
  secondaryAction?: string;
};

export function HeroPanel({ locale = DEFAULT_LOCALE, hero }: { locale?: string; hero?: HeroContent }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const heroMessages = messages.home.hero;
  const resolvedHero = {
    ...heroMessages,
    ...hero,
    badges: hero?.badges ?? heroMessages.badges
  };

  return (
    <section className="panel hero-panel">
      <div className="hero-kicker">{resolvedHero.kicker}</div>
      <h1 className="hero-title">{resolvedHero.title}</h1>
      <p className="hero-copy">{resolvedHero.copy}</p>
      <div className="hero-badges">
        {(resolvedHero.badges ?? []).filter(Boolean).map((badge) => (
          <span className="hero-badge" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <div className="hero-actions section">
        <Link className="button-link button-link--primary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
          {resolvedHero.primaryAction}
        </Link>
        <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/about")}>
          {resolvedHero.secondaryAction}
        </Link>
      </div>
    </section>
  );
}