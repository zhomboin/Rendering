import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { enMessages } from "./messages/en.js";
import { getSiteNavigation } from "./site.js";

const packageJsonPath = path.join(process.cwd(), "package.json");
const localeShellPath = path.join(process.cwd(), "components", "locale-shell.tsx");
const homePagePath = path.join(process.cwd(), "components", "pages", "home-page.tsx");
const blogIndexPagePath = path.join(process.cwd(), "components", "pages", "blog-index-page.tsx");
const heroPanelPath = path.join(process.cwd(), "components", "hero-panel.tsx");
const homeTagExplorerPath = path.join(process.cwd(), "components", "home-tag-explorer.tsx");
const siteFooterPath = path.join(process.cwd(), "components", "site-footer.tsx");
const siteHeaderPath = path.join(process.cwd(), "components", "site-header.tsx");
const tagChipPath = path.join(process.cwd(), "components", "tag-chip.tsx");
const globalsCssPath = path.join(process.cwd(), "app", "globals.css");
const zhNotFoundPath = path.join(process.cwd(), "app", "(zh)", "not-found.tsx");
const enNotFoundPath = path.join(process.cwd(), "app", "en", "not-found.tsx");
const zh503Path = path.join(process.cwd(), "app", "(zh)", "503", "page.tsx");
const en503Path = path.join(process.cwd(), "app", "en", "503", "page.tsx");
const zhTagsPagePath = path.join(process.cwd(), "app", "(zh)", "tags", "page.tsx");
const zhTagArchivePagePath = path.join(process.cwd(), "app", "(zh)", "tags", "[slug]", "page.tsx");
const enTagsPagePath = path.join(process.cwd(), "app", "en", "tags", "page.tsx");
const enTagArchivePagePath = path.join(process.cwd(), "app", "en", "tags", "[slug]", "page.tsx");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const localeShellSource = fs.readFileSync(localeShellPath, "utf8");
const homePageSource = fs.readFileSync(homePagePath, "utf8");
const blogIndexPageSource = fs.readFileSync(blogIndexPagePath, "utf8");
const heroPanelSource = fs.readFileSync(heroPanelPath, "utf8");
const homeTagExplorerSource = fs.readFileSync(homeTagExplorerPath, "utf8");
const siteFooterSource = fs.readFileSync(siteFooterPath, "utf8");
const siteHeaderSource = fs.readFileSync(siteHeaderPath, "utf8");
const tagChipSource = fs.readFileSync(tagChipPath, "utf8");
const globalsCssSource = fs.readFileSync(globalsCssPath, "utf8");
const zhNotFoundSource = fs.readFileSync(zhNotFoundPath, "utf8");
const enNotFoundSource = fs.readFileSync(enNotFoundPath, "utf8");

assert.equal(
  packageJson.scripts.build.includes("npm.cmd"),
  false,
  "build script should stay cross-platform and avoid Windows-only npm.cmd"
);

assert.equal(
  packageJson.scripts.check.includes("npm.cmd"),
  false,
  "check script should stay cross-platform and avoid Windows-only npm.cmd"
);

assert.equal(localeShellSource.includes("skip-link"), false, "locale shell should not render the skip-link anchor");
assert.equal(localeShellSource.includes("Skip to content"), false, "locale shell should not keep the English skip-link copy");
assert.equal(localeShellSource.includes("\u8df3\u5230\u6b63\u6587"), false, "locale shell should not keep the Chinese skip-link copy");

assert.deepEqual(
  getSiteNavigation("en").map((item) => item.href),
  ["/en", "/en/blog", "/en/about"],
  "site navigation should keep only home, blog, and about routes"
);

assert.equal(siteFooterSource.includes('href={getLocalizedRoute(normalizedLocale, "/tags")}'), false, "footer should not link to a standalone tags page");
assert.equal(siteFooterSource.includes("messages.footer.tags"), false, "footer should not depend on a tags label anymore");

assert.equal(homePageSource.includes("MetricPanel"), false, "home page should no longer render the metric cards beside the hero");
assert.equal(homePageSource.includes("getSiteMetrics"), false, "home page should no longer depend on site metrics for the lead area");

assert.equal(blogIndexPageSource.includes("archive-signal-band"), false, "blog page should remove the quick-signals section");
assert.equal(blogIndexPageSource.includes("openTagArchive"), false, "blog page should stop pointing readers to dedicated tag archive pages");
assert.equal(blogIndexPageSource.includes("openTagMap"), false, "blog page should stop pointing readers to a standalone tags map");
assert.equal(blogIndexPageSource.includes("getTagArchivePath"), false, "blog page should not rely on tag archive paths anymore");

assert.equal(tagChipSource.includes("getBlogTagFilterPath"), true, "tag chips should route readers into blog query filtering");
assert.equal(tagChipSource.includes("getTagArchivePath"), false, "tag chips should stop depending on removed tag archive paths");

assert.equal(globalsCssSource.includes(".hero-panel .hero-title"), true, "hero card should explicitly remove the desktop title width cap");
assert.equal(globalsCssSource.includes(".hero-panel .hero-copy"), true, "hero card should explicitly remove the desktop copy width cap");
assert.equal(globalsCssSource.includes("max-width: none;"), true, "hero card text width overrides should remove hard max-width limits");

assert.equal(fs.existsSync(zhTagsPagePath), false, "Chinese standalone tags page should be removed");
assert.equal(fs.existsSync(zhTagArchivePagePath), false, "Chinese standalone tag archive page should be removed");
assert.equal(fs.existsSync(enTagsPagePath), false, "English standalone tags page should be removed");
assert.equal(fs.existsSync(enTagArchivePagePath), false, "English standalone tag archive page should be removed");

