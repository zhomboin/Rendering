# Rendering Product Requirements Document

Date: 2026-03-21
Project: Rendering
Document Status: Active
Document Role: Single PRD for the current personal-blog phase

## Product Definition

`Rendering` is currently a personal technical blog, not a CMS product.

It is a public-facing publishing site built around:

- long-form technical writing
- a playful claymorphism-inspired editorial identity
- light-first theming with dark-mode support
- local MDX authoring
- strong reading comfort for text, code, and images
- static search and SEO foundations

## Current Goals

The current phase should deliver a polished personal blog that can stand on its own without any admin panel or login system.

Readers should be able to:

- discover content from the homepage, archive, tags, and search
- read text-and-image technical articles comfortably
- switch between Chinese-first public routes and English UI mirrors
- navigate through a coherent archive with tags and related content

Authors should be able to:

- publish through local MDX files
- manage frontmatter-driven metadata
- extend the archive without depending on a CMS

## In Scope

- public routes and reader-facing UI
- Chinese default routes plus English mirrored site UI routes under `/en`
- local MDX content source
- frontmatter-driven metadata
- tag archive and tag filtering
- search powered by Pagefind
- route metadata, sitemap, robots, and JSON-LD
- reading progress
- article media modules with `figure`, `caption`, `gallery`, and lightbox support
- light/dark theme switching

## Out Of Scope

- CMS implementation
- login and authentication
- admin routes or dashboard tooling
- database-backed content editing
- comments and moderation
- analytics dashboards
- newsletter systems
- multi-author workflows

These may become future phased extensions, but they are not part of the current product definition.

## Current Product Qualities

The blog should feel:

- editorial rather than template-driven
- playful on the shell, calm in the reading surface
- vivid without becoming visually noisy
- image-friendly without turning article pages into decorative galleries
- technically grounded and useful to working engineers

## Current Implementation Reality

The repository already includes:

- homepage, archive, article, tags, tag archive, and about pages
- Chinese-first and English-mirrored route trees
- local MDX content under `content/posts`
- Pagefind search modal
- sitemap, robots, and structured data
- reading progress and article TOC support
- article figure/gallery/lightbox support
- playful claymorphism visual system with theme switching

## Next Development Priorities

The next current-phase wave should focus on:

1. publishing baseline closure
2. author workflow and migration template improvements
3. distribution additions such as feeds and manifest support
4. curated migration of original CSDN articles into native site content

## Content Direction

The next content growth wave should emphasize the user's original writing around:

- databases
- systems
- servers
- practical engineering notes

The first curated migration batch should be manually selected, rewritten, and adapted to fit Rendering's current editorial style rather than bulk-imported.

## Success Criteria

The current phase is successful when:

- the public site feels complete and polished without CMS features
- authoring through MDX remains sustainable
- search and SEO are dependable
- the archive feels increasingly substantial
- the blog can grow through curated, native-feeling technical writing