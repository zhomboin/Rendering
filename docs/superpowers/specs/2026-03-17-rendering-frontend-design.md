# Rendering Frontend Design

Date: 2026-03-17
Project: Rendering
Scope: Public-facing Next.js blog frontend prototype
Status: Approved in conversation, pending final user review of written spec

## 1. Goal

Build a runnable Next.js public frontend prototype for the `Rendering` blog described in `Rendering.docx`.

This iteration covers only the reader-facing experience:

- Home page
- Blog index
- Blog detail page
- Tags page
- About page

This iteration does not include:

- Admin pages
- Authentication
- Prisma/PostgreSQL integration
- MDX pipeline
- Comments/search/analytics live integrations

The output should feel like a polished "cyber tech" interface while still functioning as a serious technical writing product.

## 2. Product Positioning

`Rendering` is a personal technical blog system. The frontend should communicate three things at once:

- It is a writing-focused product, not a generic landing page
- It values performance and technical depth
- It has a distinct brand identity rooted in ongoing thought, iteration, and systems thinking

The slogan, "页面在加载，思想也在成形，永远进行时", should influence the interface tone. The site should feel like a living thought terminal rather than a decorative sci-fi shell.

## 3. Chosen Visual Direction

Chosen direction: `B. Cold Terminal Cyber Style`

### Why this direction

Compared with more aggressive neon hacker aesthetics, this direction better supports long-form reading and repeated use. It preserves a cyber-tech signature without reducing readability.

### Core visual principles

- Deep carbon-black and graphite surfaces
- Electric cyan and ice-blue as primary accent colors
- Magenta used sparingly for critical highlights
- Fine grid textures, scanline hints, and restrained glow
- Panel-based composition inspired by control consoles
- Strong hierarchy and calm whitespace despite dark styling

### Anti-patterns to avoid

- Excessive bloom or blur that harms text clarity
- Constant animation or noisy decorative motion
- Purple-heavy generic AI gradients
- Dense futuristic chrome on article reading surfaces
- Style inconsistency between pages

## 4. Information Architecture

The frontend prototype includes the following routes:

- `/` Home
- `/blog` Blog index
- `/blog/[slug]` Blog detail
- `/tags` Tags
- `/about` About

Primary navigation:

- Home
- Blog
- Tags
- About
- Search trigger or placeholder search entry

The home page acts as the brand and discovery surface. The blog index acts as the primary browsing and filtering experience. The blog detail page is optimized for reading. Tags and About are supporting but fully designed pages rather than placeholders.

## 5. Page Designs

## 5.1 Home Page

Purpose:

- Establish brand identity
- Introduce the writing voice
- Surface featured and recent content
- Provide a quick system-like overview of the site

Structure:

- Floating header with compact navigation
- Hero section with brand line, slogan, and short intro
- Status or metrics panel showing values like article count, tags, last update, performance target, or featured topics
- Featured articles section
- Latest article feed
- Tag signal matrix or tag cloud
- Compact footer styled like a system status strip

Visual behavior:

- Hero should feel cinematic but controlled
- Background can use layered gradients, grid overlays, and subtle radial light
- Cards should have crisp panel edges with hover glow and lift

## 5.2 Blog Index

Purpose:

- Support scanning, filtering, and discovery
- Present the archive in a readable, high-density format

Structure:

- Page intro band
- Search bar styled like a terminal input
- Tag filter row
- Sort or content view controls if needed
- Article card list or grid

Content model per card:

- Title
- Excerpt
- Publish date
- Reading time
- Tags
- Optional cover or visual identifier

Design intent:

- More restrained than the home page
- Faster to parse
- Strong information hierarchy

## 5.3 Blog Detail

Purpose:

- Deliver the best reading experience in the product
- Present technical content with polish

Structure:

- Article header with title, metadata, tag list, and optional hero area
- Reading progress indicator
- Main content column with controlled line length
- TOC module
- Previous/next navigation
- Related or recommended posts section

Reading rules:

- Body width must remain comfortable for long text
- Typography must prioritize clarity over decoration
- Code blocks should inherit the cyber-terminal feel without overwhelming the page
- Tables, blockquotes, and callouts should use the same panel language as the rest of the system

## 5.4 Tags Page

Purpose:

