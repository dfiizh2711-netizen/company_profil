# 📚 Tutorial Melengkapi PT TechNova Indonesia Website

## 🎯 Panduan Lengkap untuk Developer

Tutorial ini akan membantu Anda melengkapi file-file yang masih perlu dibuat.

---

## 📑 Daftar Isi

1. [Public Website Pages](#1-public-website-pages)
2. [Admin Panel Pages](#2-admin-panel-pages)
3. [JavaScript Admin Logic](#3-javascript-admin-logic)
4. [Testing & Debugging](#4-testing--debugging)

---

## 1. Public Website Pages

### 1.1 Membuat `public/services.html`

**Copy dari** `public/about.html` lalu modifikasi:

```html
<!-- Ganti content section dengan: -->
<section class="section">
    <div class="container">
        <div class="section-header text-center">
            <h1>Our Services</h1>
            <p>Comprehensive digital solutions for your business</p>
        </div>
        
        <div class="grid grid-3" id="servicesContainer">
            <!-- Services will be loaded here -->
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        </div>
    </div>
</section>

<!-- Add JavaScript -->
<script>
    document.addEventListener('DOMContentLoaded', async function() {
        await loadSettings();
        await loadAllServices();
        await loadContactInfo();
    });

    async function loadAllServices() {
        try {
            const container = document.getElementById('servicesContainer');
            
            const { data: services, error } = await supabaseClient
                .from('services')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            if (services && services.length > 0) {
                container.innerHTML = services.map(service => `
                    <div class="service-card">
                        ${service.image_url ? `
                            <div class="service-card-image">
                                <img src="${service.image_url}" alt="${service.name}">
                            </div>
                        ` : ''}
                        <div class="service-card-content">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                        </div>
                    </div>
                `).join('');
            } else {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <h3>No Services Yet</h3>
                        <p>Services will appear here once added.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading services:', error);
            showToast('Failed to load services', 'error');
        }
    }

    // Copy loadSettings() dan loadContactInfo() dari about.html
</script>
```

---

### 1.2 Membuat `public/team.html`

**Template:**

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <!-- Copy head dari about.html -->
    <title>Our Team - PT TechNova Indonesia</title>
</head>
<body>
    <!-- Copy navbar dari about.html -->
    
    <!-- Page Header -->
    <section class="hero">
        <div class="container text-center">
            <h1>Meet Our Team</h1>
            <p class="hero-subtitle">Talented professionals dedicated to your success</p>
        </div>
    </section>

    <!-- Team Grid -->
    <section class="section">
        <div class="container">
            <div class="grid grid-4" id="teamContainer">
                <!-- Loading skeletons -->
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
            </div>
        </div>
    </section>

    <!-- Copy footer dari about.html -->

    <!-- Scripts -->
    <script src="../js/config.js"></script>
    <script src="../js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            await loadSettings();
            await loadAllTeam();
            await loadContactInfo();
        });

        async function loadAllTeam() {
            try {
                const container = document.getElementById('teamContainer');
                
                const { data: team, error } = await supabaseClient
                    .from('team')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                
                if (team && team.length > 0) {
                    container.innerHTML = team.map(member => `
                        <div class="team-card">
                            <div class="team-card-image">
                                <img src="${member.photo_url || '../assets/images/default-avatar.jpg'}" 
                                     alt="${member.name}">
                            </div>
                            <div class="team-card-content">
                                <h3>${member.name}</h3>
                                <p class="team-position">${member.position}</p>
                                <p>${member.description}</p>
                            </div>
                        </div>
                    `).join('');
                } else {
                    container.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>No Team Members Yet</h3>
                            <p>Team members will appear here once added.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error loading team:', error);
                showToast('Failed to load team members', 'error');
            }
        }

        // Copy loadSettings() dan loadContactInfo()
    </script>
</body>
</html>
```

---

### 1.3 Membuat `public/contact.html`

**Template:**

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <!-- Copy head -->
    <title>Contact Us - PT TechNova Indonesia</title>
</head>
<body>
    <!-- Copy navbar -->
    
    <section class="hero">
        <div class="container text-center">
            <h1>Contact Us</h1>
            <p class="hero-subtitle">Get in touch with our team</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="grid grid-2">
                <!-- Contact Info -->
                <div>
                    <h2>Get In Touch</h2>
                    <div style="margin: 2rem 0;">
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <i class="fas fa-map-marker-alt" style="color: var(--primary); font-size: 1.5rem;"></i>
                            <div>
                                <h4>Address</h4>
                                <p id="contactAddress">Loading...</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <i class="fas fa-envelope" style="color: var(--primary); font-size: 1.5rem;"></i>
                            <div>
                                <h4>Email</h4>
                                <p id="contactEmail">Loading...</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <i class="fas fa-phone" style="color: var(--primary); font-size: 1.5rem;"></i>
                            <div>
                                <h4>Phone</h4>
                                <p id="contactPhone">Loading...</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <i class="fab fa-whatsapp" style="color: var(--primary); font-size: 1.5rem;"></i>
                            <div>
                                <h4>WhatsApp</h4>
                                <p id="contactWhatsapp">Loading...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Media -->
                    <div class="social-links">
                        <a href="#" id="socialInstagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" id="socialFacebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" id="socialLinkedin"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>

                <!-- Contact Form -->
                <div>
                    <h2>Send Message</h2>
                    <form id="contactForm">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Subject</label>
                            <input type="text" class="form-control" id="subject" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Message</label>
                            <textarea class="form-control" id="message" rows="5" required></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                            <i class="fas fa-paper-plane"></i> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Google Maps -->
    <section class="section" style="padding: 0;">
        <iframe id="googleMaps" 
                style="width: 100%; height: 400px; border: 0;" 
                allowfullscreen="" 
                loading="lazy">
        </iframe>
    </section>

    <!-- Copy footer -->

    <script src="../js/config.js"></script>
    <script src="../js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            await loadSettings();
            await loadContactDetails();
        });

        async function loadContactDetails() {
            try {
                const { data, error } = await supabaseClient
                    .from('contact')
                    .select('*')
                    .single();
                
                if (error) throw error;
                
                if (data) {
                    document.getElementById('contactAddress').textContent = data.address;
                    document.getElementById('contactEmail').textContent = data.email;
                    document.getElementById('contactPhone').textContent = data.phone;
                    document.getElementById('contactWhatsapp').textContent = data.whatsapp;
                    
                    document.getElementById('socialInstagram').href = data.instagram;
                    document.getElementById('socialFacebook').href = data.facebook;
                    document.getElementById('socialLinkedin').href = data.linkedin;
                    
                    document.getElementById('googleMaps').src = data.maps_link;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Handle form submission
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                showLoading();
                
                const { error } = await supabaseClient
                    .from('contact_messages')
                    .insert([formData]);
                
                hideLoading();
                
                if (error) throw error;
                
                showToast('Message sent successfully!', 'success');
                document.getElementById('contactForm').reset();
            } catch (error) {
                hideLoading();
                showToast('Failed to send message', 'error');
                console.error('Error:', error);
            }
        });
    </script>
</body>
</html>
```

---

## 2. Admin Panel Pages

### 2.1 Template Umum Admin Page

Semua admin pages mengikuti struktur yang sama:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <!-- Standard head -->
    <title>Page Title - Admin</title>
    <!-- Copy all links dari dashboard.html -->
</head>
<body>
    <div class="admin-layout">
        <!-- Copy sidebar dari dashboard.html -->
        <aside class="admin-sidebar">
            <!-- Update active class pada menu yang sesuai -->
        </aside>

        <main class="admin-main">
            <!-- Copy header dari dashboard.html -->
            <header class="admin-header">
                <h1>Page Title</h1>
                <!-- Copy user info -->
            </header>

            <div class="admin-content">
                <!-- Your content here -->
            </div>
        </main>
    </div>

    <!-- Scripts -->
    <script src="../js/config.js"></script>
    <script src="../js/components.js"></script>
    <script src="../js/auth.js"></script>
    <script>
        window.addEventListener('DOMContentLoaded', async function() {
            await protectAdminPage();
            // Your init code
        });
    </script>
</body>
</html>
```

---

### 2.2 Membuat `admin/home.html`

**Content section:**

```html
<div class="admin-content">
    <div class="admin-card">
        <div class="admin-card-header">
            <h2>Manage Home Page Content</h2>
        </div>
        <form id="homeForm">
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" class="form-control" id="companyName" required>
            </div>
            
            <div class="form-group">
                <label>Tagline</label>
                <input type="text" class="form-control" id="tagline" required>
            </div>
            
            <div class="form-group">
                <label>Hero Title</label>
                <input type="text" class="form-control" id="heroTitle" required>
            </div>
            
            <div class="form-group">
                <label>Hero Subtitle</label>
                <input type="text" class="form-control" id="heroSubtitle" required>
            </div>
            
            <div class="form-group">
                <label>Hero Description</label>
                <textarea class="form-control" id="heroDescription" rows="4" required></textarea>
            </div>
            
            <div class="form-group">
                <label>CTA Button Text</label>
                <input type="text" class="form-control" id="ctaText" required>
            </div>
            
            <div class="form-group">
                <label>Hero Image</label>
                <input type="file" class="form-control" id="heroImage" accept="image/*">
                <img id="heroImagePreview" class="image-upload-preview" style="display: none;">
            </div>
            
            <button type="submit" class="btn btn-primary btn-lg">
                <i class="fas fa-save"></i> Save Changes
            </button>
        </form>
    </div>
</div>

<script>
    window.addEventListener('DOMContentLoaded', async function() {
        await protectAdminPage();
        await loadHomeContent();
    });

    async function loadHomeContent() {
        try {
            showLoading();
            const { data, error } = await supabaseClient
                .from('home_content')
                .select('*')
                .single();
            
            hideLoading();
            
            if (error) throw error;
            
            if (data) {
                document.getElementById('companyName').value = data.company_name;
                document.getElementById('tagline').value = data.tagline;
                document.getElementById('heroTitle').value = data.hero_title;
                document.getElementById('heroSubtitle').value = data.hero_subtitle;
                document.getElementById('heroDescription').value = data.hero_description;
                document.getElementById('ctaText').value = data.cta_text;
                
                if (data.hero_image_url) {
                    document.getElementById('heroImagePreview').src = data.hero_image_url;
                    document.getElementById('heroImagePreview').style.display = 'block';
                }
            }
        } catch (error) {
            hideLoading();
            showToast('Failed to load content', 'error');
        }
    }

    document.getElementById('heroImage').addEventListener('change', function(e) {
        previewImage(e.target, 'heroImagePreview');
    });

    document.getElementById('homeForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            showLoading();
            
            let heroImageUrl = null;
            const fileInput = document.getElementById('heroImage');
            
            if (fileInput.files.length > 0) {
                const result = await uploadToSupabase(fileInput.files[0], 'hero-images');
                if (result.success) {
                    heroImageUrl = result.url;
                }
            }
            
            const updateData = {
                company_name: document.getElementById('companyName').value,
                tagline: document.getElementById('tagline').value,
                hero_title: document.getElementById('heroTitle').value,
                hero_subtitle: document.getElementById('heroSubtitle').value,
                hero_description: document.getElementById('heroDescription').value,
                cta_text: document.getElementById('ctaText').value
            };
            
            if (heroImageUrl) {
                updateData.hero_image_url = heroImageUrl;
            }
            
            const { error } = await supabaseClient
                .from('home_content')
                .update(updateData)
                .eq('id', (await supabaseClient.from('home_content').select('id').single()).data.id);
            
            hideLoading();
            
            if (error) throw error;
            
            showToast('Home content updated successfully!', 'success');
        } catch (error) {
            hideLoading();
            showToast('Failed to update content', 'error');
            console.error(error);
        }
    });
</script>
```

---

### 2.3 Membuat `admin/services.html` (CRUD)

Ini contoh lengkap CRUD:

```html
<div class="admin-content">
    <div class="admin-card">
        <div class="admin-card-header">
            <h2>Manage Services</h2>
            <button class="btn btn-primary" onclick="openAddModal()">
                <i class="fas fa-plus"></i> Add Service
            </button>
        </div>
        
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="servicesTableBody">
                    <tr>
                        <td colspan="4" class="text-center">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal -->
<div id="serviceModal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modalTitle">Add Service</h3>
        </div>
        <div class="modal-body">
            <form id="serviceForm">
                <input type="hidden" id="serviceId">
                <div class="form-group">
                    <label>Service Name</label>
                    <input type="text" class="form-control" id="serviceName" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="serviceDescription" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label>Image</label>
                    <input type="file" class="form-control" id="serviceImage" accept="image/*">
                    <img id="serviceImagePreview" class="image-upload-preview" style="display: none;">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="saveService()">Save</button>
        </div>
    </div>
</div>

<script>
    window.addEventListener('DOMContentLoaded', async function() {
        await protectAdminPage();
        await loadServices();
    });

    async function loadServices() {
        try {
            const { data: services, error } = await supabaseClient
                .from('services')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            const tbody = document.getElementById('servicesTableBody');
            
            if (services && services.length > 0) {
                tbody.innerHTML = services.map(service => `
                    <tr>
                        <td>
                            ${service.image_url ? 
                                `<img src="${service.image_url}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : 
                                '<span>No image</span>'}
                        </td>
                        <td>${service.name}</td>
                        <td>${truncateText(service.description, 100)}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick='editService(${JSON.stringify(service)})'>
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-error" onclick="deleteService('${service.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } else {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center">No services yet</td></tr>';
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to load services', 'error');
        }
    }

    function openAddModal() {
        document.getElementById('modalTitle').textContent = 'Add Service';
        document.getElementById('serviceForm').reset();
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceImagePreview').style.display = 'none';
        document.getElementById('serviceModal').style.display = 'flex';
    }

    function editService(service) {
        document.getElementById('modalTitle').textContent = 'Edit Service';
        document.getElementById('serviceId').value = service.id;
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description;
        
        if (service.image_url) {
            document.getElementById('serviceImagePreview').src = service.image_url;
            document.getElementById('serviceImagePreview').style.display = 'block';
        }
        
        document.getElementById('serviceModal').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('serviceModal').style.display = 'none';
    }

    async function saveService() {
        try {
            showLoading();
            
            const id = document.getElementById('serviceId').value;
            const name = document.getElementById('serviceName').value;
            const description = document.getElementById('serviceDescription').value;
            const fileInput = document.getElementById('serviceImage');
            
            let imageUrl = null;
            if (fileInput.files.length > 0) {
                const result = await uploadToSupabase(fileInput.files[0], 'services');
                if (result.success) {
                    imageUrl = result.url;
                }
            }
            
            const serviceData = {
                name,
                description
            };
            
            if (imageUrl) {
                serviceData.image_url = imageUrl;
            }
            
            let error;
            if (id) {
                // Update
                ({ error } = await supabaseClient
                    .from('services')
                    .update(serviceData)
                    .eq('id', id));
            } else {
                // Insert
                ({ error } = await supabaseClient
                    .from('services')
                    .insert([serviceData]));
            }
            
            hideLoading();
            
            if (error) throw error;
            
            showToast('Service saved successfully!', 'success');
            closeModal();
            await loadServices();
        } catch (error) {
            hideLoading();
            showToast('Failed to save service', 'error');
            console.error(error);
        }
    }

    async function deleteService(id) {
        if (!confirm('Are you sure you want to delete this service?')) return;
        
        try {
            showLoading();
            
            const { error } = await supabaseClient
                .from('services')
                .delete()
                .eq('id', id);
            
            hideLoading();
            
            if (error) throw error;
            
            showToast('Service deleted successfully!', 'success');
            await loadServices();
        } catch (error) {
            hideLoading();
            showToast('Failed to delete service', 'error');
            console.error(error);
        }
    }

    document.getElementById('serviceImage').addEventListener('change', function(e) {
        previewImage(e.target, 'serviceImagePreview');
    });
</script>
```

**NOTE:** `admin/team.html` mengikuti pola yang sama dengan `admin/services.html`, hanya ganti:
- "service" → "team"
- Field "description" → "bio/description"
- Field "image" → "photo"
- Table "services" → "team"

---

## 3. JavaScript Admin Logic

Buat file `js/admin.js` untuk fungsi-fungsi reusable:

```javascript
/**
 * PT TechNova Indonesia - Admin JavaScript
 */

// Generic CRUD Functions

async function createRecord(table, data) {
    try {
        showLoading();
        const { data: result, error } = await supabaseClient
            .from(table)
            .insert([data]);
        hideLoading();
        
        if (error) throw error;
        
        showToast('Record created successfully!', 'success');
        return { success: true, data: result };
    } catch (error) {
        hideLoading();
        showToast('Failed to create record', 'error');
        return { success: false, error };
    }
}

async function updateRecord(table, id, data) {
    try {
        showLoading();
        const { error } = await supabaseClient
            .from(table)
            .update(data)
            .eq('id', id);
        hideLoading();
        
        if (error) throw error;
        
        showToast('Record updated successfully!', 'success');
        return { success: true };
    } catch (error) {
        hideLoading();
        showToast('Failed to update record', 'error');
        return { success: false, error };
    }
}

async function deleteRecord(table, id) {
    try {
        showLoading();
        const { error } = await supabaseClient
            .from(table)
            .delete()
            .eq('id', id);
        hideLoading();
        
        if (error) throw error;
        
        showToast('Record deleted successfully!', 'success');
        return { success: true };
    } catch (error) {
        hideLoading();
        showToast('Failed to delete record', 'error');
        return { success: false, error };
    }
}

async function getAllRecords(table, orderBy = 'created_at', ascending = false) {
    try {
        const { data, error } = await supabaseClient
            .from(table)
            .select('*')
            .order(orderBy, { ascending });
        
        if (error) throw error;
        
        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
    }
}

// Export functions
window.createRecord = createRecord;
window.updateRecord = updateRecord;
window.deleteRecord = deleteRecord;
window.getAllRecords = getAllRecords;
```

---

## 4. Testing & Debugging

### 4.1 Checklist Testing

Setiap kali membuat halaman baru:

- [ ] Test load data dari Supabase
- [ ] Test form submission
- [ ] Test image upload
- [ ] Test error handling
- [ ] Test responsive design (mobile)
- [ ] Check browser console untuk errors
- [ ] Test di Chrome, Firefox, Safari

### 4.2 Common Issues & Solutions

**Problem: Data tidak muncul**
```javascript
// Add console.log untuk debugging
const { data, error } = await supabaseClient.from('table').select('*');
console.log('Data:', data);
console.log('Error:', error);
```

**Problem: Upload gagal**
```javascript
// Check bucket name dan file size
console.log('File size:', file.size, 'bytes');
console.log('Bucket:', bucket);
```

**Problem: Update tidak tersimpan**
```sql
-- Check RLS policies di Supabase
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

---

## 📞 Need Help?

1. Check browser console (F12) untuk error messages
2. Check Supabase logs di dashboard
3. Baca dokumentasi Supabase: https://supabase.com/docs
4. Check file PROJECT_STRUCTURE.md untuk referensi

---

**Selamat coding! Jangan lupa test setiap fitur sebelum melanjutkan ke yang berikutnya! 🚀**
