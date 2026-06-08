/**
 * PT TechNova Indonesia - Admin Main Functions (Supabase)
 */

// ================================================
// SERVICES MANAGEMENT
// ================================================

// Load all services
async function loadServices() {
    try {
        showLoading();
        const { data: services, error } = await supabaseClient
            .from('services')
            .select('*');
        
        if (error) throw error;
        
        const container = document.getElementById('servicesList');
        if (!container) return;
        
        if (!services || services.length === 0) {
            container.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:3rem; color:#64748b;">
                    <i class="fas fa-briefcase" style="font-size:3rem; margin-bottom:1rem; display:block; color:#cbd5e1;"></i>
                    <p>Belum ada services. Klik "Tambah Service" untuk menambahkan.</p>
                </div>`;
            hideLoading();
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);
                        border:1px solid #e2e8f0; transition:transform .2s, box-shadow .2s;"
                 onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'"
                 onmouseout="this.style.transform='';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">

                <!-- Image -->
                <div style="height:180px; background:#f1f5f9; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                    ${service.image_url
                        ? `<img src="${service.image_url}" alt="${service.name}"
                                style="width:100%;height:100%;object-fit:cover;"
                                onerror="this.parentElement.innerHTML='<i class=\\'fas fa-cog\\' style=\\'font-size:3rem;color:#cbd5e1\\'></i>'">`
                        : `<i class="fas fa-cog" style="font-size:3rem; color:#cbd5e1;"></i>`
                    }
                </div>

                <!-- Content -->
                <div style="padding:1.25rem;">
                    <h3 style="margin:0 0 .5rem; color:#1e293b; font-size:1rem;">${service.name}</h3>
                    <p style="margin:0 0 1rem; color:#64748b; font-size:.8rem; line-height:1.5;
                               display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">
                        ${service.description}
                    </p>
                    <div style="display:flex; gap:.75rem;">
                        <button class="btn btn-sm btn-primary" onclick="editService('${service.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteService('${service.id}')">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>`).join('');
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Gagal memuat services: ' + error.message, 'error');
    }
}

// Create or update service
async function saveService(serviceData) {
    try {
        showLoading();
        
        if (serviceData.id) {
            // Update existing
            const { error } = await supabaseClient
                .from('services')
                .update(serviceData)
                .eq('id', serviceData.id);
            
            if (error) throw error;
            showToast('Service updated successfully!', 'success');
        } else {
            // Create new
            const { error } = await supabaseClient
                .from('services')
                .insert(serviceData);
            
            if (error) throw error;
            showToast('Service created successfully!', 'success');
        }
        
        hideLoading();
        await loadServices();
        closeServiceModal();
    } catch (error) {
        hideLoading();
        showToast('Failed to save service: ' + error.message, 'error');
    }
}

// Delete service
async function deleteService(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
        showLoading();
        const { error } = await supabaseClient
            .from('services')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        showToast('Service deleted successfully!', 'success');
        hideLoading();
        await loadServices();
    } catch (error) {
        hideLoading();
        showToast('Failed to delete service: ' + error.message, 'error');
    }
}

// ================================================
// TEAM MANAGEMENT
// ================================================

// Load all team members
async function loadTeam() {
    try {
        showLoading();
        const { data: team, error } = await supabaseClient
            .from('team')
            .select('*');
        
        if (error) throw error;
        
        const container = document.getElementById('teamList');
        if (!container) return;
        
        if (!team || team.length === 0) {
            container.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:3rem; color:#64748b;">
                    <i class="fas fa-users" style="font-size:3rem; margin-bottom:1rem; display:block; color:#cbd5e1;"></i>
                    <p>Belum ada team members. Klik "Tambah Team Member" untuk menambahkan.</p>
                </div>`;
            hideLoading();
            return;
        }
        
        container.innerHTML = team.map(member => {
            // Generate avatar fallback
            const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
            const photoHTML = member.photo_url
                ? `<img src="${member.photo_url}" alt="${member.name}"
                        style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid #e2e8f0;"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                   <div style="display:none;width:120px;height:120px;border-radius:50%;background:#3b82f6;
                               color:white;font-size:2rem;font-weight:700;align-items:center;
                               justify-content:center;border:3px solid #e2e8f0;">${initials}</div>`
                : `<div style="width:120px;height:120px;border-radius:50%;background:#e2e8f0;
                              color:#94a3b8;font-size:2rem;font-weight:700;display:flex;
                              align-items:center;justify-content:center;border:3px solid #e2e8f0;">
                       ${initials}
                   </div>`;
            
            return `
            <div style="background:white; border-radius:12px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.08);
                        border:1px solid #e2e8f0; text-align:center; transition:transform .2s, box-shadow .2s;"
                 onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'"
                 onmouseout="this.style.transform='';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">

                <!-- Photo -->
                <div style="display:flex; justify-content:center; margin-bottom:1rem;">
                    ${photoHTML}
                </div>

                <!-- Info -->
                <h3 style="margin:0 0 4px; color:#1e293b; font-size:1.1rem;">${member.name}</h3>
                <p style="margin:0 0 10px; color:#3b82f6; font-weight:600; font-size:.875rem;">${member.position}</p>
                <p style="margin:0 0 1.25rem; color:#64748b; font-size:.8rem; line-height:1.5;
                           display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">
                    ${member.description}
                </p>

                <!-- Actions -->
                <div style="display:flex; gap:.75rem; justify-content:center;">
                    <button class="btn btn-sm btn-primary" onclick="editTeamMember('${member.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTeamMember('${member.id}')">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>`;
        }).join('');
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Gagal memuat team: ' + error.message, 'error');
    }
}

