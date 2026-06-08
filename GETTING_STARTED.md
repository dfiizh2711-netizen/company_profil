# 🚀 Getting Started - PT TechNova Indonesia

## 👋 Selamat Datang!

Project ini adalah **Company Profile Website profesional** dengan **Admin Dashboard** lengkap yang terinspirasi dari Stripe, Linear, dan Vercel.

---

## ✅ Apa yang Sudah Dibuat?

### 📄 Core Files (COMPLETED)

#### Database & Backend
- ✅ `supabase/schema.sql` - Database structure lengkap
- ✅ `supabase/rls.sql` - Security policies
- ✅ `supabase/seed.sql` - Sample data

#### Configuration
- ✅ `js/config.js` - Supabase configuration
- ✅ `js/auth.js` - Authentication system
- ✅ `js/components.js` - Reusable UI components
- ✅ `js/main.js` - Public website logic

#### Stylesheets
- ✅ `css/style.css` - Main styles (Navbar, Hero, Cards, Footer, dll)
- ✅ `css/components.css` - Toast, Modal, Loading, dll
- ✅ `css/admin.css` - Admin panel styles

#### Public Website
- ✅ `public/index.html` - Homepage with dynamic content
- ✅ `public/about.html` - About page

#### Admin Panel
- ✅ `admin/login.html` - Secure login page
- ✅ `admin/dashboard.html` - Main dashboard with statistics

#### Documentation
- ✅ `README.md` - Project overview
- ✅ `INSTALLATION.md` - Step-by-step setup guide
- ✅ `DEPLOYMENT.md` - Deploy to Vercel, Netlify, dll
- ✅ `PROJECT_STRUCTURE.md` - Complete file structure
- ✅ `TUTORIAL.md` - Tutorial untuk melengkapi project
- ✅ `GETTING_STARTED.md` - File ini
- ✅ `.gitignore` - Git ignore file

---

## ⏳ Apa yang Masih Perlu Dibuat?

### Public Website (3 files)
- ⏳ `public/services.html` - Services catalog
- ⏳ `public/team.html` - Team members
- ⏳ `public/contact.html` - Contact form

### Admin Panel (7 files)
- ⏳ `admin/home.html` - Manage home content
- ⏳ `admin/about.html` - Manage about content
- ⏳ `admin/services.html` - CRUD services
- ⏳ `admin/team.html` - CRUD team members
- ⏳ `admin/contact.html` - Manage contact info
- ⏳ `admin/media.html` - Media manager
- ⏳ `admin/settings.html` - Website settings

### JavaScript
- ⏳ `js/admin.js` - Admin CRUD logic (optional, bisa inline)

### Assets
- ⏳ Logo, favicon, hero image, dll (lihat `assets/images/README.md`)

---

## 🎯 Langkah Cepat untuk Memulai

### Step 1: Setup Supabase (15 menit)

1. **Buat Project Supabase**
   - Kunjungi https://supabase.com
   - Sign up (gratis)
   - Create new project
   - Tunggu ~2 menit

2. **Run Database Schema**
   - Buka SQL Editor di Supabase
   - Copy paste `supabase/schema.sql` → Run
   - Copy paste `supabase/rls.sql` → Run
   - Copy paste `supabase/seed.sql` → Run

3. **Buat Storage Buckets**
   - Go to Storage
   - Create buckets: `logos`, `hero-images`, `services`, `team`, `company-images`, `media`
   - Set all as **public**

4. **Buat Admin User**
   - Go to Authentication > Users
   - Add user: `admin@technova.com`
   - Set password (INGAT INI!)
   - Run SQL:
     ```sql
     UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';
     ```

5. **Get API Credentials**
   - Go to Settings > API
   - Copy **Project URL** dan **anon public key**

---

### Step 2: Konfigurasi Project (2 menit)

1. **Edit `js/config.js`**
   ```javascript
   const SUPABASE_URL = 'YOUR_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_KEY_HERE';
   ```

2. **Save file**

---

### Step 3: Run Local Server (1 menit)

**Option A: VS Code Live Server** (RECOMMENDED)
```
1. Install extension "Live Server"
2. Right-click public/index.html
3. Select "Open with Live Server"
```

**Option B: Python**
```bash
python -m http.server 8000
# Open http://localhost:8000/public/
```

**Option C: Node.js**
```bash
npx http-server -p 8000
# Open http://localhost:8000/public/
```

---

### Step 4: Test Website (5 menit)

1. **Test Public Website**
   - Open `http://localhost:8000/public/`
   - Homepage harus loading dengan data dari Supabase
   - Check services preview (harus ada 6 services)
   - Check team preview (harus ada 4 members)
   - Click About page → harus load company history

2. **Test Admin Login**
   - Open `http://localhost:8000/admin/login.html`
   - Login: `admin@technova.com` + password
   - Harus redirect ke dashboard
   - Dashboard harus show statistics (6 services, 4 team members)

**Jika semua berfungsi → SUCCESS! ✅**

---

## 📚 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| `README.md` | Overview project, features, structure |
| `INSTALLATION.md` | Panduan instalasi step-by-step |
| `DEPLOYMENT.md` | Cara deploy ke Vercel, Netlify, dll |
| `PROJECT_STRUCTURE.md` | Struktur file lengkap + status |
| `TUTORIAL.md` | Tutorial melengkapi file yang kurang |
| `assets/images/README.md` | Panduan image assets |

