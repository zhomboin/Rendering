# AGENT.md

This file is kept as a compatibility entry point.

Use [AGENTS.md](./AGENTS.md) as the canonical agent-facing guide for the current `Rendering` repository.

## Critical Notes

- The current repository is the completed personal-blog frontend phase, not a CMS or admin platform.
- Route scope is limited to `/`, `/blog`, `/blog/[slug]`, `/about` and their `/en` mirrors, with tag filtering handled through `/blog?tag=...`.
- `Rendering.docx` is a historical draft and should not be treated as the current source of truth.
- Before claiming repository health, verify with the current baseline: `npm run lint`, `npm test`, `npm run typecheck`, `npm run build`, or `npm run check`.
