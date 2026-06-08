# 🔧 Debug Helper - Quick Fixes

## 🚨 Jika Ada Masalah, Check Ini!

---

## 1️⃣ Page Kosong / Putih

### Diagnosis:
```
- Buka browser console (tekan F12)
- Lihat tab "Console"
- Ada error merah?
```

### Common Causes:

**A) JavaScript Error**
```
Error: supabaseClient is not defined

Fix:
- Check: js/config.js loaded?
- Check: Supabase CDN script loaded?
- Hard refresh: Ctrl + F5
```

**B) File Not Found**
```
Error: 404 Not Found

Fix:
- Check URL path benar
- Check file exists di folder
- Check Laragon running
```

**C) CSS Not Loading**
```
Page shows tapi tanpa styling

Fix:
- Check CSS path di <head>
- Hard refresh: Ctrl + F5
- Check ../css/style.css exists
```

---

## 2️⃣ Data Tidak Muncul / "Loading..."

### Diagnosis:
```javascript
// Buka console dan ketik:
console.log(SUPABASE_URL);
console.log(SUPABASE_ANON_KEY);

// Should NOT be:
"YOUR_SUPABASE_PROJECT_URL"
"YOUR_SUPABASE_ANON_KEY"
```

### Common Causes:

**A) Supabase Belum Configured**
```
Status: ⚠️ Not configured

Fix:
1. Go to https://supabase.com
2. Create project
3. Get URL & key from Settings → API
4. Edit js/config.js
5. Refresh page
```

**B) Database Schema Belum Di-run**
```
Error: relation "services" does not exist

Fix:
1. Login to Supabase
2. Open SQL Editor
3. Copy supabase/schema.sql
4. Click "Run"
5. Wait for success
6. Refresh website
```

**C) RLS Policies Belum Di-run**
```
Error: new row violates row-level security policy

Fix:
1. Open SQL Editor
2. Copy supabase/rls.sql
3. Click "Run"
4. Refresh website
```

**D) No Sample Data**
```
Shows: "No services yet"

This is NORMAL if seed.sql not run yet!

Fix (optional):
1. Copy supabase/seed.sql
2. Run in SQL Editor
3. Will insert 6 services + 4 team
```

---

## 3️⃣ Admin Login Gagal

### Common Errors:

**A) "Invalid login credentials"**
```
Cause: Wrong email or password

Fix:
- Check email: admin@technova.com (exact)
- Check password: Use the one you set
- Try reset password in Supabase
```

**B) "Access denied. Admin only."**
```
Cause: User role bukan 'admin'

Fix - Run in SQL Editor:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@technova.com';

Then try login again
```

**C) User Tidak Ada**
```
Error: User not found

Fix:
1. Go to Supabase → Authentication → Users
2. Click "Add user" → "Create new user"
3. Email: admin@technova.com
4. Password: [your-password]
5. ✅ Email Confirm
6. Create
7. Run SQL to set role
```

---

## 4️⃣ Contact Form Tidak Bisa Submit

### Diagnosis:
```javascript
// Check di console setelah submit
// Should see success atau error message
```

### Common Causes:

**A) Table Tidak Ada**
```
Error: relation "contact_messages" does not exist

Fix:
- Run schema.sql in Supabase
- Check table exists: SELECT * FROM contact_messages;
```

**B) RLS Policy**
```
Error: new row violates row-level security

Fix:
- Run rls.sql in Supabase
- Check policy exists for INSERT
```

**C) Validation Error**
```
Form tidak submit, no error

Fix:
- Check all required fields filled
- Check email format valid
- Check console for JS errors
```

---

## 5️⃣ Images Tidak Muncul

### This is NORMAL!

**By design:**
- Logo: Hidden jika tidak ada
- Hero image: Hidden jika tidak ada
- Service images: Hidden jika tidak ada
- Team photos: Show UI Avatars placeholder

### If You Want Real Images:

**Upload via Supabase Storage:**
```
1. Go to Supabase → Storage
2. Create bucket if not exists
3. Upload image
4. Get public URL
5. Update database record with URL
```

**Or via Admin Panel (future):**
- Use admin CRUD pages
- Upload directly from browser
- Automatic storage handling

---

## 6️⃣ CORS Error

### Error:
```
Access to fetch at '...' from origin 'file://' has been blocked by CORS
```

