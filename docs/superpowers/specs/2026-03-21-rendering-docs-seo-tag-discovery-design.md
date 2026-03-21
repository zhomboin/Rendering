# Rendering Docs, SEO, and Tag Discovery Design

Date: 2026-03-21
Project: Rendering
Status: Approved for implementation

## Context

`Rendering` has already shifted in code toward a playful claymorphism personal blog with a light-first theme, dark-mode support, richer editorial surfaces, and image-friendly article pages. However, several source-of-truth documents still describe the product as a cold terminal cyber blog or even as a future full-stack CMS. SEO infrastructure is also still limited to page metadata, and tag discovery stops at a visual tag index rather than a complete tag archive flow.

This work closes those gaps in three ordered phases:

1. synchronize product and visual descriptions across project documents
2. add static-blog SEO infrastructure using native Next.js App Router primitives
3. evolve tags from a decorative index into a true archive and filtering surface

## Goals

- Align core docs with the actual current product direction
- Add `sitemap.xml`, `robots.txt`, and JSON-LD without introducing backend complexity
- Let readers discover content through both blog-page filtering and dedicated tag archive pages

## Non-Goals

- No CMS, login, database, or admin work
- No dynamic OG image generation in this pass
- No major rewrite of the content layer beyond what tag routing and SEO require

## Design Decisions

### 1. Documentation Alignment

The canonical docs should all describe the same product:

- current phase: personal blog, not CMS
- visual direction: playful, colorful, claymorphism-inspired editorial blog
- default theme: light, with dark mode supported
- content format: local MDX with strong text-and-image reading support

Files to synchronize:

- `docs/PRD.md`
- `docs/PRD.zh-CN.md`
- `docs/development-plan.md`
- `docs/development-plan.zh-CN.md`
- `README.md`
- `README.en.md`
- `AGENT.md`

`AGENT.md` should stop describing a Prisma / NextAuth / admin architecture as the current repo reality. It should instead explain the actual current stack, current phase boundaries, and future CMS as an optional later phase.

### 2. SEO Infrastructure

SEO additions should stay static-friendly and App Router native.

#### 2.1 Sitemap

Add `app/sitemap.ts` and generate entries for:

- `/`
- `/blog`
- `/tags`
- `/about`
- `/blog/[slug]` for published posts
- `/tags/[slug]` for active tags once tag archive pages exist

#### 2.2 Robots

Add `app/robots.ts` to:

- allow indexing of public pages
- point to the sitemap URL
- keep rules simple and deployment-safe

#### 2.3 JSON-LD

Use two layers of structured data:

- site-level `WebSite` + `Person` JSON-LD in `app/layout.tsx`
- article-level `BlogPosting` JSON-LD in `app/blog/[slug]/page.tsx`

Structured data should be generated from current content-layer helpers and existing metadata fields rather than introducing a second data source.

### 3. Tag Discovery Experience

Tag discovery should become a two-level system.

#### 3.1 Blog Page Filtering

The blog archive page should support tag-based filtering directly on `/blog`.

Recommended implementation:

- use query-string filtering, e.g. `/blog?tag=motion`
- keep archive hierarchy intact while changing the visible result set
- preserve a clear reset path back to all posts
- surface the active tag in the archive header and count summary

This keeps filtering shareable, server-renderable, and index-safe.

#### 3.2 Dedicated Tag Archive Pages

Add `app/tags/[slug]/page.tsx` so each tag has its own indexable archive page.

Each tag archive should show:

- tag title and article count
- short intro copy tied to the selected tag
- the posts that belong to that tag
- a path back to the all-tags view and main blog archive

This gives tags their own URL, makes the sitemap more meaningful, and creates a stronger discovery loop between `/blog`, `/tags`, and `/tags/[slug]`.

## Data and Routing Notes

The content layer already supports:

- all posts
- tag summaries
- posts by tag

Minimal enhancements are acceptable if needed for:

- validating tag existence
- generating tag route params
- counting filtered posts cleanly

The filter and tag archive routes should only expose published content.

## Testing Strategy

Use TDD for behavior changes.

- Add a failing test for any new tag helper behavior before implementing it
- Add a failing test for SEO helper output if helper functions are introduced
- Re-run the focused test first, then the full test suite
- Final verification must include `npm.cmd test` and `npm.cmd run build`

## Risks

### Documentation Drift Risk

If docs are partially updated, the repo will remain confusing. Mitigation: update all canonical docs in one pass.

### SEO Duplication Risk

If metadata and JSON-LD diverge, signals become inconsistent. Mitigation: derive JSON-LD from the same content data used for metadata.

### Filter UX Risk

If blog filtering only exists client-side, links become weak and SEO value is lost. Mitigation: use query-string filtering and dedicated tag pages.

## Expected Outcome

After this work:

- the repo documentation will accurately describe the current product
- the blog will expose `sitemap.xml`, `robots.txt`, and structured article/site data
- readers will be able to browse by tag through both a filtered archive and dedicated tag archive pages