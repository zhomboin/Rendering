# Real Content-Driven Page Copy Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make homepage and blog archive copy reflect real published article data instead of fixed message strings.

**Architecture:** Add a small locale-aware page-copy helper that derives visible section text from `lib/content.js` outputs, then wire homepage and blog archive components to consume that helper while keeping visual structure unchanged.

**Tech Stack:** Next.js App Router, React 19, Node script tests, existing `lib/content.js` content repository, `lib/i18n.js` locale utilities.

---

### Task 1: Define the dynamic copy contract

**Files:**
- Create: `D:/Code/Project/Rendering/Rendering/lib/page-copy.test.js`
- Modify: `D:/Code/Project/Rendering/Rendering/package.json`

- [ ] **Step 1: Write the failing test**

Create `lib/page-copy.test.js` with assertions for:
- zh homepage hero badges using real counts/date
- en homepage hero copy using real counts/date/tags
- zh blog archive hero title using total post/tag counts
- en filtered archive copy using active-tag count
- empty-state fallback messaging for both locales

- [ ] **Step 2: Run test to verify it fails**

Run: `node lib/page-copy.test.js`
Expected: FAIL because `lib/page-copy.js` does not exist yet.

- [ ] **Step 3: Register the test in the suite**

Update `package.json` so `npm test` includes `node lib/page-copy.test.js`.

- [ ] **Step 4: Commit**

```bash
git add lib/page-copy.test.js package.json
git commit -m "test: define dynamic page copy contract"
```

### Task 2: Implement the page-copy helper

**Files:**
- Create: `D:/Code/Project/Rendering/Rendering/lib/page-copy.js`
- Test: `D:/Code/Project/Rendering/Rendering/lib/page-copy.test.js`

- [ ] **Step 1: Write minimal implementation**

Implement locale-aware helpers that:
- normalize incoming posts/tags arrays
- extract latest post/date
- summarize top tags
- return homepage copy model
- return blog archive copy model
- handle empty states gracefully

- [ ] **Step 2: Run the focused test**

Run: `node lib/page-copy.test.js`
Expected: PASS

- [ ] **Step 3: Refactor for clarity**

Keep formatting helpers small and focused. Avoid pushing string assembly into page components.

- [ ] **Step 4: Commit**

```bash
git add lib/page-copy.js lib/page-copy.test.js package.json
git commit -m "feat: add real content-driven page copy helpers"
```

### Task 3: Wire homepage to real content-driven copy

**Files:**
- Modify: `D:/Code/Project/Rendering/Rendering/components/hero-panel.tsx`
- Modify: `D:/Code/Project/Rendering/Rendering/components/pages/home-page.tsx`
- Test: `D:/Code/Project/Rendering/Rendering/lib/tooling.test.js`

- [ ] **Step 1: Write the failing regression assertion**

Add tooling assertions that homepage imports and uses the page-copy helper rather than relying purely on static message text for visible summary content.

- [ ] **Step 2: Run regression test to verify it fails**

Run: `node lib/tooling.test.js`
Expected: FAIL on missing page-copy wiring.

- [ ] **Step 3: Implement homepage wiring**

- pass a computed hero model into `HeroPanel`
- feed dynamic section heading text into featured/latest/tags sections
- preserve existing navigation/actions/layout

- [ ] **Step 4: Run tests**

Run:
- `node lib/tooling.test.js`
- `node lib/page-copy.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/hero-panel.tsx components/pages/home-page.tsx lib/tooling.test.js lib/page-copy.js lib/page-copy.test.js
git commit -m "feat: drive homepage copy from real content"
```

### Task 4: Wire blog archive to real content-driven copy

**Files:**
- Modify: `D:/Code/Project/Rendering/Rendering/components/pages/blog-index-page.tsx`
- Test: `D:/Code/Project/Rendering/Rendering/lib/tooling.test.js`

- [ ] **Step 1: Write the failing regression assertion**

Add tooling assertions that blog archive page imports and uses the page-copy helper for visible hero/guide/filter/section copy.

- [ ] **Step 2: Run regression test to verify it fails**

Run: `node lib/tooling.test.js`
Expected: FAIL on missing blog page-copy wiring.

- [ ] **Step 3: Implement blog archive wiring**

- build copy from all posts, filtered posts, tags, and active tag
- replace static archive summary text with dynamic text
- keep active-filter controls and layout unchanged

- [ ] **Step 4: Run tests**

Run:
- `node lib/tooling.test.js`
- `node lib/page-copy.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/pages/blog-index-page.tsx lib/tooling.test.js lib/page-copy.js lib/page-copy.test.js
git commit -m "feat: drive blog archive copy from real content"
```

### Task 5: Full verification

**Files:**
- Verify only

- [ ] **Step 1: Run the full test suite**

Run: `npm.cmd test`
Expected: PASS

- [ ] **Step 2: Run production build**

Run: `npm.cmd run build`
Expected: PASS with existing expected Next.js edge-runtime warning for `/api/og` only.

- [ ] **Step 3: Review working tree**

Run: `git status --short`
Expected: only intended files changed.

- [ ] **Step 4: Commit**

```bash
git add lib/page-copy.js lib/page-copy.test.js components/hero-panel.tsx components/pages/home-page.tsx components/pages/blog-index-page.tsx lib/tooling.test.js package.json docs/superpowers/specs/2026-03-23-rendering-real-content-driven-page-copy-design.md docs/superpowers/plans/2026-03-23-rendering-real-content-driven-page-copy.md
git commit -m "feat: replace static page copy with real content data"
```
