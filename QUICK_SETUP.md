# ⚡ Quick Setup - PT TechNova Indonesia

## 🚀 Setup dalam 30 Menit!

### ✅ Checklist Cepat

#### 1️⃣ Setup Supabase (15 menit)

```
[ ] 1. Buka https://supabase.com
[ ] 2. Sign up / Login
[ ] 3. Create New Project
      - Name: technova (atau nama lain)
      - Password: [buat password kuat]
      - Region: Singapore
[ ] 4. Tunggu ~2 menit sampai project ready
```

#### 2️⃣ Run Database Scripts (5 menit)

```
[ ] 1. Klik "SQL Editor" di sidebar
[ ] 2. New query → Copy isi file supabase/schema.sql
      → Click "Run" (Ctrl+Enter)
      → Wait: "Success. No rows returned"
      
[ ] 3. New query → Copy isi file supabase/rls.sql
      → Click "Run"
      → Wait: Success
      
[ ] 4. New query → Copy isi file supabase/seed.sql
      → Click "Run"
      → Should see: 6 rows affected (services + team + settings)
```

#### 3️⃣ Create Storage Buckets (3 menit)

```
[ ] 1. Klik "Storage" di sidebar
[ ] 2. Click "New bucket"
[ ] 3. Create these buckets (one by one):

      Name: logos          ✅ Public bucket
      Name: hero-images    ✅ Public bucket
      Name: services       ✅ Public bucket
      Name: team           ✅ Public bucket
      Name: company-images ✅ Public bucket
      Name: media          ✅ Public bucket
```

#### 4️⃣ Create Admin User (3 menit)

```
[ ] 1. Klik "Authentication" di sidebar
[ ] 2. Klik "Users" tab
[ ] 3. Click "Add user" → "Create new user"
[ ] 4. Fill:
      Email: admin@technova.com
      Password: [your-secure-password] ⚠️ INGAT INI!
      ✅ Email Confirm
[ ] 5. Click "Create user"

[ ] 6. Back to SQL Editor → Run:
      UPDATE profiles 
      SET role = 'admin' 
      WHERE email = 'admin@technova.com';
      
      Should see: "Success. 1 row updated"
```

#### 5️⃣ Get API Keys (2 menit)

```
[ ] 1. Klik "Settings" (gear icon) di sidebar
[ ] 2. Klik "API"
[ ] 3. Copy:
      Project URL: https://xxxxx.supabase.co
      anon public: eyJhbGc...
```

#### 6️⃣ Configure Project (2 menit)

```
[ ] 1. Open: js/config.js
[ ] 2. Replace:
      const SUPABASE_URL = 'paste-your-url-here';
      const SUPABASE_ANON_KEY = 'paste-your-key-here';
[ ] 3. Save file
```

#### 7️⃣ Test! (5 menit)

```
[ ] 1. Start Laragon (atau web server lain)
[ ] 2. Open: http://localhost/company-profile/TEST.html
[ ] 3. Should see: ✅ Configuration OK
[ ] 4. Click "Test Connection" → Should succeed
[ ] 5. Click "Check Sample Data" → Should show 6 services, 4 team

[ ] 6. Test pages:
      http://localhost/company-profile/public/index.html
      ✅ Homepage loads dengan data
      
      http://localhost/company-profile/admin/login.html
      ✅ Login dengan admin@technova.com
```

---

## 🎯 Success!

**Jika semua ✅ maka:**
- ✅ Database ready
- ✅ Sample data loaded
- ✅ Admin user created
- ✅ Website connected to Supabase
- ✅ Ready to use!

---

## 🔥 Quick Commands

### Supabase SQL (run in SQL Editor):

```sql
-- Check tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check data
SELECT COUNT(*) FROM services;
SELECT COUNT(*) FROM team;
SELECT * FROM settings;

-- Check admin user
SELECT email, role FROM profiles;

-- Set admin role
UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';

-- View all services
SELECT id, name FROM services;

-- View all team
SELECT id, name, position FROM team;
```

---

## ⚠️ Common Quick Fixes

### Fix 1: "Failed to create resource"
```sql
-- Table sudah ada, safe to ignore
-- Atau drop dan re-run:
DROP TABLE IF EXISTS services CASCADE;
-- Then run schema.sql again
```

### Fix 2: "No data showing on website"
```sql
-- Insert sample data manually:
INSERT INTO services (name, description) VALUES
('Web Development', 'Professional web development services');
```

### Fix 3: "Login failed - Access denied"
```sql
-- Make sure user is admin:
UPDATE profiles SET role = 'admin' WHERE email = 'admin@technova.com';
```

### Fix 4: "Supabase is not configured"
```javascript
// Edit js/config.js - make sure it looks like:
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Real URL
const SUPABASE_ANON_KEY = 'eyJhbGciO...'; // Real key (long string)

// NOT like:
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // ❌ Wrong
```

---

## 📱 Test URLs

**Buka di browser:**

```
Test Page:
http://localhost/company-profile/TEST.html

Public:
http://localhost/company-profile/public/index.html
http://localhost/company-profile/public/services.html
http://localhost/company-profile/public/team.html
http://localhost/company-profile/public/contact.html

Admin:
http://localhost/company-profile/admin/login.html
```

---

## 🎉 Done!

**Sekarang Anda punya:**
- ✅ Working website dengan sample data
- ✅ Admin panel yang bisa login
- ✅ Database yang siap digunakan
- ✅ Semua fitur dasar working

**Next steps:**
- Customize content via Admin Panel
- Upload logo & images
- Update company information
- Add more services & team members

---

## 📚 More Help

- **Full guide:** INSTALLATION.md
- **Testing:** TESTING_GUIDE.md
- **Development:** TUTORIAL.md
- **Deploy:** DEPLOYMENT.md

---

**Total Time: ~30 minutes** ⏱️

**Ready to go! 🚀**
