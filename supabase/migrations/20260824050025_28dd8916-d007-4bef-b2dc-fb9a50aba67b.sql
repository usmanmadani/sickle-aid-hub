CREATE TABLE public.volunteer_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  bio text NOT NULL DEFAULT '',
  state text,
  city text,
  availability_days text[] NOT NULL DEFAULT '{}'::text[],
  availability_hours text NOT NULL DEFAULT 'flexible',
  skills text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.volunteer_profiles TO authenticated;
GRANT ALL ON public.volunteer_profiles TO service_role;

ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Volunteers can view own profile"
  ON public.volunteer_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Volunteers can create own profile"
  ON public.volunteer_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Volunteers can update own profile"
  ON public.volunteer_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all volunteer profiles"
  ON public.volunteer_profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_volunteer_profiles_updated_at
  BEFORE UPDATE ON public.volunteer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();