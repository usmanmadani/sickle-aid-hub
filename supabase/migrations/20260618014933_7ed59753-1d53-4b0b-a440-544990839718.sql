
CREATE TABLE public.test_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_accounts TO authenticated;
GRANT ALL ON public.test_accounts TO service_role;

ALTER TABLE public.test_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage test accounts"
  ON public.test_accounts
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
