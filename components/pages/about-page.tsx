import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";

export function getAboutPageMetadata(locale = DEFAULT_LOCALE): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const canonicalPath = getLocalizedPath("/about", normalizedLocale);

  return {
    title: messages.about.metadataTitle,
    description: messages.about.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates("/about")
    },
    openGraph: {
      title: `${messages.about.metadataTitle} ${messages.site.name}`,
      description: messages.about.metadataDescription,
      locale: messages.locale.ogLocale,
      url: canonicalPath
    },
    twitter: {
      title: `${messages.about.metadataTitle} ${messages.site.name}`,
      description: messages.about.metadataDescription
    }
  };
}

export function AboutPageContent({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <>
      <section className="section-band">
        <div className="section-kicker">{messages.about.heroKicker}</div>
        <h1 className="page-title">{messages.about.title}</h1>
        <p className="page-copy">{messages.about.intro}</p>
      </section>

      <section className="about-grid section">
        <article className="panel about-panel">
          <div className="section-kicker">{messages.about.profileKicker}</div>
          <h2 className="section-title">{messages.about.profileTitle}</h2>
          {messages.about.profileParagraphs.map((paragraph) => (
            <p className="about-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </article>
        <div className="post-list">
          <article className="panel about-panel">
            <div className="section-kicker">{messages.about.principlesKicker}</div>
            {messages.about.principles.map((principle) => (
              <p className="metric-detail" key={principle}>
                {principle}
              </p>
            ))}
          </article>
          <article className="panel about-panel">
            <div className="section-kicker">{messages.about.nextKicker}</div>
            <div className="post-list">
              <Link className="button-link button-link--primary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
                {messages.about.nextPrimary}
              </Link>
              <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/tags")}>
                {messages.about.nextSecondary}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}