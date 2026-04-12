
-- Add production tracking columns to asset_requests
ALTER TABLE public.asset_requests
  ADD COLUMN IF NOT EXISTS project_name text,
  ADD COLUMN IF NOT EXISTS client_name text,
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS priority text DEFAULT 'STANDARD',
  ADD COLUMN IF NOT EXISTS deadline timestamptz,
  ADD COLUMN IF NOT EXISTS total_hours numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS budget numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS current_step integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS final_value numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS profit numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS est_hours numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS logged_hours numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS completed_date timestamptz,
  ADD COLUMN IF NOT EXISTS workflow_step integer DEFAULT 1;

-- Allow admins to read all asset requests (not just own)
CREATE POLICY "Admins can view all asset requests"
  ON public.asset_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update asset requests
CREATE POLICY "Admins can update asset requests"
  ON public.asset_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete asset requests
CREATE POLICY "Admins can delete asset requests"
  ON public.asset_requests FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read all asset request items
CREATE POLICY "Admins can view all asset request items"
  ON public.asset_request_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create project_contributors table
CREATE TABLE public.project_contributors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.asset_requests(id) ON DELETE CASCADE,
  contributor_name text NOT NULL,
  hours numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_contributors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage project contributors"
  ON public.project_contributors FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
