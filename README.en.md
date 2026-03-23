# Rendering

[中文](./README.md)

`Rendering` is a personal technical blog built with `Next.js 15`. 

Its current shape is: Chinese-default routes, English mirrored UI under `/en`, local `MDX` authoring, blog-page tag filtering, Pagefind search, reading-progress UX, article media modules, and static distribution / SEO foundations including RSS, manifest, JSON-LD, and dynamic OG images.

## Current Status

- Current personal-blog implementation phase: complete
- Current repository role: public personal blog frontend
- Current publishing workflow: `Git + MDX + automated build/deploy`

## Current Features

- Home, blog archive, article detail, and about pages
- Chinese default routes with English mirrored UI under `/en`
- Tag filtering inside the blog archive via `/blog?tag=...`
- Local content repository at `content/posts/*.mdx`
- Frontmatter-driven title, description, date, tags, and draft state
- Previous / next article navigation
- TOC, reading progress, mixed media, and `figure / caption / gallery / lightbox`
- Light / dark theme switching
- Global Pagefind search
- `sitemap.xml`, `robots.txt`, `feed.xml`, and `manifest.webmanifest`
- Site-level and article-level JSON-LD plus dynamic OG images
- GitHub Actions CI

## Route Model

- Chinese: `/`, `/blog`, `/blog/[slug]`, `/about`
- English: `/en`, `/en/blog`, `/en/blog/[slug]`, `/en/about`
- Tags no longer have standalone pages; they are handled through blog filtering only

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

## Publishing Workflow

Create a post with:

```bash
npm run create-post -- <slug> [tag1,tag2]
```

Then:

1. Fill frontmatter and body in `content/posts/*.mdx`
2. Preview locally with `npm run dev`
3. Run `npm run check`
4. Set `draft` to `false`
5. Commit and push to `main`

## Still Required Before Public Launch

These are not implementation gaps in the current phase; they are operational release prerequisites:

- final domain and hosting
- final author identity and brand copy
- final public about-page content
- final review of the first public article batch

See also:
- [docs/site-launch-checklist-and-publishing-sop.zh-CN.md](/D:/Code/Project/Rendering/Rendering/docs/site-launch-checklist-and-publishing-sop.zh-CN.md)
- [docs/PRD.md](/D:/Code/Project/Rendering/Rendering/docs/PRD.md)
- [docs/development-plan.md](/D:/Code/Project/Rendering/Rendering/docs/development-plan.md)