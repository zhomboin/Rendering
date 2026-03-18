# Rendering Frontend Prototype Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable Next.js public blog frontend prototype for Rendering with a cold terminal cyber visual system and mock content.

**Architecture:** Create a small App Router frontend that uses local mock data and reusable blog UI components. Keep visual styling centralized in global tokens and shared component classes so the prototype is cohesive now and easy to connect to real content later.

**Tech Stack:** Next.js, React, TypeScript, App Router, CSS variables in global CSS

---

## File Structure

Planned project files and responsibilities:

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/tags/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/globals.css`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/hero-panel.tsx`
- Create: `components/metric-panel.tsx`
- Create: `components/post-card.tsx`
- Create: `components/tag-chip.tsx`
- Create: `components/search-bar.tsx`
- Create: `components/article-meta.tsx`
- Create: `components/toc-panel.tsx`
- Create: `components/prev-next-nav.tsx`
- Create: `components/section-heading.tsx`
- Create: `lib/mock-data.ts`

## Task 1: Bootstrap the Next.js frontend shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `.gitignore`

- [ ] **Step 1: Write the package and TypeScript config**

Create a minimal Next.js app configuration with scripts for `dev`, `build`, `start`, and `lint`.

- [ ] **Step 2: Add ignore rules**

Add `.next`, `node_modules`, local env files, and brainstorm output directories to `.gitignore`.

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: dependencies install successfully and lockfile is generated

- [ ] **Step 4: Commit bootstrap setup**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts .gitignore
git commit -m "chore: bootstrap next frontend prototype"
```

## Task 2: Define mock content contracts

**Files:**
- Create: `lib/mock-data.ts`

- [ ] **Step 1: Define shared content types**

Add types for post summary, full post, tag metadata, metrics, and site navigation data.

- [ ] **Step 2: Add realistic blog mock data**

Create multiple technical blog posts with excerpts, dates, tags, reading times, section headings, related posts, and previous or next mappings.

- [ ] **Step 3: Add helper selectors**

Export helpers for featured posts, recent posts, tag counts, post lookup by slug, and neighboring post lookup.

- [ ] **Step 4: Verify the module is import-safe**

Run: `node -e "const data=require('./lib/mock-data.ts')"`
Expected: this step may fail in plain Node because TypeScript is not compiled yet, so instead verify by importing it from the app in the next tasks

- [ ] **Step 5: Commit mock data layer**

```bash
git add lib/mock-data.ts
git commit -m "feat: add blog mock content contracts"
```

## Task 3: Build the global visual system

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Define global CSS tokens**

Add CSS variables for background, surfaces, accents, text, borders, shadows, spacing, radii, and motion.

- [ ] **Step 2: Add shared utility classes**

Create reusable classes for panel surfaces, glows, grid overlays, content containers, and typography rhythm.

- [ ] **Step 3: Build the root layout**

Add HTML scaffold, metadata, site background layers, and a common page shell that wraps all routes.

- [ ] **Step 4: Run the app once to catch layout or CSS syntax issues**

Run: `npm run build`
Expected: build proceeds far enough to validate layout imports, or reports the next missing route or component cleanly

- [ ] **Step 5: Commit the global visual system**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add global cyber terminal visual system"
```