// Save team member
async function saveTeamMember(memberData) {
    try {
        showLoading();
        
        if (memberData.id) {
            const { error } = await supabaseClient
                .from('team')
                .update(memberData)
                .eq('id', memberData.id);
            
            if (error) throw error;
            showToast('Team member updated successfully!', 'success');
        } else {
            const { error } = await supabaseClient
                .from('team')
                .insert(memberData);
            
            if (error) throw error;
            showToast('Team member created successfully!', 'success');
        }
        
        hideLoading();
        await loadTeam();
        closeTeamModal();
    } catch (error) {
        hideLoading();
        showToast('Failed to save team member: ' + error.message, 'error');
    }
}

// Delete team member
async function deleteTeamMember(id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
        showLoading();
        const { error } = await supabaseClient
            .from('team')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        showToast('Team member deleted successfully!', 'success');
        hideLoading();
        await loadTeam();
    } catch (error) {
        hideLoading();
        showToast('Failed to delete team member: ' + error.message, 'error');
    }
}

// ================================================
// HOME CONTENT MANAGEMENT
// ================================================
async function loadHomeContent() {
    try {
        showLoading();
        const { data: content, error } = await supabaseClient
            .from('home_content')
            .select('*')
            .single();
        
        if (error) throw error;
        
        if (content && Object.keys(content).length > 0) {
            // Fill form fields
            document.getElementById('companyName').value = content.company_name || '';
            document.getElementById('tagline').value = content.tagline || '';
            document.getElementById('heroTitle').value = content.hero_title || '';
            document.getElementById('heroSubtitle').value = content.hero_subtitle || '';
            document.getElementById('heroDescription').value = content.hero_description || '';
            document.getElementById('ctaText').value = content.cta_text || '';
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Failed to load home content: ' + error.message, 'error');
    }
}

async function saveHomeContent(formData) {
    try {
        showLoading();
        
        const { error } = await supabaseClient
            .from('home_content')
            .update(formData)
            .eq('id', 1); // Assuming single row with id=1
        
        if (error) throw error;
        
        showToast('Home content updated successfully!', 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Failed to save home content: ' + error.message, 'error');
    }
}

// ================================================
// CONTACT INFO MANAGEMENT
// ================================================
async function loadContactInfo() {
    try {
        showLoading();
        const { data: contact, error } = await supabaseClient
            .from('contact')
            .select('*')
            .single();
        
        if (error) throw error;
        
        if (contact && Object.keys(contact).length > 0) {
            const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
            set('address',   contact.address);
            set('email',     contact.email);
            set('phone',     contact.phone);
            set('whatsapp',  contact.whatsapp);
            set('mapsLink',  contact.maps_link);
            set('instagram', contact.instagram);
            set('facebook',  contact.facebook);
            set('linkedin',  contact.linkedin);
            // Update preview if function exists
            if (typeof updateContactPreview === 'function') updateContactPreview();
        }
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Gagal memuat contact info: ' + error.message, 'error');
    }
}

async function saveContactInfo(formData) {
    try {
        showLoading();
        
        const { error } = await supabaseClient
            .from('contact')
            .update(formData)
            .eq('id', 1); // Assuming single row with id=1
        
        if (error) throw error;
        
        showToast('Contact info updated successfully!', 'success');
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Failed to save contact info: ' + error.message, 'error');
    }
}

// Export functions
window.loadServices = loadServices;
window.saveService = saveService;
window.deleteService = deleteService;
window.loadTeam = loadTeam;
window.saveTeamMember = saveTeamMember;
window.deleteTeamMember = deleteTeamMember;
window.loadHomeContent = loadHomeContent;
window.saveHomeContent = saveHomeContent;
window.loadContactInfo = loadContactInfo;
window.saveContactInfo = saveContactInfo;
