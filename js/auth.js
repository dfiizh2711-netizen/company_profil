/**
 * PT TechNova Indonesia - Authentication Module (Supabase)
 */

// ================================================
// CHECK AUTHENTICATION STATUS
// ================================================
async function checkAuth() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) throw error;
        
        if (!session) return null;
        
        // Get user profile with role
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
        
        if (profileError) {
            console.error('Profile fetch error:', profileError);
            return null;
        }
        
        return {
            id: session.user.id,
            email: session.user.email,
            role: profile?.role || 'user'
        };
    } catch (error) {
        console.error('Auth check error:', error);
        return null;
    }
}

// ================================================
// CHECK IF USER IS ADMIN
// ================================================
async function checkAdmin() {
    try {
        const user = await checkAuth();
        return user && user.role === 'admin';
    } catch (error) {
        console.error('Admin check error:', error);
        return false;
    }
}

// ================================================
// PROTECT ADMIN PAGES
// ================================================
async function protectAdminPage() {
    showLoading();
    
    const isAdmin = await checkAdmin();
    
    hideLoading();
    
    if (!isAdmin) {
        showToast('Access denied. Admin only.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    
    return true;
}

// ================================================
// LOGIN FUNCTION
// ================================================
async function login(email, password) {
    try {
        showLoading();

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });

        if (error) throw error;

        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (profileError || !profile || profile.role !== 'admin') {
            await supabaseClient.auth.signOut();
            throw new Error('Access denied. Admin only.');
        }

        hideLoading();
        showToast('Login successful!', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } catch (error) {
        console.error("FULL ERROR:", error);
        hideLoading();
        showToast(error.message, 'error');
    }
}

// ================================================
// GET CURRENT USER
// ================================================
async function getCurrentUser() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) throw error;
        
        if (!session) return null;
        
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
        
        if (profileError) {
            console.error('Profile fetch error:', profileError);
            return null;
        }
        
        return {
            id: session.user.id,
            email: session.user.email,
            role: profile?.role || 'user'
        };
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

// ================================================
// LOGOUT FUNCTION
// ================================================
async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

// ================================================
// EXPORT FUNCTIONS
// ================================================
window.checkAuth = checkAuth;
window.checkAdmin = checkAdmin;
window.protectAdminPage = protectAdminPage;
window.login = login;
window.logout = logout;
window.getCurrentUser = getCurrentUser;