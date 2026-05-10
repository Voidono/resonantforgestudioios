## Goal

On `/admin-operations/forge` (Intake tab), let admins open each intake card and see **every asset box** the client submitted plus **all the data** they filled in (geometry, materials, variants, rigging, HP, RUB, texture sets, global project intake, etc.).

## Current state

`src/components/forge/ForgeIntake.tsx` renders a card per `asset_requests` row with only: client, project name, workflow step, item count, submitted date, and a non-functional "OPEN INTAKE" button. The richer per-asset data lives in `asset_request_items` and `asset_specifications`, but is never queried or displayed.

## Plan

### 1. Wire the "OPEN INTAKE" button to a detail drawer

- Add a slide-in side drawer (or full-screen modal) component inside `ForgeIntake.tsx` triggered by clicking a card.
- Drawer header: client name, project name, workflow step badge, submitted date, total budget / hours / final value from `asset_requests`.

### 2. Fetch full intake payload on open

When a card is opened, query in parallel:
- `asset_request_items` where `request_id = X` (every asset box the client added — `asset_number`, `size`, `category`, `studio_code`, all toggles, iterations, `project_description`, `requested_artist`, etc.)
- `asset_specifications` where `request_id = X` (full per-asset spec: visual, production context, geometry, material, variants, rigging, delivery, plus the new HP / RUB / texture / global intake JSON stored in `pipeline_config` and `deliverables`).

### 3. Render every asset box

Inside the drawer, list one collapsible panel per `asset_request_item`, ordered by `asset_number`. Each panel shows:

- **Header strip**: asset number, size chip (S/M/L), category, studio code, requested artist.
- **Toggles row**: full production / vfx / animation / rigging / reference search (rendered as on/off chips).
- **Project description** + descriptor.
- **Iterations** array.
- **Stage toggles** JSON (rendered as a key→value grid).
- **Linked specification** (matched by `asset_item_id`) broken into the existing 13 sections used in `AssetFinalReview.tsx`:
  1. Visual & Style
  2. Production Context
  3. Geometry & Build
  4. Material & Texture
  5. Variants & States
  6. Rigging & Animation
  7. Production Efficiency
  8. Engine & Pipeline
  9. Delivery
  10. High Poly Intake (from `pipeline_config.hp`)
  11. Retopo / UV / Bake (from `pipeline_config.rub`)
  12. Texture Sets (from `pipeline_config.texture`)
  13. Global Project Intake (from `pipeline_config.global`) — shown once at the top of the drawer, not per asset.

Empty / unset fields are dimmed with an "—" placeholder so admins can see what's missing.

### 4. UI styling

- Match the existing copper/dark Forge aesthetic (`border-border`, `bg-card/40`, copper accents, `font-serif` headings, `font-sans` micro-labels with `tracking-[0.12em] uppercase`).
- Each section uses a small copper bar + label header identical to the rest of the Forge dashboard for visual consistency.
- Drawer scrolls internally; sticky header with close button.

### 5. Loading / empty states

- Spinner inside drawer while fetching.
- "NO ASSET BOXES SUBMITTED" fallback if the request has zero items.
- "NO SPECIFICATION RECORDED" fallback per asset when no matching spec row exists.

## Technical notes

- All work is frontend-only; no schema or RLS changes (admin SELECT policies already exist on both tables).
- New file: `src/components/forge/ForgeIntakeDetailDrawer.tsx` to keep `ForgeIntake.tsx` lean.
- Type the fetched rows from `Database["public"]["Tables"][...]["Row"]` in `src/integrations/supabase/types.ts`.
- No changes to the calculation logic in `AssetFinalReview.tsx`; the drawer is read-only.

## Out of scope

- Editing intake data from this view.
- Advancing workflow steps / sending offers (separate follow-up).
