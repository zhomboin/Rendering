# AGENT.md — Rendering Current-Phase Project Guide

## Project Definition

This repository is currently a personal technical blog, not a CMS product.

It is built as a public-facing Next.js App Router site focused on:

- local MDX-based publishing
- long-form reading comfort
- playful editorial claymorphism-inspired visuals
- static search and SEO foundations
- future-ready architecture without current CMS complexity

## Current Stack

- Next.js 15 + React 19 + TypeScript
- local MDX files under `content/posts`
- `gray-matter`, `@mdx-js/mdx`, `remark-gfm`
- Pagefind
- global CSS in `app/globals.css`
- App Router static-first pages

## Current Scope Boundary

### In Scope

- public blog pages
- content repository helpers
- article reading UX
- tag discovery
- search and metadata
- responsive design and theming

### Out Of Scope

- login and authentication
- admin routes
- database-backed content editing
- media library management
- multi-author workflows
- analytics dashboards

## Directory Structure

```text
app/                  Public App Router pages and route metadata
components/           Site, content, and reading-interaction components
content/posts/        Local MDX articles
lib/                  Content, archive, UI state, and SEO helpers
public/               Static assets, previews, and generated search index
docs/                 PRD, development plan, and design docs
```

## Common Commands

```bash
npm run dev
npm test
npm run build
```

## Architecture Notes

- Published content should be accessed through helpers in `lib/content.js`
- Route code should not duplicate file parsing logic
- Draft filtering must stay centralized in the content layer
- Prefer Server Components by default and use client components only where interaction is necessary
- Keep article reading surfaces calmer than homepage and archive surfaces
- Reuse the current radius, shadow, color, and motion language in `app/globals.css`
- Respect `prefers-reduced-motion`

## Testing Expectations

- Any content-layer behavior change should be covered by a focused Node test in `lib/*.test.js`
- Any new helper behavior should follow TDD: failing test first, then minimal implementation
- Before claiming completion, run:

```bash
npm test
npm run build
```

## SEO Direction

Keep SEO static-friendly and App Router native:

- route-level metadata
- frontmatter-driven article metadata
- `sitemap.ts` and `robots.ts`
- JSON-LD derived from existing content data

Avoid introducing backend or CMS dependencies just to improve SEO.