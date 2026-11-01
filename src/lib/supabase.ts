import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables or localStorage fallback
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nsuwerblfagvzgqqadjz.supabase.co';
const rawEnvKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const getActivePublishableKey = (): string => {
  const envKey = rawEnvKey.trim();
  if (
    envKey &&
    !envKey.includes('YOUR_CURRENT_PUBLISHABLE_KEY') &&
    !envKey.includes('your_key_here')
  ) {
    return envKey;
  }
  const stored = localStorage.getItem('fmw_supabase_publishable_key');
  return stored ? stored.trim() : '';
};

export const setSupabasePublishableKey = (key: string) => {
  localStorage.setItem('fmw_supabase_publishable_key', key.trim());
  window.location.reload();
};

export const SUPABASE_URL = rawSupabaseUrl.trim();
export const SUPABASE_PUBLISHABLE_KEY = getActivePublishableKey();

/**
 * Checks whether Supabase has been properly configured with a live publishable key.
 */
export const isSupabaseConfigured = (): boolean => {
  const key = getActivePublishableKey();
  return Boolean(key && SUPABASE_URL.startsWith('https://'));
};

const clientKey = isSupabaseConfigured()
  ? getActivePublishableKey()
  : 'placeholder-key-for-initialization';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, clientKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'fmw_supabase_auth_token'
  }
});

/**
 * Diagnostic function to test live Supabase connection status.
 */
export const testSupabaseConnection = async (): Promise<{
  connected: boolean;
  message: string;
  configured: boolean;
  projectUrl: string;
}> => {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      configured: false,
      projectUrl: SUPABASE_URL,
      message: 'Supabase publishable key is missing. Add it in .env.local or via Admin setup.'
    };
  }

  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          connected: true,
          configured: true,
          projectUrl: SUPABASE_URL,
          message: 'Connected to Supabase! Note: public.profiles table migration is still needed.'
        };
      }
      return {
        connected: false,
        configured: true,
        projectUrl: SUPABASE_URL,
        message: `Supabase error: ${error.message} (${error.code || 'unknown'})`
      };
    }

    return {
      connected: true,
      configured: true,
      projectUrl: SUPABASE_URL,
      message: 'Successfully connected to Supabase and verified public.profiles table.'
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      configured: true,
      projectUrl: SUPABASE_URL,
      message: `Network failure: ${errMsg}`
    };
  }
};

/**
 * Profiles database record interface matching public.profiles schema.
 */
export interface SupabaseProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  account_type: 'customer' | 'worker' | 'admin';
  city: string | null;
  phone: string | null;
  email: string | null;
  onboarding_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch profile by user ID from public.profiles
 */
export const fetchProfile = async (userId: string): Promise<SupabaseProfile | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }
    return data as SupabaseProfile;
  } catch (err) {
    console.warn('Failed to fetch profile:', err);
    return null;
  }
};

/**
 * Fetch all user profiles from public.profiles for Admin view
 */
export const fetchAllProfiles = async (): Promise<SupabaseProfile[]> => {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching all profiles:', error.message);
      return [];
    }
    return (data || []) as SupabaseProfile[];
  } catch (err) {
    console.warn('Failed to fetch all profiles:', err);
    return [];
  }
};

/**
 * Upsert profile in public.profiles
 */
export const upsertProfile = async (
  profile: Partial<SupabaseProfile> & { id: string }
): Promise<{ success: boolean; data?: SupabaseProfile; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase client is not configured.' };
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          ...profile,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: data as SupabaseProfile };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error during profile upsert'
    };
  }
};

/**
 * Change a user's role (e.g. promote to 'admin', 'worker', 'customer')
 */
export const updateUserRole = async (
  userId: string,
  newRole: 'customer' | 'worker' | 'admin'
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ account_type: newRole, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
};

/**
 * Delete a user profile from public.profiles
 */
export const deleteProfile = async (
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
};
