import { Suspense } from "react";
import { RouteProgressBar } from "@/components/route-progress-bar";
import { SearchModal } from "@/components/search-modal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildSiteJsonLd } from "@/lib/seo";

export function LocaleShell({ children, locale }: { children: React.ReactNode; locale: string }) {
  const siteJsonLd = buildSiteJsonLd(locale);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd.website) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd.person) }} type="application/ld+json" />
      <div className="shell">
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <SiteHeader locale={locale} />
        <main
          data-pagefind-body={locale === "zh" ? true : undefined}
          data-pagefind-ignore={locale === "en" ? "all" : undefined}
          id="site-content"
          tabIndex={-1}
        >
          {children}
        </main>
        <SiteFooter locale={locale} />
        <SearchModal locale={locale} />
      </div>
    </>
  );
}
