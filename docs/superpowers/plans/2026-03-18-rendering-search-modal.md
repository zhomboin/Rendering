# Rendering Search Modal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a global Pagefind-powered search modal with keyboard shortcuts and a custom cold terminal UI.

**Architecture:** Generate the Pagefind index from the Next.js build output, write it into `public/pagefind`, and lazily load the client in a global search modal mounted from the root layout. Keep search UI state local to the modal and trigger it from the header plus global shortcuts.

**Tech Stack:** Next.js App Router, React client components, Pagefind, Node build script

---

## File Structure

- Create: `components/search-modal.tsx`
- Create: `components/search-trigger.tsx` optional if needed
- Create: `scripts/build-search-index.mjs`
- Modify: `package.json`
- Modify: `app/layout.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/globals.css`

### Task 1: Add Pagefind dependency and build hooks

**Files:**
- Modify: `package.json`
- Create: `scripts/build-search-index.mjs`

- [ ] **Step 1: Add `pagefind` dependency**
- [ ] **Step 2: Split build into app build plus search indexing**
- [ ] **Step 3: Implement a build script that indexes `.next/server/app` and writes to `public/pagefind`**
- [ ] **Step 4: Run build to verify the index script can execute end to end**

### Task 2: Add the global search modal UI

**Files:**
- Create: `components/search-modal.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Build modal shell, scrim, input, results, loading, and empty states**
- [ ] **Step 2: Lazy-load Pagefind only when the modal opens**
- [ ] **Step 3: Implement local state for query, results, active index, and open state**
- [ ] **Step 4: Add keyboard navigation and Enter-to-open behavior**

### Task 3: Mount the modal globally and wire triggers

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/site-header.tsx`

- [ ] **Step 1: Mount the modal in the root layout**
- [ ] **Step 2: Replace the header link behavior with modal opening**
- [ ] **Step 3: Add global shortcuts for `/`, `Ctrl/Cmd + K`, and `Esc`**
- [ ] **Step 4: Restore focus correctly when closing**

### Task 4: Final verification

**Files:**
- Modify: any touched files as needed

- [ ] **Step 1: Run production build**
- [ ] **Step 2: Confirm `public/pagefind` assets are generated**
- [ ] **Step 3: Run a final test command to ensure existing repository tests still pass**
- [ ] **Step 4: Manually verify modal behavior and result rendering in the app**
