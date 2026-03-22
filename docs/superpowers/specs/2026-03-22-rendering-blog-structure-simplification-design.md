# Rendering Blog Structure Simplification Design

## Goal

Simplify the site structure so the blog becomes the single content exploration hub. Remove the standalone tags pages, keep tag filtering inside the blog index, sync the current Chinese content edits into English messages, and let the homepage hero occupy the full lead area without the four adjacent metric cards.

## Current Context

The current site still mixes two parallel content discovery models:

- `/blog` as the main archive with tag filtering through query params
- `/tags` and `/tags/[slug]` as separate tag browsing and tag archive destinations

That creates duplicated IA and duplicated copy. At the same time, `lib/messages/zh.js` has already been partially simplified with some empty-string fields, while `lib/messages/en.js` still reflects the older, fuller copy set. The homepage also still renders the four metric cards next to the hero, which now feels too dashboard-like for the intended personal-blog direction.

## Decisions

### 1. Blog becomes the only content discovery hub

The site will no longer expose a standalone tags page or tag archive pages.

Result:

- Primary navigation becomes `Home / Blog / About`
- Footer removes the tags entry
- Tag chips and tag-related entry points route into `/blog?tag=<slug>`
- Standalone `/tags` and `/tags/[slug]` routes are removed instead of redirected
- Sitemap no longer includes tag archive URLs

### 2. Blog filtering remains query-param based

Tag classification continues to use the current `/blog?tag=...` pattern.

This keeps the interaction lightweight and preserves a single archive entry point. Filter state remains a browsing state, not a separate destination with its own dedicated page shell.

### 3. Empty copy means the UI block should disappear

Some fields in `lib/messages/zh.js` have intentionally been reduced to empty strings. The English message file must be synchronized to the same structure and intent.

Rendering rule:

- If a title, kicker, copy block, or supporting text is now empty, the corresponding UI element should not render
- Do not leave empty headings, empty paragraphs, or empty spacing shells in the page

This should be handled at the component level where the content is consumed, not by leaving broken placeholders in the layout.

### 4. Homepage hero becomes the full lead composition

The four metric cards beside the hero are removed. The hero should occupy the full lead area on its own.

The goal is to make the homepage feel like a personal blog front door rather than a dashboard overview. Supporting sections below the hero can remain, but the first screen should open with one decisive focal point.

### 5. Blog page removes the quick-signals section

The blog page should keep:

- archive hero
- search panel
- filter shelf
- featured and archive post stacks

The following should be removed:

- the quick-signals module
- any CTA that refers to opening a standalone tag map or dedicated tag archive page
- copy that explains the difference between filtered blog view and dedicated tag archive view

## UX Outcomes

After this change, readers should experience:

- a simpler top-level navigation
- one clear place to browse and filter writing
- less duplicated tagging language
- a stronger homepage focal point
- cleaner sections because empty supporting copy no longer renders

## Files Likely Affected

Core areas:

- `lib/messages/zh.js`
- `lib/messages/en.js`
- `lib/site.js`
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/pages/home-page.tsx`
- `components/pages/blog-index-page.tsx`
- `components/section-heading.tsx`
- `components/search-bar.tsx`
- `app/sitemap.ts`

Removal or route cleanup:

- `app/(zh)/tags/page.tsx`
- `app/(zh)/tags/[slug]/page.tsx`
- `app/en/tags/page.tsx`
- `app/en/tags/[slug]/page.tsx`
- `components/pages/tags-page.tsx`
- `components/pages/tag-archive-page.tsx`

Tests to add or update:

- navigation and footer expectations
- home page hero layout expectations
- blog page no longer rendering quick signals
- no tag route generation in sitemap helpers where applicable
- empty-copy rendering behavior

## Validation

This work is complete when:

1. The site has no standalone tags page in either locale.
2. Navigation and footer no longer link to tags.
3. Blog page tag filtering still works through `/blog?tag=...`.
4. The blog page no longer shows quick signals or tag-archive CTAs.
5. The homepage hero no longer shares space with the four metric cards.
6. Chinese and English messages are aligned to the same current content structure.
7. Empty strings do not produce empty UI blocks.