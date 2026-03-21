# AGENT.md - Rendering Current-Phase Project Guide

## Project Definition

This repository is currently a personal technical blog, not a CMS product.

It is built as a public-facing Next.js App Router site focused on:

- local MDX-based publishing
- long-form reading comfort
- playful editorial claymorphism-inspired visuals
- static search and SEO foundations
- Chinese-first routes with English mirrored UI routes
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
- localized public site UI
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
lib/                  Content, archive, i18n, UI state, and SEO helpers
public/               Static assets, previews, and generated search index
docs/                 PRD, development plan, and design docs
scripts/              Build and verification helpers
```

## Common Commands

```bash
npm run dev
npm run lint
npm test
npm run typecheck
npm run build
npm run check
```

## Architecture Notes

- published content should be accessed through helpers in `lib/content.js`
- route code should not duplicate file parsing logic
- draft filtering must stay centralized in the content layer
- prefer Server Components by default and use client components only where interaction is necessary
- keep article reading surfaces calmer than homepage and archive surfaces
- reuse the current radius, shadow, color, and motion language in `app/globals.css`
- respect `prefers-reduced-motion`

## Verification Notes

The current-phase verification baseline is intentionally lightweight:

- `npm run lint` checks repository content integrity through the content layer
- `npm test` runs focused Node-based helper tests
- `npm run build` is the practical Next.js compile and type gate for this App Router repo
- `npm run check` runs the current release baseline in one command

## Next Current-Phase Priorities

- publishing baseline closure
- author workflow and migration templates
- feed and manifest support
- curated migration of original CSDN articles into native site content

## SEO Direction

Keep SEO static-friendly and App Router native:

- route-level metadata
- frontmatter-driven article metadata
- `sitemap.ts` and `robots.ts`
- JSON-LD derived from existing content data
- future feed/share improvements without backend dependencies

Avoid introducing backend or CMS dependencies just to improve SEO.