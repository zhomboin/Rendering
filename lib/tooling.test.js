import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { enMessages } from "./messages/en.js";
import { getSiteNavigation } from "./site.js";

const packageJsonPath = path.join(process.cwd(), "package.json");
const localeShellPath = path.join(process.cwd(), "components", "locale-shell.tsx");
const homePagePath = path.join(process.cwd(), "components", "pages", "home-page.tsx");
const mdxComponentsPath = path.join(process.cwd(), "components", "mdx-components.tsx");
const blogIndexPagePath = path.join(process.cwd(), "components", "pages", "blog-index-page.tsx");
const heroPanelPath = path.join(process.cwd(), "components", "hero-panel.tsx");
const articleCodeBlockPath = path.join(process.cwd(), "components", "article-code-block.tsx");
const homeTagExplorerPath = path.join(process.cwd(), "components", "home-tag-explorer.tsx");
const siteFooterPath = path.join(process.cwd(), "components", "site-footer.tsx");
const footerRssButtonPath = path.join(process.cwd(), "components", "footer-rss-button.tsx");
const siteHeaderPath = path.join(process.cwd(), "components", "site-header.tsx");
const archiveMobileFilterPath = path.join(process.cwd(), "components", "archive-mobile-filter.tsx");
const routeProgressBarPath = path.join(process.cwd(), "components", "route-progress-bar.tsx");
const searchTriggerPath = path.join(process.cwd(), "components", "search-trigger.tsx");
const searchModalPath = path.join(process.cwd(), "components", "search-modal.tsx");
const languageTogglePath = path.join(process.cwd(), "components", "language-toggle.tsx");
const themeTogglePath = path.join(process.cwd(), "components", "theme-toggle.tsx");
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
const ciWorkflowPath = path.join(process.cwd(), ".github", "workflows", "ci.yml");
const contentRepositoryTestPath = path.join(process.cwd(), "lib", "content-repository.test.js");
const publishingSurfacesTestPath = path.join(process.cwd(), "lib", "publishing-surfaces.test.js");
const archiveModelsTestPath = path.join(process.cwd(), "lib", "archive-models.test.js");
const siteStateTestPath = path.join(process.cwd(), "lib", "site-state.test.js");
const deployScriptPath = path.join(process.cwd(), "deploy", "rendering-deploy.sh");
const deployEnvExamplePath = path.join(process.cwd(), "deploy", "rendering-deploy.env.example");
const webEnvExamplePath = path.join(process.cwd(), "deploy", "rendering-web.env.example");
const webServicePath = path.join(process.cwd(), "deploy", "rendering-web.service");
const deployServicePath = path.join(process.cwd(), "deploy", "rendering-deploy.service");
const deployTimerPath = path.join(process.cwd(), "deploy", "rendering-deploy.timer");
const deployGuidePath = path.join(process.cwd(), "docs", "linux-systemd-deployment.zh-CN.md");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const localeShellSource = fs.readFileSync(localeShellPath, "utf8");
const homePageSource = fs.readFileSync(homePagePath, "utf8");
const mdxComponentsSource = fs.readFileSync(mdxComponentsPath, "utf8");
const blogIndexPageSource = fs.readFileSync(blogIndexPagePath, "utf8");
const heroPanelSource = fs.readFileSync(heroPanelPath, "utf8");
const articleCodeBlockSource = fs.existsSync(articleCodeBlockPath) ? fs.readFileSync(articleCodeBlockPath, "utf8") : "";
const homeTagExplorerSource = fs.readFileSync(homeTagExplorerPath, "utf8");
const siteFooterSource = fs.readFileSync(siteFooterPath, "utf8");
const footerRssButtonSource = fs.existsSync(footerRssButtonPath) ? fs.readFileSync(footerRssButtonPath, "utf8") : "";
const siteHeaderSource = fs.readFileSync(siteHeaderPath, "utf8");
const archiveMobileFilterSource = fs.readFileSync(archiveMobileFilterPath, "utf8");
const routeProgressBarSource = fs.readFileSync(routeProgressBarPath, "utf8");
const searchTriggerSource = fs.readFileSync(searchTriggerPath, "utf8");
const searchModalSource = fs.readFileSync(searchModalPath, "utf8");
const languageToggleSource = fs.readFileSync(languageTogglePath, "utf8");
const themeToggleSource = fs.readFileSync(themeTogglePath, "utf8");
const tagChipSource = fs.readFileSync(tagChipPath, "utf8");
const globalsCssSource = fs.readFileSync(globalsCssPath, "utf8");
const zhNotFoundSource = fs.readFileSync(zhNotFoundPath, "utf8");
const enNotFoundSource = fs.readFileSync(enNotFoundPath, "utf8");
const ciWorkflowSource = fs.readFileSync(ciWorkflowPath, "utf8");
const deployTimerSource = fs.readFileSync(deployTimerPath, "utf8");

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
assert.equal(localeShellSource.includes("RouteProgressBar"), true, "locale shell should mount the shared route progress bar");
assert.equal(localeShellSource.includes("Suspense fallback={null}"), true, "route progress bar should stay behind a suspense boundary");
assert.equal(routeProgressBarSource.includes("useSearchParams"), true, "route progress bar should watch search-parameter transitions");
assert.equal(globalsCssSource.includes(".route-progress"), true, "styles should define the top route progress bar");

