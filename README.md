# PT TechNova Indonesia - Company Profile Website

## 🚀 Overview
Website Company Profile profesional dengan konsep modern SaaS Company yang terinspirasi dari Stripe, Linear, dan Vercel.

**PT TechNova Indonesia**  
*"Transforming Ideas Into Digital Solutions"*

## ✨ Features

### Public Website
- 🏠 Home - Hero section, services preview, team preview, statistics
- 📖 About - Company history, vision, mission, values
- 💼 Services - Complete service catalog with beautiful cards
- 👥 Team - Professional team showcase
- 📞 Contact - Contact form with Google Maps integration

### Admin Dashboard
- 🔐 Secure authentication with Supabase Auth
- 📝 Content Management System for all pages
- 🖼️ Media Manager with upload/delete functionality
- ⚙️ Website Settings (logo, colors, site name)
- 📊 Modern dashboard inspired by Linear

### Technical Features
- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- 🌙 Dark mode support
- 🎨 Modern UI/UX with smooth animations
- 🔒 Row Level Security (RLS) with Supabase
- 📦 Supabase Storage integration
- 🚦 Toast notifications
- ⚡ Fast loading with skeleton loaders
- 🎯 Clean architecture with reusable components

## 🛠️ Tech Stack
- HTML5
- CSS3
- JavaScript ES6+
- Supabase (Database, Auth, Storage)

## 📋 Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Supabase account (free tier available)
- Code editor (VS Code recommended)
- Local web server (Live Server extension or similar)

## 🔧 Installation

### 1. Clone or Download Project
```bash
# Download and extract the project files
```

### 2. Setup Supabase

#### Create Supabase Project
1. Go to https://supabase.com
2. Sign up or login
3. Create new project
4. Note your project URL and anon key

#### Run Database Schema
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run files in order:
   - `supabase/schema.sql` - Creates all tables
   - `supabase/rls.sql` - Sets up security policies
   - `supabase/seed.sql` - Inserts initial data

#### Create Storage Buckets
1. Go to Storage in Supabase Dashboard
2. Create these buckets (all public):
   - `logos`
   - `hero-images`
   - `services`
   - `team`
   - `company-images`
   - `media`

#### Create Admin User
1. Go to Authentication > Users
2. Add new user:
   - Email: admin@technova.com
   - Password: (your secure password)
3. Update user role in SQL Editor:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';
```

### 3. Configure Website

Edit `js/config.js`:
```javascript
const SUPABASE_URL = 'your-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 4. Run Project

#### Option 1: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `public/index.html`
3. Select "Open with Live Server"

#### Option 2: Python HTTP Server
```bash
python -m http.server 8000
# Visit http://localhost:8000/public
```

#### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8000
# Visit http://localhost:8000/public
```

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Blue)
- Secondary: `#1e40af` (Dark Blue)
- Accent: `#38bdf8` (Sky Blue)
- Dark: `#0f172a` (Slate)
- Light: `#f8fafc` (White)

### Typography
- Font Family: Inter, system-ui, sans-serif
- Headings: Bold, large spacing
- Body: Regular, readable line height

### Components
- Modern cards with hover effects
- Smooth scroll animations
- Loading skeletons
- Toast notifications
- Responsive navigation
- Modal dialogs

## 📁 Project Structure

```
project/
├── public/                 # Public website
│   ├── index.html         # Home page
│   ├── about.html         # About page
│   ├── services.html      # Services page
│   ├── team.html          # Team page
│   └── contact.html       # Contact page
├── admin/                 # Admin dashboard
│   ├── login.html         # Login page
│   ├── dashboard.html     # Main dashboard
│   ├── home.html          # Manage home content
│   ├── about.html         # Manage about content
│   ├── services.html      # Manage services
│   ├── team.html          # Manage team
│   ├── contact.html       # Manage contact info
│   ├── media.html         # Media manager
│   └── settings.html      # Website settings
├── css/                   # Stylesheets
│   ├── style.css          # Main styles
│   ├── admin.css          # Admin styles
│   └── components.css     # Reusable components
├── js/                    # JavaScript files
│   ├── config.js          # Supabase configuration
│   ├── auth.js            # Authentication logic
│   ├── main.js            # Public website logic
│   ├── admin.js           # Admin dashboard logic
│   └── components.js      # Reusable components
├── assets/                # Static assets
│   └── images/            # Default images
├── supabase/              # Database files
│   ├── schema.sql         # Database schema
│   ├── rls.sql            # Security policies
│   └── seed.sql           # Sample data
└── README.md              # This file
```

