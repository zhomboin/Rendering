# Rendering Error Pages And Nav Active Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add localized 503 pages and give the shared top navigation a real current-page active state while keeping the 404 home action intact.

**Architecture:** Keep the existing route structure and shared header, but make the header pathname-aware on the client so it can compute the active section for each locale. Add dedicated `503` page routes per locale that reuse the current error-page visual language and provide a localized return-home action.

**Tech Stack:** Next.js App Router, React 19, TypeScript/TSX, shared CSS in `app/globals.css`, node-based regression tests.

---

### Task 1: Lock the new behavior with failing tests

**Files:**
- Modify: `lib/tooling.test.js`

- [ ] **Step 1: Write the failing test**

Add assertions for:
- localized `503` route files exist
- shared header source includes pathname-aware active-state logic
- active navigation exposes `aria-current`
- 404 and 503 pages include back-home actions

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node lib/tooling.test.js`
Expected: FAIL because the `503` routes and active-state logic do not exist yet.

- [ ] **Step 3: Keep the red-state boundary clear**

Do not change production files until the test fails for the expected missing-behavior reason.

### Task 2: Implement the localized 503 pages

**Files:**
- Create: `app/(zh)/503/page.tsx`
- Create: `app/en/503/page.tsx`
- Optionally create: a tiny shared error-page helper if duplication becomes noisy

- [ ] **Step 1: Create the Chinese 503 route**

Match the current error-page visual family and include a primary back-home action.

- [ ] **Step 2: Create the English 503 route**

Mirror the same structure with localized copy and localized home/blog links.

- [ ] **Step 3: Re-run the focused test**

Run: `node lib/tooling.test.js`
Expected: still FAIL until the navigation active-state work is finished.

### Task 3: Add active-state behavior to the shared header

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Make the header pathname-aware**

Use the current pathname to determine which navigation item is active for the current locale.

- [ ] **Step 2: Add semantic active-state output**

Set `aria-current="page"` on the active link and add a stable active class or data attribute.

- [ ] **Step 3: Style the active nav link**

Use the existing clay/button system so the current page reads as selected without looking like a different component family.

- [ ] **Step 4: Re-run the focused test**

Run: `node lib/tooling.test.js`
Expected: PASS.

### Task 4: Run full verification

**Files:**
- Review: all files touched in Tasks 1-3

- [ ] **Step 1: Run the local regression test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit the implementation**

```bash
git add app components lib docs
git commit -m "feat: add localized 503 page and active nav state"
```