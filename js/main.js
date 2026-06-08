/**
 * PT TechNova Indonesia - Main JavaScript for Public Website
 * Using Supabase
 */

// ================================================
// AUTO-INITIALIZE on Home Page
// ================================================
document.addEventListener('DOMContentLoaded', async function() {
    // Only run full init on home page (has heroTitle element)
    await loadSettings();

    // Home page specific
    if (document.getElementById('heroTitle')) {
        await loadHomeContent();
        await loadServicesPreview();
        await loadTeamPreview();
        await loadContactInfo();
    }

    // About page
    if (document.getElementById('companyHistory')) {
        await loadAboutContent();
        await loadFooterContact();
    }

    // Services page
    if (document.getElementById('servicesContainer')) {
        await loadAllServices();
        await loadFooterContact();
    }

    // Team page
    if (document.getElementById('teamContainer')) {
        await loadAllTeam();
        await loadFooterContact();
    }

    // Contact page
    if (document.getElementById('contactAddress')) {
        await loadContactDetails();
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm && !contactForm._bound) {
        contactForm._bound = true;
        contactForm.addEventListener('submit', submitContactForm);
    }
});

// ================================================
// LOAD SETTINGS (all pages)
// ================================================
async function loadSettings() {
    try {
        const { data: settings, error } = await supabaseClient
            .from('settings')
            .select('*')
            .single();
        
        if (error) throw error;
        if (!settings || !Object.keys(settings).length) return;

        // Site name
        document.querySelectorAll('#siteName').forEach(el => {
            el.textContent = settings.site_name || 'TechNova';
        });

        // Logo
        if (settings.logo_url) {
            document.querySelectorAll('#siteLogo').forEach(el => {
                el.src = settings.logo_url;
                el.style.display = 'block';
            });
        }

        // Primary color CSS variable
        if (settings.primary_color) {
            document.documentElement.style.setProperty('--primary', settings.primary_color);
            document.documentElement.style.setProperty('--primary-dark',
                shadeColor(settings.primary_color, -20));
        }

        // Footer text
        const footerTextEl = document.getElementById('footerText');
        if (footerTextEl && settings.footer_text) {
            footerTextEl.textContent = settings.footer_text;
        }

        // Background images for each page hero
        const pageHero = document.querySelector('.page-hero');
        if (pageHero) {
            const page = location.pathname.split('/').pop();
            let bgUrl = null;
            if (page === 'about.html')    bgUrl = settings.about_bg_url;
            if (page === 'services.html') bgUrl = settings.services_bg_url;
            if (page === 'team.html')     bgUrl = settings.team_bg_url;
            if (page === 'contact.html')  bgUrl = settings.contact_bg_url;

            if (bgUrl) {
                pageHero.style.backgroundImage = `url("${bgUrl}")`;
                pageHero.style.backgroundSize = 'cover';
                pageHero.style.backgroundPosition = 'center center';
                pageHero.style.backgroundRepeat = 'no-repeat';
            }
        }

        // Home page hero image (right-side image, not full bg)
        // Full bg for home is handled separately via hero_image_url in loadHomeContent

    } catch (err) {
        console.warn('Settings:', err.message);
    }
}

// Helper: darken/lighten hex color
function shadeColor(color, percent) {
    try {
        const num = parseInt(color.replace('#',''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    } catch { return color; }
}

// ================================================
// LOAD HOME CONTENT
// ================================================
async function loadHomeContent() {
    try {
        const { data: content, error } = await supabaseClient
            .from('home_content')
            .select('*')
            .single();
        
        if (error) throw error;
        if (!content || !Object.keys(content).length) return;

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el && val) el.textContent = val;
        };

        set('heroTitle',       content.hero_title);
        set('heroSubtitle',    content.hero_subtitle);
        set('heroDescription', content.hero_description);
        set('heroCTA',         content.cta_text);

        // CTA selector also covers #ctaText variants
        document.querySelectorAll('#ctaText').forEach(el => {
            if (content.cta_text) el.textContent = content.cta_text;
        });
        document.querySelectorAll('#companyName').forEach(el => {
            if (content.company_name) el.textContent = content.company_name;
        });
        document.querySelectorAll('#tagline').forEach(el => {
            if (content.tagline) el.textContent = content.tagline;
        });

        // Hero image → apply as FULL BACKGROUND of hero section
        if (content.hero_image_url) {
            const heroSection = document.getElementById('heroSection');
            const img = document.getElementById('heroImage');
            if (heroSection) {
                const encodedUrl = content.hero_image_url.replace(/ /g, '%20');
                heroSection.style.backgroundImage = `url("${encodedUrl}")`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center center';
                heroSection.style.backgroundRepeat = 'no-repeat';
                heroSection.classList.add('has-hero-image');
            }
            // Keep img hidden — only used to store URL reference
            if (img) img.src = content.hero_image_url;
        }

        // Logo from home_content (fallback if settings not set)
        if (content.logo_url) {
            document.querySelectorAll('#siteLogo').forEach(el => {
                if (!el.src || el.src.includes('logo.svg')) {
                    el.src = content.logo_url;
                    el.style.display = 'block';
                }
            });
        }
    } catch (err) {
        console.warn('Home content:', err.message);
    }
}

