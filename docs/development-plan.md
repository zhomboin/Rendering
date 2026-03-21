# Rendering Development Plan

Date: 2026-03-21
Project: Rendering
Document Status: Active
Document Role: Single implementation plan for the current personal-blog phase

## Plan Goal

Deliver `Rendering` as a polished personal technical blog with a stable release baseline, strong reading experience, repeatable local MDX workflow, lightweight distribution features, and room for future CMS expansion without implementing CMS features now.

## Current Status

The repository already contains:

- public homepage, archive, article, tags, and about routes
- Chinese-first routing and English mirrored site UI routes
- local MDX content repository
- tag archive and tag filtering
- Pagefind search integration
- sitemap, robots, and JSON-LD
- playful claymorphism visual system
- article media modules, reading progress, and richer article UX

## Current Workstreams

### 1. Publishing Baseline Closure

Tighten the current release baseline by:

- syncing docs with repo reality
- adding explicit local verification commands
- adding CI for core checks
- improving missing-page handling
- tightening accessibility on the most important interaction surfaces

### 2. Author Workflow And Content Discipline

Strengthen the content layer by:

- clarifying frontmatter expectations
- adding authoring templates and draft helpers
- validating content more reliably
- keeping repository helpers as the only public-content source of truth

### 3. Distribution Foundations

Extend outward-facing publishing support with:

- feed generation
- manifest support
- stronger share and metadata foundations where useful

### 4. Curated Content Migration

Grow the archive by migrating a first curated batch of original CSDN articles into native Rendering content, with rewriting and restructuring rather than mechanical copying.

### 5. Future CMS Preparation

Keep the architecture ready for a later CMS phase by:

- maintaining clean repository boundaries
- avoiding direct route/file parsing coupling
- keeping current UI components reusable

Do not add login, admin, or database complexity just in case.

## Recommended Execution Order

1. publishing baseline closure
2. author workflow and migration template
3. distribution additions
4. curated CSDN article migration
5. re-evaluate the need for a future CMS phase

## Completion Definition

The current phase is in a strong place when:

- verification and build workflows are reliable
- product docs and implementation match
- new posts are easier to create consistently
- the archive has grown in both quality and technical depth
- no current-phase requirement depends on CMS infrastructure