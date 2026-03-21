# Rendering Site Internationalization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bilingual Chinese and English site-level internationalization with Chinese as the default route set, while keeping article MDX content unchanged.

**Architecture:** Use route-level internationalization with Chinese on the existing routes and English mirrored under `/en`. Introduce lightweight locale helpers plus centralized message dictionaries, then refactor pages and shared site chrome to render from shared locale-aware helpers instead of duplicating logic.

**Tech Stack:** Next.js App Router, React 19, TypeScript, local MDX content, Pagefind, Node-based test helpers.

---

### Task 1: Save the Approved Design and Plan Docs

**Files:**
- Create: `docs/superpowers/specs/2026-03-21-rendering-site-internationalization-design.md`
- Create: `docs/superpowers/plans/2026-03-21-rendering-site-internationalization.md`

- [ ] Step 1: Save the approved internationalization design summary to the spec file.
- [ ] Step 2: Save this implementation plan to the plan file.
- [ ] Step 3: Keep both documents tightly scoped to route-level bilingual UI, not MDX translation.

### Task 2: Add Failing Locale Helper Tests

**Files:**
- Create: `lib/i18n.test.js`
- Create: `lib/i18n.js`
- Modify: `package.json`

- [ ] Step 1: Write failing tests for locale parsing, localized path generation, and locale mirror path switching.
- [ ] Step 2: Run `node lib/i18n.test.js` and verify it fails for the expected missing-helper reason.
- [ ] Step 3: Add the new test file to the `test` script only after the helper exists and passes.

### Task 3: Implement Minimal Locale and Message Infrastructure

**Files:**
- Create: `lib/i18n.js`
- Create: `lib/messages/zh.js`
- Create: `lib/messages/en.js`
- Modify: `lib/site.js`
- Modify: `lib/seo.js` if shared localized metadata helpers belong there

- [ ] Step 1: Implement locale constants and helper functions for `zh` and `en`.
- [ ] Step 2: Implement helper logic for adding and removing the `/en` prefix from mirrored routes.
- [ ] Step 3: Add centralized message dictionaries for shared site copy.
- [ ] Step 4: Re-run `node lib/i18n.test.js` and confirm it passes.

### Task 4: Refactor Layouts for Default-Zh and Mirrored /en Routes

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/(zh)/layout.tsx`
- Create: `app/en/layout.tsx`
- Move/replace: existing route files under a shared rendering strategy
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/search-modal.tsx`
- Modify: `components/search-trigger.tsx`
- Modify: `components/theme-toggle.tsx`
- Create if needed: `components/language-toggle.tsx`

- [ ] Step 1: Make the root layout global and locale-neutral, keeping only document shell concerns.
- [ ] Step 2: Add a Chinese nested layout for the current default routes.
- [ ] Step 3: Add an English nested layout for `/en` routes.
- [ ] Step 4: Refactor shared site chrome components to receive locale-aware copy instead of hardcoded strings.
- [ ] Step 5: Add a language switcher that preserves the current page path when crossing between Chinese and English mirrors.

### Task 5: Localize Shared Page Renderers

**Files:**
- Modify or extract from: `app/page.tsx`
- Modify or extract from: `app/blog/page.tsx`
- Modify or extract from: `app/blog/[slug]/page.tsx`
- Modify or extract from: `app/tags/page.tsx`
- Modify or extract from: `app/tags/[slug]/page.tsx`
- Modify or extract from: `app/about/page.tsx`
- Modify: `components/hero-panel.tsx`
- Modify: `components/search-bar.tsx`
- Modify: `components/article-meta.tsx`
- Modify: `components/prev-next-nav.tsx`
- Modify: `components/toc-panel.tsx`
- Modify: `components/post-card.tsx`
- Modify: `components/section-heading.tsx` only if localized helper props need adjustment

- [ ] Step 1: Move page-specific hardcoded copy into locale dictionaries or page-level localized config helpers.
- [ ] Step 2: Keep Chinese pages on existing paths while swapping them to locale-aware shared renderers.
- [ ] Step 3: Add mirrored English route files under `/en` that call the same shared renderers with `en`.
- [ ] Step 4: Keep post titles, excerpts, tags, and MDX body content unchanged.
- [ ] Step 5: Ensure article shell UI, archive helpers, tag cards, and about-page copy all localize cleanly.

### Task 6: Localize Metadata, Alternates, and Sitemap

**Files:**
- Modify: `app/(zh)/layout.tsx`
- Modify: `app/en/layout.tsx`
- Modify: localized page files and metadata generators
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts` only if sitemap URL logic changes
- Modify: `lib/seo.js`
- Modify: `lib/seo.test.js`

- [ ] Step 1: Add localized metadata titles and descriptions for both locale trees.
- [ ] Step 2: Expose alternate-language links for mirrored routes where practical.
- [ ] Step 3: Keep canonical URLs correct for Chinese root paths and English `/en/...` paths.
- [ ] Step 4: Extend the sitemap output to include both Chinese and English route variants.
- [ ] Step 5: Re-run the focused SEO test if helper expectations change, then confirm green.

### Task 7: Apply Visual and Responsive Polish to the Locale Switcher

**Files:**
- Modify: `app/globals.css`
- Modify: header-related components created or updated in earlier tasks

- [ ] Step 1: Style the language switcher so it feels native to the current claymorphism header.
- [ ] Step 2: Ensure the switcher remains legible in both light and dark themes.
- [ ] Step 3: Verify mobile header layout still works once the new control is added.

### Task 8: Final Verification

**Files:**
- Modify: `package.json` if the final test script needs the i18n test entry

- [ ] Step 1: Run `npm.cmd test`.
- [ ] Step 2: Run `npm.cmd run build`.
- [ ] Step 3: Check `git diff --stat` and confirm only intended files changed.
- [ ] Step 4: Summarize outcomes, known constraints, and next recommended steps.