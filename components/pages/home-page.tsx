import type { Metadata } from "next";
import { HeroPanel } from "@/components/hero-panel";
import { MetricPanel } from "@/components/metric-panel";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getFeaturedPosts, getRecentPosts, getTagSummaries } from "@/lib/content";
import { DEFAULT_LOCALE, getLocalizedAlternates, getLocalizedPath, getMessages, normalizeLocale } from "@/lib/i18n";
import { getSiteMetrics } from "@/lib/site";

export function getHomePageMetadata(locale = DEFAULT_LOCALE): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const canonicalPath = getLocalizedPath("/", normalizedLocale);

  return {
    title: messages.home.metadataTitle,
    description: messages.home.metadataDescription,
    alternates: {
      canonical: canonicalPath,
      languages: getLocalizedAlternates("/")
    },
    openGraph: {
      title: messages.site.name,
      description: messages.home.metadataDescription,
      locale: messages.locale.ogLocale,
      url: canonicalPath
    },
    twitter: {
      title: messages.site.name,
      description: messages.home.metadataDescription
    }
  };
}

export function HomePageContent({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(3);
  const allPosts = getAllPosts();
  const tags = getTagSummaries();
  const metrics = getSiteMetrics(normalizedLocale, {
    postCount: allPosts.length,
    tagCount: tags.length
  });

  return (
    <>
      <section className="hero-grid home-hero-grid">
        <HeroPanel locale={normalizedLocale} />
        <div className="metric-grid home-stagger home-stagger--metrics">
          {metrics.map((metric) => (
            <MetricPanel key={metric.label} detail={metric.detail} label={metric.label} value={metric.value} />
          ))}
        </div>
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
                <article className="panel tag-card" id={tag.slug} key={tag.slug}>
                  <div className="meta-label">{messages.common.topic}</div>
                  <h3 className="card-title">{tag.name}</h3>
                  <p className="metric-detail">
                    {normalizedLocale === "zh"
                      ? `${tag.count} ${messages.home.tags.cardCountSuffix}`
                      : `${tag.count} ${messages.home.tags.cardCountSuffix}`}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}