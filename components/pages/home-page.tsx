import type { Metadata } from "next";
import { HeroPanel } from "@/components/hero-panel";
import { HomeTagExplorer } from "@/components/home-tag-explorer";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { buildHomePageCopy } from "@/lib/page-copy";
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
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 2);
  const recentPosts = allPosts.slice(0, 3);
  const tags = getTagSummaries();
  const homeCopy = buildHomePageCopy(normalizedLocale, allPosts, tags);

  return (
    <>
      <section className="hero-grid home-hero-grid home-hero-grid--solo">
        <HeroPanel locale={normalizedLocale} hero={homeCopy.hero} />
      </section>

      <section className="section home-section home-section--featured">
        <SectionHeading kicker={messages.home.featured.kicker} title={homeCopy.featured.title} copy={homeCopy.featured.copy} />
        <div className="post-list home-stagger home-stagger--cards">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} locale={normalizedLocale} post={post} />
          ))}
        </div>
      </section>

      <section className="content-grid section home-section home-section--secondary">
        <div>
          <SectionHeading kicker={messages.home.latest.kicker} title={homeCopy.latest.title} copy={homeCopy.latest.copy} />
          <div className="post-list home-stagger home-stagger--cards">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} locale={normalizedLocale} post={post} />
            ))}
          </div>
        </div>
        <div className="home-side-stack">
          <SearchBar locale={normalizedLocale} />
          <div className="section-band section home-tag-band">
            <SectionHeading kicker={messages.home.tags.kicker} title={homeCopy.tags.title} copy={homeCopy.tags.copy} />
            <HomeTagExplorer locale={normalizedLocale} tags={tags} topicLabel={messages.common.topic} countSuffix={homeCopy.tags.cardCountSuffix} />
          </div>
        </div>
      </section>
    </>
  );
}