## 🔐 Default Admin Credentials

**Email:** admin@technova.com  
**Password:** (set during setup)

⚠️ **Important:** Change default password after first login!

## 📱 Pages Overview

### Public Website

#### Home (`/public/index.html`)
- Hero section with company tagline
- Why choose us section
- Services preview (top 3 services)
- Team preview (top 4 members)
- Statistics section
- Call-to-action section
- Footer with social links

#### About (`/public/about.html`)
- Company history
- Vision & Mission
- Company values
- Company photos
- Professional layout

#### Services (`/public/services.html`)
- Complete service catalog
- Beautiful card layout
- Service images and descriptions
- Responsive grid

#### Team (`/public/team.html`)
- Team member profiles
- Photos, names, positions
- Professional showcase
- Hover effects

#### Contact (`/public/contact.html`)
- Contact information
- Contact form
- Google Maps integration
- Social media links

### Admin Dashboard

#### Dashboard (`/admin/dashboard.html`)
- Welcome screen
- Quick statistics
- Recent activities
- Quick actions

#### Manage Home (`/admin/home.html`)
- Edit company name, tagline
- Edit hero section content
- Upload hero image and logo
- Preview changes

#### Manage About (`/admin/about.html`)
- Edit company history
- Edit vision & mission
- Edit company values
- Upload company images

#### Manage Services (`/admin/services.html`)
- Create new services
- Edit existing services
- Delete services
- Upload service images

#### Manage Team (`/admin/team.html`)
- Add team members
- Edit member profiles
- Delete members
- Upload member photos

#### Manage Contact (`/admin/contact.html`)
- Edit contact information
- Update social media links
- Update Google Maps location

#### Media Manager (`/admin/media.html`)
- Upload images
- View all uploaded files
- Copy image URLs
- Delete files

#### Settings (`/admin/settings.html`)
- Site name and branding
- Upload logo and favicon
- Primary color customization
- Footer text

## 🗄️ Database Schema

### Tables
- `profiles` - User profiles and roles
- `home_content` - Home page content
- `about_content` - About page content
- `services` - Service catalog
- `team` - Team members
- `contact` - Contact information
- `settings` - Website settings

### Storage Buckets
- `logos` - Company logos
- `hero-images` - Hero section images
- `services` - Service images
- `team` - Team member photos
- `company-images` - Company photos
- `media` - General media files

## 🔒 Security

### Row Level Security (RLS)
- ✅ Public users can only READ data
- ✅ Authenticated admins can CREATE, UPDATE, DELETE
- ✅ All tables protected with RLS policies
- ✅ Storage buckets have proper access controls

### Best Practices
- Use environment variables for API keys
- Never commit sensitive data
- Change default passwords
- Keep Supabase credentials secure
- Regular security audits

## 🚀 Deployment

### Option 1: Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

### Option 2: Netlify
1. Drag and drop folder to Netlify
2. Configure environment variables
3. Deploy!

### Option 3: Traditional Hosting
1. Upload files via FTP
2. Configure web server
3. Update config.js with production URLs

## 🐛 Troubleshooting

### Supabase Connection Issues
- Check SUPABASE_URL and SUPABASE_ANON_KEY in config.js
- Verify internet connection
- Check browser console for errors

### Images Not Uploading
- Verify storage buckets are created
- Check bucket permissions (should be public)
- Ensure file size is under 50MB

### Admin Login Not Working
- Verify admin user exists in Supabase Auth
- Check if role is set to 'admin' in profiles table
- Clear browser cache and cookies

### Styling Issues
- Clear browser cache
- Check CSS file paths
- Verify all CSS files are loaded

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 🎓 Educational Purpose

This project is created as a professional portfolio and school assignment demonstrating:
- Modern web development practices
- Full-stack capabilities with Supabase
- Professional UI/UX design
- Content management system development
- Responsive design implementation
- Security best practices

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a professional school project demonstrating modern web development capabilities.

---

**PT TechNova Indonesia** - *Transforming Ideas Into Digital Solutions*
