# Rendering Blog Structure Simplification Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the blog page the single content-discovery destination, remove standalone tag pages, sync English messages to the current Chinese content shape, and let the homepage hero occupy the full lead area.

**Architecture:** Keep the current locale-based page structure, but remove the separate tag-route branch and collapse all classification into the existing `/blog?tag=...` filtering flow. Update message files and page components together so empty strings suppress matching UI blocks instead of leaving empty shells in the layout.

**Tech Stack:** Next.js App Router, React 19, TypeScript/TSX, MDX content, plain JS utility modules, custom node-based test scripts.

---

### Task 1: Lock down the new information architecture with failing tests

**Files:**
- Modify: `lib/tooling.test.js`
- Modify: `lib/seo.test.js`
- Modify: `lib/i18n.test.js` if locale navigation helpers need updated expectations

- [ ] **Step 1: Write the failing tests**

Add assertions for:
- navigation no longer includes a tags item
- footer no longer expects a tags link label
- sitemap/tag helpers no longer expose standalone tag archive URLs
- tag filtering links still point to `/blog?tag=...`

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `node lib/tooling.test.js && node lib/seo.test.js && node lib/i18n.test.js`
Expected: FAIL on old navigation, footer, or sitemap assumptions.

- [ ] **Step 3: Commit the failing-test checkpoint if useful**

```bash
git add lib/tooling.test.js lib/seo.test.js lib/i18n.test.js
git commit -m "test: cover simplified blog information architecture"
```

### Task 2: Synchronize message shape and remove empty-copy rendering traps

**Files:**
- Modify: `lib/messages/zh.js`
- Modify: `lib/messages/en.js`
- Modify: `components/section-heading.tsx`
- Modify: `components/search-bar.tsx`
- Modify: `components/hero-panel.tsx`
- Modify: `components/pages/blog-index-page.tsx`
- Modify: `components/pages/about-page.tsx` if empty intro/secondary copy is still rendered there

- [ ] **Step 1: Write the failing test for empty-copy rendering behavior**

Add a regression assertion to an existing lightweight UI test file or create a new one that verifies empty strings do not produce rendered heading/copy placeholders.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node lib/ui-state.test.js`
Expected: FAIL if the test file is extended with the new rendering expectation.

- [ ] **Step 3: Update `zh.js` and `en.js` to the same content contract**

Mirror the current simplified Chinese content intent into English. For entries now intentionally blank in Chinese, set the paired English field to an empty string too instead of leaving stale legacy copy.

- [ ] **Step 4: Implement minimal rendering guards**

Update shared components so they only render kicker/title/copy blocks when the string is non-empty.

- [ ] **Step 5: Re-run the focused UI test**

Run: `node lib/ui-state.test.js`
Expected: PASS.

### Task 3: Remove standalone tags from navigation, footer, and routing

**Files:**
- Modify: `lib/site.js`
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Delete: `app/(zh)/tags/page.tsx`
- Delete: `app/(zh)/tags/[slug]/page.tsx`
- Delete: `app/en/tags/page.tsx`
- Delete: `app/en/tags/[slug]/page.tsx`
- Delete: `components/pages/tags-page.tsx`
- Delete: `components/pages/tag-archive-page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `lib/seo.js`

- [ ] **Step 1: Update route/navigation sources**

Remove tags from the site navigation and footer route usage.

- [ ] **Step 2: Remove standalone tag page files**

Delete the route entry files and page components that only exist for `/tags` and `/tags/[slug]`.

- [ ] **Step 3: Remove tag archive URLs from SEO/sitemap generation**

Update sitemap entry construction so only home/blog/about/article routes remain, with blog filters staying query-param based rather than becoming sitemap entries.

- [ ] **Step 4: Re-run the focused architecture tests**

Run: `node lib/tooling.test.js && node lib/seo.test.js && node lib/i18n.test.js`
Expected: PASS.

### Task 4: Simplify the blog index to one classification path

**Files:**
- Modify: `components/pages/blog-index-page.tsx`
- Modify: `lib/tag-discovery.js` if helper text or link generation needs trimming
- Modify: `components/post-card.tsx` and tag-link components only if they still point to removed tag routes

- [ ] **Step 1: Write the failing test for blog filtering expectations**

Add assertions that:
- quick signals no longer render
- blog page copy no longer refers to tag archive or tag map pages
- tag actions still drive `/blog?tag=...`

- [ ] **Step 2: Run the relevant tests to verify they fail**

Run: `node lib/tag-discovery.test.js && node lib/tooling.test.js`
Expected: FAIL on the old quick-signals or tag-route assumptions.

- [ ] **Step 3: Remove the quick-signals section and tag-archive CTAs**

Keep search, filter shelf, featured posts, and archive stack. Remove the dedicated tag-map/archive branch from both structure and copy.

- [ ] **Step 4: Verify tag filtering still works**

Re-run: `node lib/tag-discovery.test.js && node lib/tooling.test.js`
Expected: PASS.

### Task 5: Let the homepage hero take the full lead area

**Files:**
- Modify: `components/pages/home-page.tsx`
- Modify: `app/globals.css`
- Modify: `lib/site.js` if metrics are no longer used anywhere
- Delete or stop importing: `components/metric-panel.tsx` only if it becomes unused and truly dead

- [ ] **Step 1: Write the failing test for homepage lead structure**

Add or extend a test so the homepage no longer expects the metric grid and no longer depends on site metrics for first-screen rendering.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node lib/tooling.test.js`
Expected: FAIL on old hero/metric assumptions.

- [ ] **Step 3: Remove the metric-card lead block and widen the hero layout**

Update the home page component and supporting CSS so the hero occupies the full lead area cleanly without leaving a dead grid column.

- [ ] **Step 4: Re-run the focused test**

Run: `node lib/tooling.test.js`
Expected: PASS.

### Task 6: Full regression verification and cleanup

**Files:**
- Review: touched files from previous tasks

- [ ] **Step 1: Run the full project test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run production build verification**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Inspect git diff for accidental unrelated edits**

Run: `git diff --stat`
Expected: only the intended message, routing, page, style, and test changes.

- [ ] **Step 4: Commit the implementation**

```bash
git add .
git commit -m "refactor: simplify blog navigation and discovery"
```