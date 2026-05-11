## Problem

The Forge intake drawer renders "NO SPECIFICATION RECORDED" for every asset box, even though the user filled out `/asset-final-review`.

Root cause (verified in the code):

1. `AssetIntake.tsx` inserts an `asset_request` + `asset_request_items`, then navigates to `/asset-final-review` **without passing the new `request.id`**.
2. `AssetFinalReview.tsx` then inserts a **brand-new, empty** `asset_request` (line 270) and writes its `asset_specifications` against that orphan request — never against the intake the admin sees in Forge.
3. Even within one request, specs are inserted without `asset_item_id`, and the drawer matches them by array index (`specs[idx]`), so per-asset matching is fragile.

The drawer already renders every field from `pipeline_config` (HP / RUB / Texture / Global) and every column on `asset_specifications`. The data just never reaches the right `request_id`.

## Plan

### 1. Carry the intake `request_id` (and asset list) into Final Review

`src/pages/AssetIntake.tsx`
- After the successful `asset_requests` + `asset_request_items` insert, navigate with state:
  ```ts
  navigate("/asset-final-review", {
    state: {
      requestId: request.id,
      assets: assets.map(a => ({ id: a.id, size: a.size, intakeItemId: <inserted item id> })),
    },
  });
  ```
- To get each inserted item id, change the `asset_request_items` insert to `.select()` and map `asset_number` → `id`.

### 2. Make Final Review write into that existing request

`src/pages/AssetFinalReview.tsx`
- Read `useLocation().state` for `requestId` and `assets`. Fall back to a redirect to `/asset-intake` if missing.
- Replace the local hardcoded `assets` mock (lines 15-21) with the assets passed from intake (preserving `id`, `size`, and `intakeItemId`).
- **Remove** the `supabase.from("asset_requests").insert(...)` block (lines 268-274). Use `requestId` from state instead.
- When building `specs`, set both `request_id: requestId` and `asset_item_id: a.intakeItemId` on each row so each spec is paired to its intake box.

### 3. Match specs by `asset_item_id` in the drawer

`src/components/forge/ForgeIntakeDetailDrawer.tsx`
- Build a `specsByItem = new Map(specs.map(s => [s.asset_item_id, s]))`.
- Inside the items loop, replace `const spec = specs[idx]` with `const spec = specsByItem.get(item.id) ?? specs[idx] ?? null` (index fallback covers any legacy rows written before this fix).
- Keep the existing 13 sections + Global Project Intake block — they already cover every field saved by Final Review.

### 4. Empty-state copy

- When a spec exists but a sub-block (HP / RUB / Texture) is `enabled: false`, keep current behavior (block hidden).
- When no spec is found for an item, show the existing "NO SPECIFICATION RECORDED" panel.

## Out of scope

- No schema, RLS, or calculation-logic changes.
- No edits to how HP/RUB/Texture/Global values are computed in Final Review — only how they are persisted and matched.
- No backfill of historical orphan requests created before this fix (older intakes will keep showing "NO SPECIFICATION RECORDED").
