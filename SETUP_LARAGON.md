# 🚀 Setup Database di Laragon (MySQL)

## Langkah-Langkah Installation

### 1. **Pastikan Laragon Running**
- Buka aplikasi Laragon
- Klik tombol **"Start All"**
- Pastikan Apache dan MySQL berwarna hijau (running)

### 2. **Install Database**

**Cara 1: Menggunakan Browser (Paling Mudah)**
1. Buka browser
2. Akses: `http://localhost/company%20profile/install.php`
3. Klik tombol **"Install Database"**
4. Tunggu sampai selesai
5. Setelah selesai, **hapus file install.php** untuk keamanan

**Cara 2: Menggunakan phpMyAdmin**
1. Buka `http://localhost/phpmyadmin`
2. Buat database baru dengan nama `company_profile`
3. Pilih database tersebut
4. Import file `database/mysql-schema.sql`
5. Import file `database/mysql-seed.sql`

**Cara 3: Menggunakan Laragon Terminal**
```bash
cd "c:\laragon\www\company profile"
mysql -u root < database/mysql-schema.sql
mysql -u root < database/mysql-seed.sql
```

### 3. **Akses Website**

**Public Website:**
```
http://localhost/company%20profile/public/index.html
```

**Admin Login:**
```
http://localhost/company%20profile/admin/login.html
```

**Default Admin:**
- Email: `admin@technova.com`
- Password: `admin123`

⚠️ **Penting:** Ganti password setelah login pertama!

## 📁 Struktur Project

```
company profile/
├── api/                    # PHP Backend API
│   ├── config.php         # Database config
│   ├── auth.php           # Authentication
│   ├── home.php           # Home content API
│   ├── services.php       # Services API
│   ├── team.php           # Team API
│   └── contact.php        # Contact API
├── database/              # Database files
│   ├── mysql-schema.sql   # Table structure
│   └── mysql-seed.sql     # Sample data
├── public/                # Public website
├── admin/                 # Admin dashboard
├── css/                   # Stylesheets
├── js/                    # JavaScript
└── install.php            # Database installer
```

## 🔧 API Endpoints

### Authentication
- `POST api/auth.php` - Login/Logout
  ```json
  {
    "action": "login",
    "email": "admin@technova.com",
    "password": "admin123"
  }
  ```

### Home Content
- `GET api/home.php` - Get home content
- `PUT api/home.php` - Update home content (admin only)

### Services
- `GET api/services.php` - Get all services
- `POST api/services.php` - Create service (admin only)
- `PUT api/services.php` - Update service (admin only)
- `DELETE api/services.php?id=xxx` - Delete service (admin only)

### Team
- `GET api/team.php` - Get all team members
- `POST api/team.php` - Create team member (admin only)
- `PUT api/team.php` - Update team member (admin only)
- `DELETE api/team.php?id=xxx` - Delete team member (admin only)

### Contact
- `GET api/contact.php` - Get contact info
- `PUT api/contact.php` - Update contact info (admin only)

## 🔒 Security Features

- ✅ Password hashing dengan `password_hash()`
- ✅ Prepared statements (SQL injection protection)
- ✅ Session-based authentication
- ✅ Role-based access control (admin/user)
- ✅ CORS headers configured
- ✅ Input validation

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan MySQL di Laragon running
- Cek kredensial di `api/config.php`:
  ```php
  define('DB_HOST', 'localhost');
  define('DB_USER', 'root');
  define('DB_PASS', '');
  define('DB_NAME', 'company_profile');
  ```

### 404 Not Found
- Pastikan mengakses dari folder yang benar
- URL: `http://localhost/company profile/...`

### Login Tidak Berhasil
- Pastikan database sudah terinstall
- Cek tabel `users` di phpMyAdmin
- Default password: `admin123`

### API Error
- Buka browser console (F12)
- Cek Network tab untuk error details
- Lihat response dari API

## 📝 Testing API

Gunakan tools seperti:
- **Browser Console** (F12 → Console)
- **Postman** atau **Insomnia**
- **cURL** command line

Example testing dengan JavaScript Console:
```javascript
// Test Login
fetch('http://localhost/company profile/api/auth.php', {
  method: 'POST',
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

## 🎯 Next Steps

1. ✅ Install database
2. ✅ Login sebagai admin
3. ✅ Test CRUD operations
4. ⬜ Upload images (setup upload folder)
5. ⬜ Customize content
6. ⬜ Deploy to production (optional: migrate to Supabase)

## 💡 Tips

- Gunakan phpMyAdmin untuk manage database: `http://localhost/phpmyadmin`
- Laragon Terminal: Klik kanan Laragon → Terminal
- Log errors: Cek `C:\laragon\www\company profile\error_log`
- Restart Apache jika ada perubahan config

---

**Happy Coding! 🚀**
