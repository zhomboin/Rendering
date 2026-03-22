import type { Metadata } from "next";
import Link from "next/link";
import { HeroPanel } from "@/components/hero-panel";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedPosts, getRecentPosts, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { getBlogTagFilterPath } from "@/lib/site";
import { getSiteSocialImageUrl, getSocialImageSize } from "@/lib/seo";

export function getHomePageMetadata(locale = DEFAULT_LOCALE): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const canonicalPath = getLocalizedPath("/", normalizedLocale);
  const socialImage = getSiteSocialImageUrl(normalizedLocale);
  const socialImageSize = getSocialImageSize();

  return {
    title: messages.home.metadataTitle,
    description: messages.home.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates("/")
    },
    openGraph: {
      type: "website",
      title: messages.site.name,
      description: messages.home.metadataDescription,
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
      title: messages.site.name,
      description: messages.home.metadataDescription,
      images: [socialImage]
    }
  };
}

export function HomePageContent({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(3);
  const tags = getTagSummaries();

  return (
    <>
      <section className="hero-grid home-hero-grid home-hero-grid--solo">
        <HeroPanel locale={normalizedLocale} />
      </section>

      <section className="section home-section home-section--featured">
        <SectionHeading
          kicker={messages.home.featured.kicker}
          title={messages.home.featured.title}
          copy={messages.home.featured.copy}
        />
        <div className="post-list home-stagger home-stagger--cards">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} locale={normalizedLocale} post={post} />
          ))}
        </div>
      </section>

      <section className="content-grid section home-section home-section--secondary">
        <div>
          <SectionHeading
            kicker={messages.home.latest.kicker}
            title={messages.home.latest.title}
            copy={messages.home.latest.copy}
          />
          <div className="post-list home-stagger home-stagger--cards">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} locale={normalizedLocale} post={post} />
            ))}
          </div>
        </div>
        <div className="home-side-stack">
          <SearchBar locale={normalizedLocale} />
          <div className="section-band section home-tag-band">
            <SectionHeading
              kicker={messages.home.tags.kicker}
              title={messages.home.tags.title}
              copy={messages.home.tags.copy}
            />
            <div className="tag-grid home-stagger home-stagger--tags">
              {tags.map((tag) => (
                <Link className="panel tag-card tag-card--link" href={getBlogTagFilterPath(normalizedLocale, tag.slug)} id={tag.slug} key={tag.slug}>
                  <div className="meta-label">{messages.common.topic}</div>
                  <h3 className="card-title">{tag.name}</h3>
                  <p className="metric-detail">{`${tag.count} ${messages.home.tags.cardCountSuffix}`}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}