// ================================================
// LOAD SERVICES PREVIEW (home page - first 3)
// ================================================
async function loadServicesPreview() {
    const container = document.getElementById('servicesPreview');
    if (!container) return;
    try {
        const { data: services, error } = await supabaseClient
            .from('services')
            .select('*');
        
        if (error) throw error;
        if (!services || !services.length) {
            container.innerHTML = '<p style="text-align:center;color:#94a3b8;">Belum ada services.</p>';
            return;
        }
        container.innerHTML = services.slice(0, 3).map(s => `
            <div class="service-card">
                <div class="service-icon" style="margin-bottom:1rem;">
                    ${s.image_url
                        ? `<img src="${s.image_url}" alt="${s.name}" style="width:60px;height:60px;object-fit:cover;border-radius:.5rem;">`
                        : `<i class="fas fa-cog" style="font-size:2rem;color:var(--primary);"></i>`}
                </div>
                <h3 style="margin-bottom:.5rem;">${s.name}</h3>
                <p style="font-size:.9rem;line-height:1.6;">${s.description.slice(0,120)}${s.description.length > 120 ? '...' : ''}</p>
            </div>`).join('');
    } catch (err) {
        container.innerHTML = '<p style="text-align:center;color:red;">Gagal memuat services.</p>';
        console.warn('Services preview:', err.message);
    }
}

