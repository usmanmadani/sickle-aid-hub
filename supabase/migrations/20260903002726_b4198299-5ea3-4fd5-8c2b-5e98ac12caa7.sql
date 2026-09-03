CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT _user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public, private
AS $$
  SELECT private.has_role(_user_id, _role)
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

ALTER POLICY "Admins can delete posts" ON public.blog_posts USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can insert posts" ON public.blog_posts WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can update posts" ON public.blog_posts USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view published posts" ON public.blog_posts USING ((published = true) OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can update contacts" ON public.contacts USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all contacts" ON public.contacts USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all donations" ON public.donations USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage events" ON public.events USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Public can view published events" ON public.events USING ((published = true) OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage gallery" ON public.gallery_images USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage impact stats" ON public.impact_stats USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view subscribers" ON public.newsletter_subscribers USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage site content" ON public.site_content USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage testimonials" ON public.testimonials USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage testing centers" ON public.testing_centers USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all roles" ON public.user_roles USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can delete applications" ON public.volunteer_applications USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can update applications" ON public.volunteer_applications USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all applications" ON public.volunteer_applications USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all volunteer profiles" ON public.volunteer_profiles USING (private.has_role(auth.uid(), 'admin'::public.app_role));