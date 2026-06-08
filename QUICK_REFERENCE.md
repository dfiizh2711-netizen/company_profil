# ⚡ Quick Reference - PT TechNova Indonesia

Cheat sheet untuk common tasks dan code snippets.

---

## 🔑 Supabase Credentials Location

```javascript
// File: js/config.js
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

---

## 📊 Database Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User accounts | id, email, role |
| `home_content` | Homepage | hero_title, tagline, hero_image_url |
| `about_content` | About page | vision, mission, company_values |
| `services` | Services catalog | name, description, image_url |
| `team` | Team members | name, position, photo_url |
| `contact` | Contact info | email, phone, address, maps_link |
| `settings` | Site settings | site_name, logo_url, primary_color |
| `contact_messages` | Form submissions | name, email, message |

---

## 🎨 CSS Variables (Colors)

```css
/* File: css/style.css :root */
--primary: #2563eb;         /* Blue */
--primary-dark: #1e40af;    /* Dark Blue */
--accent: #38bdf8;          /* Sky Blue */
--dark: #0f172a;            /* Dark Slate */
--light: #f8fafc;           /* Light Gray */
--success: #10b981;         /* Green */
--error: #ef4444;           /* Red */
--warning: #f59e0b;         /* Orange */
```

---

## 📝 Common Code Snippets

### 1. Load Data from Supabase

```javascript
// Get all records
const { data, error } = await supabaseClient
    .from('table_name')
    .select('*')
    .order('created_at', { ascending: false });

if (error) throw error;
console.log(data);
```

### 2. Insert Record

```javascript
const { data, error } = await supabaseClient
    .from('table_name')
    .insert([{
        field1: 'value1',
        field2: 'value2'
    }]);

if (error) throw error;
```

### 3. Update Record

```javascript
const { error } = await supabaseClient
    .from('table_name')
    .update({ field: 'new value' })
    .eq('id', recordId);

if (error) throw error;
```

### 4. Delete Record

```javascript
const { error } = await supabaseClient
    .from('table_name')
    .delete()
    .eq('id', recordId);

if (error) throw error;
```

### 5. Upload Image to Supabase Storage

```javascript
const file = document.getElementById('fileInput').files[0];
const fileExt = file.name.split('.').pop();
const fileName = `${Date.now()}.${fileExt}`;
const filePath = `folder/${fileName}`;

const { data, error } = await supabaseClient.storage
    .from('bucket-name')
    .upload(filePath, file);

if (!error) {
    const { data: { publicUrl } } = supabaseClient.storage
        .from('bucket-name')
        .getPublicUrl(filePath);
    
    console.log('Image URL:', publicUrl);
}
```

### 6. Show Toast Notification

```javascript
showToast('Success message', 'success');  // Green
showToast('Error message', 'error');      // Red
showToast('Warning message', 'warning');  // Orange
showToast('Info message', 'info');        // Blue
```

### 7. Show Loading Overlay

```javascript
showLoading();    // Show loading
// ... do something ...
hideLoading();    // Hide loading
```

### 8. Confirmation Dialog

```javascript
const confirmed = confirm('Are you sure?');
if (confirmed) {
    // Do something
}
```

### 9. Protect Admin Page

```javascript
window.addEventListener('DOMContentLoaded', async function() {
    const isAuthorized = await protectAdminPage();
    if (isAuthorized) {
        // Load your page data
    }
});
```

### 10. Preview Image Before Upload

```javascript
// HTML
<input type="file" id="imageInput" onchange="previewImageHandler(event)">
<img id="preview" style="display: none;">

// JavaScript
function previewImageHandler(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}
```

---

## 🔒 Admin Access

### Default Credentials
```
Email: admin@technova.com
Password: [Set during Supabase setup]
```

### Set User as Admin (SQL)
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

### Check if User is Admin (JavaScript)
```javascript
const isAdmin = await checkAdmin();
if (isAdmin) {
    // User is admin
}
```

---

## 🗂️ Storage Buckets

| Bucket Name | Purpose | Public? |
|-------------|---------|---------|
| `logos` | Company logos | ✅ Yes |
| `hero-images` | Hero section images | ✅ Yes |
| `services` | Service images | ✅ Yes |
| `team` | Team photos | ✅ Yes |
| `company-images` | Company photos | ✅ Yes |
| `media` | General media | ✅ Yes |

---

## 🌐 URL Structure

### Public Website
```
/public/index.html          - Homepage
/public/about.html          - About page
/public/services.html       - Services catalog
/public/team.html           - Team directory
/public/contact.html        - Contact page
```

### Admin Panel
```
/admin/login.html           - Login page
/admin/dashboard.html       - Main dashboard
/admin/home.html            - Manage home content
/admin/about.html           - Manage about content
/admin/services.html        - CRUD services
/admin/team.html            - CRUD team members
/admin/contact.html         - Manage contact info
/admin/media.html           - Media manager
/admin/settings.html        - Website settings
```

---

## 🎯 Common Tasks

### Task: Change Primary Color

1. Open `css/style.css`
2. Find `:root` section
3. Change `--primary` value
4. Save and refresh

### Task: Add New Service

1. Login to admin panel
2. Go to "Kelola Services"
3. Click "Add Service"
4. Fill form
5. Upload image (optional)
6. Click "Save"

### Task: Edit Homepage Hero

1. Login to admin panel
2. Go to "Kelola Home"
3. Edit fields
4. Upload new hero image (optional)
5. Click "Save Changes"

### Task: Update Contact Information

1. Login to admin panel
2. Go to "Kelola Contact"
3. Update fields
4. Click "Save Changes"

### Task: Upload Logo

1. Login to admin panel
2. Go to "Website Settings"
3. Upload new logo
4. Click "Save Settings"

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
/* Base styles: Mobile (< 768px) */

/* Tablet */
@media (min-width: 768px) {
    /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
    /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1280px) {
    /* Large desktop styles */
}
```