---

## 🔨 Melanjutkan Development

### Priority 1: Public Pages (Easy)

1. **Buat `public/services.html`**
   - Copy template dari `TUTORIAL.md` section 1.1
   - Test: harus show 6 services dari database

2. **Buat `public/team.html`**
   - Copy template dari `TUTORIAL.md` section 1.2
   - Test: harus show 4 team members

3. **Buat `public/contact.html`**
   - Copy template dari `TUTORIAL.md` section 1.3
   - Test: form submit harus masuk ke database

### Priority 2: Admin CRUD (Medium)

4. **Buat `admin/home.html`**
   - Template: `TUTORIAL.md` section 2.2
   - Test: edit hero section, upload image

5. **Buat `admin/services.html`**
   - Template: `TUTORIAL.md` section 2.3
   - Test: add, edit, delete services

6. **Buat `admin/team.html`**
   - Copy dari `admin/services.html`, ganti field
   - Test: CRUD team members

7. **Buat admin pages lainnya**
   - `admin/about.html`
   - `admin/contact.html`
   - `admin/media.html`
   - `admin/settings.html`

### Priority 3: Assets & Polish

8. **Upload Images**
   - Logo perusahaan
   - Hero illustration
   - Favicon
   - Office photos

9. **Testing**
   - Test di mobile (Chrome DevTools)
   - Test di multiple browsers
   - Test all CRUD operations

10. **Deployment**
    - Follow `DEPLOYMENT.md`
    - Deploy ke Vercel/Netlify
    - Setup custom domain (optional)

---

## 🎨 Customization

### Ganti Warna
Edit `css/style.css`:
```css
:root {
    --primary: #2563eb;     /* Ganti warna utama */
    --primary-dark: #1e40af;
    --accent: #38bdf8;
}
```

### Ganti Font
Edit di `<head>` semua HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Lalu di CSS:
```css
:root {
    --font-sans: 'Poppins', system-ui, sans-serif;
}
```

---

## 🐛 Troubleshooting

### Data tidak muncul di website
```
✓ Check: js/config.js sudah diisi?
✓ Check: Browser console ada error?
✓ Check: Supabase RLS policies sudah di-run?
✓ Check: Seed data sudah di-insert?
```

### Admin login tidak bisa
```
✓ Check: User sudah dibuat di Supabase Auth?
✓ Check: Role sudah di-set ke 'admin'?
✓ Check: Password benar?
✓ Check: Browser console error?
```

### Upload image gagal
```
✓ Check: Storage buckets sudah dibuat?
✓ Check: Buckets di-set public?
✓ Check: File size < 10MB?
✓ Check: Supabase Storage policies OK?
```

### Website tidak loading (CORS error)
```
✓ Jangan buka file HTML langsung (file://)
✓ Harus pakai web server (Live Server, Python, dll)
✓ Clear browser cache (Ctrl+Shift+Del)
```

---

## 📞 Butuh Bantuan?

1. **Check Documentation**
   - Baca file yang relevan di atas
   - Check `TUTORIAL.md` untuk code examples

2. **Check Browser Console**
   - Press F12
   - Lihat error messages di Console tab
   - Lihat Network tab untuk API calls

3. **Check Supabase Logs**
   - Buka Supabase Dashboard
   - Logs & Monitoring
   - Lihat query errors

4. **Google it!**
   - "Supabase [problem]"
   - "JavaScript [error]"

---

## 🎯 Target Completion

### Minimal Viable Product (MVP)
**Waktu: ~4-6 jam**

- [x] Database setup
- [x] Homepage
- [ ] About, Services, Team, Contact pages
- [ ] Admin login + dashboard
- [ ] Admin CRUD (minimal services + team)
- [ ] Test all features
- [ ] Upload ke hosting

### Full Featured
**Waktu: ~8-12 jam**

- MVP features +
- [ ] Semua admin pages
- [ ] Media manager
- [ ] Website settings
- [ ] Custom logo & images
- [ ] Mobile testing
- [ ] SEO optimization
- [ ] Production deployment
- [ ] Custom domain

---

## 🎓 Learning Resources

### Supabase
- Docs: https://supabase.com/docs
- YouTube: Search "Supabase tutorial"

### JavaScript
- MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/

### CSS
- CSS Tricks: https://css-tricks.com/
- Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

---

## ✨ Tips for Success

1. **Start Small**
   - Jangan coba complete semua sekaligus
   - Buat satu page, test, baru next page

2. **Test Often**
   - Setiap selesai bikin feature, test immediately
   - Check browser console regularly

3. **Use Dev Tools**
   - Chrome DevTools (F12) is your friend
   - Use "Inspect Element" untuk debug CSS

4. **Save Often**
   - Save file after every change
   - Commit to Git regularly

5. **Read Error Messages**
   - Error messages memberikan clue yang bagus
   - Google the error message jika bingung

---

## 🚀 Ready to Start?

1. ✅ Setup Supabase (follow Step 1 above)
2. ✅ Configure `js/config.js` (follow Step 2)
3. ✅ Run local server (follow Step 3)
4. ✅ Test website (follow Step 4)
5. 📝 Open `TUTORIAL.md` dan mulai coding!

---

**Good luck dengan project Anda! 🎉**

*PT TechNova Indonesia - Transforming Ideas Into Digital Solutions*

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Ready for Development 🚀
