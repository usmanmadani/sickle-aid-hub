
ALTER TABLE public.test_accounts RENAME TO platform_users;

ALTER TABLE public.platform_users
  ADD COLUMN genotype TEXT,
  ADD COLUMN location TEXT,
  ADD COLUMN avatar_url TEXT,
  ADD COLUMN is_test BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX platform_users_user_id_idx ON public.platform_users(user_id);
CREATE INDEX platform_users_is_test_idx ON public.platform_users(is_test);

-- Backfill: mark seeded rows as test and assign random genotype + Nigerian state
WITH genos AS (
  SELECT ARRAY['AA','AS','SS','AC','SC']::text[] AS arr
), states AS (
  SELECT ARRAY[
    'Lagos','Abuja FCT','Kano','Rivers','Oyo','Kaduna','Enugu','Anambra','Delta','Edo',
    'Plateau','Borno','Ogun','Imo','Cross River','Akwa Ibom','Ondo','Osun','Kwara','Bayelsa',
    'Sokoto','Katsina','Niger','Benue','Adamawa','Bauchi','Ekiti','Gombe','Jigawa','Kebbi',
    'Kogi','Nasarawa','Taraba','Yobe','Zamfara','Abia','Ebonyi'
  ]::text[] AS arr
)
UPDATE public.platform_users p
SET
  is_test = true,
  genotype = (SELECT arr[1 + floor(random()*array_length(arr,1))::int] FROM genos),
  location = (SELECT arr[1 + floor(random()*array_length(arr,1))::int] FROM states),
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || replace(p.email, '@', '-');

-- Update signup trigger to also seed platform_users for real sign-ups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );

  INSERT INTO public.platform_users (user_id, name, email, avatar_url, is_test)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || replace(NEW.email, '@', '-'),
    false
  )
  ON CONFLICT (email) DO NOTHING;

  RETURN NEW;
END;
$$;
