-- ================================================
-- PT TechNova Indonesia - Row Level Security (RLS)
-- ================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ================================================
-- HELPER FUNCTION: Check if user is admin
-- ================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- PROFILES TABLE POLICIES
-- ================================================

-- Public: Read all profiles
CREATE POLICY "Public can view profiles"
    ON profiles FOR SELECT
    USING (true);

-- Admin: Update own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admin: Admin can update any profile
CREATE POLICY "Admin can update any profile"
    ON profiles FOR UPDATE
    USING (is_admin());

-- ================================================
-- HOME CONTENT TABLE POLICIES
-- ================================================

-- Public: Read home content
CREATE POLICY "Public can view home content"
    ON home_content FOR SELECT
    USING (true);

-- Admin: Insert home content
CREATE POLICY "Admin can insert home content"
    ON home_content FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update home content
CREATE POLICY "Admin can update home content"
    ON home_content FOR UPDATE
    USING (is_admin());

-- Admin: Delete home content
CREATE POLICY "Admin can delete home content"
    ON home_content FOR DELETE
    USING (is_admin());

-- ================================================
-- ABOUT CONTENT TABLE POLICIES
-- ================================================

-- Public: Read about content
CREATE POLICY "Public can view about content"
    ON about_content FOR SELECT
    USING (true);

-- Admin: Insert about content
CREATE POLICY "Admin can insert about content"
    ON about_content FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update about content
CREATE POLICY "Admin can update about content"
    ON about_content FOR UPDATE
    USING (is_admin());

-- Admin: Delete about content
CREATE POLICY "Admin can delete about content"
    ON about_content FOR DELETE
    USING (is_admin());

-- ================================================
-- SERVICES TABLE POLICIES
-- ================================================

-- Public: Read services
CREATE POLICY "Public can view services"
    ON services FOR SELECT
    USING (true);

-- Admin: Insert services
CREATE POLICY "Admin can insert services"
    ON services FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update services
CREATE POLICY "Admin can update services"
    ON services FOR UPDATE
    USING (is_admin());

-- Admin: Delete services
CREATE POLICY "Admin can delete services"
    ON services FOR DELETE
    USING (is_admin());

-- ================================================
-- TEAM TABLE POLICIES
-- ================================================

-- Public: Read team
CREATE POLICY "Public can view team"
    ON team FOR SELECT
    USING (true);

-- Admin: Insert team
CREATE POLICY "Admin can insert team"
    ON team FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update team
CREATE POLICY "Admin can update team"
    ON team FOR UPDATE
    USING (is_admin());

-- Admin: Delete team
CREATE POLICY "Admin can delete team"
    ON team FOR DELETE
    USING (is_admin());

-- ================================================
-- CONTACT TABLE POLICIES
-- ================================================

-- Public: Read contact
CREATE POLICY "Public can view contact"
    ON contact FOR SELECT
    USING (true);

-- Admin: Insert contact
CREATE POLICY "Admin can insert contact"
    ON contact FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update contact
CREATE POLICY "Admin can update contact"
    ON contact FOR UPDATE
    USING (is_admin());

-- Admin: Delete contact
CREATE POLICY "Admin can delete contact"
    ON contact FOR DELETE
    USING (is_admin());

-- ================================================
-- SETTINGS TABLE POLICIES
-- ================================================

-- Public: Read settings
CREATE POLICY "Public can view settings"
    ON settings FOR SELECT
    USING (true);

-- Admin: Insert settings
CREATE POLICY "Admin can insert settings"
    ON settings FOR INSERT
    WITH CHECK (is_admin());

-- Admin: Update settings
CREATE POLICY "Admin can update settings"
    ON settings FOR UPDATE
    USING (is_admin());

-- Admin: Delete settings
CREATE POLICY "Admin can delete settings"
    ON settings FOR DELETE
    USING (is_admin());

-- ================================================
-- CONTACT MESSAGES TABLE POLICIES
-- ================================================

-- Public: Insert contact messages (anyone can submit)
CREATE POLICY "Anyone can submit contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

-- Admin: Read all contact messages
CREATE POLICY "Admin can view contact messages"
    ON contact_messages FOR SELECT
    USING (is_admin());

-- Admin: Update contact messages (mark as read)
CREATE POLICY "Admin can update contact messages"
    ON contact_messages FOR UPDATE
    USING (is_admin());

-- Admin: Delete contact messages
CREATE POLICY "Admin can delete contact messages"
    ON contact_messages FOR DELETE
    USING (is_admin());

-- ================================================
-- STORAGE POLICIES
-- ================================================

-- Create storage buckets (run in Supabase Storage UI or via API)
-- Buckets needed:
-- - logos (public)
-- - hero-images (public)
-- - services (public)
-- - team (public)
-- - company-images (public)
-- - media (public)

-- Note: Storage policies need to be set in Supabase Dashboard
-- Go to Storage > Policies for each bucket and add:

-- Public: Read all files (SELECT)
-- Policy name: Public can view files
-- Allowed operation: SELECT
-- Policy definition: true

-- Admin: Upload files (INSERT)
-- Policy name: Admin can upload files
-- Allowed operation: INSERT
-- Policy definition: (SELECT is_admin())

-- Admin: Update files (UPDATE)
-- Policy name: Admin can update files
-- Allowed operation: UPDATE
-- Policy definition: (SELECT is_admin())

-- Admin: Delete files (DELETE)
-- Policy name: Admin can delete files
-- Allowed operation: DELETE
-- Policy definition: (SELECT is_admin())

-- ================================================
-- GRANT PERMISSIONS
-- ================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ================================================
-- VERIFICATION QUERIES
-- ================================================

-- Check if RLS is enabled (run these to verify)
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
-- SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Test admin function
-- SELECT is_admin();
