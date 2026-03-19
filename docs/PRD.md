# Rendering PRD

Date: 2026-03-19
Project: Rendering
Document Status: Active
Document Role: Single source of truth for the current personal-blog phase

## 1. Product Definition

`Rendering` is currently a personal technical blog, not a CMS product.

In this phase, the product is a public-facing publishing site for long-form writing about frontend systems, rendering, interface behavior, motion, performance, and engineering thinking. It should feel authored, opinionated, and highly readable.

This phase intentionally prioritizes:

- a strong public reading experience
- a clear personal brand and editorial voice
- a stable local content workflow
- search and SEO for published writing
- a polished blog frontend that already feels complete without admin tooling

This phase does not aim to ship a multi-user publishing platform, a login system, or an operational content management backend.

## 2. Product Vision

The long-term vision for `Rendering` is a writing-first technical publication that can gradually evolve into a richer publishing system. However, the current milestone is narrower and more focused:

- build a high-quality personal blog first
- validate the visual language, content model, and reading experience
- keep the architecture clean enough to support future expansion

The blog should feel like a public workspace for ongoing technical thinking rather than a generic template site or an overbuilt CMS shell.

## 3. Problem Statement

Many personal engineering blogs fail in one of two ways:

- they look generic and fail to establish a strong identity
- they pursue backend complexity too early and delay the quality of the actual reading experience

`Rendering` should solve both problems by shipping a distinctive, high-comfort personal blog before introducing management features that are not yet necessary.

## 4. Current Phase Goal

Deliver a complete personal blog experience that supports:

- publishing technical essays with local MDX files
- browsing posts through homepage, archive, tags, and article pages
- full-text discovery through static search
- foundational SEO metadata
- a consistent visual identity built around a cold terminal cyber style

Success in this phase means the site is a compelling public blog on its own, even without login, admin panels, or database-backed workflows.

## 5. Target User

Primary user:

- the author of the blog, publishing personal technical writing

Primary audience:

- frontend engineers
- web performance practitioners
- design-engineering readers
- developers interested in rendering, UX systems, and technical writing

Secondary audience:

- potential collaborators, recruiters, and peers evaluating the author's thinking and taste through the blog

## 6. Product Principles

### 6.1 Writing First

The product exists to support reading and publishing thoughtful technical writing. Decorative features must not overpower the content.

### 6.2 Strong Identity, Controlled Styling

The visual direction should be recognizable and memorable, but never at the expense of readability. The site should feel technical, calm, and intentional rather than flashy or overloaded.

### 6.3 Static-Friendly by Default

The current system should prefer simple, reliable, static-compatible architecture where possible. Content should remain easy to author, build, and deploy.

### 6.4 Future-Ready, Not Future-Bloated

The current architecture should leave room for future login and CMS features, but must not force the current phase to behave like a CMS before those needs are real.

## 7. In-Scope Features For This Phase

### 7.1 Public Blog Experience

- Home page
- Blog index page
- Blog detail page
- Tags page
- About page

### 7.2 Content System

- Local MDX files under `content/posts`
- frontmatter-driven metadata
- draft filtering
- tag aggregation
- previous and next article navigation

### 7.3 Search And Discovery

- global static search powered by Pagefind
- keyboard shortcuts and modal search UI
- visible topic/tag navigation

### 7.4 SEO Foundations

- route-level metadata
- article-level metadata from frontmatter
- canonical URLs
- basic Open Graph metadata
- basic Twitter metadata

### 7.5 Visual And UX System

- cold terminal cyber visual identity
- comfortable long-form reading surfaces
- restrained motion
- strong focus states
- responsive behavior for mobile and desktop

## 8. Explicitly Out Of Scope For This Phase

The following are not part of the current personal-blog phase:

- login
- author authentication
- admin dashboard
- online editor
- media library
- role and permission system
- database-backed post management
- scheduled publishing workflows
- comment moderation backend
- analytics dashboard
- multi-author publishing workflows

