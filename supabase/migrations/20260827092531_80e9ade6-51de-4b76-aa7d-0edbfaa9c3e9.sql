ALTER TABLE public.volunteer_profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.volunteer_profiles;