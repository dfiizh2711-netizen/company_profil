# 🧪 Testing Guide - PT TechNova Indonesia

## 📋 Cara Test dengan Laragon

### Step 1: Setup Laragon

1. **Buka Laragon**
2. **Start All** (Apache + MySQL akan jalan)
3. **Klik kanan Laragon tray icon** → **Root** → akan buka folder `C:\laragon\www`
4. **Copy folder project Anda** ke dalam folder `www`
   - Misal: `C:\laragon\www\company-profile\`

### Step 2: Akses Website

**URL yang bisa diakses:**

```
Test Page:
http://localhost/company-profile/TEST.html

Public Pages:
http://localhost/company-profile/public/index.html
http://localhost/company-profile/public/about.html
http://localhost/company-profile/public/services.html
http://localhost/company-profile/public/team.html
http://localhost/company-profile/public/contact.html

Admin Pages:
http://localhost/company-profile/admin/login.html
http://localhost/company-profile/admin/dashboard.html
```

### Step 3: Test Connection

1. **Buka TEST.html di browser:**
   ```
   http://localhost/company-profile/TEST.html
   ```

2. **Check Configuration:**
   - Jika muncul "⚠️ Supabase belum dikonfigurasi" → Normal, lanjut ke setup Supabase
   - Jika muncul "✅ Configuration OK" → Bagus!

3. **Click tombol "Test Connection"**
   - Jika berhasil → ✅ Database connected
   - Jika gagal → Lihat error message

4. **Click tombol "Check Sample Data"**
   - Akan show berapa services, team members yang ada
   - Jika 0 → Jalankan seed.sql

---

## ✅ Testing Checklist

### Before Testing (Setup Supabase First!)

- [ ] Buat account di https://supabase.com
- [ ] Create new project
- [ ] Run `supabase/schema.sql` di SQL Editor
- [ ] Run `supabase/rls.sql` di SQL Editor  
- [ ] Run `supabase/seed.sql` di SQL Editor
- [ ] Create storage buckets (logos, hero-images, services, team, company-images, media)
- [ ] Create admin user di Authentication
- [ ] Set admin role: `UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';`
- [ ] Copy URL + anon key ke `js/config.js`

### Test 1: Configuration ✅

**URL:** `http://localhost/company-profile/TEST.html`

**Expected Result:**
- [x] Page loads tanpa error
- [x] Configuration status shows ✅ atau ⚠️
- [x] Test connection button works
- [x] No console errors (F12)

**If Failed:**
- Check: js/config.js sudah diisi?
- Check: Supabase CDN script loaded?
- Check: Browser console errors (F12)

---

### Test 2: Homepage ✅

**URL:** `http://localhost/company-profile/public/index.html`

**Expected Result:**
- [x] Page loads completely
- [x] Navbar appears
- [x] Hero section shows
- [x] Services preview shows (3 services or "No services yet")
- [x] Team preview shows (4 members or "No team yet")
- [x] Statistics section shows
- [x] Footer shows
- [x] All links work
- [x] Mobile responsive (test with F12 device toolbar)

**Check in Browser Console (F12):**
- No red errors
- Data loaded successfully

**If Shows "Loading..." Forever:**
- Supabase belum dikonfigurasi
- Schema belum di-run
- RLS policies belum di-run
- Network error

---

### Test 3: About Page ✅

**URL:** `http://localhost/company-profile/public/about.html`

**Expected Result:**
- [x] Page loads
- [x] Company history shows
- [x] Vision & Mission shows
- [x] Company values shows
- [x] Image loads (or placeholder)

**If Empty:**
- Run seed.sql untuk insert data
- Check about_content table di Supabase

---

### Test 4: Services Page ✅

**URL:** `http://localhost/company-profile/public/services.html`

**Expected Result:**
- [x] Page loads
- [x] Services grid shows
- [x] 6 services displayed (from seed data)
- [x] Each service has name + description
- [x] Images load (or hidden if no image)
- [x] "No services yet" if empty

**Check:**
- Open browser console (F12)
- Should see: "Services loaded" or similar
- If error: Check error message

---

### Test 5: Team Page ✅

**URL:** `http://localhost/company-profile/public/team.html`

**Expected Result:**
- [x] Page loads
- [x] Team grid shows
- [x] 4 team members displayed (from seed data)
- [x] Each member has photo (or UI Avatar placeholder)
- [x] Name, position, description shows
- [x] "No team members yet" if empty

**Check:**
- Photos should load or show placeholder
- UI Avatars API should work: https://ui-avatars.com/api/?name=Name

---

### Test 6: Contact Page ✅

**URL:** `http://localhost/company-profile/public/contact.html`

**Expected Result:**
- [x] Page loads
- [x] Contact info displays (address, email, phone, whatsapp)
- [x] Contact form shows
- [x] Social media links work
- [x] Google Maps shows (or empty iframe)
- [x] Form submission works

**Test Form:**
1. Fill name, email, subject, message
2. Click "Send Message"
3. Should show: "✅ Message sent successfully!"
4. Check in Supabase: contact_messages table

