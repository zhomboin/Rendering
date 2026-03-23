# AGENT.md - Rendering Current Repository Guide

## Repository Definition

This repository is the completed implementation of the current personal-blog phase for `Rendering`.

It is not a CMS repository.
It is a public-facing Next.js App Router site focused on:

- local MDX publishing
- long-form reading comfort
- playful editorial claymorphism-inspired visuals
- static search and SEO infrastructure
- Chinese-default routes with English mirrored UI
- future-ready architecture without introducing current CMS complexity

## Current Stack

- Next.js 15 + React 19 + TypeScript
- local MDX files under `content/posts`
- `gray-matter`, `@mdx-js/mdx`, `remark-gfm`
- Pagefind
- App Router metadata routes for sitemap, robots, feed, and manifest
- global CSS in `app/globals.css`
- lightweight Node-based regression tests in `lib/*.test.js`

## Current Scope Boundary

### In Scope

- public blog pages
- localized public site shell
- content repository helpers
- article reading UX
- blog-page tag filtering
- search, feed, manifest, and metadata
- responsive design and theming

### Out Of Scope

- login and authentication
- admin routes
- database-backed content editing
- media library management
- multi-author workflows
- analytics dashboards
- CMS authoring interfaces

## Route Model

- Chinese: `/`, `/blog`, `/blog/[slug]`, `/about`
- English: `/en`, `/en/blog`, `/en/blog/[slug]`, `/en/about`
- tags are handled only through `/blog?tag=...`
- there is no standalone `/tags` route anymore

## Directory Structure

```text
app/                  Public App Router pages and metadata routes
components/           Site, content, and reading-interaction components
content/posts/        Local MDX articles
lib/                  Content, archive, i18n, UI state, SEO, and tests
public/               Static assets and previews
docs/                 PRD, development plan, launch checklist, design docs
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
npm run create-post -- <slug> [tag1,tag2]
```

## Architecture Notes

- published content must be accessed through helpers in `lib/content.js`
- route code should not parse MDX files directly
- draft filtering must stay centralized in the content layer
- prefer Server Components by default and use client components only where interaction is required
- keep article reading surfaces calmer than homepage and archive surfaces
- reuse the current radius, shadow, color, and motion language in `app/globals.css`
- respect `prefers-reduced-motion`

## Verification Notes

The current verification baseline is:

- `npm run lint`
- `npm test`
- `npm run typecheck`
- `npm run build`
- `npm run check`

These commands are expected to stay green before merge or release.

## Current Status

The implementation phase is complete.
Remaining work is operational rather than architectural:

- final production domain and hosting
- final author/profile copy
- final public content selection
- continued article publishing

## Future Extensions

If a later phase starts, add new specs and plans for:

- login
- admin management
- CMS authoring
- database-backed content workflows
- multi-author collaboration

Do not pre-introduce those dependencies into the current repository.