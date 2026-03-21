# Rendering Publishing Baseline And Curated Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the current personal-blog release baseline, add repeatable authoring and migration workflow foundations, extend distribution features, and migrate a first curated batch of CSDN articles into native site content.

**Architecture:** Keep the current static-first App Router architecture intact. Extend it through focused helpers, content scripts, lightweight metadata/distribution routes, and localized UI refinements instead of introducing a CMS-style abstraction. Use repository helpers and file-based content as the single source of truth.

**Tech Stack:** Next.js App Router, React, TypeScript, MDX, Node-based repository tests, GitHub Actions, Pagefind

---

### Task 1: Sync Current-Phase Product Documentation

**Files:**
- Modify: `docs/PRD.zh-CN.md`
- Modify: `docs/development-plan.zh-CN.md`
- Modify: `README.md`
- Modify: `README.en.md`
- Modify: `AGENT.md`

- [ ] **Step 1: Update the docs checklist before editing**

Create a checklist covering:
- current bilingual route support
- tag archive and tag filter support
- article media modules
- reading progress
- playful claymorphism direction
- current out-of-scope boundaries
- next-wave author workflow and migration goals

- [ ] **Step 2: Rewrite each document to match current repo reality**

Ensure each document reflects:
- current personal-blog scope
- current implemented features
- current i18n status
- current SEO baseline
- future CMS as later-phase only

- [ ] **Step 3: Review for contradictions across files**

Check that no file still describes the current site as:
- a CMS
- a cold terminal cyber blog
- an admin-oriented platform

- [ ] **Step 4: Verify the text alignment with a targeted search**

Run: `rg -n "CMS|cyber|terminal|admin|Prisma|NextAuth" docs README* AGENT.md -S`
Expected: no stale current-phase claims remain, or only future-phase references remain.

- [ ] **Step 5: Commit**

```bash
git add docs/PRD.zh-CN.md docs/development-plan.zh-CN.md README.md README.en.md AGENT.md
git commit -m "docs: sync current-phase product positioning"
```

### Task 2: Add A Clear Local Verification Baseline

**Files:**
- Modify: `package.json`
- Create: `scripts/verify-content.mjs` or equivalent if needed
- Modify: `lib/content.test.js` if validation expands through tests

- [ ] **Step 1: Write the failing test for new content validation behavior**

Add a focused test in `lib/content.test.js` for at least one new frontmatter/content rule, such as:
- missing title should fail validation
- missing published date should fail validation
- tags should be normalized as a non-empty array for public posts

- [ ] **Step 2: Run the targeted test and confirm it fails for the expected reason**

Run: `node lib/content.test.js`
Expected: FAIL because the new validation expectation is not yet enforced.

- [ ] **Step 3: Implement the minimal validation in the content layer or validation helper**

Add only the logic required to make the new rule enforceable without overbuilding a CMS-like schema system.

- [ ] **Step 4: Re-run the targeted test and confirm it passes**

Run: `node lib/content.test.js`
Expected: PASS.

- [ ] **Step 5: Add explicit verification scripts in `package.json`**

Add at least:
- `typecheck`
- `check`

Recommendation:
- `typecheck`: `tsc --noEmit`
- `check`: runs tests, typecheck, and build in sequence

- [ ] **Step 6: Decide and implement the practical lint strategy**

If a real linter is lightweight and available, wire it in.
If not, define a narrower current-phase lint strategy and document that choice clearly.

- [ ] **Step 7: Run the full local verification baseline**

Run:
- `npm.cmd test`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- `npm.cmd run check`

Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add package.json lib/content.test.js lib/content.js scripts
git commit -m "chore: add release verification baseline"
```

### Task 3: Add CI For Core Current-Phase Checks

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create the workflow with the minimum current-phase checks**

The workflow should:
- run on push and pull request
- install dependencies with `npm ci`
- run `npm test`
- run `npm run typecheck`
- run `npm run build`

- [ ] **Step 2: Keep the workflow intentionally lean**

Do not add matrix builds, deployment, preview environments, or future-phase complexity.

- [ ] **Step 3: Validate the workflow file locally for obvious mistakes**

Review the YAML for:
- valid event triggers
- correct Node setup step
- correct commands
- correct working directory assumptions

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add core verification workflow"
```

### Task 4: Add Localized Not-Found Pages And Fast Content Access

