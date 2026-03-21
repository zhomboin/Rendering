# Rendering Site Internationalization Design

Date: 2026-03-21
Project: Rendering
Status: Approved for implementation planning

## Context

`Rendering` is currently a playful personal blog with a light-first theme, dark-mode support, local MDX content, static SEO, tag archives, and a growing editorial UI layer. The site now needs bilingual UI support for Chinese and English, while keeping the blog content model simple.

The scope of this work is intentionally limited:

- translate site chrome, page copy, metadata, and SEO descriptions
- keep article bodies and MDX content single-source and unchanged
- make Chinese the default public experience
- expose English as a first-class alternate route set

## Goals

- Add Chinese and English UI support across the public site
- Keep the root route Chinese by default
- Make English pages shareable, indexable, and SEO-safe
- Avoid introducing a heavy i18n dependency for this first pass

## Non-Goals

- No MDX article-body translation
- No per-user locale persistence via cookies or database
- No browser-language auto-redirect in this pass
- No third-party i18n framework unless the current lightweight approach proves insufficient

## Recommended Approach

Use route-level internationalization with Chinese on the existing root paths and English mirrored under `/en`.

Examples:

- `/` -> Chinese homepage
- `/blog` -> Chinese archive
- `/en` -> English homepage
- `/en/blog` -> English archive
- `/blog/[slug]` and `/en/blog/[slug]` -> same article body, different UI shell copy and metadata

This approach keeps Chinese as the default experience without sacrificing English discoverability or future expansion.

## Design Decisions

### 1. Locale Model

Support two locales only for now:

- `zh` as the default locale
- `en` as the alternate locale

Locale should be expressed in routing rather than a client-only toggle, because routing gives the project stronger SEO, canonical control, and shareable URLs.

### 2. Content Boundary

Only the site layer is translated.

Translated surfaces include:

- navigation labels
- footer copy
- page headings and body copy on home, blog, tags, tag archive, about, and article shell pages
- search UI text
- button labels and helper text
- metadata descriptions and titles
- JSON-LD descriptive text where language-specific strings are present

Untranslated surfaces include:

- article MDX body content
- post titles, excerpts, and tags stored in content frontmatter
- article heading extraction from MDX

This keeps the content model simple while still delivering a bilingual product shell.

### 3. Routing Strategy

Chinese keeps the existing routes:

- `/`
- `/blog`
- `/blog/[slug]`
- `/tags`
- `/tags/[slug]`
- `/about`

English gets mirrored routes under `/en`:

- `/en`
- `/en/blog`
- `/en/blog/[slug]`
- `/en/tags`
- `/en/tags/[slug]`
- `/en/about`

The English route tree should reuse shared page renderers rather than duplicate page logic.

### 4. Architecture Shape

Introduce a lightweight locale layer with three responsibilities:

1. locale definitions and route helpers
2. message dictionaries for `zh` and `en`
3. shared page-building helpers that accept a locale and return localized UI copy

Recommended structure:

- `lib/i18n.js` for locale helpers, locale metadata, and localized path utilities
- `lib/messages/zh.js` and `lib/messages/en.js` for site copy dictionaries
- shared page components or render helpers that receive `{ locale, messages }`

This keeps copy centralized and avoids scattering `locale === "zh" ? ... : ...` checks across the app.

### 5. Language Switcher

Add a small language switcher to the site header.

Behavior:

- on Chinese routes, switch to the English mirror path
- on English routes, switch back to the Chinese mirror path
- always preserve the current page when a locale mirror exists
- default visual state should emphasize Chinese as the current default experience

The switcher should feel like the rest of the claymorphism header controls and remain usable on mobile.

### 6. SEO and Metadata

Each localized route should expose language-aware metadata.

Required behavior:

- Chinese root pages keep canonical Chinese URLs
- English pages use their `/en/...` canonical URLs
- metadata descriptions, page titles, and section-level copy should localize by route
- localized alternates should be exposed via `alternates.languages` where practical
- sitemap output should include both Chinese and English route variants

For article pages, the article body remains the same, but the page wrapper metadata and shell copy should localize.

### 7. Search and Theme Controls

Search and theme remain global features, but their surrounding labels should localize.

This includes:

- search trigger label
- search modal headings, hints, and empty states
- theme toggle supporting text
- any helper copy in archive filters, tag maps, and about pages

No behavior change is required to Pagefind itself in this pass.

## Testing Strategy

Use TDD for any new helper behavior.

Recommended tests:

- locale helper tests for mirror-path generation and locale parsing
- message lookup tests for route-level metadata strings if helper-driven
- sitemap tests to ensure both Chinese and English routes are emitted
- focused verification of shared route rendering where locale alters page copy

Final verification must include:

- `npm.cmd test`
- `npm.cmd run build`

## Risks

### Copy Drift Risk

If localized copy is embedded directly in page files, Chinese and English will drift over time. Mitigation: centralize messages and keep page renderers shared.

### Route Duplication Risk

If the English tree is implemented by copying page files without shared renderers, maintenance cost rises quickly. Mitigation: move page rendering into shared functions or components before adding mirrored routes.

### SEO Ambiguity Risk

If canonical and alternate language metadata are incomplete, search engines may treat mirrored pages as duplicates. Mitigation: localize canonical paths and expose alternate-language relationships consistently.

## Expected Outcome

After this work:

- the site will support Chinese and English UI routes
- Chinese will remain the default experience at the root URL
- English will be available at `/en/...` with mirrored page coverage
- metadata and sitemap output will reflect the bilingual route structure
- article content storage will remain unchanged and simple