assert.deepEqual(
  getSiteNavigation("en").map((item) => item.href),
  ["/en", "/en/blog", "/en/about"],
  "site navigation should keep only home, blog, and about routes"
);

assert.equal(siteFooterSource.includes('href={getLocalizedRoute(normalizedLocale, "/tags")}'), false, "footer should not link to a standalone tags page");
assert.equal(siteFooterSource.includes("messages.footer.tags"), false, "footer should not depend on a tags label anymore");
assert.equal(siteFooterSource.includes("https://github.com/zhomboin/Rendering"), true, "footer should link to the public GitHub repository");
assert.equal(siteFooterSource.includes("getFeedUrl"), true, "footer should resolve the canonical RSS feed URL before handing it to the copy action");
assert.equal(siteFooterSource.includes("FooterRssButton"), true, "footer should render the dedicated RSS copy action");
assert.equal(fs.existsSync(footerRssButtonPath), true, "footer should expose a dedicated RSS copy button component");
assert.equal(siteFooterSource.includes("FooterRssButton"), true, "footer should mount the dedicated RSS copy button");
assert.equal(footerRssButtonSource.includes("navigator.clipboard.writeText"), true, "RSS footer action should copy the feed URL via the clipboard API");
assert.equal(footerRssButtonSource.includes("Copied"), true, "RSS footer action should surface a copied-state tooltip label");
assert.equal(siteFooterSource.includes("footer-icon-link"), true, "footer should render icon links for footer actions");
assert.equal(siteFooterSource.includes("AboutIcon"), true, "footer should render an icon link for the about action too");
assert.equal(siteFooterSource.includes("data-tooltip"), true, "footer icon links should expose tooltip copy for hover and focus states");
assert.equal(globalsCssSource.includes(".footer-icon-link"), true, "styles should define the footer icon-link treatment");
assert.equal(globalsCssSource.includes(".footer-icon-link::after"), true, "styles should define a tooltip bubble for footer icon links");
assert.equal(globalsCssSource.includes(".footer-icon-link::before"), true, "styles should add a gloss layer to the footer icon links");
assert.equal(globalsCssSource.includes(".footer-icon-link:hover"), true, "styles should give footer icon links a dedicated hover treatment");
assert.equal(globalsCssSource.includes(`.footer-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;`), true, "footer icon buttons should center their icon content");
assert.equal(globalsCssSource.includes(`.footer-icon {
  display: block;`), true, "footer icons should render as block-level glyphs inside the buttons");