**Files:**
- Create: `app/(zh)/not-found.tsx`
- Create: `app/en/not-found.tsx`
- Modify: `components/locale-shell.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add a failing expectation if testable, otherwise define the route behavior explicitly in the plan notes**

Because route-level not-found rendering is not currently covered by automated UI tests, treat this as a configuration/UI exception and keep the behavior simple and reviewable.

- [ ] **Step 2: Implement localized not-found pages**

The pages should:
- match the current blog visual system
- clearly guide the reader back to home, blog, or tags
- respect the active locale

- [ ] **Step 3: Add a skip-link or equivalent fast path to the main content**

Use `LocaleShell` and the main content container so keyboard users can bypass repeated header controls.

- [ ] **Step 4: Add or refine CSS for not-found and skip-link states**

Ensure:
- visible focus styles
- theme compatibility
- no visual regression in the current header layout

- [ ] **Step 5: Verify behavior via build and route review**

Run: `npm.cmd run build`
Expected: build still passes and not-found pages are compiled without route errors.

- [ ] **Step 6: Commit**

```bash
git add app/(zh)/not-found.tsx app/en/not-found.tsx components/locale-shell.tsx app/globals.css
git commit -m "feat: add localized not-found and skip-link support"
```

### Task 5: Tighten Accessibility On Core Interactive Surfaces

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/search-modal.tsx`
- Modify: `components/theme-toggle.tsx`
- Modify: `components/language-toggle.tsx`
- Modify: `components/article-media.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Identify the current ambiguous or weak interaction points**

Review:
- search trigger and modal labels
- theme toggle status messaging
- language toggle clarity
- lightbox keyboard affordances
- focus traps or focus return behavior

- [ ] **Step 2: Add the smallest meaningful improvements**

Prioritize:
- clearer labels
- better focus restoration
- visible keyboard targets
- better dialog semantics where missing

- [ ] **Step 3: Re-run the build after accessibility changes**

Run: `npm.cmd run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/site-header.tsx components/search-modal.tsx components/theme-toggle.tsx components/language-toggle.tsx components/article-media.tsx app/globals.css
git commit -m "feat: tighten accessibility on primary interactions"
```

### Task 6: Add Authoring Template And Content Validation Rules

**Files:**
- Create: `content/templates/post-template.mdx`
- Create: `scripts/create-post.mjs`
- Modify: `lib/content.js`
- Modify: `lib/content.test.js`
- Create or modify docs in `docs/` for author workflow if needed

- [ ] **Step 1: Write the failing tests for the new authoring rules**

Examples:
- required frontmatter fields must exist
- public posts cannot ship with invalid dates
- template-driven post creation should generate expected frontmatter shape

- [ ] **Step 2: Run the targeted tests and confirm they fail correctly**

Run: `node lib/content.test.js`
Expected: FAIL for the new expectations.

- [ ] **Step 3: Add the reusable post template**

Template should include:
- title
- description
- publishedAt
- tags
- draft flag
- body structure hints suitable for the current editorial style

- [ ] **Step 4: Implement the minimal draft-creation script**

The script should create a new file from the template using a slug argument, without introducing complex CLI dependencies.

- [ ] **Step 5: Add the validation logic needed to keep template output and public content consistent**

- [ ] **Step 6: Re-run tests and confirm green**

Run:
- `node lib/content.test.js`
- `npm.cmd test`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add content/templates/post-template.mdx scripts/create-post.mjs lib/content.js lib/content.test.js docs
git commit -m "feat: add authoring template and content validation"
```

### Task 7: Add Migration Checklist And Workflow Guidance

**Files:**
- Create: `docs/content-migration-guide.zh-CN.md` or similar
- Optionally create: `docs/content-migration-guide.md`

- [ ] **Step 1: Write the migration checklist as an editorial workflow**

Cover:
- choosing candidate posts
- rewriting title and excerpt
- restructuring sections
- replacing CSDN boilerplate
- normalizing code blocks
- selecting tags
- deciding whether to add figures or callouts
- setting canonical site positioning

- [ ] **Step 2: Keep the guide practical, not theoretical**

Make it something the next migration pass can follow directly.

- [ ] **Step 3: Commit**

```bash
git add docs/content-migration-guide.zh-CN.md docs/content-migration-guide.md
git commit -m "docs: add curated migration workflow"
```

### Task 8: Add First Distribution Features

**Files:**
- Create: `app/feed.xml/route.ts` or equivalent feed route
- Create: `app/manifest.ts`
- Modify: `app/layout.tsx` if manifest or icons need metadata exposure
- Create: social-share image helpers or placeholders if needed
- Modify: `lib/seo.js` if feed/share URLs need helpers
- Add icons/assets under `public/` if needed

- [ ] **Step 1: Write the failing tests for any new feed/helper logic**

If feed generation or helper logic lives in `lib/`, add a focused test first.

- [ ] **Step 2: Run the new helper test and verify the red state**

Run the relevant node test file.
Expected: FAIL because the helper or route behavior is not implemented yet.

- [ ] **Step 3: Implement a minimal feed route**

Use existing content helpers so the feed is derived from the same public posts as the site.

- [ ] **Step 4: Add a web manifest**

Keep it aligned with the current site identity and icon set.

- [ ] **Step 5: Add the first-pass share-image strategy**

Keep it intentionally lightweight and compatible with the current stack.

- [ ] **Step 6: Re-run verification**

Run:
- `npm.cmd test`
- `npm.cmd run build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/feed.xml app/manifest.ts app/layout.tsx lib/seo.js public
git commit -m "feat: add feed and distribution foundations"
```

### Task 9: Curate And Migrate The First 4-5 CSDN Articles

**Files:**
- Modify/Create: `content/posts/*.mdx`
- Modify: `public/images/blog/*` if article visuals are added
- Modify: tag or content docs if needed

- [ ] **Step 1: Freeze the first migration batch**

Recommended batch:
- MySQL MVCC
- Isolation
- Redis Sentinel with Docker
- Ubuntu Fail2Ban
- optional: Frp

- [ ] **Step 2: For each article, create the native MDX draft first**

Use the new template and adapt:
- title
- description
- tags
- intro
- section structure
- code blocks
- conclusion

- [ ] **Step 3: Rewrite each article into Rendering voice rather than copying platform wording**

Keep the technical core, but rewrite for:
- better pacing
- clearer explanations
- stronger openings and summaries
- cleaner formatting

- [ ] **Step 4: Add images or diagrams only when they support understanding**

Do not decorate purely for style.

- [ ] **Step 5: Validate each article through the existing content layer**

Run:
- `npm.cmd test`
- `npm.cmd run build`

Expected: PASS after each stable batch or after the full set.

- [ ] **Step 6: Review the archive and tag impact**

Confirm the migrated set:
- enriches the `database / systems / servers` thread
- improves homepage and tag/archive depth
- does not create noisy or redundant tags

- [ ] **Step 7: Commit**

```bash
git add content/posts public/images/blog
git commit -m "feat: migrate curated systems and database articles"
```