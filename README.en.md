# Rendering

[中文](./README.md)

`Rendering` is a personal technical blog built with `Next.js 15`. The current phase already includes a runnable public frontend, a local `MDX` content source, tag archive and filtering flows, Pagefind-powered search, and a Chinese-first plus English-mirrored site UI structure.

`Rendering` is a personal publishing site focused on editorial personality, long-form reading comfort, and image-friendly technical writing.

## Current Product Direction

- a playful editorial blog with claymorphism-inspired surfaces
- a light-first theme with dark-mode support
- strong text, code, and image reading comfort
- a local MDX workflow
- static search with extensible SEO foundations
- Chinese default routes with English mirrored UI routes under `/en`

## Current Features

- Home, blog archive, article detail, tags, tag archive, and about pages
- local content from `content/posts/*.mdx`
- frontmatter-driven post metadata
- draft filtering, tag aggregation, and previous/next article navigation
- `figure / caption / gallery` article media modules with lightbox support
- reading-progress tracking on article pages
- global Pagefind search modal
- `sitemap.xml`, `robots.txt`, and JSON-LD
- automatic search-index generation after build

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
npm run lint
npm test
npm run typecheck
npm run build
npm run check
```

## Out Of Scope For The Current Phase

- login
- author authentication
- admin tooling
- database-backed content editing
- comments systems
- multi-author publishing
- analytics dashboards

Those capabilities are reserved for a future CMS stage rather than being front-loaded now.

## Next Priorities

- publishing baseline closure and CI
- author workflow and migration template improvements
- feed and manifest support
- curated migration of 3-5 original articles from the user's CSDN blog