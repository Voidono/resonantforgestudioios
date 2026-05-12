ALTER TABLE public.asset_request_items
ADD COLUMN IF NOT EXISTS studio_name text,
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS contact_email text;