# Responsive "Single-Viewport" Redesign Plan

Goal: every page fits its main content within the visible viewport (no vertical scroll on standard screens) and stays clean on mobile, tablet, and desktop.

## 1. Global layout foundation
- Convert `min-h-screen` page wrappers to `h-screen overflow-hidden flex flex-col` so each page is bounded by the viewport.
- Reserve fixed space for the top navbar (h-16 desktop, h-12 mobile) and the mobile bottom nav (h-14) via a new `<PageShell>` wrapper that calculates available height with `calc(100vh - navs)`.
- Replace per-page large vertical paddings (`pt-28 pb-16`, etc.) with shell-managed spacing.
- Add a `useViewportFit` hook to clamp font sizes/gaps with CSS `clamp()` based on available height.

## 2. Responsive scaling system (index.css + tailwind)
- Introduce fluid type tokens: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-body`, `--fs-small` using `clamp(min, vw-based, max)`.
- Introduce fluid spacing tokens `--sp-1`…`--sp-8` keyed to `min(vw,vh)`.
- Add tailwind utilities `.text-display`, `.text-h1`, etc. mapped to those tokens. Replace hardcoded `text-4xl md:text-6xl lg:text-7xl` patterns.

## 3. Per-page refactors (no-scroll, decluttered)

| Page | Strategy |
|------|----------|
| `/` Dashboard | Hero + 3 module cards in one viewport. Collapse hero copy; move "OUR GOAL" into a compact strip; cards become a horizontal row on desktop, 1‑col carousel on mobile. |
| `/home` Index | Convert 3 stacked sections into a tabbed/segmented single-screen layout (Hero / What it is / What it isn't). |
| `/principles` | Grid of principles in a viewport-fit bento; long lists become a scroll-snap carousel inside a fixed-height region (page itself doesn't scroll). |
| `/vessel`, `/faq` | Two-column split: left nav/list, right content panel; only the panel scrolls internally. |
| `/auth` | Single centered card, already compact — just enforce `h-screen grid place-items-center`. |
| `/dashboard` subpages (Business, Developers, Community, Vote, Transaction, Contact) | Standardize on `<PageShell>` with header strip + content region using internal scroll/tabs. |
| Admin pages (`/admin`, `AdminHub`, `AdminDeveloperRoster`, `OperationsHub`, Forge*) | Dashboard shell: fixed header + sidebar/tabs + data area with internal scroll only. |
| Asset flow (`AssetClassification`, `AssetIntake`, `AssetFinalReview`, `AssetProduction*`, `SubmissionConfirmation`, `SystemsAnalysis*`) | Convert long forms into stepper wizards with one step per viewport; right-side summary panel on desktop, collapsible sheet on mobile. |
| `NotFound`, `UnderConstruction` | Centered single-card layout. |

## 4. Declutter rules (applied everywhere)
- Max 1 H1, 1 primary CTA, 1 secondary CTA per viewport.
- Remove decorative status strings ("OP_STATUS", "REF_005…", corner dots) from primary viewports — move to a collapsible footer drawer.
- Cap visible card count to 3 on desktop / 1 on mobile; overflow goes into carousel or "View all" route.
- Replace stacked descriptive paragraphs with a single 1‑2 line summary; details open in a side sheet/dialog.
- Consistent iconography size, single accent color (copper) for emphasis only.

## 5. Responsive breakpoints
- Mobile <768: single column, bottom nav, stepper wizards, sheets for detail.
- Tablet 768–1279: 2-col splits where useful, top nav.
- Desktop ≥1280: full multi-col bento, side panels.
- Use `useIsMobile` + a new `useIsTablet` to swap layouts (not just CSS) where structural change is needed (e.g. Forge admin).

## 6. Internal scroll discipline
- Only `<ScrollArea>` regions inside a `<PageShell>` may scroll. The `<body>` is locked to `overflow:hidden`.
- Long lists (tables, archives, intake history) use virtualized or paginated lists inside fixed-height containers.

## 7. Validation checklist (per page)
- [ ] No vertical scroll at 1280×800, 1024×768, 768×1024, 390×844.
- [ ] One H1, ≤2 CTAs visible.
- [ ] All interactive targets ≥40px on mobile.
- [ ] Navbar + bottom nav never overlap content.
- [ ] No hardcoded color classes; only design tokens.

## Technical notes
- New files: `src/components/PageShell.tsx`, `src/hooks/useIsTablet.tsx`, `src/hooks/useViewportFit.tsx`.
- Edit: `src/index.css` (fluid tokens), `tailwind.config.ts` (utilities), every page in `src/pages/*`, `src/components/forge/*`, `src/components/classification/*`.
- No backend, DB, or auth changes.
- Rollout in waves: (1) shell + tokens, (2) public pages, (3) auth/dashboard, (4) asset flow, (5) admin/forge.

Approve to begin Wave 1 (shell + fluid tokens + Dashboard/Index/Auth).