---

## 🔧 Development Commands

### Start Local Server

```bash
# VS Code Live Server
Right-click index.html → Open with Live Server

# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

### View in Browser
```
http://localhost:8000/public/
http://localhost:8000/admin/login.html
```

---

## 🚀 Deployment Commands

### Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Git Commands
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repo-url]
git push -u origin main
```

---

## 🐛 Debugging Tips

### Check Browser Console
```
Press F12 → Console tab
Look for red error messages
Check Network tab for failed requests
```

### Check Supabase Logs
```
Supabase Dashboard → Logs & Monitoring
Filter by error level
Check query performance
```

### Common Errors

**Error: Supabase is not defined**
```
Fix: Check if config.js is loaded
Fix: Check Supabase CDN script is included
```

**Error: Invalid API key**
```
Fix: Check js/config.js credentials
Fix: Copy from Supabase Settings → API
```

**Error: Row Level Security**
```
Fix: Run supabase/rls.sql
Fix: Check if user is admin
```

**Error: CORS**
```
Fix: Use local web server (not file://)
Fix: Check Supabase project URL
```

**Error: Image not uploading**
```
Fix: Check storage bucket exists
Fix: Check bucket is public
Fix: Check file size (< 10MB)
```

---

## 📊 File Sizes

### Recommended
- Logo: < 100KB
- Hero Image: < 500KB
- Service Image: < 300KB
- Team Photo: < 200KB
- Total Page: < 2MB

### Optimize Images
- Use https://tinypng.com (PNG)
- Use https://tinyjpg.com (JPG)
- Use SVG when possible

---

## 🎨 Design Tokens

### Spacing
```css
--spacing-xs: 0.5rem;      /* 8px */
--spacing-sm: 1rem;        /* 16px */
--spacing-md: 1.5rem;      /* 24px */
--spacing-lg: 2rem;        /* 32px */
--spacing-xl: 3rem;        /* 48px */
--spacing-2xl: 4rem;       /* 64px */
--spacing-3xl: 6rem;       /* 96px */
```

### Border Radius
```css
--radius-sm: 0.375rem;     /* 6px */
--radius-md: 0.5rem;       /* 8px */
--radius-lg: 0.75rem;      /* 12px */
--radius-xl: 1rem;         /* 16px */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
```

---

## 🔗 Important URLs

### Supabase
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs

### Deployment
- Vercel: https://vercel.com
- Netlify: https://netlify.com

### Resources
- Icons: https://fontawesome.com
- Fonts: https://fonts.google.com
- Images: https://unsplash.com
- Illustrations: https://undraw.co

### Tools
- Image Compress: https://tinypng.com
- Favicon Generator: https://favicon.io
- Color Picker: https://coolors.co

---

## 📞 Quick Help

### Setup Problem?
→ Check [INSTALLATION.md](INSTALLATION.md)

### Code Example Needed?
→ Check [TUTORIAL.md](TUTORIAL.md)

### Deployment Question?
→ Check [DEPLOYMENT.md](DEPLOYMENT.md)

### File Location Unknown?
→ Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## ✅ Quick Checklist

**Before Starting:**
- [ ] Supabase account created
- [ ] Database scripts executed
- [ ] Storage buckets created
- [ ] Admin user created
- [ ] config.js configured

**Before Deploying:**
- [ ] All pages complete
- [ ] All features tested
- [ ] Mobile responsive checked
- [ ] Images optimized
- [ ] Content proofread

**After Deploying:**
- [ ] Test production site
- [ ] Check SSL certificate
- [ ] Verify all links work
- [ ] Test admin login
- [ ] Test all CRUD operations

---

**Save this file for quick reference during development! ⚡**

*PT TechNova Indonesia - Quick Reference Guide*
