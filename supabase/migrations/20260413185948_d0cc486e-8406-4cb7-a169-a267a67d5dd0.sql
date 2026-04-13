
-- Delete orphaned/placeholder asset_request_items first
DELETE FROM public.asset_request_items
WHERE request_id IN (
  SELECT id FROM public.asset_requests
  WHERE project_name IS NULL AND client_name IS NULL
);

-- Delete orphaned/placeholder asset_specifications
DELETE FROM public.asset_specifications
WHERE request_id IN (
  SELECT id FROM public.asset_requests
  WHERE project_name IS NULL AND client_name IS NULL
);

-- Delete orphaned/placeholder project_contributors
DELETE FROM public.project_contributors
WHERE project_id IN (
  SELECT id FROM public.asset_requests
  WHERE project_name IS NULL AND client_name IS NULL
);

-- Delete the placeholder asset_requests
DELETE FROM public.asset_requests
WHERE project_name IS NULL AND client_name IS NULL;
