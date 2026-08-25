CREATE POLICY "Volunteers can view own avatar"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'volunteer-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Admins can view volunteer avatars"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'volunteer-avatars' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Volunteers can upload own avatar"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'volunteer-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Volunteers can update own avatar"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'volunteer-avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'volunteer-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Volunteers can delete own avatar"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'volunteer-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);