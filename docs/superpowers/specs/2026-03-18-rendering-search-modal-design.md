# Rendering Search Modal Design

Date: 2026-03-18
Project: Rendering
Scope: Global Pagefind-powered search modal for the public frontend
Status: Approved in conversation, pending final user review of written spec

## 1. Goal

Add a global, site-wide search modal that uses Pagefind for static full-text search while preserving the existing cold terminal cyber visual language.

This round covers:

- Pagefind index generation during the build workflow
- A custom global search modal
- Keyboard and click-based invocation
- Search result rendering with title, excerpt, tags, and path context

This round does not cover:

- Server-side search APIs
- Search analytics
- Search suggestions from external services
- Advanced ranking customization beyond Pagefind defaults

## 2. Why This Scope

The project now uses real MDX content stored in the repository. That makes static search the natural next feature.

Pagefind is the right fit because:

- It matches the PRD
- It works with static content
- It avoids adding backend complexity
- It can be paired with a custom UI instead of the default widget

## 3. Chosen Approach

Chosen direction: Pagefind index with a custom modal UI.

### Build-time responsibilities

- Generate a Pagefind index after the site build
- Keep search assets available to the frontend at runtime

### Runtime responsibilities

- Lazy-load the Pagefind client only in the browser
- Open a modal from anywhere on the site
- Run searches against the generated index
- Render results in the site's own component system

## 4. User Experience

The search entry points should include:

- Header trigger: `Search Index`
- Keyboard shortcut: `/`
- Keyboard shortcut: `Ctrl/Cmd + K`

The modal should support:

- `Esc` to close
- Click outside to close
- Arrow keys to move across results
- Enter to open the selected result

The search overlay should feel like a command palette adapted to an editorial site rather than a generic app launcher.

## 5. Visual Design Rules

The search modal should inherit the established visual language:

- Dark system scrim behind the modal
- Cold cyan edges and restrained glow
- Dense but readable result list
- Strong focus state for the selected result
- Calm empty and loading states

The modal must not introduce a separate design language or default third-party styling.

## 6. Result Content

Each result should show:

- Title
- Excerpt or snippet
- Tag context if available
- URL or route context

The title remains the primary signal. Supporting metadata helps the user disambiguate similar posts quickly.

## 7. File-Level Architecture

Recommended additions and changes:

- `components/search-modal.tsx`
- `components/search-trigger.tsx` optional if separation is helpful
- `lib/search.ts` optional small wrapper around Pagefind client calls
- `app/layout.tsx` to mount the modal globally
- `components/site-header.tsx` to trigger opening instead of linking away
- `app/globals.css` for modal styling
- `package.json` for Pagefind build integration

## 8. State Model

The modal should manage:

- open or closed state
- query string
- loading state
- results array
- active result index for keyboard navigation

The implementation should keep the search state local to the modal unless a reusable global store becomes clearly necessary. For this round, local state is preferred for simplicity.

## 9. Build Integration

Pagefind should run after the Next.js build step so the search index always reflects current content.

The build flow should become conceptually:

1. `next build`
2. `pagefind --site <output-dir>`

The chosen output directory must match what the production app can serve. The integration should be verified with the actual current Next.js output, not assumed.

## 10. Accessibility

The modal must:

- Trap focus while open
- Restore focus to the trigger when closed
- Expose a clearly labeled search input
- Make the active result visually and programmatically clear
- Support full keyboard navigation

The result list should remain readable for screen readers and keyboard-only users.

## 11. Performance Rules

Pagefind client assets should be loaded lazily only when search is first opened. The home page and article pages should not pay search startup cost until needed.

Avoid bundling search logic into the initial route payload if it can be deferred.

## 12. Risks And Mitigations

Risk: default Pagefind styling leaks into the site.
Mitigation: use the client API and build a custom UI.

Risk: search assets are generated into the wrong output directory.
Mitigation: verify the exact Next.js build artifact path and test the full build flow.

Risk: keyboard handling conflicts with article navigation or browser defaults.
Mitigation: only activate shortcuts when focus is not inside an input and scope handlers carefully.

Risk: modal feels too application-like and breaks the editorial tone.
Mitigation: keep result presentation text-first and avoid dashboard-heavy chrome inside the modal.

## 13. Verification

Minimum verification expectations:

- Build succeeds with Pagefind integration enabled
- Search modal opens from header click
- `/` opens search when focus is not already in an input field
- `Ctrl/Cmd + K` opens search
- Query returns expected article results
- Keyboard navigation and Enter-to-open work
- Esc closes the modal
- Search UI matches the site's visual language

## 14. Recommendation

Implement the custom Pagefind search modal now as the first content-discovery layer on top of the newly added MDX repository. This preserves the static architecture while giving the site a much more complete reading and navigation experience.
