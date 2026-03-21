# Rendering Development Plan

Date: 2026-03-19
Project: Rendering
Document Status: Active
Document Role: Single implementation plan for the current personal-blog phase

## Plan Goal

Deliver `Rendering` as a complete personal technical blog with a strong public reading experience, local MDX content workflow, static search, and extensible SEO foundations, while keeping the codebase ready for future CMS expansion without implementing CMS features now.

## Current Scope

Included:

- public routes and reader-facing UI
- local content architecture
- visual system and interaction quality
- search and discovery
- SEO foundations
- quality and deploy readiness

Excluded:

- login and authentication
- admin panels
- database-backed content editing
- multi-author publishing
- backend media management

## Current Status

The repository already contains:

- public pages
- MDX content repository
- Pagefind search integration
- baseline metadata
- playful claymorphism-inspired visual system
- article media modules with figure, caption, gallery, and lightbox support

## Workstreams

### 1. Product Alignment And Documentation

Keep `docs/PRD.md`, `docs/development-plan.md`, the Chinese companion docs, `README.md`, `README.en.md`, and `AGENT.md` aligned with the actual product and current repo stack.

### 2. Public Blog Experience

Continue polishing:

- homepage storytelling and hierarchy
- archive scanability
- article reading comfort
- tag-driven browsing
- responsive behavior
- image-and-text article layouts

### 3. Content System And Editorial Workflow

Maintain:

- local MDX as the canonical author workflow
- strict frontmatter contracts
- stable tag aggregation
- repository helpers as the only source of truth for public content access
- tests whenever content-layer behavior changes

### 4. Search And SEO

Keep search reliable and complete the current-phase SEO baseline with:

- route metadata
- article metadata
- `sitemap.xml`
- `robots.txt`
- JSON-LD

### 5. Quality, Performance, And Deployment Readiness

Maintain:

- passing helper and content tests
- successful production build and search indexing
- good mobile and desktop readability
- visible focus states and reduced-motion support

### 6. Future CMS Expansion Preparation

Allowed preparation:

- keep content access behind repository helpers
- avoid coupling routes directly to file parsing details
- leave room for future content-source replacement
- keep UI components modular enough to survive a future admin phase

Not allowed now:

- building login flows just in case
- adding database dependencies without a real current need
- introducing admin routes that are not actively required
- designing the public site around future dashboard needs

## Recommended Priority Order

1. keep PRD and plan alignment stable
2. continue polishing the public reading and browsing experience
3. strengthen content quality and authoring discipline
4. extend SEO foundations where they deliver clear value
5. tighten QA and deployment readiness
6. only then define the first CMS expansion phase

## Completion Definition

The current phase is complete when:

- the public blog feels polished and coherent
- the MDX workflow is stable and pleasant
- search and metadata are dependable
- the project is easy to maintain and deploy
- no missing current-phase feature requires CMS infrastructure to be considered successful