## Task 4: Create reusable site and blog components

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/hero-panel.tsx`
- Create: `components/metric-panel.tsx`
- Create: `components/post-card.tsx`
- Create: `components/tag-chip.tsx`
- Create: `components/search-bar.tsx`
- Create: `components/article-meta.tsx`
- Create: `components/toc-panel.tsx`
- Create: `components/prev-next-nav.tsx`
- Create: `components/section-heading.tsx`

- [ ] **Step 1: Build small stateless components first**

Implement `TagChip`, `SectionHeading`, and `MetricPanel`.

- [ ] **Step 2: Build navigation shell components**

Implement `SiteHeader` and `SiteFooter` using shared tokens and consistent interaction states.

- [ ] **Step 3: Build content presentation components**

Implement `PostCard`, `ArticleMeta`, `TOCPanel`, and `PrevNextNav`.

- [ ] **Step 4: Build homepage-specific pieces**

Implement `HeroPanel` and `SearchBar`.

- [ ] **Step 5: Run a production build to validate imports and props**

Run: `npm run build`
Expected: component graph resolves, or any type and import errors point to the next fix

- [ ] **Step 6: Commit the component layer**

```bash
git add components
git commit -m "feat: add reusable blog frontend components"
```

## Task 5: Implement the home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Compose the homepage hero and metrics**

Use the slogan, intro copy, and system-style metrics from mock data.

- [ ] **Step 2: Add featured and latest post sections**

Render featured cards and a recent content feed using shared `PostCard` layouts.

- [ ] **Step 3: Add tag signal section**

Render a tag grid or matrix that visually reinforces the taxonomy.

- [ ] **Step 4: Verify the route builds**

Run: `npm run build`
Expected: `/` route renders without compile errors

- [ ] **Step 5: Commit the homepage**

```bash
git add app/page.tsx
git commit -m "feat: add rendering homepage prototype"
```

## Task 6: Implement the blog index and tags pages

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/tags/page.tsx`

- [ ] **Step 1: Build the blog index layout**

Add intro, search presentation, tag filter presentation, and a dense article list.

- [ ] **Step 2: Build the tags page**

Render tag cards with counts and related posts or excerpts.

- [ ] **Step 3: Ensure internal linking works**

Use `next/link` to connect cards, tags, and nav routes consistently.

- [ ] **Step 4: Verify the routes build**

Run: `npm run build`
Expected: `/blog` and `/tags` compile successfully

- [ ] **Step 5: Commit index and tags pages**

```bash
git add app/blog/page.tsx app/tags/page.tsx
git commit -m "feat: add blog index and tags pages"
```

## Task 7: Implement the article detail page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Add slug lookup logic**

Read the slug from route params and resolve a post from mock data.

- [ ] **Step 2: Add not-found behavior**

Return `notFound()` when the slug does not exist.

- [ ] **Step 3: Render article header, TOC, and long-form content**

Include metadata, reading progress styling hook, structured article sections, and calmer reading surfaces.

- [ ] **Step 4: Add previous and next navigation**

Render neighboring article links from mock helpers.

- [ ] **Step 5: Verify dynamic route build**

Run: `npm run build`
Expected: dynamic route compiles and static generation succeeds for mock posts

- [ ] **Step 6: Commit the detail page**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: add blog detail reading experience"
```

## Task 8: Implement the About page and final shell polish

**Files:**
- Create: `app/about/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Build the About page**

Add author intro, writing principles, tech stack, and external links in the same visual language.

- [ ] **Step 2: Polish global shell details**

Tune spacing, footer status strip, page wrappers, and responsive behavior.

- [ ] **Step 3: Add reduced-motion and focus-state polish**

Ensure keyboard focus visibility and motion restraint are present across the shell.

- [ ] **Step 4: Verify all public routes compile**

Run: `npm run build`
Expected: all public routes succeed in production build

- [ ] **Step 5: Commit the final public pages**

```bash
git add app/about/page.tsx app/layout.tsx app/globals.css
git commit -m "feat: add about page and global polish"
```

## Task 9: Final verification

**Files:**
- Verify only

- [ ] **Step 1: Run local production verification**

Run: `npm run build`
Expected: successful Next.js production build

- [ ] **Step 2: Run local dev smoke test**

Run: `npm run dev`
Expected: local server starts and pages are manually testable

- [ ] **Step 3: Manually verify critical pages**

Check `/`, `/blog`, `/blog/<valid-slug>`, `/tags`, and `/about`.

- [ ] **Step 4: Verify responsive and visual quality**

Check small-width layout, readable article width, visible focus states, and restrained animation behavior.

- [ ] **Step 5: Commit final verification-only fixes if needed**

```bash
git add .
git commit -m "chore: finalize frontend prototype verification"
```
