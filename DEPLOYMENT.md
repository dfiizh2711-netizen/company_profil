# 🚀 Panduan Deployment PT TechNova Indonesia

## 📋 Daftar Isi
1. [Persiapan Deployment](#persiapan-deployment)
2. [Deploy ke Vercel](#deploy-ke-vercel)
3. [Deploy ke Netlify](#deploy-ke-netlify)
4. [Deploy ke GitHub Pages](#deploy-ke-github-pages)
5. [Deploy ke Hosting Traditional](#deploy-ke-hosting-traditional)
6. [Post-Deployment](#post-deployment)

---

## 🎯 Persiapan Deployment

### Checklist Sebelum Deploy

- [ ] Supabase sudah di-setup lengkap
- [ ] `js/config.js` sudah berisi credentials yang benar
- [ ] Semua data sample sudah di-load
- [ ] Website sudah di-test lokal dengan sempurna
- [ ] Admin login sudah berfungsi
- [ ] Semua gambar sudah di-upload ke Supabase Storage
- [ ] Storage buckets sudah di-set public

### File yang TIDAK Boleh Dicommit ke Git

Buat file `.gitignore`:

```
# Environment variables
.env
.env.local

# Credentials (jika Anda memisahkannya)
config.local.js

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Logs
*.log
```

---

## 🌐 Deploy ke Vercel (RECOMMENDED)

Vercel adalah platform hosting modern yang sempurna untuk static websites.

### Langkah 1: Prepare Project

1. **Buat** file `vercel.json` di root project:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/admin/(.*)",
      "dest": "/admin/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Langkah 2: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/technova.git
git push -u origin main
```

### Langkah 3: Deploy via Vercel

**Option A: Via Vercel Dashboard**

1. Kunjungi https://vercel.com
2. Sign up / Login (gunakan GitHub account)
3. Klik **New Project**
4. Import repository GitHub Anda
5. Configure:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (kosongkan)
   - Output Directory: `./`
6. Klik **Deploy**

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Langkah 4: Setup Environment Variables (Optional)

Jika Anda ingin lebih aman, pisahkan credentials:

1. Di Vercel Dashboard, buka project Anda
2. Klik **Settings** > **Environment Variables**
3. Tambahkan:
   - `SUPABASE_URL`: your-project-url
   - `SUPABASE_ANON_KEY`: your-anon-key

---

## 🎨 Deploy ke Netlify

Netlify juga excellent untuk static websites.

### Langkah 1: Prepare Project

Buat file `netlify.toml` di root project:

```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/public/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Langkah 2: Deploy via Netlify

**Option A: Drag & Drop**

1. Kunjungi https://netlify.com
2. Sign up / Login
3. Drag & drop folder project ke dashboard
4. Tunggu deploy selesai

**Option B: Via GitHub**

1. Push code ke GitHub (lihat langkah di atas)
2. Di Netlify, klik **New site from Git**
3. Connect ke GitHub
4. Select repository
5. Configure:
   - Branch: `main`
   - Build command: (kosongkan)
   - Publish directory: `./`
6. Klik **Deploy site**

**Option C: Via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## 📄 Deploy ke GitHub Pages

GitHub Pages gratis untuk repository public.

### Langkah 1: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/technova.git
git push -u origin main
```

### Langkah 2: Enable GitHub Pages

1. Di GitHub repository, klik **Settings**
2. Scroll ke **Pages**
3. Source: Deploy from a branch
4. Branch: `main` / `root`
5. Klik **Save**

### Langkah 3: Update Path (Important!)

Karena GitHub Pages menggunakan subdomain, update semua path relatif:

```javascript
// Dari:
href="../css/style.css"

// Jadi:
href="./css/style.css"
```

Website akan tersedia di:
```
https://username.github.io/technova/
```

---

## 🖥️ Deploy ke Hosting Traditional

Untuk shared hosting seperti cPanel, Hostinger, dll.

### Langkah 1: Export Project

1. Compress semua file project ke ZIP
2. Atau prepare via FTP client (FileZilla)

### Langkah 2: Upload Files

**Via cPanel File Manager:**

1. Login ke cPanel
2. Buka **File Manager**
3. Navigate ke `public_html/`
4. Upload file ZIP
5. Extract file

**Via FTP:**

1. Connect dengan FTP client
2. Navigate ke `public_html/` atau `www/`
3. Upload semua file

### Langkah 3: Setup Domain

1. Point domain ke hosting
2. Update `.htaccess` (jika perlu):

```apache
# Enable HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /public/$1 [L]
```

---

## 🔒 Post-Deployment

### 1. Test Website

- [ ] Homepage loading dengan benar
- [ ] Semua halaman dapat diakses
- [ ] Images loading dari Supabase
- [ ] Admin login berfungsi
- [ ] CRUD operations berfungsi
- [ ] Mobile responsive
- [ ] All browsers (Chrome, Firefox, Safari)

### 2. Setup Custom Domain (Optional)

**Vercel:**
1. Beli domain (Namecheap, GoDaddy, dll)
2. Di Vercel Dashboard > Settings > Domains
3. Add domain
4. Update DNS records di registrar

**Netlify:**
1. Beli domain
2. Di Netlify > Domain Settings
3. Add custom domain
4. Update DNS records

### 3. SSL Certificate

- ✅ Vercel: Otomatis
- ✅ Netlify: Otomatis
- ✅ GitHub Pages: Otomatis
- ⚠️ Traditional Hosting: Setup via cPanel

### 4. Performance Optimization

**Enable Caching:**

```html
<!-- Add to <head> -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

**Compress Images:**
- Use TinyPNG atau ImageOptim
- Upload compressed version ke Supabase

**Minify CSS/JS (Optional):**
```bash
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/style.min.css css/style.css

# Minify JS
uglifyjs js/main.js -o js/main.min.js
```

### 5. Setup Analytics (Optional)

**Google Analytics:**

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 6. SEO Optimization

**Update meta tags setiap halaman:**

```html
<meta name="description" content="Your description">
<meta name="keywords" content="your,keywords">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://yourdomain.com/image.jpg">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">
```

**Create sitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/public/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/public/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more pages -->
</urlset>
```

**Create robots.txt:**

```
User-agent: *
Disallow: /admin/
Allow: /public/

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 🔐 Security Best Practices

1. **HTTPS Only:** Always use HTTPS
2. **Hide Admin:** Don't link to `/admin/login.html` from public pages
3. **Strong Passwords:** Use strong passwords for admin
4. **Regular Backups:** Export Supabase data regularly
5. **Monitor Access:** Check Supabase logs for suspicious activity

---

## 📊 Monitoring

### Uptime Monitoring

Free services:
- UptimeRobot: https://uptimerobot.com
- StatusCake: https://www.statuscake.com

### Error Tracking

Free services:
- Sentry: https://sentry.io
- LogRocket: https://logrocket.com

---

## 🎉 Launch Checklist

Before going live:

- [ ] All content is final and proofread
- [ ] All images are optimized
- [ ] Contact information is correct
- [ ] Social media links are correct
- [ ] Admin credentials are secure
- [ ] Website tested on multiple devices
- [ ] Website tested on multiple browsers
- [ ] SEO meta tags updated
- [ ] Analytics installed
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Backup created

---

## 🆘 Troubleshooting

### Website not loading

- Check DNS propagation (24-48 hours)
- Check deployment logs
- Verify file permissions (755 for folders, 644 for files)

### Images not showing

- Check Supabase Storage buckets are public
- Check image URLs in database
- Check CORS settings

### Admin login not working

- Check Supabase connection
- Verify credentials in config.js
- Check browser console for errors

---

## 📞 Support

Jika mengalami masalah deployment:

1. Check deployment logs
2. Check browser console (F12)
3. Check Supabase logs
4. Contact hosting support
5. Search platform documentation

---

**Selamat! Website Anda siap diluncurkan! 🚀**

Semoga sukses dengan PT TechNova Indonesia!
