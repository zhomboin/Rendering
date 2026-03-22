# Rendering Article Reading Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the article reading page so the header reads as a centered editorial intro, the vertical rhythm is tighter, and reading progress becomes a lighter always-visible floating utility.

**Architecture:** Keep the existing article detail route, MDX rendering flow, and progress calculation logic intact. Implement the change as a small markup adjustment in the article page, a presentation-focused refresh of the reading progress component, and targeted CSS updates for header width, layout spacing, and responsive placement.

**Tech Stack:** Next.js App Router, React 19, TypeScript, global CSS, existing MDX article rendering, Node-based regression tests.

---

### Task 1: Save the Approved Design and Plan Docs

**Files:**
- Create: `docs/superpowers/plans/2026-03-22-rendering-article-reading-layout.md`
- Review: `docs/superpowers/specs/2026-03-22-rendering-article-reading-layout-design.md`

- [ ] Step 1: Keep the approved spec as the scope boundary for this pass.
- [ ] Step 2: Save this implementation plan to the new plan file.
- [ ] Step 3: Do not expand this pass into a broader article-page redesign.

### Task 2: Preserve Reading-Progress Behavior While Changing Presentation

**Files:**
- Review: `lib/ui-state.test.js`
- Modify only if needed: `lib/ui-state.js`

- [ ] Step 1: Re-read the existing `calculateReadingProgress` assertions before changing the UI shell.
- [ ] Step 2: If any visual placement change requires scroll-math changes, add or update the failing assertion in `lib/ui-state.test.js` first.
- [ ] Step 3: Run `node lib/ui-state.test.js` and confirm the baseline still passes.
- [ ] Step 4: Keep `lib/ui-state.js` unchanged unless a test proves the offset logic must move.

### Task 3: Recompose the Article Header Structure

**Files:**
- Modify: `components/pages/blog-detail-page.tsx`
- Modify if alignment hooks are needed: `components/article-meta.tsx`

- [ ] Step 1: Adjust the article header markup so kicker, cover label, title, description, and metadata can share a centered composition.
- [ ] Step 2: Keep the body and TOC structure intact while tightening the transition from the header band into the reading layout.
- [ ] Step 3: Add only the wrapper elements and class hooks that are required for the new layout.

### Task 4: Replace the Current Dual Progress Treatment

**Files:**
- Modify: `components/reading-progress.tsx`
- Modify: `app/globals.css`

- [ ] Step 1: Remove the top progress bar markup from `ReadingProgress`.
- [ ] Step 2: Keep a single floating capsule with label, percentage, and a slim progress track.
- [ ] Step 3: Place the desktop capsule at the bottom-right within the content rhythm instead of flush to the browser edge.
- [ ] Step 4: Simplify the mobile version into a compact bottom treatment that stays visible without covering too much content.
- [ ] Step 5: Preserve `aria-live` behavior and keep motion subtle enough for reduced-motion users.

### Task 5: Tighten Vertical Rhythm and Widen the Header Measure

**Files:**
- Modify: `app/globals.css`

- [ ] Step 1: Reduce the spacing between the site header, article header band, and article content entry.
- [ ] Step 2: Center the article title and description, and widen both measures so they stop wrapping prematurely.
- [ ] Step 3: Slightly rebalance the article layout gap and body width so the page feels more composed without making long-form reading too wide.
- [ ] Step 4: Keep light and dark theme parity with the existing claymorphism surfaces.

### Task 6: Responsive Polish and Manual Smoke Check

**Files:**
- Modify: `app/globals.css`
- Review: `components/pages/blog-detail-page.tsx`
- Review: `components/reading-progress.tsx`

- [ ] Step 1: Verify the centered header still feels balanced at desktop, tablet, and mobile widths.
- [ ] Step 2: Verify the floating progress capsule remains visible and non-intrusive in both light and dark themes.
- [ ] Step 3: Verify TOC behavior remains unchanged except for the tighter article composition around it.

### Task 7: Final Verification

**Files:**
- No new files expected beyond the plan document unless implementation reveals a small helper or class-hook need.

- [ ] Step 1: Run `node lib/ui-state.test.js`.
- [ ] Step 2: Run `npm.cmd test`.
- [ ] Step 3: Run `npm.cmd run build`.
- [ ] Step 4: Review the article page manually and confirm the three approved goals are satisfied.
- [ ] Step 5: Check `git diff --stat` before committing the implementation.
