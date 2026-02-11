
CREATE TABLE public.site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.impact_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT NOT NULL,
    count BIGINT NOT NULL,
    suffix TEXT,
    icon TEXT,
    color TEXT DEFAULT 'primary',
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site content" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content" ON public.site_content
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view impact stats" ON public.impact_stats
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage impact stats" ON public.impact_stats
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (key, value) VALUES
('home_hero', '{"title": "Bringing Hope to Those Affected by Sickle Cell", "subtitle": "We believe prevention starts with awareness. We believe patients deserve hope. ❤️", "cta_primary": "Donate Now", "cta_secondary": "Learn About Our Programs"}'::jsonb),
('home_mission', '{"title": "Our Mission", "description": "Red Hope is dedicated to raising awareness about sickle cell disease and providing support to affected individuals and their families across Nigeria and beyond."}'::jsonb),
('home_cta', '{"title": "Join the Movement", "description": "Your support can save lives. WHETHER through donations, volunteering, or spreading awareness, every action counts."}'::jsonb);

INSERT INTO public.impact_stats (label, count, suffix, icon, "order") VALUES
('Annual SCD Deaths Of Children Under 5 Years', 100000, '+', 'Heart', 1),
('SCD Carriers', 50000000, '+', 'Users', 2),
('Annual SCD Births', 150000, '+', 'Award', 3);
