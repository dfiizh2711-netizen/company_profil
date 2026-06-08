-- ================================================
-- PT TechNova Indonesia - Seed Data
-- ================================================

-- Insert default home content
INSERT INTO home_content (
    company_name,
    tagline,
    hero_title,
    hero_subtitle,
    hero_description,
    cta_text
) VALUES (
    'PT TechNova Indonesia',
    'Transforming Ideas Into Digital Solutions',
    'Build Your Digital Future With Us',
    'Professional Software Development Company',
    'We help businesses transform their ideas into powerful digital solutions through innovative software development, web development, and cloud solutions.',
    'Get Started Today'
) ON CONFLICT DO NOTHING;

-- Insert default about content
INSERT INTO about_content (
    company_history,
    vision,
    mission,
    company_values
) VALUES (
    'PT TechNova Indonesia was founded in 2014 with a vision to transform the digital landscape through innovative technology solutions. Over the years, we have grown from a small startup to a leading software development company, serving clients across various industries. Our journey has been marked by continuous innovation, dedication to excellence, and a commitment to delivering exceptional value to our clients.',
    'To become the leading technology partner for businesses seeking digital transformation in Southeast Asia, empowering organizations with cutting-edge solutions that drive growth and innovation.',
    'Our mission is to deliver world-class software solutions that empower businesses to achieve their full potential through technology innovation. We strive to create lasting partnerships with our clients, understanding their unique challenges and providing tailored solutions that drive measurable results.',
    'Innovation: We embrace creativity and cutting-edge technology to solve complex problems. Excellence: We are committed to delivering the highest quality in everything we do. Integrity: We build trust through transparency and ethical practices. Collaboration: We work closely with our clients as true partners. Customer Success: Your success is our ultimate measure of achievement.'
) ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (name, description) VALUES
('Software Development', 'Custom software solutions tailored to your business needs. We build scalable, secure, and maintainable applications using modern technologies and best practices.'),
('Web Development', 'Responsive and performant web applications that deliver exceptional user experiences. From corporate websites to complex web platforms, we bring your vision to life.'),
('Mobile Development', 'Native and cross-platform mobile applications for iOS and Android. We create intuitive, fast, and engaging mobile experiences that users love.'),
('UI/UX Design', 'User-centered design that combines aesthetics with functionality. We create beautiful interfaces that are intuitive, accessible, and conversion-focused.'),
('Cloud Solutions', 'Scalable cloud infrastructure and migration services. We help you leverage the power of cloud computing for improved performance, security, and cost-efficiency.'),
('Digital Transformation', 'Comprehensive digital transformation strategies to modernize your business. We guide you through every step of your digital journey with proven methodologies.')
ON CONFLICT DO NOTHING;

-- Insert default team members
INSERT INTO team (name, position, description) VALUES
('Budi Santoso', 'Chief Executive Officer', 'Visionary leader with 15+ years of experience in technology and business strategy. Passionate about innovation and driving digital transformation.'),
('Sarah Johnson', 'Chief Technology Officer', 'Technology expert specializing in scalable architecture and modern development practices. Leading our technical vision and engineering excellence.'),
('Andi Wijaya', 'Head of Development', 'Full-stack developer with deep expertise in web and mobile technologies. Committed to code quality and team mentorship.'),
('Maya Kusuma', 'Head of Design', 'Creative designer with a passion for user experience. Crafting beautiful and functional designs that users love.')
ON CONFLICT DO NOTHING;

-- Insert default contact information
INSERT INTO contact (
    address,
    email,
    phone,
    whatsapp,
    maps_link,
    instagram,
    facebook,
    linkedin
) VALUES (
    'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190, Indonesia',
    'info@technova.id',
    '+62 21 1234 5678',
    '+62 812 3456 7890',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890123!2d106.8229!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDknMjIuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid',
    'https://instagram.com/technova.id',
    'https://facebook.com/technova.id',
    'https://linkedin.com/company/technova-indonesia'
) ON CONFLICT DO NOTHING;

-- Insert default settings
INSERT INTO settings (
    site_name,
    primary_color,
    footer_text
) VALUES (
    'PT TechNova Indonesia',
    '#2563eb',
    'PT TechNova Indonesia - Transforming Ideas Into Digital Solutions. © 2024 All rights reserved.'
) ON CONFLICT DO NOTHING;

-- Verify inserted data
SELECT 'Home Content' as table_name, COUNT(*) as records FROM home_content
UNION ALL
SELECT 'About Content', COUNT(*) FROM about_content
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Team', COUNT(*) FROM team
UNION ALL
SELECT 'Contact', COUNT(*) FROM contact
UNION ALL
SELECT 'Settings', COUNT(*) FROM settings;
