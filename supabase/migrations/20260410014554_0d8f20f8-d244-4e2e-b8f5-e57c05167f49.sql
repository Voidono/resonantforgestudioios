
CREATE TABLE public.developers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'systems',
  pipeline_data JSONB NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view developers"
ON public.developers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can insert developers"
ON public.developers FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update developers"
ON public.developers FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete developers"
ON public.developers FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_developers_updated_at
BEFORE UPDATE ON public.developers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the existing hardcoded data
INSERT INTO public.developers (name, role, description, category, pipeline_data, sort_order) VALUES
('ELIAS VANCE', 'LEAD INFRASTRUCTURE ARCHITECT', 'Specialist in distributed systems and high-availability cloud architecture. Over 12 years of experience deploying scalable microservices for AAA global gaming environments.', 'systems', NULL, 0),
('DR. ARIA VOSS', 'SENIOR SYSTEMS ANALYST', 'Specializing in complexity theory and algorithmic optimization. Orchestrates large-scale data modeling and predictive logic for enterprise-tier B2B simulations.', 'systems', NULL, 1),
('SARAH CHEN', 'DEVOPS PIPELINE ENGINEER', 'Expert in CI/CD automation and container orchestration. Streamlines development cycles through robust toolchains and automated performance profiling systems.', 'pipeline', '[{"name":"PRE-PRODUCTION","items":[],"active":false},{"name":"FULL ASSET PRODUCTION","items":["Blockout","High Poly","Retopo / UV","Texturing"],"active":true},{"name":"EXTENDED PRODUCTION","items":[],"active":false}]', 2),
('MARCUS THORNE', 'TOOLS & SYSTEMS SPECIALIST', 'Focuses on low-level engine integration and custom plugin development. Extensive background in C++ optimization and real-time physics simulation modules.', 'pipeline', '[{"name":"PRE-PRODUCTION","items":[],"active":false},{"name":"FULL ASSET PRODUCTION","items":["Blockout","High Poly","Retopo / UV","Texturing"],"active":true},{"name":"EXTENDED PRODUCTION","items":["Rigging"],"active":true}]', 3),
('ALEXA RIVERA', 'AUTOMATION SPECIALIST', 'Driving engineering efficiency through Python-based automation frameworks. Specialized in large-scale data processing and internal asset management tools.', 'pipeline', '[{"name":"PRE-PRODUCTION","items":["Reference Creation / Search"],"active":true},{"name":"FULL ASSET PRODUCTION","items":["Blockout","High Poly","Retopo / UV","Texturing"],"active":true},{"name":"EXTENDED PRODUCTION","items":["Rigging","Animation","VFX"],"active":true}]', 4);
