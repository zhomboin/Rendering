# Real Content-Driven Page Copy Design

## Goal

Replace homepage and blog archive marketing-style static copy with page text derived from real published post data, while keeping the current visual structure, bilingual routing, and editorial tone intact.

## Scope

This change only affects site-level page copy that should naturally follow the current content repository:

- homepage hero summary and badges
- homepage featured/latest/tag section headings
- blog archive hero summary
- blog archive guide/filter/section headings
- filtered archive summary copy

This change does not alter:

- article body content
- post card data sources
- About page author narrative
- metadata strategy unless already required by the visible page

## Current State

The site already reads real post cards from `content/posts` via `lib/content.js`, but several visible headings and summaries still come from `lib/messages/zh.js` and `lib/messages/en.js` as fixed strings. That makes the archive feel partially real and partially staged.

## Desired Behavior

### Homepage

- Keep the hero title and actions as branded editorial UI.
- Replace the hero supporting copy with real archive data: published post count, latest update date, and representative tags.
- Replace hero badges with real archive facts instead of feature slogans.
- Replace featured/latest/tag section heading copy with text derived from current post and tag counts.

### Blog Archive

- Replace hero title/copy with current archive facts.
- Replace guide/filter card text with copy derived from real post count, latest article, and available tag filters.
- Replace featured/archive section heading text with copy derived from the current filtered or unfiltered dataset.
- When a tag filter is active, summaries should reflect the active tag and filtered article count.

### Fallbacks

- If there are no published posts, both locales should degrade gracefully to a minimal “archive is still warming up” style message.
- If there are posts but no tags, tag-oriented copy should avoid awkward empty lists.

## Architecture

Introduce a small content-copy helper layer that transforms the existing real post summaries and tag summaries into locale-aware page copy models.

### New helper

Create a focused helper module in `lib/page-copy.js` that:

- accepts `locale`, posts, tags, and optional active-tag state
- formats dates and summary phrases for `zh` and `en`
- returns structured models for homepage and blog archive sections
- keeps string assembly out of the page components

### Component wiring

- `components/hero-panel.tsx` should accept a hero content object instead of reading all visible hero strings directly from messages.
- `components/pages/home-page.tsx` should build a homepage copy model from real posts/tags and pass the resulting content into the hero and section headings.
- `components/pages/blog-index-page.tsx` should build a blog archive copy model from the current post/tag/filter state and use it for visible headings and summaries.

## UX Notes

- The visible tone should stay editorial and intentional, not dashboard-like.
- Data-driven copy should feel like curated archive context, not analytics reporting.
- Counts and dates should be readable at a glance and stable across refreshes.
- Chinese remains the default route and English remains a mirrored route.

## Testing Strategy

Use TDD.

- Add a dedicated `lib/page-copy.test.js` covering populated and empty states in both locales.
- Extend tooling assertions only where we need to prevent regression in component wiring.
- Run the focused new test first to verify failure before implementation.
- Then run the full test suite and production build.

## Acceptance Criteria

- Homepage visible supporting copy comes from real published posts and tags.
- Blog archive visible supporting copy comes from real published posts and tags.
- Copy updates automatically when content in `content/posts` changes.
- Both `zh` and `en` render coherent dynamic summaries.
- Empty-state fallbacks remain readable.
- `npm.cmd test` and `npm.cmd run build` both pass.
