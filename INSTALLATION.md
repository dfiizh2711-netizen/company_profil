# 📘 Panduan Instalasi PT TechNova Indonesia

## 🎯 Daftar Isi
1. [Persiapan](#persiapan)
2. [Setup Supabase](#setup-supabase)
3. [Konfigurasi Project](#konfigurasi-project)
4. [Menjalankan Website](#menjalankan-website)
5. [Troubleshooting](#troubleshooting)

---

## 📋 Persiapan

### Yang Anda Butuhkan:
- ✅ Web browser modern (Chrome, Firefox, Safari, Edge)
- ✅ Code editor (VS Code recommended)
- ✅ Akun Supabase (gratis di https://supabase.com)
- ✅ Local web server (Live Server extension atau Python)

---

## 🗄️ Setup Supabase

### Langkah 1: Buat Project Supabase

1. **Kunjungi** https://supabase.com
2. **Sign up** atau **Login**
3. **Klik** "New Project"
4. **Isi form:**
   - Name: `technova` (atau nama lain)
   - Database Password: Buat password yang kuat
   - Region: Pilih yang terdekat (Singapore untuk Indonesia)
5. **Tunggu** ~2 menit project selesai dibuat

### Langkah 2: Dapatkan API Credentials

1. Buka project Supabase Anda
2. Klik **Settings** (icon gear) di sidebar kiri
3. Klik **API**
4. **Simpan** informasi berikut:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Langkah 3: Buat Database Schema

1. Di Supabase Dashboard, klik **SQL Editor**
2. Klik **New query**
3. **Copy paste** isi file `supabase/schema.sql`
4. Klik **Run** (atau tekan Ctrl+Enter)
5. **Tunggu** sampai muncul "Success. No rows returned"

### Langkah 4: Setup Row Level Security

1. Masih di **SQL Editor**, klik **New query**
2. **Copy paste** isi file `supabase/rls.sql`
3. Klik **Run**
4. **Tunggu** sampai selesai

### Langkah 5: Insert Sample Data

1. Di **SQL Editor**, klik **New query**
2. **Copy paste** isi file `supabase/seed.sql`
3. Klik **Run**
4. Anda akan melihat 6 baris data berhasil dimasukkan

### Langkah 6: Buat Storage Buckets

1. Di Supabase Dashboard, klik **Storage**
2. Klik **New bucket**
3. **Buat bucket** berikut (satu per satu):

   | Bucket Name | Public | File Size Limit |
   |------------|--------|-----------------|
   | `logos` | ✅ Yes | 5 MB |
   | `hero-images` | ✅ Yes | 10 MB |
   | `services` | ✅ Yes | 5 MB |
   | `team` | ✅ Yes | 5 MB |
   | `company-images` | ✅ Yes | 10 MB |
   | `media` | ✅ Yes | 10 MB |

**Cara buat bucket:**
- Name: (nama bucket)
- Public bucket: **Centang**
- Klik **Create bucket**

### Langkah 7: Buat Admin User

1. Di Supabase Dashboard, klik **Authentication**
2. Klik **Users**
3. Klik **Add user** > **Create new user**
4. **Isi form:**
   - Email: `admin@technova.com`
   - Password: Buat password yang kuat (CATAT!)
   - Email Confirm: **Centang**
5. Klik **Create user**

### Langkah 8: Set User Sebagai Admin

1. Kembali ke **SQL Editor**
2. **Copy paste** query ini (ganti email jika perlu):
   ```sql
   UPDATE profiles 
   SET role = 'admin' 
   WHERE email = 'admin@technova.com';
   ```
3. Klik **Run**
4. Anda akan melihat "Success. 1 row updated"

---

## ⚙️ Konfigurasi Project

### Langkah 1: Edit Config File

1. Buka file `js/config.js` dengan code editor
2. **Ganti** nilai berikut dengan credentials Supabase Anda:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Ganti ini
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Ganti ini
```

3. **Save** file

### Langkah 2: Verifikasi File Structure

Pastikan struktur folder Anda seperti ini:

```
project/
├── public/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── team.html
│   └── contact.html
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── home.html
│   ├── services.html
│   ├── team.html
│   ├── contact.html
│   ├── media.html
│   └── settings.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── admin.css
├── js/
│   ├── config.js
│   ├── auth.js
│   ├── main.js
│   ├── components.js
│   └── admin.js
├── assets/
│   └── images/
├── supabase/
│   ├── schema.sql
│   ├── rls.sql
│   └── seed.sql
└── README.md
```

---

## 🚀 Menjalankan Website

### Option 1: VS Code Live Server (RECOMMENDED)

1. **Install** extension "Live Server" di VS Code
2. **Klik kanan** file `public/index.html`
3. **Pilih** "Open with Live Server"
4. Browser akan otomatis terbuka di `http://127.0.0.1:5500/public/`

### Option 2: Python HTTP Server

1. **Buka terminal** di folder project
2. **Jalankan:**
   ```bash
   python -m http.server 8000
   ```
3. **Buka browser** ke `http://localhost:8000/public/`

### Option 3: Node.js HTTP Server

1. **Install** http-server (sekali saja):
   ```bash
   npm install -g http-server
   ```
2. **Jalankan:**
   ```bash
   http-server -p 8000
   ```
3. **Buka browser** ke `http://localhost:8000/public/`

---

## 🔐 Login ke Admin Panel

1. **Buka** `http://localhost:5500/admin/login.html` (sesuaikan port)
2. **Login dengan:**
   - Email: `admin@technova.com`
   - Password: (password yang Anda buat di Supabase)
3. **Klik** "Login"
4. Anda akan redirect ke dashboard admin

---

## 🎨 Kustomisasi

### Mengganti Logo & Branding

1. Login ke **Admin Panel**
2. Klik **Website Settings**
3. Upload logo baru
4. Ubah site name dan primary color
5. Klik **Save Changes**

### Menambah Service

1. Login ke **Admin Panel**
2. Klik **Kelola Services**
3. Klik **Add New Service**
4. Isi form:
   - Name: Nama layanan
   - Description: Deskripsi lengkap
   - Image: Upload gambar (optional)
5. Klik **Save**

### Menambah Team Member

1. Login ke **Admin Panel**
2. Klik **Kelola Team**
3. Klik **Add Team Member**
4. Isi form:
   - Name: Nama lengkap
   - Position: Jabatan
   - Description: Bio singkat
   - Photo: Upload foto (optional)
5. Klik **Save**

---

## 🐛 Troubleshooting

### Problem: "Supabase is not configured"

**Solusi:**
- Pastikan `js/config.js` sudah diisi dengan benar
- Refresh browser (Ctrl+F5)
- Check browser console (F12) untuk error

### Problem: "Login failed"

**Solusi:**
- Pastikan user sudah dibuat di Supabase Auth
- Pastikan role sudah di-set ke 'admin'
- Check password yang Anda masukkan

### Problem: "Images not uploading"

**Solusi:**
- Pastikan storage buckets sudah dibuat
- Pastikan buckets di-set **public**
- Check ukuran file (max 10MB)

### Problem: "Data not showing on website"

**Solusi:**
- Pastikan RLS policies sudah di-run
- Pastikan seed data sudah di-insert
- Check browser console untuk error

### Problem: "CORS Error"

**Solusi:**
- Gunakan local web server, jangan buka file langsung
- Gunakan Live Server extension di VS Code

---

## 📚 Resources

- **Supabase Documentation:** https://supabase.com/docs
- **JavaScript MDN:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **CSS Tricks:** https://css-tricks.com/

---

## 💡 Tips

1. **Backup Database:** Export SQL dari Supabase secara berkala
2. **Gunakan Strong Password:** Untuk admin account
3. **Test di Multiple Browsers:** Chrome, Firefox, Safari
4. **Mobile Responsive:** Test di device mobile atau Chrome DevTools
5. **Keep Credentials Secret:** Jangan commit file config.js dengan credentials asli ke Git

---

## 🎓 Next Steps

Setelah instalasi selesai:

1. ✅ Ganti semua teks placeholder dengan data perusahaan asli
2. ✅ Upload logo dan gambar perusahaan
3. ✅ Tambah services dan team members
4. ✅ Update contact information
5. ✅ Test semua fitur
6. ✅ Deploy ke hosting (Vercel, Netlify, dll)

---

**Selamat! Website Anda sudah siap digunakan! 🎉**

Jika ada pertanyaan atau masalah, silakan check dokumentasi atau buka issue.
