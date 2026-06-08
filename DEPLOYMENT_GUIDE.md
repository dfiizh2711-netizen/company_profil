# Deployment Guide - Supabase Migration

This guide covers deploying the migrated Company Profile website with Supabase backend.

## Prerequisites

Before deploying, ensure you have:

1. **Supabase Project** - A Supabase project with the following:
   - Database tables created (see `supabase/schema.sql`)
   - Storage bucket named `media` created
   - Row Level Security (RLS) policies configured
   - Admin user created in the `profiles` table with `role = 'admin'`

2. **Domain Name** - A domain for your website (optional but recommended)

3. **Hosting** - Static hosting service (Netlify, Vercel, GitHub Pages, or any web server)

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready (2-3 minutes)

### 2. Create Database Tables

Run the SQL from `supabase/schema.sql` in the Supabase SQL Editor:

```sql
-- Tables: settings, home_content, about_content, services, team, contact, contact_messages
-- See supabase/schema.sql for complete schema
```

### 3. Create Storage Bucket

1. Go to Storage in Supabase dashboard
2. Create a new bucket named `media`
3. Make it public (for public access to images)
4. Configure bucket policies if needed

### 4. Configure Row Level Security (RLS)

Run the SQL from `supabase/rls.sql` in the Supabase SQL Editor:

```sql
-- RLS policies for data protection
-- See supabase/rls.sql for complete policies
```

### 5. Create Admin User

1. Go to Authentication in Supabase dashboard
2. Create a new user (or use the signup form)
3. Go to Table Editor → `profiles` table
4. Update the user's role to `admin`:

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
```

### 6. Get Supabase Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL
   - anon/public key

### 7. Update Supabase Client

Update `js/supabaseClient.js` with your credentials:

```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Prepare for Deployment**
   ```bash
   # Delete PHP files (see SAFE_TO_DELETE.md)
   rm -rf api/ database/ install.php
   ```

2. **Deploy to Netlify**
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `public` (or root if using subdirectory)
   - Click "Deploy site"

3. **Configure Domain** (optional)
   - Go to Site settings → Domain management
   - Add custom domain
   - Update DNS records as instructed

### Option 2: Vercel

1. **Prepare for Deployment**
   ```bash
   # Delete PHP files
   rm -rf api/ database/ install.php
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import from Git
   - Select your repository
   - Configure:
     - Framework Preset: Other
     - Root Directory: `.` (or subdirectory)
   - Click "Deploy"

### Option 3: GitHub Pages

1. **Prepare for Deployment**
   ```bash
   # Delete PHP files
   rm -rf api/ database/ install.php
   ```

2. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your branch)
   - Folder: `/` (root) or `/docs`
   - Click Save

### Option 4: Traditional Web Server (Apache/Nginx)

1. **Prepare Files**
   ```bash
   # Delete PHP files
   rm -rf api/ database/ install.php
   ```

2. **Upload to Server**
   ```bash
   # Using SCP
   scp -r public/* user@your-server:/var/www/html/
   scp -r admin/* user@your-server:/var/www/html/admin/
   scp -r js/* user@your-server:/var/www/html/js/
   scp -r css/* user@your-server:/var/www/html/css/
   scp -r assets/* user@your-server:/var/www/html/assets/
   ```

3. **Configure Web Server**

   **Apache** (`.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## Post-Deployment Steps

### 1. Test the Website

- **Public Pages**: Test all public pages (Home, About, Services, Team, Contact)
- **Contact Form**: Submit a test message
- **Admin Login**: Try logging in with admin credentials
- **Admin Dashboard**: Test all admin features

### 2. Seed Initial Data

Run the SQL from `supabase/seed.sql` to populate initial data:

```sql
-- Initial settings, home content, services, team members
-- See supabase/seed.sql for complete seed data
```

### 3. Configure Settings

1. Log in to admin panel
2. Go to Settings page
3. Configure:
   - Site name
   - Logo
   - Primary color
   - Footer text
   - Background images

### 4. Upload Images

1. Go to Media page in admin panel
2. Upload images for:
   - Services icons
   - Team member photos
   - Company image
   - Background images

### 5. Delete Old Files

After confirming everything works, delete the PHP files (see `SAFE_TO_DELETE.md`):

```bash
rm -rf api/ database/ install.php
```

## Environment Variables (Optional)

If you want to use environment variables for Supabase credentials:

### Netlify
1. Go to Site settings → Environment variables
2. Add:
   - `VITE_SUPABASE_URL`: your-project-url
   - `VITE_SUPABASE_ANON_KEY`: your-anon-key

### Vercel
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`: your-project-url
   - `VITE_SUPABASE_ANON_KEY`: your-anon-key

Then update `js/supabaseClient.js`:

```javascript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'fallback-url';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'fallback-key';
```

## Security Considerations

1. **RLS Policies**: Ensure Row Level Security is properly configured
2. **Admin Access**: Only grant admin role to trusted users
3. **Anon Key**: The anon key is public, but RLS protects data
4. **Service Role Key**: Never expose the service role key in client-side code
5. **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Authentication Issues

- **Problem**: Login not working
- **Solution**: 
  - Check Supabase Auth settings
  - Verify email confirmation is enabled/disabled as needed
  - Check user role in `profiles` table

### Database Connection Issues

- **Problem**: Data not loading
- **Solution**:
  - Verify Supabase URL and anon key are correct
  - Check browser console for errors
  - Verify RLS policies allow public access for public pages

### Storage Issues

- **Problem**: Images not uploading
- **Solution**:
  - Verify `media` bucket exists
  - Check bucket is public
  - Verify RLS policies for storage

### CORS Issues

- **Problem**: CORS errors in browser
- **Solution**:
  - Configure CORS in Supabase dashboard
  - Add your domain to allowed origins

## Maintenance

### Regular Tasks

1. **Backup Database**: Supabase provides automatic backups
2. **Monitor Storage**: Check storage usage in Supabase dashboard
3. **Update Content**: Use admin panel to update content
4. **Monitor Logs**: Check Supabase logs for errors

### Scaling

- **Database**: Supabase auto-scales PostgreSQL
- **Storage**: Upgrade storage plan as needed
- **Bandwidth**: Monitor and upgrade if needed

## Support

- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord**: [discord.gg/supabase](https://discord.gg/supabase)
- **Project Issues**: Check `MIGRATION_ANALYSIS.md` for known issues

## Summary

The migration to Supabase provides:
- ✅ No server-side code needed
- ✅ Automatic database scaling
- ✅ Built-in authentication
- ✅ File storage with CDN
- ✅ Real-time capabilities (if needed)
- ✅ Easy deployment to static hosting
- ✅ Reduced maintenance overhead

The website is now a modern, serverless application with a powerful backend.
