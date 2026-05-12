## Changes

### 1. Make `/dashboard` the starting page
In `src/App.tsx`:
- Change route `/` to render `Dashboard` instead of `Index`
- Move the existing `Index` page to `/home` (kept reachable, no broken links)

### 2. Gate the "BEGIN ASSET INTAKE" button behind login
In `src/pages/AssetProduction.tsx` (line 211 button):
- Use the existing `useAuth` hook to check if a user is signed in
- On click:
  - If signed in → navigate to `/asset-classification` (current behavior)
  - If not signed in → navigate to `/auth?redirect=/asset-classification`
- In `src/pages/Auth.tsx`, after a successful sign-in/sign-up, read the `redirect` query param and navigate there (fallback `/dashboard`)

No other routes, business logic, or styling are changed.
