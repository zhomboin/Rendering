import Link from "next/link";
import { DEFAULT_LOCALE, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";

export function HeroPanel({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const hero = messages.home.hero;

  return (
    <section className="panel hero-panel">
      <div className="hero-kicker">{hero.kicker}</div>
      <h1 className="hero-title">{hero.title}</h1>
      <p className="hero-copy">{hero.copy}</p>
      <div className="hero-badges">
        {hero.badges.map((badge) => (
          <span className="hero-badge" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <div className="hero-actions section">
        <Link className="button-link button-link--primary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
          {hero.primaryAction}
        </Link>
        <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/about")}>
          {hero.secondaryAction}
        </Link>
      </div>
    </section>
  );
}