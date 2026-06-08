## Goal

Strip the current top/bottom navigation across the app down to just the studio logo and a single Sign In / Sign Out button, then tighten the Dashboard so it fits in one viewport without scrolling.

## Changes

### 1. `src/components/Navbar.tsx` — simplify
Replace the entire navbar (desktop top nav, mobile top bar, mobile bottom nav) with a single minimal floating bar:

- Fixed at top, transparent / subtle blur, no border.
- Left: studio logo (links to `/`).
- Right: one button.
  - If `user` is signed in → "SIGN OUT" button that calls `signOut()` from `useAuth` and navigates to `/`.
  - If not signed in → "SIGN IN" link to `/auth`.
- Remove: Principles, Vessel, FAQ, Dashboard, Admin, Vote links, and the entire mobile bottom nav.

Other page links (Principles, FAQ, Vessel, Vote, Admin) remain reachable via their existing in-page buttons / direct URLs; the routes themselves are untouched.

### 2. `src/index.css` — drop mobile bottom-nav padding
Remove the `@media (max-width: 767px) .min-h-screen { padding-bottom: 4rem }` rule since the bottom nav is gone. This also helps the Dashboard fit the viewport on mobile.

### 3. `src/pages/Dashboard.tsx` — fit one screen
Restructure the page so it fills exactly the viewport height with no scroll on typical desktop sizes:

- Outer wrapper: `h-screen flex flex-col overflow-hidden` instead of `min-h-screen`.
- Reduce hero top padding (`pt-28 md:pt-36` → `pt-20 md:pt-24`) and section paddings (`pb-12`, `pb-16` → `pb-6`, `pb-8`).
- Shrink the "OUR GOAL" card padding (`p-10 md:p-14` → `p-6 md:p-8`) and the module cards (`min-h-[380px]` → `min-h-0`, `p-8` → `p-5`, icon `w-8 h-8` → `w-7 h-7`, description allowed to clamp).
- Use `flex-1` on the modules section so it absorbs remaining height; bottom status bar stays as the footer row.
- On small viewports where content genuinely cannot fit, allow scroll as a fallback (`lg:overflow-hidden` instead of `overflow-hidden`) so mobile isn't broken.

No other pages, routes, business logic, auth flow, or data are modified.

## Out of scope
- Re-styling individual page headers beyond the Navbar swap.
- Changing the logo asset.
- Touching the admin sidebar inside `AssetProductionForge`.
