# 🧪 Testing Guide - Laragon MySQL Backend

## ✅ Setup Checklist

- [ ] Laragon MySQL & Apache running
- [ ] Database `company_profile` created
- [ ] Sample data inserted
- [ ] File `install.php` dihapus (untuk keamanan)

---

## 🔗 URL Testing

### Public Website
```
http://localhost/company profile/public/index.html
http://localhost/company profile/public/about.html
http://localhost/company profile/public/services.html
http://localhost/company profile/public/team.html
http://localhost/company profile/public/contact.html
```

### Admin Panel
```
http://localhost/company profile/admin/login.html
http://localhost/company profile/admin/dashboard.html
```

### Default Admin Login
- **Email:** admin@technova.com
- **Password:** admin123

---

## 🧪 Test Cases

### 1. **Test Authentication**

#### Test Login
1. Buka `admin/login.html`
2. Masukkan email: `admin@technova.com`
3. Masukkan password: `admin123`
4. Klik Login
5. ✅ Harus redirect ke dashboard

#### Test Protected Page
1. Buka `admin/dashboard.html` tanpa login
2. ✅ Harus redirect ke login page

#### Test Logout
1. Login terlebih dahulu
2. Klik tombol Logout
3. ✅ Harus redirect ke login page

---

### 2. **Test Public Pages**

#### Test Home Page
1. Buka `public/index.html`
2. ✅ Hero section tampil dengan data dari database
3. ✅ Services preview (3 layanan pertama)
4. ✅ Team preview (4 anggota pertama)
5. ✅ Scroll animation berfungsi

#### Test Services Page
1. Buka `public/services.html`
2. ✅ Semua services (6 item) tampil
3. ✅ Card hover effect berfungsi
4. ✅ Images placeholder tampil

#### Test Team Page
1. Buka `public/team.html`
2. ✅ Semua team members (4 orang) tampil
3. ✅ Card hover effect berfungsi

#### Test Contact Page
1. Buka `public/contact.html`
2. ✅ Contact info tampil dari database
3. ✅ Google Maps embed berfungsi
4. ✅ Social media links ada

---

### 3. **Test API Endpoints**

Buka **Browser Console** (F12 → Console) dan test:

#### Test Get Home Content
```javascript
fetch('http://localhost/company profile/api/home.php')
  .then(r => r.json())
  .then(console.log);
```
✅ Harus return object dengan company_name, tagline, dll

#### Test Get Services
```javascript
fetch('http://localhost/company profile/api/services.php')
  .then(r => r.json())
  .then(console.log);
```
✅ Harus return array 6 services

#### Test Get Team
```javascript
fetch('http://localhost/company profile/api/team.php')
  .then(r => r.json())
  .then(console.log);
```
✅ Harus return array 4 team members

#### Test Login via API
```javascript
fetch('http://localhost/company profile/api/auth.php', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'login',
    email: 'admin@technova.com',
    password: 'admin123'
  })
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { success: true, user: {...} }

#### Test Get Current User (after login)
```javascript
fetch('http://localhost/company profile/api/auth.php', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { authenticated: true, user: {...} }

---

### 4. **Test CRUD Operations (Admin Only)**

#### Create Service
```javascript
fetch('http://localhost/company profile/api/services.php', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Service',
    description: 'This is a test service',
    image_url: null
  })
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { success: true, id: "..." }

#### Update Service
```javascript
fetch('http://localhost/company profile/api/services.php', {
  method: 'PUT',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'SERVICE_ID_HERE',
    name: 'Updated Service',
    description: 'Updated description'
  })
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { success: true }

#### Delete Service
```javascript
fetch('http://localhost/company profile/api/services.php?id=SERVICE_ID_HERE', {
  method: 'DELETE',
  credentials: 'include'
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { success: true }

---

### 5. **Test Security**

#### Test Unauthorized Access
```javascript
// Logout dulu, kemudian coba create service
fetch('http://localhost/company profile/api/services.php', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Hack Service',
    description: 'Should not work'
  })
})
.then(r => r.json())
.then(console.log);
```
✅ Harus return { error: "Unauthorized" } dengan status 401

---

## 🐛 Common Issues & Solutions

### Issue: API returns 500 error
**Solution:**
- Cek database connection di `api/config.php`
- Pastikan database `company_profile` exists
- Cek error di browser console

### Issue: Login tidak berhasil
**Solution:**
- Pastikan table `users` ada dan berisi admin
- Password default: `admin123`
- Cek cookies enabled di browser

### Issue: CORS error
**Solution:**
- CORS sudah di-handle di `api/config.php`
- Pastikan mengakses via `localhost`, bukan `127.0.0.1`

### Issue: Session tidak tersimpan
**Solution:**
- Pastikan cookies enabled
- Clear browser cache
- Restart browser

---

## 📊 Database Verification

Buka phpMyAdmin: `http://localhost/phpmyadmin`

### Check Tables
```sql
USE company_profile;
SHOW TABLES;
```
✅ Harus ada 8 tables

### Check Admin User
```sql
SELECT * FROM users WHERE role = 'admin';
```
✅ Harus ada 1 row dengan email admin@technova.com

### Check Sample Data
```sql
SELECT COUNT(*) FROM services;  -- Should return 6
SELECT COUNT(*) FROM team;      -- Should return 4
SELECT COUNT(*) FROM home_content;  -- Should return 1
```

---

## 🎯 Next Steps After Testing

1. ✅ **Semua test pass** → Lanjut ke customization
2. ⚠️ **Ada yang error** → Cek troubleshooting di atas
3. 🚀 **Siap production** → Backup database & deploy

---

## 💡 Tips

- **Browser DevTools** (F12) adalah teman terbaik Anda
- **Network tab** untuk debug API calls
- **Console tab** untuk test JavaScript
- **Application tab** untuk check cookies/session
- **phpMyAdmin** untuk manage database

---

**Happy Testing! 🚀**