assert.equal(globalsCssSource.includes("width: 1.48rem;"), true, "footer icons should grow to fill more of the button area");

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
assert.equal(searchTriggerSource.includes("search-trigger-icon"), true, "search trigger should expose a dedicated icon span for compact mobile treatment");
assert.equal(searchTriggerSource.includes("search-trigger-label"), true, "search trigger should expose a dedicated label span for mobile-only hiding");
assert.equal(searchTriggerSource.includes("aria-label={messages.search.trigger}"), true, "search trigger should expose an explicit accessible label when mobile UI collapses to an icon");
assert.equal(languageToggleSource.includes("language-toggle-compact"), true, "language toggle should render a compact mobile label");
assert.equal(languageToggleSource.includes("const compactLabel = getCompactLocaleLabel(targetLocale);"), true, "language toggle compact label should collapse to the target locale only on mobile");
assert.equal(themeToggleSource.includes("theme-toggle-copy"), true, "theme toggle should keep a copy wrapper that can collapse on mobile");
assert.equal(globalsCssSource.includes('.nav-link--active'), true, "styles should include an active-state treatment for nav links");
assert.equal(globalsCssSource.includes(".search-trigger-icon"), true, "styles should define the compact search icon treatment");
assert.equal(globalsCssSource.includes(".search-shortcuts-row {\n    display: none;"), true, "mobile search modal should hide desktop keyboard shortcut hints");
assert.equal(globalsCssSource.includes(".search-trigger {\n    width: 40px;"), true, "mobile search trigger should stay visually obvious as a magnifier button");
assert.equal(searchModalSource.includes("search-close-icon"), true, "search modal close button should render a dedicated icon instead of plain text");
assert.equal(globalsCssSource.includes(".search-close-icon"), true, "styles should define the icon treatment for the search modal close button");
assert.equal(globalsCssSource.includes(".language-toggle-compact"), true, "styles should define the compact language toggle treatment");
assert.equal(globalsCssSource.includes(".header-controls {\n    width: auto;"), true, "small-screen header controls should collapse back into a single horizontal row");
assert.equal(globalsCssSource.includes("flex-direction: row;"), true, "small-screen header controls should switch back to a row direction");
assert.equal(globalsCssSource.includes(".brand-mark {\n    display: none;"), true, "small-screen header should hide the brand kicker and keep only the Rendering wordmark");
assert.equal(globalsCssSource.includes("white-space: nowrap;"), true, "small-screen nav pills should keep their labels on a single line");
assert.equal(homePageSource.includes("buildHomePageCopy"), true, "home page should build visible copy from the page-copy helper");
assert.equal(homePageSource.includes("hero={homeCopy.hero}"), true, "home page should pass the dynamic hero model into the hero panel");
assert.equal(fs.existsSync(articleCodeBlockPath), true, "article code block component should exist for MDX code-block controls");
assert.equal(articleCodeBlockSource.includes("navigator.clipboard.writeText"), true, "article code block should render a copy button using the clipboard API");
assert.equal(articleCodeBlockSource.includes("article-code-language"), true, "article code block should render a visible language label");
assert.equal(mdxComponentsSource.includes("ArticleCodeBlock"), true, "MDX components should route fenced code blocks through the dedicated article code block component");
assert.equal(globalsCssSource.includes(".article-code-toolbar"), true, "styles should define the code-block toolbar");
assert.equal(globalsCssSource.includes(".article-code-copy"), true, "styles should define the code-block copy button");
assert.equal(globalsCssSource.includes(".article-code-language"), true, "styles should define the code-block language label");
assert.equal(homePageSource.includes("HomeTagExplorer"), true, "home page should render tags through a dedicated collapsible tag explorer");
assert.equal(homeTagExplorerSource.includes("useState"), true, "home tag explorer should manage expanded state on the client");
assert.equal(homeTagExplorerSource.includes("aria-expanded"), true, "home tag explorer should expose expanded state for the toggle button");
assert.equal(homeTagExplorerSource.includes("aria-label"), true, "home tag explorer should keep an accessible label even when the toggle becomes icon-only");
assert.equal(homeTagExplorerSource.includes("home-tag-toggle-icon"), true, "home tag explorer should render a dedicated double-arrow icon for the toggle");
assert.equal(homeTagExplorerSource.includes("tags.length <= collapsedCount"), true, "home tag explorer should hide the toggle when there are not enough tags to collapse");
assert.equal(heroPanelSource.includes("hero?:"), true, "hero panel should accept a dynamic hero content override");
assert.equal(blogIndexPageSource.includes("buildBlogArchiveCopy"), true, "blog archive page should still build hero and filter-summary copy from the page-copy helper");
assert.equal(blogIndexPageSource.includes("ArchiveMobileFilter"), true, "blog archive page should mount a dedicated mobile floating tag filter");
assert.equal(blogIndexPageSource.includes("archive-filter-panel archive-filter-panel--desktop"), true, "blog archive page should mark the inline tag rail as desktop-only");
assert.equal(archiveMobileFilterSource.includes("aria-expanded"), true, "mobile archive filter should expose expanded state for its floating popover");
assert.equal(archiveMobileFilterSource.includes("useEffect"), true, "mobile archive filter should manage click-outside cleanup on the client");
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
assert.equal(blogIndexPageSource.includes("SearchBar"), false, "blog archive page should rely on the shared header search instead of rendering its own search panel");
assert.equal(globalsCssSource.includes(".archive-rail .search-panel"), false, "archive-specific mobile search panel overrides should be removed once the blog page stops rendering that panel");
assert.equal(globalsCssSource.includes(".archive-mobile-filter-fab"), true, "styles should define the floating mobile archive filter button");
assert.equal(globalsCssSource.includes(".archive-mobile-filter-popover"), true, "styles should define the floating mobile archive filter popover");
assert.equal(globalsCssSource.includes("width: 52px;"), true, "mobile floating filter button should shrink another half step on small screens");
assert.equal(globalsCssSource.includes("rgba(255, 251, 247, 0.78)"), true, "mobile floating filter button should use a more transparent resting background");
assert.equal(globalsCssSource.includes(".archive-filter-panel--desktop"), true, "styles should keep the inline archive filter rail desktop-only on small screens");
assert.equal(globalsCssSource.includes(".archive-hero-band .page-title"), true, "mobile archive hero title should shrink on small screens");
assert.equal(globalsCssSource.includes(".archive-filter-summary .section-title"), true, "mobile archive filter summary title should shrink on small screens");
assert.equal(globalsCssSource.includes(".home-tag-toggle-icon"), true, "styles should define the icon-only tag toggle treatment");
assert.equal(globalsCssSource.includes("font-size: clamp(2.2rem, 11vw, 3.1rem);"), true, "mobile hero title should shrink to a tighter font-size range on small screens");
assert.equal(zhNotFoundSource.includes('href={getLocalizedRoute("zh", "/")}'), true, "Chinese 404 page should keep a back-home action");
assert.equal(enNotFoundSource.includes('href={getLocalizedRoute("en", "/")}'), true, "English 404 page should keep a back-home action");
assert.equal(fs.readFileSync(zh503Path, "utf8").includes('href={getLocalizedRoute("zh", "/")}'), true, "Chinese 503 page should include a back-home action");
assert.equal(fs.readFileSync(en503Path, "utf8").includes('href={getLocalizedRoute("en", "/")}'), true, "English 503 page should include a back-home action");

