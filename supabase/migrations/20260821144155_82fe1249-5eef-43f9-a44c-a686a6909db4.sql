CREATE TABLE public.testing_centers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL,
  state text NOT NULL,
  lga text,
  phone text,
  hours text,
  services text[] NOT NULL DEFAULT '{}',
  map_url text,
  active boolean NOT NULL DEFAULT true,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testing_centers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testing_centers TO authenticated;
GRANT ALL ON public.testing_centers TO service_role;

ALTER TABLE public.testing_centers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view testing centers" ON public.testing_centers FOR SELECT USING (true);
CREATE POLICY "Admins can manage testing centers" ON public.testing_centers FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_testing_centers_updated_at BEFORE UPDATE ON public.testing_centers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();