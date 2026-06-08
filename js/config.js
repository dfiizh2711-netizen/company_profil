/**
 * Configuration for Supabase Backend
 * 
 * Using Supabase for database, authentication, and storage
 */

// Legacy API object - kept for compatibility during migration
// Will be removed after all files are migrated to use Supabase directly
const API = {
    auth: null,
    home: null,
    about: null,
    services: null,
    team: null,
    contact: null,
    settings: null,
    contactMessages: null,
    upload: null
};

// Helper function for Supabase error handling
async function handleSupabaseError(error) {
    console.error('Supabase Error:', error);
    throw new Error(error.message || 'Operation failed');
}

// Export for use in other files
window.API = API;
window.handleSupabaseError = handleSupabaseError;