assert.equal(ciWorkflowSource.includes("uses: actions/checkout@v6"), true, "CI should use checkout v6 to stay on the current supported runtime");
assert.equal(ciWorkflowSource.includes("uses: actions/setup-node@v6"), true, "CI should use setup-node v6 to stay on the current supported runtime");
assert.equal(ciWorkflowSource.includes("contents: read"), true, "CI should declare read-only contents permission for checkout");
assert.equal(fs.existsSync(deployScriptPath), true, "deployment shell script should exist");
assert.equal(fs.existsSync(deployEnvExamplePath), true, "deployment env example should exist");
assert.equal(fs.existsSync(webEnvExamplePath), true, "web env example should exist");
assert.equal(fs.existsSync(webServicePath), true, "web service unit should exist");
assert.equal(fs.existsSync(deployServicePath), true, "deploy service unit should exist");
assert.equal(fs.existsSync(deployTimerPath), true, "deploy timer unit should exist");
assert.equal(fs.existsSync(deployGuidePath), true, "deployment guide should exist");
assert.equal(deployTimerSource.includes("OnCalendar=*-*-* 03:15:00"), true, "deploy timer should use a daily schedule");
assert.equal(deployTimerSource.includes("Persistent=true"), true, "deploy timer should recover missed runs");

assert.equal(fs.existsSync(contentRepositoryTestPath), true, "content and post template checks should be merged into content-repository.test.js");
assert.equal(fs.existsSync(publishingSurfacesTestPath), true, "feed and SEO checks should be merged into publishing-surfaces.test.js");
assert.equal(fs.existsSync(archiveModelsTestPath), true, "archive, tag, and media checks should be merged into archive-models.test.js");
assert.equal(fs.existsSync(siteStateTestPath), true, "locale, UI-state, and page-copy checks should be merged into site-state.test.js");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "content.test.js")), false, "legacy split content.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "post-template.test.js")), false, "legacy split post-template.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "feed.test.js")), false, "legacy split feed.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "seo.test.js")), false, "legacy split seo.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "archive-layout.test.js")), false, "legacy split archive-layout.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "article-media.test.js")), false, "legacy split article-media.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "tag-discovery.test.js")), false, "legacy split tag-discovery.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "i18n.test.js")), false, "legacy split i18n.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "ui-state.test.js")), false, "legacy split ui-state.test.js should be removed after consolidation");
assert.equal(fs.existsSync(path.join(process.cwd(), "lib", "page-copy.test.js")), false, "legacy split page-copy.test.js should be removed after consolidation");
assert.equal(packageJson.scripts.test.includes("content-repository.test.js"), true, "npm test should execute the merged content-repository suite");
assert.equal(packageJson.scripts.test.includes("publishing-surfaces.test.js"), true, "npm test should execute the merged publishing-surfaces suite");
assert.equal(packageJson.scripts.test.includes("archive-models.test.js"), true, "npm test should execute the merged archive-models suite");
assert.equal(packageJson.scripts.test.includes("site-state.test.js"), true, "npm test should execute the merged site-state suite");
assert.equal(packageJson.scripts.test.includes("content.test.js"), false, "npm test should stop calling the removed content.test.js suite");
assert.equal(packageJson.scripts.test.includes("page-copy.test.js"), false, "npm test should stop calling the removed page-copy.test.js suite");

assert.equal(enMessages.search.copy, "", "English messages should mirror the simplified empty search copy");
assert.equal(enMessages.home.latest.copy, "", "English messages should mirror the simplified empty latest-section copy");
assert.equal(enMessages.about.intro, "", "English messages should mirror the simplified empty about intro");
assert.equal(enMessages.blogArchive.heroCopy, "", "English messages should mirror the simplified empty blog hero copy");
assert.equal(enMessages.blogArchive.guideTitle, "", "English messages should mirror the simplified empty blog guide title");
assert.equal(enMessages.blogArchive.filterTitle, "", "English messages should mirror the simplified empty blog filter title");
assert.equal(enMessages.blogArchive.featuredTitle, "", "English messages should mirror the simplified empty featured-stack title");
assert.equal(enMessages.blogArchive.stackTitle, "", "English messages should mirror the simplified empty archive-stack title");

console.log("tooling assertions passed");

