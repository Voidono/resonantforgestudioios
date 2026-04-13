
DELETE FROM public.asset_specifications WHERE request_id IN (SELECT id FROM public.asset_requests WHERE project_name IS NULL AND client_name IS NULL);
DELETE FROM public.asset_request_items WHERE request_id IN (SELECT id FROM public.asset_requests WHERE project_name IS NULL AND client_name IS NULL);
DELETE FROM public.project_contributors WHERE project_id IN (SELECT id FROM public.asset_requests WHERE project_name IS NULL AND client_name IS NULL);
DELETE FROM public.asset_requests WHERE project_name IS NULL AND client_name IS NULL;