- Provide thematic navigation
- Turn taxonomy into a visual asset

Structure:

- Intro header
- Tag wall or tag signal grid
- Each tag shows article count
- Optional grouped or featured tags section

Design intent:

- More expressive than a plain list
- Still readable and fast to use

## 5.5 About Page

Purpose:

- Humanize the project
- Explain author focus and technical philosophy

Structure:

- Intro block
- Personal summary
- Tech stack or working principles section
- Writing topics or interest areas
- External links section

Design intent:

- Feels like an author control console rather than a resume
- Warm enough to balance the colder system aesthetic

## 6. Component System

The first implementation should create reusable primitives and blog-specific modules.

Core components:

- `SiteHeader`
- `SiteFooter`
- `HeroPanel`
- `MetricPanel`
- `PostCard`
- `TagChip`
- `SearchBar`
- `SectionHeading`
- `TOCPanel`
- `ArticleMeta`
- `PrevNextNav`

Design rules:

- Components consume shared design tokens
- Borders, radii, glow, and elevation should be standardized
- Hover and focus behavior should be consistent across components
- Accent usage should be deliberate and not oversaturated

## 7. Design Tokens

Use CSS variables in global styles so the visual system is consistent and easy to evolve.

Token groups:

- Background layers
- Surface layers
- Text hierarchy
- Accent colors
- Borders and glows
- Shadows
- Spacing scale
- Radius scale
- Motion duration and easing

Example intent:

- Background: carbon black, graphite, deep navy accents
- Primary accent: electric cyan
- Secondary accent: ice blue
- Highlight accent: controlled magenta
- Borders: dim cyan-tinted strokes
- Text: cool whites with muted slate secondary text

## 8. Motion and Interaction

Motion should be meaningful and restrained.

Allowed motion patterns:

- Fade and slight translate on section entrance
- Hover lift on cards
- Glow intensification on hover/focus
- Smooth progress bar movement
- Subtle background drift if it does not distract

Avoid:

- Large looping decorative motion
- Layout-shifting transitions
- Long modal-like animations on content pages

Accessibility rules:

- Respect reduced-motion preferences
- Maintain visible focus states
- Ensure contrast remains strong in all interactive states

## 9. Content Strategy for Prototype

The prototype uses local mock content rather than live data sources.

Mock data should include:

- Multiple posts with realistic titles and excerpts
- Tags with counts
- Rich article body sections for testing long-form reading
- Metadata for previous and next links

The mock content should feel believable for a technical blog about frontend, rendering, systems, performance, or UI engineering.

## 10. Technical Implementation Plan

Use Next.js App Router with local in-memory or file-based mock data.

Expected implementation areas:

- `app/layout.tsx` for global shell and atmosphere
- `app/page.tsx` for the home page
- `app/blog/page.tsx` for the blog index
- `app/blog/[slug]/page.tsx` for article detail
- `app/tags/page.tsx` for tags
- `app/about/page.tsx` for about
- `components/` for reusable UI and blog components
- `lib/mock-data.ts` for content
- `app/globals.css` for tokens and global styling

The initial prototype must run without any backend services.

## 11. Quality Bar

The result is considered successful when:

- The app runs locally as a Next.js frontend
- All target public pages are navigable
- The style is recognizably cyber-tech but still readable
- The article detail page supports a convincing long-form reading experience
- The system looks cohesive rather than like unrelated styled pages

## 12. Risks and Mitigations

Risk: Style overwhelms content.
Mitigation: Keep article surfaces calmer than landing surfaces.

Risk: Cyber visuals become generic.
Mitigation: Favor cold terminal precision over default AI-neon gradients.

Risk: Prototype architecture makes later integration hard.
Mitigation: Keep page structure and data contracts close to expected real data models.

Risk: Dark UI hurts readability.
Mitigation: Use disciplined contrast, line length, spacing, and restrained effects.

## 13. Out of Scope for This Round

- Admin experience
- Real CMS/editor flows
- Real comments integration
- Real Pagefind integration
- Real Plausible integration
- Authentication and middleware
- Cloudinary upload flow
- Dynamic OG generation

## 14. Recommendation

Proceed by implementing the public frontend prototype with mock content first. Once visual language and route structure are stable, connect content, search, SEO, and backend integrations in later iterations.