assert.equal(fs.existsSync(zh503Path), true, "Chinese 503 page should exist");
assert.equal(fs.existsSync(en503Path), true, "English 503 page should exist");
assert.equal(siteHeaderSource.includes('usePathname'), true, "site header should read the current pathname to mark the active nav item");
assert.equal(siteHeaderSource.includes('aria-current'), true, "site header should expose aria-current on the active nav item");
assert.equal(globalsCssSource.includes('.nav-link--active'), true, "styles should include an active-state treatment for nav links");
assert.equal(homePageSource.includes("buildHomePageCopy"), true, "home page should build visible copy from the page-copy helper");
assert.equal(homePageSource.includes("hero={homeCopy.hero}"), true, "home page should pass the dynamic hero model into the hero panel");
assert.equal(homePageSource.includes("HomeTagExplorer"), true, "home page should render tags through a dedicated collapsible tag explorer");
assert.equal(homeTagExplorerSource.includes("useState"), true, "home tag explorer should manage expanded state on the client");
assert.equal(homeTagExplorerSource.includes("aria-expanded"), true, "home tag explorer should expose expanded state for the toggle button");
assert.equal(homeTagExplorerSource.includes("aria-label"), true, "home tag explorer should keep an accessible label even when the toggle becomes icon-only");
assert.equal(homeTagExplorerSource.includes("home-tag-toggle-icon"), true, "home tag explorer should render a dedicated double-arrow icon for the toggle");
assert.equal(homeTagExplorerSource.includes("tags.length <= collapsedCount"), true, "home tag explorer should hide the toggle when there are not enough tags to collapse");
assert.equal(heroPanelSource.includes("hero?:"), true, "hero panel should accept a dynamic hero content override");
assert.equal(blogIndexPageSource.includes("buildBlogArchiveCopy"), true, "blog archive page should still build hero and filter-summary copy from the page-copy helper");
assert.equal(blogIndexPageSource.includes("archive-guide"), false, "blog archive page should remove the article-guide card");
assert.equal(blogIndexPageSource.includes("messages.blogArchive.filterKicker"), false, "blog archive filter panel should not render a heading label above the tags");
assert.equal(blogIndexPageSource.includes("archiveCopy.filter.title"), false, "blog archive filter panel should not render a title above the tags");
assert.equal(blogIndexPageSource.includes("archiveCopy.filter.copy"), false, "blog archive filter panel should not render a description above the tags");
assert.equal(blogIndexPageSource.includes("SectionHeading"), false, "blog archive page should not render a featured-section heading block anymore");
assert.equal(blogIndexPageSource.includes("archiveCopy.featured.title"), false, "blog archive page should not render featured-section title copy above the cards");
assert.equal(blogIndexPageSource.includes("archiveCopy.stack.title"), false, "blog archive page should not render archive-stack title copy above the cards");
assert.equal(blogIndexPageSource.includes("getTagSummaries"), true, "blog archive should keep using real tag summaries from the content repository");
assert.equal(blogIndexPageSource.includes("getTagDiscoverySummaries"), false, "blog archive should not switch the tag area into article-summary cards");
assert.equal(blogIndexPageSource.includes("tagLink.latestPostTitle"), false, "blog archive tag entries should not render representative article titles");
assert.equal(blogIndexPageSource.includes("tagLink.latestPublishedAt"), false, "blog archive tag entries should not render representative article dates");
assert.equal(globalsCssSource.includes(".archive-filter-chip-copy"), false, "styles should not reserve subtitle slots when only tag names and counts are shown");
assert.equal(globalsCssSource.includes(".archive-filter-chip-date"), false, "styles should not reserve date slots when only tag names and counts are shown");
assert.equal(globalsCssSource.includes(".archive-hero-band .page-copy"), true, "archive hero card should explicitly widen its description copy to fit the card");
assert.equal(globalsCssSource.includes(".home-tag-toggle-icon"), true, "styles should define the icon-only tag toggle treatment");
assert.equal(zhNotFoundSource.includes('href={getLocalizedRoute("zh", "/")}'), true, "Chinese 404 page should keep a back-home action");
assert.equal(enNotFoundSource.includes('href={getLocalizedRoute("en", "/")}'), true, "English 404 page should keep a back-home action");
assert.equal(fs.readFileSync(zh503Path, "utf8").includes('href={getLocalizedRoute("zh", "/")}'), true, "Chinese 503 page should include a back-home action");
assert.equal(fs.readFileSync(en503Path, "utf8").includes('href={getLocalizedRoute("en", "/")}'), true, "English 503 page should include a back-home action");

assert.equal(enMessages.search.copy, "", "English messages should mirror the simplified empty search copy");
assert.equal(enMessages.home.latest.copy, "", "English messages should mirror the simplified empty latest-section copy");
assert.equal(enMessages.about.intro, "", "English messages should mirror the simplified empty about intro");
assert.equal(enMessages.blogArchive.heroCopy, "", "English messages should mirror the simplified empty blog hero copy");
assert.equal(enMessages.blogArchive.guideTitle, "", "English messages should mirror the simplified empty blog guide title");
assert.equal(enMessages.blogArchive.filterTitle, "", "English messages should mirror the simplified empty blog filter title");
assert.equal(enMessages.blogArchive.featuredTitle, "", "English messages should mirror the simplified empty featured-stack title");
assert.equal(enMessages.blogArchive.stackTitle, "", "English messages should mirror the simplified empty archive-stack title");

console.log("tooling assertions passed");