### Cause:
Membuka file langsung (file:///) instead of using web server

### Fix:
```
❌ WRONG: file:///C:/path/to/index.html
✅ RIGHT:  http://localhost/company-profile/public/index.html

Use:
- Laragon (recommended)
- Live Server extension
- Python: python -m http.server
- Node: npx http-server
```

---

## 7️⃣ Mobile View Broken

### Check:
```
1. Press F12
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device (iPhone, iPad, etc)
4. Test pages
```

### Common Issues:

**A) Horizontal Scroll**
```
Fix: Usually images too wide
- Check image max-width: 100%
- Check container overflow
```

**B) Menu Tidak Muncul**
```
Fix: 
- Click hamburger icon (☰)
- Should show menu
- If not, check JS console errors
```

**C) Buttons Too Small**
```
This is by design for desktop
On mobile should be larger
Check: btn-block class for full width
```

---

## 🔍 Quick Diagnostics

### Run These Commands in Browser Console (F12):

```javascript
// 1. Check Supabase client
console.log(typeof supabaseClient);
// Should be: "object"

// 2. Check config
console.log(SUPABASE_URL);
console.log(SUPABASE_ANON_KEY);
// Should NOT be: "YOUR_..."

// 3. Test connection
supabaseClient.from('settings').select('*').then(console.log);
// Should return data or error

// 4. Check current page
console.log(window.location.href);
// Should be: http://localhost/...

// 5. Check loaded scripts
console.log('Config:', typeof SUPABASE_URL !== 'undefined');
console.log('Auth:', typeof login !== 'undefined');
console.log('Components:', typeof showToast !== 'undefined');
// All should be: true
```

---

## 📋 Diagnostic Checklist

Copy and run through:

```
ENVIRONMENT:
[ ] Laragon running (Apache green)?
[ ] Browser: Chrome/Firefox/Edge
[ ] URL starts with http://localhost
[ ] Console open (F12)

CONFIGURATION:
[ ] js/config.js exists
[ ] SUPABASE_URL tidak "YOUR_..."
[ ] SUPABASE_ANON_KEY tidak "YOUR_..."
[ ] Supabase CDN script loaded

DATABASE:
[ ] Supabase project created
[ ] schema.sql executed
[ ] rls.sql executed  
[ ] seed.sql executed (optional)

PAGES:
[ ] TEST.html accessible
[ ] index.html loads
[ ] services.html loads (not blank)
[ ] team.html loads (not blank)
[ ] contact.html loads (not blank)

CONSOLE:
[ ] No red errors
[ ] Scripts loaded
[ ] Data fetched (or appropriate message)
```

---

## 🚑 Emergency Fixes

### Nuclear Option 1: Hard Refresh
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)

Clears cache and reloads everything
```

### Nuclear Option 2: Clear Browser Data
```
Chrome: Ctrl + Shift + Delete
- Choose "Cached images and files"
- Choose "Last hour"
- Clear data
- Refresh page
```

### Nuclear Option 3: Different Browser
```
If Chrome not working → Try Firefox
If Firefox not working → Try Edge
Helps identify browser-specific issues
```

### Nuclear Option 4: Check Supabase Status
```
Go to: https://status.supabase.com
Check if Supabase is down (rare)
```

---

## 📞 Still Stuck?

### Information to Provide:

```
1. Error message (exact text or screenshot)
2. Browser console output (F12 → Console tab)
3. Which page has the issue
4. What you were trying to do
5. Supabase configured? (yes/no)

Example:
"Services page shows blank white screen.
Console says: supabaseClient is not defined
Browser: Chrome
Supabase: Not configured yet"
```

---

## ✅ Success Indicators

**Everything working if:**

```
✅ TEST.html shows status (any status is OK)
✅ Pages load (with or without data)
✅ No blank white pages
✅ Navigation works
✅ Console has no red errors
✅ Forms can be submitted
✅ Mobile responsive works
```

---

## 🎯 Most Common Issue: Supabase Not Configured

**90% of problems are this!**

**Quick check:**
```javascript
// Type in console:
console.log(SUPABASE_URL);

// If shows: "YOUR_SUPABASE_PROJECT_URL"
// → Need to configure!

// If shows: "https://xxx.supabase.co"
// → Already configured!
```

**Fix:**
1. Read: QUICK_SETUP.md
2. Takes 30 minutes
3. Solves most issues
4. Worth the time!

---

## 🎉 After Fixes

**Test again:**
```
1. Hard refresh: Ctrl + F5
2. Open TEST.html
3. Check status
4. Test all pages
5. Should work now!
```

---

**Keep This File Handy!** 🔧

**Quick access:** `DEBUG_HELPER.md`
