# AGENTS.md - Rendering Repository Guide

This file is the canonical agent-facing guide for the current `Rendering` repository.

## Repository Definition

`Rendering` is the completed implementation of the current personal-blog phase.

It is a public-facing `Next.js` App Router site focused on:

- local MDX publishing
- long-form reading comfort
- playful editorial claymorphism-inspired visuals
- Chinese-default routes with English mirrored UI
- static search and SEO infrastructure
- lightweight publishing and deployment workflows

It is not a CMS repository.

## Canonical Sources Of Truth

When repository facts conflict, prefer these files:

1. `AGENTS.md`
2. `README.md` and `README.en.md`
3. `docs/PRD.zh-CN.md` and `docs/PRD.md`
4. `docs/development-plan.zh-CN.md` and `docs/development-plan.md`
5. `docs/site-launch-checklist-and-publishing-sop.zh-CN.md`

## Historical Draft Warning

`Rendering.docx` is an earlier full-stack/CMS-oriented draft and does not reflect the current implemented repository.

Do not use it as the primary source for current scope, route model, or architecture decisions.

## Current Stack

- Next.js 15
- React 19
- TypeScript
- local MDX files under `content/posts`
- `gray-matter`, `@mdx-js/mdx`, `remark-gfm`
- Pagefind
- App Router metadata routes for sitemap, robots, feed, manifest, and OG
- global styling in `app/globals.css`
- lightweight Node-based regression tests in `lib/*.test.js`

## Current Scope Boundary

### In Scope

- public blog pages
- localized public site shell
- content repository helpers
- article reading UX
- blog-page tag filtering
- search, feed, manifest, sitemap, robots, and JSON-LD
- responsive design and theming
- deployment and release helper scripts/docs

### Out Of Scope

- login and authentication
- admin routes
- database-backed content editing
- CMS authoring interfaces
- media library management
- multi-author workflows
- analytics dashboards

If any of those directions are needed later, treat them as a new phase with new specs and plans.

## Route Model

- Chinese: `/`, `/blog`, `/blog/[slug]`, `/about`
- English: `/en`, `/en/blog`, `/en/blog/[slug]`, `/en/about`
- tags are handled through `/blog?tag=...`
- do not reintroduce standalone `/tags` pages unless a later phase explicitly changes the information architecture

## Directory Guide

```text
app/                  public App Router pages and metadata routes
components/           site shell, page, and reading-interaction components
content/posts/        local MDX articles
content/templates/    post template files
lib/                  content layer, i18n, SEO, copy, tests
public/               static assets, previews, generated Pagefind output
docs/                 PRD, development plan, launch checklist, design docs, superpowers records
scripts/              build and verification helpers
deploy/               Linux + systemd deployment bundle
```

## Working Rules For Agents

- Treat the repository as an already-completed current-phase product, not a greenfield prototype.
- Keep public content access centralized in `lib/content.js`.
- Route code should not parse MDX files directly.
- Keep draft filtering centralized in the content layer.
- Prefer Server Components by default and use client components only where interaction is required.
- Preserve the current visual language in `app/globals.css`: playful outer shell, calmer reading surfaces.
- Respect `prefers-reduced-motion`.
- Do not pre-introduce CMS, auth, admin, or database dependencies into this repository.
- When project status changes, update `README*`, `AGENTS.md`, and relevant docs in `docs/` together.

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

## Verification Baseline

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

## Operations Notes

- GitHub Actions CI verifies lint, tests, typecheck, and build.
- `deploy/` contains a Linux + systemd deployment bundle for pull/build/restart automation.
- Release and publishing procedures are documented in `docs/site-launch-checklist-and-publishing-sop.zh-CN.md`.

## Future Extensions

If a later phase starts, create new specs and plans before implementation for topics such as:

- login
- admin management
- CMS authoring
- database-backed content workflows
- multi-author collaboration

Do not pre-introduce those dependencies into the current repository.
