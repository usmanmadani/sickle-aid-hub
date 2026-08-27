CREATE TABLE public.volunteer_profile_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section text NOT NULL,
  detail text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX volunteer_profile_history_user_created_idx
  ON public.volunteer_profile_history (user_id, created_at DESC);

GRANT SELECT, INSERT ON public.volunteer_profile_history TO authenticated;
GRANT ALL ON public.volunteer_profile_history TO service_role;

ALTER TABLE public.volunteer_profile_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Volunteers can log own profile changes"
  ON public.volunteer_profile_history FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Volunteers can view own profile history"
  ON public.volunteer_profile_history FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profile history"
  ON public.volunteer_profile_history FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));