**If Form Fails:**
- Check browser console (F12)
- Check: contact_messages table exists?
- Check: RLS policies allow INSERT?

---

### Test 7: Admin Login ✅

**URL:** `http://localhost/company-profile/admin/login.html`

**Expected Result:**
- [x] Login page loads
- [x] Beautiful login UI shows
- [x] Email + password fields work
- [x] Show/hide password works

**Test Login:**
1. Enter: admin@technova.com
2. Enter: your password
3. Click "Login"
4. Should redirect to dashboard
5. If failed: Check error message

**Common Login Issues:**
- "Invalid credentials" → Check password
- "Access denied" → User role bukan 'admin'
- "Network error" → Supabase config wrong

**Fix Admin Role:**
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';
```

---

### Test 8: Admin Dashboard ✅

**URL:** `http://localhost/company-profile/admin/dashboard.html`

**Expected Result:**
- [x] Dashboard loads (if logged in)
- [x] Sidebar shows
- [x] Statistics show:
  - Services count
  - Team count
  - Media count
  - Messages count
- [x] User info shows (avatar + name)
- [x] All menu links work

**If Redirect to Login:**
- Not logged in
- Session expired
- Click login again

---

### Test 9: Mobile Responsiveness 📱

**How to Test:**
1. Press F12 in browser
2. Click "Toggle device toolbar" icon (or Ctrl+Shift+M)
3. Select device: iPhone 12, iPad, etc.
4. Test all pages

**Expected Result:**
- [x] Navbar collapses to hamburger menu
- [x] All content readable
- [x] No horizontal scroll
- [x] Buttons accessible
- [x] Forms work
- [x] Grid layouts adapt

---

### Test 10: Cross-Browser 🌐

**Test in:**
- [ ] Chrome ✅
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if Mac)

**Expected:**
- All pages work in all browsers
- No layout issues
- All features work

---

## 🐛 Common Issues & Solutions

### Issue 1: "Supabase is not configured"

**Solution:**
```javascript
// Edit js/config.js
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Your actual key
```

### Issue 2: Data tidak muncul / "Loading..." forever

**Check:**
1. Browser console (F12) - lihat error
2. Supabase Dashboard - check tables ada data?
3. RLS policies - sudah di-run?

**Solution:**
```sql
-- Run this in Supabase SQL Editor
SELECT * FROM services;
SELECT * FROM team;
SELECT * FROM settings;

-- If empty, run seed.sql
```

### Issue 3: Admin login gagal

**Solution:**
```sql
-- Check user exists
SELECT * FROM auth.users WHERE email = 'admin@technova.com';

-- Check role
SELECT * FROM profiles WHERE email = 'admin@technova.com';

-- Set as admin
UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';
```

### Issue 4: Images tidak muncul

**Expected:**
- Images akan hidden jika tidak ada URL
- Team photos akan show UI Avatars placeholder
- Services tanpa image akan show tanpa gambar

**Normal behavior:**
- Logo tidak muncul → Normal jika belum upload
- Hero image tidak muncul → Normal jika belum upload
- Team photos show colored initials → Normal, menggunakan UI Avatars

### Issue 5: CORS Error

**Solution:**
- Jangan buka file langsung (file:///)
- Harus pakai web server (Laragon, Live Server, Python)
- Current: http://localhost/ ✅ Correct!

---

## 📊 Test Results Template

Copy dan isi:

```
=== TEST RESULTS ===

Date: _________
Browser: Chrome / Firefox / Edge / Safari
Server: Laragon

PUBLIC PAGES:
[ ] Homepage         - Works / Issues: __________
[ ] About           - Works / Issues: __________
[ ] Services        - Works / Issues: __________
[ ] Team            - Works / Issues: __________
[ ] Contact         - Works / Issues: __________

ADMIN PAGES:
[ ] Login           - Works / Issues: __________
[ ] Dashboard       - Works / Issues: __________

DATABASE:
[ ] Connection      - Works / Issues: __________
[ ] Sample Data     - Count: Services=__ Team=__

FEATURES:
[ ] Form Submit     - Works / Issues: __________
[ ] Navigation      - Works / Issues: __________
[ ] Mobile View     - Works / Issues: __________

NOTES:
_________________________________
_________________________________
```

---

## 🎯 Quick Test Commands

**Open in Browser:**
```
# Main test page
start http://localhost/company-profile/TEST.html

# Homepage
start http://localhost/company-profile/public/index.html

# Admin
start http://localhost/company-profile/admin/login.html
```

---

## ✅ Success Criteria

**Project siap jika:**
- [x] TEST.html shows ✅ Configuration OK
- [x] Homepage loads dengan data
- [x] About, Services, Team pages show content
- [x] Contact form works (message masuk ke database)
- [x] Admin login works
- [x] Dashboard shows statistics
- [x] Mobile responsive
- [x] No console errors

**Jika semua ✅ → Website siap digunakan!** 🎉

---

## 📞 Need Help?

1. Check browser console (F12)
2. Check Supabase logs
3. Read error messages carefully
4. Search error in Google
5. Check INSTALLATION.md

---

**Happy Testing!** 🧪✨
