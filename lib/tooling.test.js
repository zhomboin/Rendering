import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { enMessages } from "./messages/en.js";
import { getSiteNavigation } from "./site.js";

const packageJsonPath = path.join(process.cwd(), "package.json");
const localeShellPath = path.join(process.cwd(), "components", "locale-shell.tsx");
const homePagePath = path.join(process.cwd(), "components", "pages", "home-page.tsx");
const blogIndexPagePath = path.join(process.cwd(), "components", "pages", "blog-index-page.tsx");
const siteFooterPath = path.join(process.cwd(), "components", "site-footer.tsx");
const tagChipPath = path.join(process.cwd(), "components", "tag-chip.tsx");
const zhTagsPagePath = path.join(process.cwd(), "app", "(zh)", "tags", "page.tsx");
const zhTagArchivePagePath = path.join(process.cwd(), "app", "(zh)", "tags", "[slug]", "page.tsx");
const enTagsPagePath = path.join(process.cwd(), "app", "en", "tags", "page.tsx");
const enTagArchivePagePath = path.join(process.cwd(), "app", "en", "tags", "[slug]", "page.tsx");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const localeShellSource = fs.readFileSync(localeShellPath, "utf8");
const homePageSource = fs.readFileSync(homePagePath, "utf8");
const blogIndexPageSource = fs.readFileSync(blogIndexPagePath, "utf8");
const siteFooterSource = fs.readFileSync(siteFooterPath, "utf8");
const tagChipSource = fs.readFileSync(tagChipPath, "utf8");
const globalsCssPath = path.join(process.cwd(), "app", "globals.css");
const globalsCssSource = fs.readFileSync(globalsCssPath, "utf8");

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
assert.equal(localeShellSource.includes("跳到正文"), false, "locale shell should not keep the Chinese skip-link copy");

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

assert.equal(fs.existsSync(zhTagsPagePath), false, "Chinese standalone tags page should be removed");
assert.equal(fs.existsSync(zhTagArchivePagePath), false, "Chinese standalone tag archive page should be removed");
assert.equal(fs.existsSync(enTagsPagePath), false, "English standalone tags page should be removed");
assert.equal(fs.existsSync(enTagArchivePagePath), false, "English standalone tag archive page should be removed");

assert.equal(enMessages.search.copy, "", "English messages should mirror the simplified empty search copy");
assert.equal(enMessages.home.latest.copy, "", "English messages should mirror the simplified empty latest-section copy");
assert.equal(enMessages.about.intro, "", "English messages should mirror the simplified empty about intro");
assert.equal(enMessages.blogArchive.heroCopy, "", "English messages should mirror the simplified empty blog hero copy");
assert.equal(enMessages.blogArchive.guideTitle, "", "English messages should mirror the simplified empty blog guide title");
assert.equal(enMessages.blogArchive.filterTitle, "", "English messages should mirror the simplified empty blog filter title");
assert.equal(enMessages.blogArchive.featuredTitle, "", "English messages should mirror the simplified empty featured-stack title");
assert.equal(enMessages.blogArchive.stackTitle, "", "English messages should mirror the simplified empty archive-stack title");
assert.equal(globalsCssSource.includes(".hero-panel .hero-title"), true, "hero card should explicitly remove the desktop title width cap");
assert.equal(globalsCssSource.includes(".hero-panel .hero-copy"), true, "hero card should explicitly remove the desktop copy width cap");
assert.equal(globalsCssSource.includes("max-width: none;"), true, "hero card text width overrides should remove hard max-width limits");

console.log("tooling assertions passed");