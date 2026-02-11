-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create gallery images table
CREATE TABLE public.gallery_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT CHECK (category IN ('Outreach', 'Testing', 'Community', 'Events')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL, -- e.g., "Mother of SCD Warrior", "Patient"
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Newsletter Policies
CREATE POLICY "Public can subscribe" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

-- Gallery Policies
CREATE POLICY "Public can view gallery" ON public.gallery_images
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery" ON public.gallery_images
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

-- Testimonials Policies
CREATE POLICY "Public can view testimonials" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

-- Seed Data for Testimonials
INSERT INTO public.testimonials (name, role, content) VALUES
('Grace Okafor', 'Mother of SCD Warrior', 'Red Hope provided us with the education and support we desperately needed. Their counseling sessions changed our lives.'),
('Emmanuel Adebayo', 'SCD Patient', 'The free genotype testing drives are a game changer. I urge everyone to know their status.'),
('Dr. Chioma Nwachukwu', 'Partnership Lead', 'Working with Red Hope has shown me the power of community-driven healthcare initiatives.');

-- Seed Data for Gallery (Placeholders)
INSERT INTO public.gallery_images (title, category, url) VALUES
('Community Outreach 2025', 'Outreach', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000'),
('Free Testing Drive', 'Testing', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'),
('Support Group Meeting', 'Community', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000');
