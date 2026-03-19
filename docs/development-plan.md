# Rendering Development Plan

Date: 2026-03-19
Project: Rendering
Document Status: Active
Document Role: Single implementation plan for the current personal-blog phase

## 1. Plan Goal

Deliver `Rendering` as a complete personal technical blog with a strong public reading experience, local MDX content workflow, static search, and SEO foundations, while keeping the codebase ready for future CMS expansion without implementing CMS features now.

## 2. Planning Rules

This plan assumes:

- the current product is a personal blog
- the public reading experience is the primary deliverable
- local MDX remains the canonical content workflow
- future CMS capabilities are deferred into later phase documents

This plan should guide all near-term work for the current phase.

## 3. Current Scope Boundary

### Included In This Plan

- public routes and reader-facing UI
- local content architecture
- visual system and interaction quality
- search and discovery
- SEO foundations
- quality, maintainability, and deploy readiness

### Excluded From This Plan

- login and authentication
- admin panels
- database-backed content editing
- multi-author publishing
- role and permission models
- backend media management

## 4. Current Status Snapshot

The repository already contains major pieces of this phase:

- public pages
- MDX content repository
- Pagefind search integration
- baseline metadata

This plan therefore serves two purposes:

- define the canonical target for the current personal-blog phase
- organize future work and refinements against that target

## 5. Delivery Strategy

The personal-blog phase should be executed in six workstreams:

1. product alignment and documentation
2. public blog experience
3. content system and editorial workflow
4. search and SEO
5. quality, performance, and deployment readiness
6. future CMS expansion preparation

## 6. Workstream 1: Product Alignment And Documentation

### Objective

Make the personal-blog scope explicit so design and engineering decisions stop drifting toward a premature CMS.

### Tasks

- establish a single canonical PRD in `docs/PRD.md`
- establish a single canonical plan in `docs/development-plan.md`
- treat historical `docs/superpowers/specs/` and `docs/superpowers/plans/` files as prior iteration records, not current scope authorities
- remove ambiguity in future decisions by checking them against the current PRD before implementation

### Exit Criteria

- the current phase has one PRD and one development plan
- the team can clearly distinguish current-scope work from future CMS-scope work

## 7. Workstream 2: Public Blog Experience

### Objective

Polish and complete the reader-facing product so it feels like a finished personal publication.

### Core Areas

- homepage storytelling and hierarchy
- archive scanability
- article reading comfort
- tag-driven browsing
- about-page author positioning
- responsive behavior

### Key Files

