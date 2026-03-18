# Rendering MDX And SEO Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace mock blog content with real MDX files under `content/` and add foundational SEO metadata across the public frontend.

**Architecture:** Keep the existing App Router UI and swap only the data source. Add a repository layer that reads `content/posts/*.mdx`, parses frontmatter, compiles MDX to React content, and feeds route metadata from the same source of truth.

**Tech Stack:** Next.js App Router, TypeScript, Node `fs`, `gray-matter`, `@mdx-js/mdx`, `remark-gfm`

---

## File Structure

- Create: `content/posts/designing-a-terminal-first-blog.mdx`
- Create: `content/posts/motion-without-noise.mdx`
- Create: `content/posts/rendering-streams-and-reading-rhythm.mdx`
- Create: `content/posts/writing-for-developers-in-public.mdx`
- Create: `lib/content.ts`
- Create: `lib/mdx.ts`
- Create: `components/mdx-components.tsx`
- Create: `lib/content.test.js`
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/tags/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/globals.css`

### Task 1: Install MDX and content dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the required dependencies**

Add `gray-matter`, `@mdx-js/mdx`, and `remark-gfm`.

- [ ] **Step 2: Install packages**

Run: `npm.cmd install`
Expected: lockfile and `node_modules` update successfully

- [ ] **Step 3: Verify package state**

Run: `npm.cmd test`
Expected: current tests still pass before content migration begins

### Task 2: Replace mock-data tests with content repository tests

**Files:**
- Create: `lib/content.test.js`
- Modify: `package.json`
- Delete or stop referencing: `lib/mock-data.test.js`

- [ ] **Step 1: Write failing repository assertions**

Cover:
- sorted public posts
- slug lookup
- tag aggregation
- adjacent navigation
- draft exclusion

- [ ] **Step 2: Run test to verify failure**

Run: `npm.cmd test`
Expected: FAIL because `lib/content.ts` does not exist yet

- [ ] **Step 3: Update the test script to target the new repository test**

Use a single-process Node assertion script, matching the existing sandbox-friendly approach.

### Task 3: Create real MDX content files

**Files:**
- Create: `content/posts/designing-a-terminal-first-blog.mdx`
- Create: `content/posts/motion-without-noise.mdx`
- Create: `content/posts/rendering-streams-and-reading-rhythm.mdx`
- Create: `content/posts/writing-for-developers-in-public.mdx`

- [ ] **Step 1: Add frontmatter to each article**

Each file includes:
- `title`
- `description`
- `publishedAt`
- `tags`
- `draft`

- [ ] **Step 2: Move existing article body copy into MDX**

Preserve the current narrative from mock data so the rendered site still feels consistent after the migration.

- [ ] **Step 3: Add one draft article if needed for draft filtering coverage**

This can be a small hidden file used to prove the repository logic works.

### Task 4: Build the MDX parsing and content repository layer

**Files:**
- Create: `lib/mdx.ts`
- Create: `lib/content.ts`

- [ ] **Step 1: Implement frontmatter parsing**

Use `gray-matter` to read file metadata and content body.

- [ ] **Step 2: Implement MDX compilation helper**

Use `@mdx-js/mdx` plus `react/jsx-runtime` and `remark-gfm` to turn local MDX source into renderable content.

- [ ] **Step 3: Implement repository functions**

Add:
- `getAllPosts()`
- `getRecentPosts()`
- `getPostBySlug()`
- `getAllPostSlugs()`
- `getTagSummaries()`
- `getPostsByTag()`
- `getAdjacentPosts()`

- [ ] **Step 4: Run tests to verify green**

Run: `npm.cmd test`
Expected: PASS

### Task 5: Add MDX presentation components

**Files:**
- Create: `components/mdx-components.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Map MDX elements to styled React components**

Cover headings, paragraphs, lists, links, blockquotes, `pre`, and `code`.

- [ ] **Step 2: Add article-body-specific styling**

Make sure MDX output inherits the calm reading surface and cold terminal accent language.

### Task 6: Migrate routes from mock data to repository data

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/tags/page.tsx`

- [ ] **Step 1: Update home page data usage**

Read recent or featured content from the repository.

- [ ] **Step 2: Update blog index and tags pages**

Use repository summaries instead of `lib/mock-data.js`.

- [ ] **Step 3: Update article detail rendering**

Use slug lookup, compiled MDX content, static params, and adjacent navigation from the repository.

- [ ] **Step 4: Remove route-level dependence on `lib/mock-data.js`**

Keep the UI components but point all public content routes at the new content layer.

### Task 7: Add foundational SEO metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/tags/page.tsx`
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Add `metadataBase` and site-level defaults**

Use `https://rendering.me` as the canonical base URL.

- [ ] **Step 2: Add static metadata for top-level routes**

Set title, description, canonical path, Open Graph basics, and Twitter basics.

- [ ] **Step 3: Add dynamic `generateMetadata` for blog detail**

Use frontmatter-driven title, description, canonical URL, tags, and publish date.

### Task 8: Final cleanup and verification

**Files:**
- Modify: any touched files as needed

- [ ] **Step 1: Remove obsolete mock data usage**

Delete `lib/mock-data.js` only if it is no longer referenced anywhere.

- [ ] **Step 2: Run tests**

Run: `npm.cmd test`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm.cmd run build`
Expected: PASS with blog routes statically generated from real MDX content

- [ ] **Step 4: Manually verify route behavior**

Check `/`, `/blog`, `/blog/[slug]`, `/tags`, and `/about` for correct content rendering and metadata-safe output
