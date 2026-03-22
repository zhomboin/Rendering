# Rendering Error Pages And Nav Active Design

## Goal

Add a dedicated service-unavailable page and make the shared navigation reflect the current page state, while preserving the existing back-home action on the 404 experience.

## Decisions

### 1. Keep the 404 page simple and home-oriented

The current 404 page already includes a back-home button. That should remain. The 404 page should continue to offer a safe way back into the site without requiring extra navigation decisions.

### 2. Add a dedicated 503 page in both locales

Create a directly visitable service-unavailable page for both locale trees:

- `/503`
- `/en/503`

The page should:

- explain that the service is temporarily unavailable
- keep the same visual family as the existing error page
- include a primary button back to the localized homepage
- optionally keep a secondary path into the blog archive if that still feels useful after implementation

### 3. Add active-state feedback to the top navigation

The shared site header should visually mark the current section.

Rules:

- `Home` is active only on the localized homepage
- `Blog` is active on the blog index and any article detail page
- `About` is active only on the localized about page

The active state should work for both Chinese and English routes, and it should be reflected semantically with `aria-current="page"` where appropriate.

## Files Likely Affected

- `components/site-header.tsx`
- `app/globals.css`
- `app/(zh)/not-found.tsx`
- `app/en/not-found.tsx`
- `app/(zh)/503/page.tsx`
- `app/en/503/page.tsx`
- `lib/tooling.test.js`

## Validation

This work is complete when:

1. The 404 pages still expose a visible back-home button.
2. `/503` and `/en/503` render successfully.
3. Each 503 page includes a back-home button.
4. The top navigation shows a clear active state for the current section.
5. The active link exposes `aria-current="page"`.