These may become valid future phases, but they are not required for the success of the current product.

## 9. Information Architecture

The public information architecture for this phase is:

- `/` Home
- `/blog` Archive
- `/blog/[slug]` Article detail
- `/tags` Topic index
- `/about` Author and project context

Global navigation should stay compact and editorial:

- Home
- Blog
- Tags
- About
- Search trigger

## 10. Content Model

Each article should support the following content contract:

- `title`
- `description`
- `publishedAt`
- `tags`
- `draft`
- `coverImage` optional and reserved for later expansion

Rules:

- filename provides the slug
- draft entries are excluded from public routes
- `description` is the shared source for excerpts and meta description
- tags support both discovery and information architecture

## 11. User Experience Requirements

### 11.1 Homepage

The homepage should establish brand, editorial tone, featured posts, recent posts, and topic clusters without behaving like a marketing landing page.

### 11.2 Archive

The archive should support dense, fast scanning of published content with clear metadata and low-friction navigation.

### 11.3 Article Reading

The article page is the highest-priority experience in the product. It must optimize for:

- reading comfort
- hierarchy clarity
- code and long-form formatting quality
- calm motion and low distraction

### 11.4 Search

Search should feel like a natural extension of the editorial product, not a generic application launcher.

## 12. Visual Direction

The chosen visual direction remains:

- cold terminal cyber

Key visual characteristics:

- deep carbon and graphite surfaces
- cyan and ice-blue accents
- restrained magenta only for rare highlight usage
- panel-based composition
- subtle grid and scanline textures
- controlled glow and motion

Anti-patterns:

- generic purple AI gradients
- excessive bloom and blur
- dashboard-like chrome overwhelming article pages
- decorative motion that competes with reading

## 13. Technical Direction

The current technical direction should support the personal-blog phase with minimal unnecessary complexity:

- Next.js App Router
- React
- TypeScript
- local MDX content
- `gray-matter` for frontmatter parsing
- `@mdx-js/mdx` for MDX compilation
- `remark-gfm` for markdown features
- Pagefind for static search

The preferred architecture is:

- local file-based content repository
- static-compatible routing
- route-driven metadata
- reusable UI components
- no database dependency in the current phase

## 14. Success Criteria

The current phase is successful when:

- the site works as a complete personal blog without requiring admin tooling
- publishing new articles via local MDX is straightforward
- all public pages feel visually cohesive
- article pages provide a convincing long-form reading experience
- search helps readers discover content quickly
- the site has a solid SEO baseline

## 15. Risks

### 15.1 Scope Drift Into CMS

Risk:
future platform ideas may blur the current phase and create unnecessary complexity.

Mitigation:
use this PRD as the scope boundary and treat CMS capabilities as a later initiative.

### 15.2 Visual Style Overpowers Content

Risk:
the cyber-terminal aesthetic could reduce readability.

Mitigation:
keep article surfaces calmer than brand surfaces and prioritize typography and spacing.

### 15.3 Content Workflow Becomes Fragile

Risk:
adding too much tooling too early can make authoring slower instead of better.

Mitigation:
keep local MDX as the canonical authoring workflow in this phase.

## 16. Future Expansion Path

After the personal-blog phase is stable, `Rendering` may expand through separate staged specs and plans under `docs/superpowers/specs/` and `docs/superpowers/plans/`.

Possible future phases include:

- author login
- private admin surface
- post management UI
- draft and publish workflows
- database-backed content storage
- asset management
- comments or reader interaction systems

These future capabilities should be documented as separate phase-specific specs and implementation plans rather than being merged into the current personal-blog scope.

## 17. Document Policy

For the current phase, this file is the canonical PRD.

The following folders are reserved for future multi-phase expansion work:

- `docs/superpowers/specs/`
- `docs/superpowers/plans/`

Those documents should be used for future CMS or platform-stage initiatives, not to redefine the current personal-blog scope.
