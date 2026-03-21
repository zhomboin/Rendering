# Rendering PRD

Date: 2026-03-19
Project: Rendering
Document Status: Active
Document Role: Single source of truth for the current personal-blog phase

## Product Definition

`Rendering` is currently a personal technical blog, not a CMS product.

This phase focuses on a public-facing publishing site for long-form writing about frontend systems, rendering, interaction design, motion, performance, and engineering thinking. It should feel personal, editorial, expressive, and highly readable.

Current priorities:

- a strong public reading experience
- a clear personal editorial voice
- a stable local MDX workflow
- search and SEO for published writing
- a polished frontend that already feels complete without admin tooling

## Phase Goal

Deliver a complete personal blog experience that supports:

- publishing essays with local MDX files
- browsing through homepage, archive, tags, and article pages
- full-text discovery through static search
- foundational SEO metadata with room for expansion
- a playful claymorphism-inspired visual identity with strong long-form readability

## In Scope

- Home, blog archive, article detail, tags, and about pages
- local MDX files under `content/posts`
- frontmatter-driven metadata, draft filtering, tag aggregation
- previous and next article navigation
- image-friendly MDX presentation with figure, caption, and gallery support
- Pagefind search and tag-driven discovery
- route metadata, canonical URLs, Open Graph, and Twitter metadata
- default light theme with dark-mode support
- reading progress on article pages

## Out Of Scope

- login or author authentication
- admin dashboard
- online editor
- media library
- role and permission system
- database-backed post management
- scheduled publishing workflows
- comment moderation backend
- analytics dashboard
- multi-author publishing

## UX Requirements

- Homepage should feel like an editorial entry point, not a marketing landing page.
- Archive should support fast scanning with clear featured hierarchy and metadata.
- Article pages are the highest-priority experience and must optimize for reading comfort, image-and-text flow, code formatting, and low distraction.
- Search should feel like part of the editorial product, not a generic launcher.

## Visual Direction

The current visual direction is playful editorial claymorphism.

Key traits:

- default light theme, dark mode with the same personality
- rounded, tactile surfaces and pill-shaped controls
- vivid but controlled accents across coral, yellow, blue, green, purple, and pink
- softer depth and clay-like elevation rather than hard mechanical panels
- quieter article surfaces than homepage and navigation surfaces

Avoid:

- reverting to a cold cyber-terminal dashboard identity
- generic purple AI gradients
- excessive bloom and blur
- decorative motion that competes with reading
- overly playful article bodies that harm long-form readability

## Technical Direction

- Next.js App Router
- React
- TypeScript
- local MDX content
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- Pagefind

Preferred architecture:

- local file-based content repository
- static-compatible routing
- route-driven metadata
- reusable UI components
- no database dependency in the current phase

## Success Criteria

The phase is successful when:

- the site works as a complete personal blog without admin tooling
- publishing through local MDX is straightforward
- all public pages feel visually cohesive
- article pages support both long-form text and image-heavy content well
- search and tag navigation help readers discover content quickly
- the site has a solid SEO baseline and a clean path for structured-data expansion