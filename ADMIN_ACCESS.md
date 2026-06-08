# Admin Access Documentation

This document explains how to access and use the admin panel for the Company Profile website after migration to Supabase.

## Overview

The admin panel allows you to:
- Manage website content (Home, About, Services, Team, Contact)
- View and manage contact messages
- Upload and manage media files
- Configure website settings
- View dashboard statistics

## Accessing the Admin Panel

### URL

- **Admin Login**: `https://your-domain.com/admin/login.html`
- **Admin Dashboard**: `https://your-domain.com/admin/dashboard.html`

### Authentication

The admin panel uses Supabase Auth for authentication. Only users with the `admin` role in the `profiles` table can access the admin panel.

## Setting Up Admin Access

### Step 1: Create Supabase User

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create New User**
4. Enter email and password
5. Click **Create User**

### Step 2: Grant Admin Role

1. Go to **Table Editor** in Supabase
2. Select the `profiles` table
3. Find the user you just created
4. Update the `role` column to `admin`

**Using SQL Editor:**
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

### Step 3: Verify User ID

If you need to find the user ID:
```sql
SELECT id, email, role 
FROM profiles 
WHERE email = 'your-email@example.com';
```

## Logging In

### First-Time Login

1. Navigate to `admin/login.html`
2. Enter your email and password
3. Click **Login**
4. If successful, you'll be redirected to the dashboard

### Troubleshooting Login

**Problem**: "Access denied. Admin only."
- **Solution**: Verify the user has `role = 'admin'` in the `profiles` table

**Problem**: "Invalid login credentials"
- **Solution**: 
  - Verify email and password are correct
  - Check if email confirmation is required in Supabase Auth settings
  - Try resetting the password via Supabase Auth

**Problem**: User not found
- **Solution**: 
  - Verify the user exists in Supabase Auth
  - Verify the user exists in the `profiles` table
  - The `profiles` table should have a foreign key to `auth.users`

## Admin Panel Features

### Dashboard (`dashboard.html`)

**Features:**
- View statistics (services count, team count, messages)
- See unread message count
- View recent contact messages
- Quick access to all admin sections

**Access**: Dashboard → Home

### Home Content Management (`home.html`)

**Features:**
- Edit hero section (title, subtitle, CTA button)
- Upload hero background image
- Manage home page content

**Access**: Dashboard → Home

### About Content Management (`about.html`)

**Features:**
- Edit company history
- Edit vision and mission
- Edit company values
- Upload company image

**Access**: Dashboard → About

### Services Management (`services.html`)

**Features:**
- Create, edit, delete services
- Upload service icons
- Set service order
- Manage service descriptions

**Access**: Dashboard → Services

### Team Management (`team.html`)

**Features:**
- Add, edit, remove team members
- Upload team member photos
- Set team member roles
- Manage team member order

**Access**: Dashboard → Team

### Contact Information (`contact.html`)

**Features:**
- Edit contact details (address, phone, email)
- Edit social media links
- Update contact form settings

**Access**: Dashboard → Contact

### Messages Management (`messages.html`)

**Features:**
- View all contact form submissions
- Mark messages as read/unread
- Filter messages (all, read, unread)
- Search messages
- Delete messages
- Reply to messages (opens email client)

**Access**: Dashboard → Messages

### Media Management (`media.html`)

**Features:**
- Upload images via drag & drop
- View all uploaded images
- Copy image URLs
- Preview images
- Delete images

**Access**: Dashboard → Media

### Settings (`settings.html`)

**Features:**
- Configure site name
- Upload logo and favicon
- Set primary color
- Edit footer text
- Configure background images for different pages

**Access**: Dashboard → Settings

## User Roles

### Admin Role

Users with the `admin` role have full access to:
- All admin panel features
- CRUD operations on all tables
- File upload and deletion
- Settings management

### Creating Additional Admin Users

To create additional admin users:

1. Create a new user in Supabase Auth
2. Add the user to the `profiles` table with `role = 'admin'`

**SQL:**
```sql
-- First, create the user in Supabase Auth (via dashboard)
-- Then, update the role:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'new-admin@example.com';
```

### Removing Admin Access

To remove admin access from a user:

```sql
UPDATE profiles 
SET role = 'user' 
WHERE email = 'user@example.com';
```

## Security Best Practices

### Password Security

- Use strong passwords (minimum 8 characters, mixed case, numbers, symbols)
- Change passwords regularly
- Don't share admin credentials
- Use unique passwords for different services

### Session Management

- Sessions are managed by Supabase Auth
- Sessions expire automatically
- Logout when done using the admin panel
- Clear browser cache if using shared devices

### Access Control

- Only grant admin role to trusted users
- Regularly review admin users
- Remove access for users who no longer need it
- Monitor admin activity in Supabase logs

### Data Protection

- Use HTTPS in production
- Enable RLS policies on all tables
- Never expose service role key
- Regular backups (Supabase provides automatic backups)

## Common Tasks

### Updating Website Content

1. Log in to admin panel
2. Navigate to the relevant section (Home, About, Services, Team, Contact)
3. Make changes
4. Click **Save**
5. Changes are reflected immediately on the public site

### Managing Contact Messages

1. Go to Messages section
2. View unread messages (highlighted)
3. Click on a message to view details
4. Mark as read or delete
5. Reply via email client if needed

### Uploading Images

1. Go to Media section
2. Drag & drop images or click to select
3. Wait for upload to complete
4. Copy URL to use in other sections
5. Delete images when no longer needed

### Changing Site Appearance

1. Go to Settings section
2. Update site name, logo, favicon
3. Change primary color
4. Update background images
5. Click **Save**
6. Changes apply immediately

## Troubleshooting

### Cannot Access Admin Panel

**Problem**: Redirected to login page
- **Solution**: 
  - Verify you're logged in
  - Check if your session expired
  - Log in again

**Problem**: "Access denied" error
- **Solution**:
  - Verify your role is `admin` in `profiles` table
  - Check if RLS policies are correctly configured
  - Contact Supabase support if issue persists

### Changes Not Reflecting

**Problem**: Changes not visible on public site
- **Solution**:
  - Clear browser cache
  - Check if you clicked **Save**
  - Verify Supabase connection is working
  - Check browser console for errors

### Upload Issues

**Problem**: Images not uploading
- **Solution**:
  - Verify `media` bucket exists in Supabase Storage
  - Check bucket is public
  - Verify file size is under 10MB
  - Check file format (JPG, PNG, GIF, WEBP, SVG)

### Database Errors

**Problem**: Error when saving data
- **Solution**:
  - Check browser console for error details
  - Verify RLS policies allow writes
  - Check Supabase logs
  - Verify table structure matches schema

## Support

### Supabase Resources

- **Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Dashboard**: [app.supabase.com](https://app.supabase.com)
- **Discord**: [discord.gg/supabase](https://discord.gg/supabase)

### Project Resources

- **Migration Analysis**: `MIGRATION_ANALYSIS.md`
- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`
- **Safe to Delete**: `SAFE_TO_DELETE.md`

## Summary

The admin panel provides a complete content management system for your Company Profile website. With Supabase Auth, you have secure, scalable authentication. The admin panel allows you to manage all aspects of your website without touching code.

**Key Points:**
- Only users with `role = 'admin'` can access the admin panel
- All changes are saved to Supabase in real-time
- Sessions are managed by Supabase Auth
- RLS policies protect your data
- The admin panel is responsive and works on all devices

For additional help, refer to the Supabase documentation or the project documentation files.
