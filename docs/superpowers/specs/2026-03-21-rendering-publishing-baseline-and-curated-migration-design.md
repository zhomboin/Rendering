# Rendering Publishing Baseline And Curated Migration Design

Date: 2026-03-21
Project: Rendering
Document Status: Active
Document Role: Spec for the next current-phase development wave

## Background

`Rendering` has already reached a solid current-phase baseline as a personal technical blog:

- public Chinese-first and English-mirrored routes are live
- local MDX publishing works
- search, sitemap, robots, and JSON-LD are in place
- playful claymorphism visual language is established
- tag archive and tag-filter flows are working
- article pages support reading progress and richer media modules

The remaining work is no longer "build the blog". It is to make the blog feel publishable, sustainable to maintain, and ready for meaningful content growth.

The user also confirmed a new content source: their own original CSDN blog at `https://blog.csdn.net/weixin_44960490?type=blog`. For this phase, content migration should be selective rather than bulk, with strong editorial rewriting and adaptation to the current site voice.

## Goals

This development wave should deliver four outcomes:

1. tighten the publishing baseline so the site feels maintainable and release-ready
2. strengthen the author workflow so future articles can be added consistently
3. extend outward-facing distribution foundations beyond the current SEO baseline
4. migrate a curated first batch of 3-5 original CSDN articles into native site content

## Non-Goals

This wave does not include:

- CMS implementation
- login, author auth, or admin routes
- automated CSDN scraping and bulk import tooling
- comments, analytics dashboards, or newsletter systems
- multi-author workflows
- database-backed content editing

## User-Approved Decisions

The user approved the following constraints:

- proceed in this order:
  1. publishing baseline closure
  2. author workflow and migration template
  3. distribution additions
  4. curated article migration
- the CSDN source is original content owned by the user and may be reused directly
- the site should be treated as the canonical first-party home going forward
- migrated content should not be mechanically copied; it should be clearly rewritten, expanded, and unified with the current blog style
- the first migration batch should focus on the `database / systems / servers` thread
- the first pass should be curated manual migration of 3-5 articles, not a bulk ingestion system

## Recommended First Migration Batch

Use a strong, coherent first set of articles that fits the current site direction and tag structure.

Recommended initial batch:

1. `MySQL MVCC 详解`
2. `数据库AICD特性之--隔离性 Isolation`
3. `Redis 哨兵模式部署--docker版本`
4. `ubuntu安装配置fail2ban`
5. optional fifth article: `Frp搭建`

Rationale:

- the set forms a practical technical arc across database internals, concurrency, high availability, server hardening, and service access
- the topics are useful to working engineers, not just learners
- they naturally enrich the current tags and make the archive feel less design-only
- they support richer code blocks, diagrams, shell snippets, and explanatory media in the current article layout

## Workstream A: Publishing Baseline Closure

This workstream brings the repository to a more stable release baseline.

Required outcomes:

- current product docs match the real implementation state
- local verification is easier and more explicit
- CI exists for the core current-phase checks
- missing-page handling feels intentional and branded
- basic accessibility issues on key site interactions are tightened

This should include:

- sync `PRD`, development plan, README files, and `AGENT.md`
- add explicit `typecheck` and umbrella `check` scripts
- define a practical lint strategy suitable for the current lightweight stack
- add a GitHub Actions workflow for core verification
- add localized not-found pages for Chinese and English route trees
- make focused accessibility improvements where the blog now has complex interaction surfaces

Accessibility scope for this pass should stay targeted:

- clear focus management and keyboard usability on primary actions
- skip-link or equivalent fast access to main content
- robust labels where current controls are ambiguous
- preserve reduced-motion and high-contrast friendliness

## Workstream B: Author Workflow And Migration Template

This workstream is about repeatability, not feature creep.

Required outcomes:

- creating a new article should follow a stable template
- frontmatter expectations should be explicit and testable
- content-quality regressions should be easier to catch
- migrating an external article should follow a repeatable editorial checklist

This should include:

- a reusable MDX article template
- a script or workflow helper for creating a new draft article file
- stronger validation around frontmatter and content metadata
- a documented migration template covering:
  - source review
  - structure rewrite
  - excerpt rewrite
  - tag selection
  - title normalization
  - code-block cleanup
  - image strategy
  - internal-link opportunities

## Workstream C: Distribution Foundations

Current SEO is solid for the present phase, but distribution is still thin.

Required outcomes:

- readers can subscribe to new content
- the site can present itself better when installed or saved
- article sharing can grow more intentional over time

This should include:

- RSS or Atom feed generation
- `site.webmanifest`
- icon/asset coverage consistent with the current branding
- a first-pass social-share image strategy

The first share-image step should stay lightweight. It does not need a fully dynamic image service if a simpler static or templated solution is enough for now.

## Workstream D: Curated CSDN Migration

This workstream is editorial as much as technical.

Each migrated article should be treated as a native Rendering article, not as copied archive material.

Migration rules:

- preserve the technical truth of the source article
- improve structure and transitions for the current blog audience
- rewrite titles, intros, excerpts, and conclusions where useful
- remove platform-specific CSDN phrasing and boilerplate
- keep the current site as the canonical home
- keep room for future back-link updates from CSDN to the site

Expected article-shape improvements:

- stronger openings
- clearer sectioning
- more intentional code formatting
- calmer but more editorial figure/callout usage
- more consistent tag and excerpt quality

## Architecture Direction

The architecture should remain static-first and file-based.

Key constraints:

- keep content access centralized in repository helpers
- avoid introducing a CMS abstraction that is not needed yet
- prefer lightweight scripts and tests over heavier tooling unless the value is immediate
- keep article content workflow readable and contributor-friendly
- continue treating Chinese as the default route set while preserving the English UI shell

## Risks And Mitigations

### Risk: The baseline work becomes too broad

Mitigation: keep this wave focused on current-phase release quality, not future platform ambitions.

### Risk: Migration introduces inconsistent article tone

Mitigation: define a migration checklist and template before touching the first migrated article.

### Risk: Tooling additions become heavier than the project needs

Mitigation: add only the verification and automation that clearly reduces manual risk today.

### Risk: The first article batch becomes topic-scattered

Mitigation: keep the first migration set anchored in `database / systems / servers`.

## Success Criteria

This wave is successful when:

- the repo has a clearer release baseline with explicit verification and CI
- product docs and repo reality are aligned again
- authoring a new post is simpler and more structured
- the blog exposes at least one subscription/distribution channel beyond search indexing
- 3-5 curated articles from the user's CSDN account feel native to Rendering rather than imported
- the archive feels more substantial and more technically grounded after the first migration batch