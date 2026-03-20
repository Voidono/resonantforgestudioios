
-- Contact Messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  operator_name TEXT NOT NULL,
  studio_name TEXT NOT NULL,
  intake_reference TEXT,
  department TEXT,
  message_body TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert contact messages"
ON public.contact_messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous submissions too
CREATE POLICY "Anyone can insert contact messages without user_id"
ON public.contact_messages FOR INSERT TO anon
WITH CHECK (user_id IS NULL);

-- Asset Requests table (from Asset Intake)
CREATE TABLE public.asset_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.asset_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own asset requests"
ON public.asset_requests FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own asset requests"
ON public.asset_requests FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Asset Request Items (individual assets within a request)
CREATE TABLE public.asset_request_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.asset_requests(id) ON DELETE CASCADE,
  asset_number TEXT NOT NULL,
  size TEXT NOT NULL,
  category TEXT,
  worked_before BOOLEAN,
  studio_code TEXT,
  requested_artist TEXT,
  project_descriptor TEXT,
  project_description TEXT,
  reference_search BOOLEAN DEFAULT true,
  rigging BOOLEAN DEFAULT false,
  animation BOOLEAN DEFAULT false,
  vfx BOOLEAN DEFAULT false,
  full_production BOOLEAN DEFAULT false,
  stage_toggles JSONB DEFAULT '{}',
  iterations JSONB DEFAULT '[0]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.asset_request_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own asset request items"
ON public.asset_request_items FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.asset_requests WHERE id = request_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view own asset request items"
ON public.asset_request_items FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.asset_requests WHERE id = request_id AND user_id = auth.uid())
);

-- Asset Specifications (from Final Review)
CREATE TABLE public.asset_specifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.asset_requests(id) ON DELETE CASCADE,
  asset_item_id UUID REFERENCES public.asset_request_items(id) ON DELETE CASCADE,
  style_direction TEXT,
  reference_completeness TEXT,
  visual_notes TEXT,
  asset_usage TEXT,
  asset_role TEXT,
  camera_distance TEXT,
  env_kit BOOLEAN DEFAULT false,
  modular_kit BOOLEAN DEFAULT false,
  fidelity TEXT,
  polycount_range TEXT,
  lod_config TEXT,
  surface_detail TEXT,
  gameplay_interaction JSONB DEFAULT '{}',
  modular BOOLEAN DEFAULT true,
  scale TEXT,
  pivot_orientation TEXT,
  texture_resolution TEXT,
  texture_set_count TEXT,
  material_workflow TEXT,
  map_checklist JSONB DEFAULT '{}',
  channel_packed BOOLEAN DEFAULT false,
  material_notes TEXT,
  num_variations TEXT,
  variant_method TEXT,
  destruction_behavior TEXT,
  variant_types JSONB DEFAULT '{}',
  variant_notes TEXT,
  rig_type TEXT,
  animation_count TEXT,
  vfx_integration TEXT,
  rig_notes TEXT,
  bulk_order_tier TEXT,
  asset_consistency TEXT,
  reference_quality TEXT,
  geometry_reuse TEXT,
  target_engine TEXT,
  file_format TEXT,
  pipeline_config JSONB DEFAULT '{}',
  delivery_texture_set_count TEXT,
  delivery_material_workflow TEXT,
  priority TEXT DEFAULT 'STANDARD',
  deliverables JSONB DEFAULT '{}',
  delivery_type TEXT,
  delivery_format TEXT,
  delivery_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.asset_specifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own asset specifications"
ON public.asset_specifications FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.asset_requests WHERE id = request_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view own asset specifications"
ON public.asset_specifications FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.asset_requests WHERE id = request_id AND user_id = auth.uid())
);

-- Service Inquiries (from Systems Analysis Hub)
CREATE TABLE public.service_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own service inquiries"
ON public.service_inquiries FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own service inquiries"
ON public.service_inquiries FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_asset_requests_updated_at
BEFORE UPDATE ON public.asset_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
