## Goal
Turn the dashboard into a clean, single-viewport landing page — no top bar, no scrolling, with subtle glow on hoverable cards and a smaller bordered auth control.

## Changes

### 1. `src/components/Navbar.tsx` — remove the bar, keep a floating button
- Drop the full-width fixed nav (no background, no blur, no logo bar).
- Render only a single floating button in the top-right corner (`fixed top-4 right-4 z-50`).
  - Signed out → "Sign In" linking to `/auth`.
  - Signed in → "Sign Out" calling `signOut()` then navigating to `/`.
- Styling: smaller (`text-[10px] tracking-[0.2em] uppercase`, `px-3 py-1.5`), thin copper border (`border border-copper/40`), rounded, transparent background with `hover:bg-copper/10 hover:border-copper` transition.
- The studio logo moves into the Dashboard hero itself (already has the studio name as H1) — no separate logo chip needed. This matches the "extremely clean landing page" intent.

### 2. `src/pages/Dashboard.tsx` — fit one viewport, add hover glow
- Outer wrapper stays `h-screen flex flex-col overflow-hidden`; remove the `lg:overflow-hidden` fallback split so it's strictly no-scroll on desktop. Mobile keeps `overflow-auto` on the modules section only.
- Tighten vertical rhythm so 638px viewport fits without scroll:
  - Hero `pt-20 md:pt-24` → `pt-12 md:pt-16`, `pb-4` → `pb-3`.
  - "OUR GOAL" card padding `p-5 md:p-6` → `p-4 md:p-5`, copy max-width tightened, button `py-2` → `py-1.5`.
  - Module cards: reduce inner padding (`p-5` → `p-4`), icon margin, and text size where safe.
  - Bottom status bar `py-3` → `py-2`.
- Add hover glow on the three module cards and the "View Studio Mission" card:
  - Use a copper box-shadow on hover via Tailwind arbitrary value: `hover:shadow-[0_0_32px_-4px_hsl(var(--copper)/0.45)]` + existing `hover:border-copper/40`, with `transition-all duration-300`.
  - Cursor `cursor-pointer`, and make the whole card clickable (wrap content in a `<button>` or add onClick on the card div) so the glow signals affordance — the inner "INITIALIZE WORKSPACE" button remains as the visible CTA.

### 3. `src/index.css` — no changes needed
The mobile bottom-nav padding rule is already removed. No new utilities required (glow uses arbitrary Tailwind values).

## Out of scope
- Other pages' headers, routes, auth flow, or business logic.
- Logo asset changes.
- Admin sidebar inside `AssetProductionForge`.