- `app/layout.tsx`
- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/tags/page.tsx`
- `app/about/page.tsx`
- `app/globals.css`
- `components/`

### Tasks

- refine the homepage as an editorial entry point rather than a product landing page
- keep the archive denser and more operational than the homepage
- protect article-page readability as the highest-priority UX concern
- ensure tags feel like a real navigation surface, not leftover metadata
- keep the About page personal and contextual, not resume-like
- validate small-screen behavior, line length, spacing, and focus visibility

### Exit Criteria

- all public pages are cohesive
- the site feels like a personal technical blog, not a dashboard or CMS shell
- article pages remain the strongest experience in the product

## 8. Workstream 3: Content System And Editorial Workflow

### Objective

Keep publishing simple, reliable, and author-friendly while preserving future flexibility.

### Core Areas

- MDX authoring
- frontmatter contract
- content repository stability
- draft handling
- taxonomy consistency

### Key Files

- `content/posts/*.mdx`
- `lib/content.js`
- `lib/mdx.js`
- `lib/content.test.js`
- `components/mdx-components.tsx`

### Tasks

- preserve local MDX as the primary author workflow
- maintain a strict frontmatter contract for title, description, published date, tags, and draft state
- ensure tag aggregation remains stable as content volume grows
- keep repository helpers as the only source of truth for public content access
- improve article-body MDX presentation as needed without complicating the authoring model
- add tests whenever content-layer behavior changes

### Exit Criteria

- publishing a new article is low-friction
- draft content cannot leak into public routes
- content logic remains easy to reason about and test

## 9. Workstream 4: Search And SEO

### Objective

Make published writing easier to discover without introducing backend complexity.

### Core Areas

- Pagefind indexing
- search UX
- route metadata
- article metadata
- future SEO extensions

### Key Files

- `components/search-modal.tsx`
- `components/search-trigger.tsx`
- `components/site-header.tsx`
- `scripts/build-search-index.mjs`
- `app/layout.tsx`
- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/tags/page.tsx`
- `app/about/page.tsx`

### Tasks

- keep the search modal aligned with the editorial visual language
- ensure keyboard shortcuts and focus behavior remain reliable
- maintain article metadata as frontmatter-driven
- preserve canonical URL discipline
- add missing SEO enhancements later in this phase when justified:
  - `sitemap.xml`
  - `robots.txt`
  - JSON-LD
  - richer OG support

### Exit Criteria

- search remains fast and useful for the live archive
- metadata is correct across public routes
- the site has a clean baseline for further SEO work

## 10. Workstream 5: Quality, Performance, And Deployment Readiness

### Objective

Keep the personal blog dependable, maintainable, and ready to publish.

### Core Areas

- build reliability
- content-layer tests
- responsive QA
- accessibility checks
- visual consistency

### Tasks

- maintain passing content-repository tests
- maintain a successful production build including search indexing
- verify that article pages remain readable on mobile and desktop
- preserve visible focus states and reduced-motion respect
- avoid visual regressions that make the site feel generic or noisy
- keep the deployment path simple and static-friendly

### Exit Criteria

- `npm.cmd test` passes
- `npm.cmd run build` passes
- public routes are production-safe
- the current phase can be deployed confidently as a personal blog

## 11. Workstream 6: Future CMS Expansion Preparation

### Objective

Prepare sensible extension points without building the CMS now.

### Allowed Preparation

- keep content access behind repository helpers
- avoid coupling route code directly to file parsing details
- leave room for future content-source replacement
- keep UI components modular enough to survive a future admin phase

### Not Allowed In Current Phase

- building login flows "just in case"
- adding database dependencies without a real current need
- introducing admin routes that are not actively required
- designing the public site around future dashboard needs

### Future Documentation Policy

When the project is ready for CMS expansion, create new phase-specific documents in:

- `docs/superpowers/specs/`
- `docs/superpowers/plans/`

Examples of future phases:

- author authentication
- admin content management
- database-backed publishing
- media asset workflow
- comments and moderation

## 12. Recommended Priority Order

The recommended order for remaining work in the current personal-blog phase is:

1. keep PRD and plan alignment stable
2. continue polishing the public reading and browsing experience
3. strengthen content quality and authoring discipline
4. extend SEO foundations where they deliver clear value
5. tighten QA and deployment readiness
6. only then define the first CMS expansion phase

## 13. Decision Filter For New Requests

Any new request should be evaluated with this question first:

Does this improve the current personal-blog experience, or does it belong to a future CMS phase?

If it improves the current personal-blog phase, it can be prioritized here.

If it mainly supports management, authentication, or editorial operations, it should be deferred into a future staged spec and plan.

## 14. Completion Definition For This Phase

The current phase can be considered complete when:

- the public blog feels polished and coherent
- the MDX workflow is stable and pleasant
- search and metadata are dependable
- the project is easy to maintain and deploy
- no missing feature from the current phase requires CMS infrastructure to be considered successful

## 15. Canonical Document Policy

For the current personal-blog phase:

- `docs/PRD.md` is the canonical product-definition document
- `docs/development-plan.md` is the canonical implementation-plan document

Future CMS work must not redefine this phase retroactively. Instead, it should be introduced through separate staged specs and plans under `docs/superpowers/`.
