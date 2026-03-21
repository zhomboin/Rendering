# Rendering

[中文](./README.md)

`Rendering` is a personal technical blog built with `Next.js 15`. It currently ships with a runnable public frontend, a local `MDX` content source, and `Pagefind`-powered static full-text search.

The current product direction is not a CMS. It is a personal publishing site focused on editorial personality, long-form reading comfort, and image-friendly technical writing.

## Current Product Direction

- a playful editorial blog with claymorphism-inspired surfaces
- a light-first theme with dark-mode support
- vivid but controlled color
- strong text-and-image reading comfort
- a local MDX workflow
- static search with extensible SEO foundations

## Current Features

- Home, blog archive, article detail, tags, and about pages
- Local content source from `content/posts/*.mdx`
- Frontmatter-driven post metadata
- Draft filtering, tag aggregation, and previous/next article navigation
- `figure / caption / gallery` article media modules with lightbox support
- Reading-progress tracking on article pages
- Global `Pagefind` search modal
- Baseline metadata, Open Graph, and Twitter metadata
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

## Local Development

```bash
npm install
npm run dev
npm test
npm run build
```

## Out Of Scope For The Current Phase

- login
- author authentication
- admin tooling
- database-backed content editing
- media management
- multi-author publishing

Those capabilities are reserved for a future CMS stage rather than being front-loaded now.