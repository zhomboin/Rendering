# Rendering

[中文](./README.md)

`Rendering` is a technical blog project built with `Next.js 15`. It currently ships with a runnable public-facing prototype, a local `MDX` content source, and a global `Pagefind`-powered static search modal.

The current visual direction is a cold terminal cyber-tech style focused on:

- long-form readability
- a restrained system-like visual language
- local MDX-based content management
- static search with extensible SEO foundations

## Current Features

- Home, blog index, blog detail, tags, and about pages
- Local content source from `content/posts/*.mdx`
- Frontmatter-driven post metadata
- Dynamic SEO metadata for article pages
- Global `Pagefind` search modal
- Automatic search-index generation after build

## Tech Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MDX`
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- `Pagefind`

## Project Structure

```text
app/                  App Router routes
components/           Site and content components
content/posts/        Local MDX articles
lib/                  Content repository, MDX parsing, site config
public/               Static assets
scripts/              Build helper scripts
docs/                 Design notes and implementation plans
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run content-layer tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

Notes:

- `npm run build` runs `next build` first
- then executes `scripts/build-search-index.mjs`
- and finally writes the Pagefind index to `public/pagefind/`

## Writing Content

Posts live in:

```text
content/posts/*.mdx
```

Each filename becomes the default slug, for example:

```text
content/posts/designing-a-terminal-first-blog.mdx
-> /blog/designing-a-terminal-first-blog
```

Current frontmatter fields:

```yaml
---
title: Example Title
description: Example summary
publishedAt: 2026-03-18
tags:
  - nextjs
  - rendering
draft: false
---
```

Rules:

- posts with `draft: true` are excluded from public routes
- `description` is used for both UI summaries and SEO descriptions
- `tags` feed tag aggregation and search context

## Search

The project uses `Pagefind` for static full-text search, but the UI is custom rather than the default widget.

Open search by:

- clicking `Search Index` in the header
- pressing `/`
- pressing `Ctrl/Cmd + K`

Search results display:

- title
- matching excerpt
- tag context
- article path

## SEO

The project currently includes foundational SEO:

- global `metadataBase`
- static metadata for top-level public pages
- dynamic metadata for article pages
- canonical URLs
- basic Open Graph fields
- basic Twitter metadata

Not implemented yet:

- `sitemap.xml`
- `robots.txt`
- JSON-LD
- dynamic OG images

## Notes

The repository is still in a frontend-first phase. Admin features, database integration, and authentication are not yet wired into the current runnable app.

At this stage, the project works best as:

- a public blog frontend prototype
- a content and visual baseline
- a foundation for future work on database integration, comments, deployment, and extended SEO
