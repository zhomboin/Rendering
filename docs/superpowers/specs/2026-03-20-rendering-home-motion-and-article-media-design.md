# Rendering Home Motion And Article Media Design

Date: 2026-03-20

## Scope

This iteration focuses on two areas:

1. Refine the homepage with subtle, layered motion that supports the playful clay direction without overwhelming the reading experience.
2. Upgrade article media handling from basic image styling to a reusable editorial media system with figure, caption, gallery, and image-enlarge behavior.

## Homepage Motion Direction

- Add staged reveal timing to hero, metrics, featured stories, and secondary sections.
- Keep motion lightweight: opacity, translate, and small scale shifts only.
- Reinforce clay tactility through hover and pressed feedback on cards, buttons, and tags.
- Respect reduced-motion preferences with clean fallback behavior.

## Article Media Direction

- Plain markdown images should render inside a calmer editorial frame.
- Add explicit `Figure` and `Gallery` MDX components for richer image storytelling.
- Gallery blocks should support responsive 2-up and 3-up layouts, shared captions, and click-to-enlarge viewing.
- The reading experience should stay primary: media can feel rich, but never louder than the prose.

## Verification

- Add a small failing test first for gallery normalization / layout behavior.
- Run `npm.cmd test` and `npm.cmd run build` after implementation.
