/**
 * Inject sidebar dynamically + show unread message count badge
 * Include this script in every admin page AFTER config.js
 */
(async function buildSidebar() {
    const page = location.pathname.split('/').pop();

    const links = [
        { href: 'dashboard.html', icon: 'fa-home',        label: 'Dashboard' },
        { href: 'home.html',      icon: 'fa-laptop',      label: 'Kelola Home' },
        { href: 'about.html',     icon: 'fa-info-circle', label: 'Kelola About' },
        { href: 'services.html',  icon: 'fa-briefcase',   label: 'Kelola Services' },
        { href: 'team.html',      icon: 'fa-users',       label: 'Kelola Team' },
        { href: 'contact.html',   icon: 'fa-envelope',    label: 'Kelola Contact' },
        { href: 'messages.html',  icon: 'fa-inbox',       label: 'Pesan Masuk', badge: true },
        { href: 'media.html',     icon: 'fa-images',      label: 'Media Manager' },
        { href: 'settings.html',  icon: 'fa-cog',         label: 'Settings' },
    ];

    const navItems = links.map(l => `
        <a href="${l.href}" ${l.href === page ? 'class="active"' : ''}>
            <i class="fas ${l.icon}"></i>
            ${l.label}
            ${l.badge ? '<span id="sidebarUnreadBadge" class="sidebar-badge" style="display:none"></span>' : ''}
        </a>`).join('');

    const sidebarHTML = `
        <div class="sidebar-header">
            <h2>PT TechNova</h2>
            <p>Admin Panel</p>
        </div>
        <nav class="sidebar-nav">
            ${navItems}
            <a href="#" onclick="logout(); return false;" style="margin-top:1rem; border-top:1px solid #334155; padding-top:1rem;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </nav>`;

    // Replace or create sidebar
    let sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
        sidebar.innerHTML = sidebarHTML;
    }

    // Add mobile toggle button
    if (!document.getElementById('adminMobileToggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'adminMobileToggle';
        toggleBtn.className = 'admin-mobile-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle menu');
        document.body.appendChild(toggleBtn);

        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            toggleBtn.innerHTML = sidebar.classList.contains('open')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    }

    // Fetch unread count and show badge
    try {
        const msgs = await apiCall(API.contactMessages, { method: 'GET' });
        const unread = msgs.filter(m => String(m.is_read) === '0').length;
        if (unread > 0) {
            const badge = document.getElementById('sidebarUnreadBadge');
            if (badge) {
                badge.textContent = unread;
                badge.style.display = 'inline-flex';
            }
        }
    } catch (_) { /* not logged in yet, ignore */ }
})();
