# Rendering Article Reading Layout Design

Date: 2026-03-22

## Scope

This iteration refines the article reading page in three focused ways:

1. Tighten the vertical rhythm between the site navigation, article header, and article body.
2. Rebalance the article header so the title and description feel centered, calmer, and less prematurely wrapped.
3. Move reading progress from the current top-and-side treatment to a lighter always-visible floating indicator.

## Current Problems

- The transition from the site header into the article page feels too loose, which makes the article start later than it should.
- The article title and description are readable, but their current width makes them wrap earlier than intended and feel slightly squeezed.
- Reading progress is split across a top bar and a separate floating pill, which adds visual noise around the navigation area.

## Recommended Direction

Use an editorial-centered article header paired with a single lightweight floating progress capsule.

- Center the article title, description, and metadata on one visual axis.
- Widen the header text measure enough for long technical titles and summaries to breathe, without making the body column too wide.
- Reduce the top spacing around the article header band and the article layout entry point.
- Replace the current dual progress treatment with one compact floating progress capsule that stays visible while scrolling.

## Layout Changes

### Article Header

- Keep the existing article header band component, but shift its content to a centered composition.
- Title should support longer lines before wrapping and feel more like a page headline than a narrow card heading.
- Description should sit below the title in the same centered column and read like a short editorial deck.
- Metadata should remain easy to scan, but visually follow the centered header instead of pulling the eye sideways.

### Article Body And Rail

- Reduce the perceived gap between the article header and the reading layout below it.
- Keep the body readable width mostly intact for long-form technical content.
- Tighten the relationship between the body column and the TOC rail so the page feels like one composed reading surface instead of two distant panels.

## Reading Progress

### New Behavior

- Remove the current top progress bar.
- Replace the right-side progress pill with a single floating progress capsule.
- The capsule should stay visible during scroll, but avoid competing with the global navigation.

### Placement

- Desktop: bottom-right, aligned within the content container rhythm rather than hugging the browser edge.
- Mobile: bottom-center / full-width compact treatment that remains comfortable above safe-area space.

### Visual Treatment

- Keep the progress display lightweight: percentage, label, and a slim track are enough.
- The capsule should feel like a utility object, not a second hero element.
- Motion should stay subtle and respect reduced-motion preferences.

## Responsive Notes

- The centered title and description should remain centered on tablet and mobile, but text measure should loosen naturally instead of forcing narrow early wraps.
- On smaller screens the floating progress capsule should simplify rather than stack into a bulky panel.
- TOC behavior can stay as-is for this pass; this work does not redesign TOC interaction.

## Non-Goals

- No changes to article content styling, media gallery behavior, or MDX structure.
- No redesign of the site header or article TOC feature set.
- No changes to reading progress calculation logic unless required by the new placement.

## Affected Areas

- `components/pages/blog-detail-page.tsx`
- `components/reading-progress.tsx`
- `app/globals.css`

## Verification

- Review the article page at desktop and mobile widths.
- Confirm title and description line breaks feel less cramped.
- Confirm the progress indicator remains visible while scrolling and does not interfere with the navigation.
- Run `npm.cmd run build` after implementation.
