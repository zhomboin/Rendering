# Rendering MDX And SEO Design

Date: 2026-03-18
Project: Rendering
Scope: Local MDX content source and foundational SEO for the public blog frontend
Status: Approved in conversation, pending final user review of written spec

## 1. Goal

Replace the current mock content layer with a real repository-backed MDX content source stored under `content/`, while adding foundational SEO metadata across the public frontend.

This round covers:

- Local `.mdx` files in the repository
- A content repository layer for reading and shaping article data
- Dynamic article metadata
- Static metadata for top-level public routes

This round does not cover:

- Full-text search
- Comments integration
- Dynamic OG image generation
- `sitemap.xml`
- `robots.txt`
- RSS feed generation
- JSON-LD schema output

## 2. Why This Scope

The current frontend already has a stable public UI shell. The next highest-leverage change is replacing fake content with real authorable content.

MDX should come before search and comments because:

- Search depends on real document structure and metadata
- SEO depends on real article metadata
- Comments are lower-value until content is real

This round should establish the content contract the rest of the blog will build on.

## 3. Chosen Architecture

Chosen direction: file scanning with a dedicated content repository layer.

### Content source

Each article lives in:

- `content/posts/<slug>.mdx`

The filename provides the default slug.

### Repository layer

A dedicated module under `lib/` is responsible for:

- Discovering MDX files
- Reading raw file contents
- Parsing frontmatter
- Compiling or preparing MDX for rendering
- Returning sorted article lists
- Looking up single articles by slug
- Aggregating tags
- Resolving previous and next article navigation
- Producing metadata-ready objects for SEO

Pages should not directly read files from the filesystem. Pages consume repository outputs only.

## 4. Content Directory Structure

Recommended structure:

- `content/posts/`
- `lib/content.ts`
- `lib/mdx.ts`
- `components/mdx-components.tsx`

Example content files:

- `content/posts/designing-a-terminal-first-blog.mdx`
- `content/posts/motion-without-noise.mdx`

This keeps authored content separate from UI code while still allowing the site to remain fully static-compatible.

## 5. Frontmatter Contract

Each article must support the following frontmatter fields:

- `title`
- `description`
- `publishedAt`
- `tags`
- `coverImage` optional
- `draft` optional

### Field rules

`title`
- Required
- Used in lists, article pages, and metadata

`description`
- Required
- Used as article summary and meta description

`publishedAt`
- Required
- Used for sorting and article metadata

`tags`
- Required
- Used for tag aggregation and content navigation

`coverImage`
- Optional
- Reserved for later visual expansion and OG alignment

`draft`
- Optional
- Defaults to false
- Draft entries should be excluded from public listing and static generation

## 6. Slug Rules

Default slug source:

- File name without extension

Example:

- `content/posts/rendering-streams-and-reading-rhythm.mdx`
- slug becomes `rendering-streams-and-reading-rhythm`

This keeps authoring simple and avoids duplication. If custom slugs are needed in the future, the repository layer can be extended later without changing page contracts.

## 7. MDX Rendering Strategy

The site should render real MDX content in article detail pages.

Recommended responsibilities:

`lib/mdx.ts`
- Parse frontmatter
- Separate frontmatter from body
- Compile or serialize MDX for page rendering

`components/mdx-components.tsx`
- Map MDX elements like headings, paragraphs, code blocks, lists, blockquotes, and links into the existing cold terminal visual language

The rendering system should preserve the current readability rules:

- Long-form text stays calm
- Headings remain sharp and scannable
- Code and callouts inherit the terminal-inspired panel styling without overpowering the content

## 8. Repository API Shape

The content layer should expose a small, stable set of functions.

Recommended function set:

- `getAllPosts()`
- `getFeaturedPosts()` optional if featured content is kept
- `getPostBySlug(slug)`
- `getAllPostSlugs()`
- `getTagSummaries()`
- `getPostsByTag(tag)`
- `getAdjacentPosts(slug)`

The route layer should never need to know how frontmatter is parsed or how files are read from disk.

## 9. Route Changes

The following routes should be updated to use the real content repository:

- `/`
- `/blog`
- `/blog/[slug]`
- `/tags`

### Home page

Should read featured or recent articles from the repository instead of mock data.

### Blog index

Should read the full list of public posts sorted by date descending.

### Blog detail

Should resolve content by slug, render MDX, and provide previous or next article links from repository data.

### Tags page

Should aggregate tag counts from real articles.

## 10. SEO Scope

This round adds foundational SEO only.

### Static route metadata

Add route metadata for:

- Home
- Blog index
- Tags
- About

These should include:

- Title
- Description
- Canonical path where relevant
- Open Graph basics
- Twitter basics

### Article metadata

Each article detail page should derive metadata from frontmatter:

- `title`
- `description`
- canonical URL
- `openGraph.type = "article"`
- article publish date
- article tag set if supported in the metadata shape

## 11. SEO Data Rules

`description` should be the single source of truth for article summaries in both UI and metadata.

Avoid generating separate UI summary text and SEO summary text unless necessary. This reduces drift and improves consistency.

Canonical URLs should follow the public route shape:

- `/blog/<slug>`

Metadata should be generated from real post data, not duplicated constants.

## 12. Draft Handling

Draft support must exist at the repository layer.

Rules:

- Draft posts do not appear in public lists
- Draft posts do not appear in tag aggregation
- Draft posts are not included in static params generation
- Draft posts should return not found if accessed by public route

This keeps the content workflow usable before any admin system exists.

## 13. Testing And Verification

The content layer should be the main verification target in this round.

Minimum verification expectations:

- Repository returns sorted public posts
- Slug lookup works
- Draft filtering works
- Tag aggregation works
- Adjacent article navigation works
- Production build succeeds with real MDX files

Visual verification should confirm:

- MDX content respects the existing reading layout
- Headings and spacing remain consistent with the established style
- Metadata generation does not break route builds

## 14. Risks And Mitigations

Risk: content parsing logic leaks into pages.
Mitigation: centralize all file and frontmatter access inside the repository layer.

Risk: MDX styling breaks the calm reading experience.
Mitigation: map MDX elements through dedicated components aligned with the existing visual system.

Risk: metadata duplicates content fields and drifts over time.
Mitigation: use frontmatter-driven metadata and treat `description` as the single source of truth.

Risk: drafts leak into the public site.
Mitigation: enforce draft filtering in repository helpers and static params generation.

## 15. Recommendation

Implement local MDX content and foundational SEO now, keeping route contracts stable and the UI shell intact. After this round, the project will be ready for search, comments, and richer publishing features on top of a real content model.
