# 🖼️ Assets Directory

## Image Files Needed

Folder ini berisi semua gambar yang digunakan dalam website.

### Required Images:

#### 1. **logo.svg** atau **logo.png**
- **Ukuran:** 200x200px (atau proporsi square)
- **Format:** SVG (preferred) atau PNG dengan background transparan
- **Deskripsi:** Logo PT TechNova Indonesia
- **Digunakan di:** Navbar, Footer, Admin Panel, Login Page

#### 2. **hero.svg** atau **hero.png**
- **Ukuran:** 800x600px atau lebih besar
- **Format:** SVG (preferred) atau PNG/JPG
- **Deskripsi:** Ilustrasi untuk hero section homepage
- **Digunakan di:** Homepage hero section
- **Alternatif:** Bisa gunakan ilustrasi dari:
  - https://undraw.co
  - https://storyset.com
  - https://www.drawkit.com

#### 3. **favicon.ico**
- **Ukuran:** 16x16px, 32x32px, 48x48px (multi-resolution)
- **Format:** ICO
- **Deskripsi:** Favicon untuk browser tab
- **Digunakan di:** Semua pages (dalam `<head>`)
- **Generate dari:** https://favicon.io

#### 4. **office.jpg**
- **Ukuran:** 1200x800px (landscape)
- **Format:** JPG
- **Deskripsi:** Foto kantor atau tim perusahaan
- **Digunakan di:** About page
- **Alternatif:** Gunakan stock photos dari:
  - https://unsplash.com
  - https://pexels.com

#### 5. **default-avatar.jpg**
- **Ukuran:** 400x400px (square)
- **Format:** JPG atau PNG
- **Deskripsi:** Avatar default untuk team members tanpa foto
- **Digunakan di:** Team page
- **Alternatif:** Gunakan placeholder dari:
  - https://ui-avatars.com/api/?name=User&size=400

---

## 📦 Sample/Placeholder Images

Jika Anda belum punya gambar, gunakan placeholder berikut:

### Logo Placeholder
```html
<!-- Temporary SVG logo -->
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#2563eb"/>
  <text x="50%" y="50%" font-size="60" fill="white" text-anchor="middle" dy=".3em">TN</text>
</svg>
```

### Hero Image Placeholder
- URL: https://via.placeholder.com/800x600/2563eb/ffffff?text=TechNova+Indonesia
- Atau unduh dari: https://undraw.co/illustrations (cari "technology" atau "coding")

### Office Image Placeholder
- URL: https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800
- Keywords: "modern office", "tech office", "startup office"

### Default Avatar Placeholder
- URL: https://ui-avatars.com/api/?name=Team+Member&size=400&background=2563eb&color=fff

---

## 🎨 Image Guidelines

### Format Recommendations:
- **Logos:** SVG (scalable, small file size)
- **Illustrations:** SVG or PNG with transparency
- **Photos:** JPG (with compression)
- **Icons:** SVG or icon fonts

### Optimization:
Before uploading to Supabase, compress images:
- **JPG:** Use https://tinyjpg.com (reduce to 80-90% quality)
- **PNG:** Use https://tinypng.com
- **SVG:** Use https://jakearchibald.github.io/svgomg/

### Naming Convention:
```
lowercase-with-dashes.ext
Example: company-logo.svg, hero-image.jpg
```

### File Size Limits:
- Logos: < 100KB
- Hero images: < 500KB
- Office photos: < 1MB
- Avatars: < 200KB

---

## 📂 Directory Structure

```
assets/
└── images/
    ├── logo.svg                # Company logo
    ├── logo@2x.png            # High-res logo (optional)
    ├── favicon.ico            # Browser favicon
    ├── hero.svg               # Hero section illustration
    ├── office.jpg             # Office photo
    ├── default-avatar.jpg     # Default team avatar
    └── README.md              # This file
```

---

## 🔄 Updating Images

### Via Admin Panel (Recommended):
1. Login ke admin panel
2. Pergi ke "Media Manager"
3. Upload image
4. Copy URL yang dihasilkan
5. Gunakan URL tersebut di settings/content

### Manual Upload:
1. Upload ke Supabase Storage bucket yang sesuai:
   - Logos → `logos` bucket
   - Hero images → `hero-images` bucket
   - Office photos → `company-images` bucket
   - Team photos → `team` bucket
2. Get public URL
3. Update di database atau settings

---

## 🎯 Quick Start

### Jika Anda Ingin Langsung Test:

1. **Download placeholder images:**
```bash
# Logo
curl -o logo.svg "https://via.placeholder.com/200x200/2563eb/ffffff.svg?text=TN"

# Hero
curl -o hero.svg "https://undraw.co/api/illustrations/programming.svg"

# Office
curl -o office.jpg "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"

# Avatar
curl -o default-avatar.jpg "https://ui-avatars.com/api/?name=User&size=400&background=2563eb&color=fff"
```

2. **Atau gunakan free resources:**
   - **Undraw:** https://undraw.co/illustrations
   - **Unsplash:** https://unsplash.com/s/photos/office
   - **UI Avatars:** https://ui-avatars.com
   - **Flaticon:** https://www.flaticon.com (for icons)

---

## 📞 Support

Jika ada pertanyaan tentang format atau ukuran gambar yang dibutuhkan, silakan check dokumentasi atau contact developer.

---

**Note:** Semua gambar dalam project ini adalah placeholder. Ganti dengan gambar asli perusahaan Anda sebelum production deployment.