// ================================================
// LOAD ALL SERVICES (services page)
// ================================================
async function loadAllServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;
    try {
        const { data: services, error } = await supabaseClient
            .from('services')
            .select('*');
        
        if (error) throw error;
        if (!services || !services.length) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <i class="fas fa-briefcase"></i>
                    <h3>Belum Ada Services</h3>
                    <p>Services akan muncul setelah admin menambahkannya.</p>
                </div>`;
            return;
        }
        container.innerHTML = services.map(s => `
            <div class="service-card">
                ${s.image_url ? `
                    <div class="service-card-image">
                        <img src="${s.image_url}" alt="${s.name}" onerror="this.parentElement.style.display='none'">
                    </div>` : ''}
                <div class="service-card-content">
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                </div>
            </div>`).join('');
    } catch (err) {
        container.innerHTML = `<p style="text-align:center;color:red;grid-column:1/-1;">Gagal memuat services: ${err.message}</p>`;
    }
}

// ================================================
// LOAD TEAM PREVIEW (home page - first 4)
// ================================================
async function loadTeamPreview() {
    const container = document.getElementById('teamPreview');
    if (!container) return;
    try {
        const { data: team, error } = await supabaseClient
            .from('team')
            .select('*');
        
        if (error) throw error;
        if (!team || !team.length) {
            container.innerHTML = '<p style="text-align:center;color:#94a3b8;">Belum ada team member.</p>';
            return;
        }
        container.innerHTML = team.slice(0, 4).map(m => {
            const initials = m.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
            return `
            <div class="team-card" style="text-align:center;">
                <div class="team-card-image" style="width:100px;height:100px;border-radius:50%;margin:0 auto 1rem;overflow:hidden;border:3px solid #e2e8f0;">
                    ${m.photo_url
                        ? `<img src="${m.photo_url}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='<div style=width:100%;height:100%;background:#3b82f6;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.25rem;>${initials}</div>'">`
                        : `<div style="width:100%;height:100%;background:#3b82f6;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.25rem;">${initials}</div>`}
                </div>
                <h3 style="font-size:1rem;margin-bottom:.25rem;">${m.name}</h3>
                <p style="color:var(--primary);font-size:.875rem;font-weight:600;margin-bottom:.5rem;">${m.position}</p>
                <p style="font-size:.8rem;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${m.description}</p>
            </div>`;
        }).join('');
    } catch (err) {
        console.warn('Team preview:', err.message);
    }
}

// ================================================
// LOAD ALL TEAM (team page)
// ================================================
async function loadAllTeam() {
    const container = document.getElementById('teamContainer');
    if (!container) return;
    try {
        const { data: team, error } = await supabaseClient
            .from('team')
            .select('*');
        
        if (error) throw error;
        if (!team || !team.length) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <i class="fas fa-users"></i>
                    <h3>Belum Ada Team Member</h3>
                    <p>Team members akan muncul setelah admin menambahkannya.</p>
                </div>`;
            return;
        }
        container.innerHTML = team.map(m => {
            const initials = m.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
            return `
            <div class="team-card">
                <div class="team-card-image">
                    ${m.photo_url
                        ? `<img src="${m.photo_url}" alt="${m.name}"
                                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&size=400&background=2563eb&color=fff'">`
                        : `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&size=400&background=2563eb&color=fff" alt="${m.name}">`}
                </div>
                <div class="team-card-content">
                    <h3>${m.name}</h3>
                    <p class="team-position">${m.position}</p>
                    <p>${m.description}</p>
                </div>
            </div>`;
        }).join('');
    } catch (err) {
        container.innerHTML = `<p style="text-align:center;color:red;grid-column:1/-1;">Gagal memuat data team.</p>`;
    }
}

// ================================================
// LOAD CONTACT INFO (footer - home, services, team)
// ================================================
async function loadContactInfo() {
    await loadFooterContact();
}

async function loadFooterContact() {
    try {
        const { data, error } = await supabaseClient
            .from('contact')
            .select('*')
            .single();
        
        if (error) throw error;
        if (!data || !Object.keys(data).length) return;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
        set('footerEmail',    data.email);
        set('footerPhone',    data.phone);
        set('footerWhatsapp', data.whatsapp);

        if (data.instagram) ['instagramLink','socialInstagram'].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.instagram; });
        if (data.facebook)  ['facebookLink', 'socialFacebook' ].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.facebook;  });
        if (data.linkedin)  ['linkedinLink', 'socialLinkedin' ].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.linkedin;  });
    } catch (err) {
        console.warn('Footer contact:', err.message);
    }
}

// ================================================
// LOAD CONTACT DETAILS (contact page)
// ================================================
async function loadContactDetails() {
    try {
        const { data, error } = await supabaseClient
            .from('contact')
            .select('*')
            .single();
        
        if (error) throw error;
        if (!data || !Object.keys(data).length) return;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
        set('contactAddress',  data.address);
        set('contactEmail',    data.email);
        set('contactPhone',    data.phone);
        set('contactWhatsapp', data.whatsapp);
        set('footerEmail',     data.email);
        set('footerPhone',     data.phone);
        set('footerWhatsapp',  data.whatsapp);

        if (data.maps_link) { const el = document.getElementById('googleMaps'); if (el) el.src = data.maps_link; }
        if (data.instagram) ['instagramLink','socialInstagram'].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.instagram; });
        if (data.facebook)  ['facebookLink', 'socialFacebook' ].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.facebook;  });
        if (data.linkedin)  ['linkedinLink', 'socialLinkedin' ].forEach(id => { const el = document.getElementById(id); if (el) el.href = data.linkedin;  });
    } catch (err) {
        console.warn('Contact details:', err.message);
    }
}

// ================================================
// LOAD ABOUT CONTENT (about page)
// ================================================
async function loadAboutContent() {
    try {
        const { data, error } = await supabaseClient
            .from('about_content')
            .select('*')
            .single();
        
        if (error) throw error;
        if (!data || !Object.keys(data).length) return;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
        set('companyHistory', data.company_history);
        set('vision',         data.vision);
        set('mission',        data.mission);

        if (data.company_image_url) {
            const img = document.getElementById('companyImage');
            if (img) img.src = data.company_image_url;
        }

        // Values
        if (data.company_values) {
            const container = document.getElementById('valuesContainer');
            if (container) {
                const values = data.company_values.split(/[\n.]/).filter(v => v.trim());
                container.innerHTML = values.map(v => {
                    const parts = v.trim().split(':');
                    const label = parts[0].trim();
                    const desc  = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
                    return `<div class="value-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <strong style="color:var(--dark);">${label}</strong>
                            ${desc ? `<span style="color:var(--gray);"> — ${desc}</span>` : ''}
                        </div>
                    </div>`;
                }).join('');
            }
        }
    } catch (err) {
        console.warn('About content:', err.message);
    }
}

// ================================================
// CONTACT FORM SUBMISSION
// ================================================
async function submitContactForm(e) {
    e.preventDefault();
    const data = {
        name:    document.getElementById('name')?.value || '',
        email:   document.getElementById('email')?.value || '',
        subject: document.getElementById('subject')?.value || '',
        message: document.getElementById('message')?.value || '',
        is_read: false
    };
    try {
        showLoading();
        const { error } = await supabaseClient
            .from('contact_messages')
            .insert(data);
        
        if (error) throw error;
        
        hideLoading();
        showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        e.target.reset();
    } catch (err) {
        hideLoading();
        showToast('Gagal mengirim: ' + err.message, 'error');
    }
}

// ================================================
// EXPORTS
// ================================================
window.loadSettings       = loadSettings;
window.loadHomeContent    = loadHomeContent;
window.loadServicesPreview = loadServicesPreview;
window.loadAllServices    = loadAllServices;
window.loadTeamPreview    = loadTeamPreview;
window.loadAllTeam        = loadAllTeam;
window.loadContactInfo    = loadContactInfo;
window.loadFooterContact  = loadFooterContact;
window.loadContactDetails = loadContactDetails;
window.loadAboutContent   = loadAboutContent;
window.submitContactForm  = submitContactForm;
