# Rendering

[中文](./README.md)

`Rendering` is a personal technical blog built with `Next.js 15`.

The current repository has already completed the personal-blog implementation phase. It is a public-facing site, not a CMS, admin console, or database-backed publishing platform.

## Current Project Status

- Current phase: current personal-blog implementation is complete
- Repository role: public site frontend + local content repository + publishing/deployment helpers
- Publishing workflow: `Git + MDX + automated build/deploy`
- Remaining work: production domain and hosting, final author/brand copy, final review of the first public article batch

## What Exists Today

- Home, blog archive, article detail, and about pages
- Chinese-default routes with English mirrored UI under `/en`
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
- Linux + systemd deployment scripts and service/timer templates

## Scope Boundaries

This repository explicitly includes:

- public blog pages and localized site shell
- local MDX authoring and content validation
- search, SEO, feed, manifest, and OG distribution infrastructure
- reading UX, theming, and responsive presentation

This repository explicitly does not include:

- login and authentication
- admin pages
- database-backed content editing
- CMS authoring interfaces
- multi-author collaboration workflows
- full platform features such as comments, analytics dashboards, or media libraries

If a future CMS/admin phase starts, it should be scoped as a new stage instead of being pre-introduced into the current repository.

## Route Model

- Chinese: `/`, `/blog`, `/blog/[slug]`, `/about`
- English: `/en`, `/en/blog`, `/en/blog/[slug]`, `/en/about`
- Tags are handled through blog filtering; standalone `/tags` pages are no longer part of the current public information architecture

## Tech Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MDX`
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- `Pagefind`

## Key Directories

```text
app/                  App Router pages, layouts, and metadata routes
components/           page, interaction, and reading-experience components
content/posts/        local MDX article repository
content/templates/    new-post template
lib/                  content layer, i18n, SEO, copy, and tests
scripts/              validation, typecheck, search-index, and create-post helpers
deploy/               Linux + systemd deployment scripts and example configs
docs/                 PRD, development plan, launch checklist, design, and superpowers records
public/               static assets, preview files, and Pagefind output
```

## Local Development and Verification

```bash
npm install
npm run dev
npm run lint
npm test
npm run typecheck
npm run build
npm run check
```

`npm run check` currently covers:

- content validation
- Node-based regression tests
- typecheck
- production build

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

## Deployment and Operations Docs

- [Launch checklist + publishing SOP](./docs/site-launch-checklist-and-publishing-sop.zh-CN.md)
- [Linux + systemd deployment guide](./docs/linux-systemd-deployment.zh-CN.md)
- [Content migration guide](./docs/content-migration-guide.zh-CN.md)
- [Playful clay design guide](./docs/playful-clay-design-guide.zh-CN.md)

## Canonical Docs For The Current Phase

Treat the following files as the primary source of truth for the current repository state:

- [AGENTS.md](./AGENTS.md)
- [PRD.zh-CN.md](./docs/PRD.zh-CN.md)
- [development-plan.zh-CN.md](./docs/development-plan.zh-CN.md)
- [PRD.md](./docs/PRD.md)
- [development-plan.md](./docs/development-plan.md)

## Historical Note

The root-level `Rendering.docx` is an earlier draft that still describes a fuller stack/CMS direction. It does not match the current implemented repository.

When deciding the current scope, stack, or delivery status, use this README, `AGENTS.md`, and the current-phase files in `docs/` rather than `Rendering.docx`.
