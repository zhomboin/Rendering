# Rendering Docs, SEO, and Tag Discovery Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align project docs with the real product, add static-blog SEO infrastructure, and ship tag archive plus tag filtering for content discovery.

**Architecture:** Keep the current local-MDX, App Router, static-friendly architecture intact. Add native App Router SEO routes, generate JSON-LD from existing content helpers, and extend tag discovery through query-string archive filtering plus dedicated tag pages.

**Tech Stack:** Next.js App Router, React 19, TypeScript, local MDX content, Pagefind, Node-based test helpers.

---

### Task 1: Write the Design and Delivery Docs

**Files:**
- Create: `docs/superpowers/specs/2026-03-21-rendering-docs-seo-tag-discovery-design.md`
- Create: `docs/superpowers/plans/2026-03-21-rendering-docs-seo-tag-discovery.md`

- [ ] Step 1: Save the approved design summary to the spec file.
- [ ] Step 2: Save this implementation plan to the plan file.
- [ ] Step 3: Keep both documents focused on the three phases only: docs, SEO, tags.

### Task 2: Synchronize Canonical Product Docs

**Files:**
- Modify: `docs/PRD.md`
- Modify: `docs/PRD.zh-CN.md`
- Modify: `docs/development-plan.md`
- Modify: `docs/development-plan.zh-CN.md`
- Modify: `README.md`
- Modify: `README.en.md`
- Modify: `AGENT.md`

- [ ] Step 1: Rewrite product and visual descriptions so they describe a personal blog, not a CMS.
- [ ] Step 2: Replace outdated cyber / full-stack-CMS wording with playful clay, light-first, dark-supported, image-friendly editorial-blog wording.
- [ ] Step 3: Update `AGENT.md` so it reflects the current repo reality and future-CMS boundary.
- [ ] Step 4: Re-read the edited files for consistency before moving on.

### Task 3: Add Failing SEO Test Coverage

**Files:**
- Create: `lib/seo.test.js`
- Create: `lib/seo.js`
- Modify: `package.json`

- [ ] Step 1: Write a failing test for helper behavior that will support SEO route output and JSON-LD data.
- [ ] Step 2: Run `node lib/seo.test.js` and verify it fails for the expected missing helper reason.
- [ ] Step 3: Add the new test file to the `test` script only after the helper exists and passes.

### Task 4: Implement Static SEO Helpers and Routes

**Files:**
- Modify/Create: `lib/seo.js`
- Modify: `app/layout.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `lib/content.js` if route-param/tag helper support is needed

- [ ] Step 1: Implement minimal SEO helpers for site-level and article-level JSON-LD plus sitemap route data.
- [ ] Step 2: Re-run `node lib/seo.test.js` and verify it passes.
- [ ] Step 3: Add `WebSite` and `Person` JSON-LD to the root layout.
- [ ] Step 4: Add `BlogPosting` JSON-LD to article pages.
- [ ] Step 5: Add native App Router sitemap and robots routes.
- [ ] Step 6: Keep URLs canonical and derived from the existing site base URL.

### Task 5: Add Failing Tag Discovery Test Coverage

**Files:**
- Modify: `lib/archive-layout.test.js`
- Modify: `lib/archive-layout.js`
- Modify: `lib/content.test.js` if content helper behavior changes
- Modify: `lib/content.js` if new tag helper exports are needed

- [ ] Step 1: Write a failing test for the new tag discovery behavior, such as tag lookup validity or filtered archive summaries.
- [ ] Step 2: Run the focused test and verify the expected failure.
- [ ] Step 3: Implement the minimal helper additions to make the test pass.
- [ ] Step 4: Re-run the focused test and confirm green.

### Task 6: Ship Blog Tag Filtering

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `components/tag-chip.tsx`
- Modify: `app/globals.css`
- Modify: `lib/site.js` if page copy or metrics need alignment

- [ ] Step 1: Read the active tag from the blog page query string.
- [ ] Step 2: Filter visible archive content server-side using published posts only.
- [ ] Step 3: Show active-tag context, filtered counts, and a clear reset action.
- [ ] Step 4: Update tag chips and related links so they can point into the filtered blog archive intentionally.
- [ ] Step 5: Refine layout and states so filtering feels like part of the current playful editorial design.

### Task 7: Ship Dedicated Tag Archive Pages

**Files:**
- Create: `app/tags/[slug]/page.tsx`
- Modify: `app/tags/page.tsx`
- Modify: `app/globals.css`
- Modify: `lib/content.js` if tag route params or tag lookup helpers are needed

- [ ] Step 1: Add the dynamic tag archive route.
- [ ] Step 2: Return `notFound()` for unknown or empty invalid tags where appropriate.
- [ ] Step 3: Render a tag-focused archive with title, count, post list, and navigation back to `/tags` and `/blog`.
- [ ] Step 4: Update the main tags page so its cards link into the new dedicated tag pages.
- [ ] Step 5: Keep the new route visually consistent with the current archive hierarchy.

### Task 8: Final Verification

**Files:**
- Modify: `package.json` if the final test script needs the new SEO test entry

- [ ] Step 1: Run `npm.cmd test`.
- [ ] Step 2: Run `npm.cmd run build`.
- [ ] Step 3: Check `git diff --stat` and make sure only intended files changed.
- [ ] Step 4: Summarize outcomes, remaining risks, and next recommendations.