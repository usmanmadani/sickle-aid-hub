-- Create table for general site content (key-value store)
CREATE TABLE public.site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for impact statistics
CREATE TABLE public.impact_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    label TEXT NOT NULL,
    count BIGINT NOT NULL,
    suffix TEXT,
    icon TEXT, -- Lucide icon name
    color TEXT DEFAULT 'primary',
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

-- Policies for site_content
CREATE POLICY "Public can view site content" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content" ON public.site_content
    FOR ALL USING (
        auth.uid() IN (
            SELECT user_id FROM public.user_roles WHERE role = 'admin'
        )
    );

-- Policies for impact_stats
CREATE POLICY "Public can view impact stats" ON public.impact_stats
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage impact stats" ON public.impact_stats
    FOR ALL USING (
        auth.uid() IN (
            SELECT user_id FROM public.user_roles WHERE role = 'admin'
        )
    );

-- Insert default site content
INSERT INTO public.site_content (key, value) VALUES
('home_hero', '{"title": "Bringing Hope to Those Affected by Sickle Cell", "subtitle": "We believe prevention starts with awareness. We believe patients deserve hope. ❤️", "cta_primary": "Donate Now", "cta_secondary": "Learn About Our Programs"}'::jsonb),
('home_mission', '{"title": "Our Mission", "description": "Red Hope is dedicated to raising awareness about sickle cell disease and providing support to affected individuals and their families across Nigeria and beyond."}'::jsonb),
('home_cta', '{"title": "Join the Movement", "description": "Your support can save lives. WHETHER through donations, volunteering, or spreading awareness, every action counts."}'::jsonb);

-- Insert default impact stats
INSERT INTO public.impact_stats (label, count, suffix, icon, "order") VALUES
('Annual SCD Deaths Of Children Under 5 Years', 100000, '+', 'Heart', 1),
('SCD Carriers', 50000000, '+', 'Users', 2),
('Annual SCD Births', 150000, '+', 'Award', 3);
