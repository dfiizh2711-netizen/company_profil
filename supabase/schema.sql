-- ================================================
-- PT TechNova Indonesia - Database Schema
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- PROFILES TABLE
-- Stores user profiles and roles
-- ================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- HOME CONTENT TABLE
-- Stores home page content
-- ================================================
CREATE TABLE IF NOT EXISTS home_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'PT TechNova Indonesia',
    tagline TEXT NOT NULL DEFAULT 'Transforming Ideas Into Digital Solutions',
    hero_title TEXT NOT NULL DEFAULT 'Build Your Digital Future With Us',
    hero_subtitle TEXT NOT NULL DEFAULT 'Professional Software Development Company',
    hero_description TEXT NOT NULL DEFAULT 'We help businesses transform their ideas into powerful digital solutions through innovative software development, web development, and cloud solutions.',
    cta_text TEXT NOT NULL DEFAULT 'Get Started Today',
    logo_url TEXT,
    hero_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- ABOUT CONTENT TABLE
-- Stores about page content
-- ================================================
CREATE TABLE IF NOT EXISTS about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_history TEXT NOT NULL DEFAULT 'PT TechNova Indonesia was founded with a vision to transform the digital landscape through innovative technology solutions.',
    vision TEXT NOT NULL DEFAULT 'To become the leading technology partner for businesses seeking digital transformation in Southeast Asia.',
    mission TEXT NOT NULL DEFAULT 'Deliver world-class software solutions that empower businesses to achieve their full potential through technology innovation.',
    company_values TEXT NOT NULL DEFAULT 'Innovation, Excellence, Integrity, Collaboration, Customer Success',
    company_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- SERVICES TABLE
-- Stores company services
-- ================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TEAM TABLE
-- Stores team members
-- ================================================
CREATE TABLE IF NOT EXISTS team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- CONTACT TABLE
-- Stores contact information
-- ================================================
CREATE TABLE IF NOT EXISTS contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT NOT NULL DEFAULT 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190',
    email TEXT NOT NULL DEFAULT 'info@technova.id',
    phone TEXT NOT NULL DEFAULT '+62 21 1234 5678',
    whatsapp TEXT NOT NULL DEFAULT '+62 812 3456 7890',
    maps_link TEXT NOT NULL DEFAULT 'https://maps.google.com',
    instagram TEXT DEFAULT 'https://instagram.com/technova.id',
    facebook TEXT DEFAULT 'https://facebook.com/technova.id',
    linkedin TEXT DEFAULT 'https://linkedin.com/company/technova-id',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- SETTINGS TABLE
-- Stores website settings
-- ================================================
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT NOT NULL DEFAULT 'PT TechNova Indonesia',
    logo_url TEXT,
    favicon_url TEXT,
    primary_color TEXT NOT NULL DEFAULT '#2563eb',
    footer_text TEXT NOT NULL DEFAULT 'PT TechNova Indonesia - Transforming Ideas Into Digital Solutions',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- CONTACT MESSAGES TABLE
-- Stores contact form submissions
-- ================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- TRIGGERS FOR UPDATED_AT
-- ================================================

-- Profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON home_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- FUNCTION TO CREATE PROFILE ON USER SIGNUP
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at);
CREATE INDEX IF NOT EXISTS idx_team_created_at ON team(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- ================================================
-- COMMENTS
-- ================================================
COMMENT ON TABLE profiles IS 'User profiles with role-based access control';
COMMENT ON TABLE home_content IS 'Home page dynamic content';
COMMENT ON TABLE about_content IS 'About page dynamic content';
COMMENT ON TABLE services IS 'Company services catalog';
COMMENT ON TABLE team IS 'Team members information';
COMMENT ON TABLE contact IS 'Contact information and social media links';
COMMENT ON TABLE settings IS 'Website global settings';
COMMENT ON TABLE contact_messages IS 'Contact form submissions from website visitors';
