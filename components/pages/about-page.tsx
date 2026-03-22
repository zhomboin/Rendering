import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { getLocalizedRoute } from "@/lib/site";
import { getSiteSocialImageUrl, getSocialImageSize } from "@/lib/seo";

function hasText(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getAboutPageMetadata(locale = DEFAULT_LOCALE): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const canonicalPath = getLocalizedPath("/about", normalizedLocale);
  const socialImage = getSiteSocialImageUrl(normalizedLocale);
  const socialImageSize = getSocialImageSize();

  return {
    title: messages.about.metadataTitle,
    description: messages.about.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates("/about")
    },
    openGraph: {
      type: "website",
      title: `${messages.about.metadataTitle} ${messages.site.name}`,
      description: messages.about.metadataDescription,
      locale: messages.locale.ogLocale,
      url: canonicalPath,
      images: [
        {
          url: socialImage,
          ...socialImageSize,
          alt: `${messages.site.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${messages.about.metadataTitle} ${messages.site.name}`,
      description: messages.about.metadataDescription,
      images: [socialImage]
    }
  };
}

export function AboutPageContent({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <>
      <section className="section-band">
        {hasText(messages.about.heroKicker) ? <div className="section-kicker">{messages.about.heroKicker}</div> : null}
        {hasText(messages.about.title) ? <h1 className="page-title">{messages.about.title}</h1> : null}
        {hasText(messages.about.intro) ? <p className="page-copy">{messages.about.intro}</p> : null}
      </section>

      <section className="about-grid section">
        <article className="panel about-panel">
          {hasText(messages.about.profileKicker) ? <div className="section-kicker">{messages.about.profileKicker}</div> : null}
          {hasText(messages.about.profileTitle) ? <h2 className="section-title">{messages.about.profileTitle}</h2> : null}
          {messages.about.profileParagraphs.map((paragraph) => (
            <p className="about-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </article>
        <div className="post-list">
          <article className="panel about-panel">
            {hasText(messages.about.principlesKicker) ? <div className="section-kicker">{messages.about.principlesKicker}</div> : null}
            {messages.about.principles.map((principle) => (
              <p className="metric-detail" key={principle}>
                {principle}
              </p>
            ))}
          </article>
          <article className="panel about-panel">
            {hasText(messages.about.nextKicker) ? <div className="section-kicker">{messages.about.nextKicker}</div> : null}
            <div className="post-list">
              <Link className="button-link button-link--primary" href={getLocalizedRoute(normalizedLocale, "/blog")}>
                {messages.about.nextPrimary}
              </Link>
              {hasText(messages.about.nextSecondary) ? (
                <Link className="button-link button-link--secondary" href={getLocalizedRoute(normalizedLocale, "/")}>
                  {messages.about.nextSecondary}
                </Link>
              ) : null}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}