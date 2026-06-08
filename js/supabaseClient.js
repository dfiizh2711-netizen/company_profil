/**
 * PT TechNova Indonesia - Supabase Client Configuration
 * 
 * This file initializes the Supabase client for database operations,
 * authentication, and storage.
 */

const SUPABASE_URL = 'https://izbhzlylmmmfqefnsvkx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Ymh6bHlsbW1tZnFlZm5zdmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzMzNTUsImV4cCI6MjA5NjEwOTM1NX0.xRNn7OP9Xd1RnUZd9CGcfN9z9h5jBolzej6673MWlF4';

// Initialize Supabase client
window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Export for use in other files

