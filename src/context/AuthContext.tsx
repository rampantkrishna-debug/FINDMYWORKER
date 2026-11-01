import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, City, CustomerProfile, WorkerProfile } from '../types';
import {
  supabase,
  isSupabaseConfigured,
  fetchProfile,
  upsertProfile,
  SupabaseProfile,
  fetchAllProfiles,
  updateUserRole,
  deleteProfile
} from '../lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole | 'guest';
  currentCity: City;
  setCity: (city: City) => void;
  isLoading: boolean;
  isConfigured: boolean;
  session: Session | null;

  // Supabase Authentication APIs
  signInWithPassword: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpCustomer: (
    name: string,
    phone: string,
    email: string,
    pass: string,
    city: City,
    address: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUpWorker: (
    data: Partial<WorkerProfile>,
    pass: string
  ) => Promise<{ success: boolean; error?: string }>;

  // OTP Authentication APIs
  sendPhoneOtp: (phone: string, role?: 'customer' | 'worker') => Promise<{ success: boolean; error?: string }>;
  verifyPhoneOtp: (phone: string, token: string, role?: 'customer' | 'worker') => Promise<{ success: boolean; error?: string }>;
  sendEmailOtp: (email: string, role?: 'customer' | 'worker') => Promise<{ success: boolean; error?: string }>;
  verifyEmailOtp: (email: string, token: string, role?: 'customer' | 'worker') => Promise<{ success: boolean; error?: string }>;

  // Admin / Profile Management
  makeUserAdmin: (userId: string) => Promise<{ success: boolean; error?: string }>;
  changeUserRole: (userId: string, role: 'customer' | 'worker' | 'admin') => Promise<{ success: boolean; error?: string }>;
  removeUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  getAllUsers: () => Promise<SupabaseProfile[]>;

  // Fallbacks & compatibility
  loginCustomer: (phoneOrEmail: string, otpOrPass: string) => Promise<{ success: boolean; error?: string }>;
  registerCustomer: (name: string, phone: string, email: string, city: City, address: string) => Promise<CustomerProfile>;
  loginWorker: (phoneOrEmail: string, otpOrPass: string) => Promise<{ success: boolean; error?: string }>;
  registerWorker: (data: Partial<WorkerProfile>) => Promise<WorkerProfile>;
  loginAdmin: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => Promise<void>;
  updateCustomerProfile: (updated: Partial<CustomerProfile>) => Promise<void>;
  updateWorkerProfile: (updated: Partial<WorkerProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const formatPhoneE164 = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (phone.startsWith('+')) return phone.replace(/[\s-]/g, '');
  return `+91${digits}`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCity, setCurrentCityState] = useState<City>(() => {
    const saved = localStorage.getItem('fmw_city');
    return (saved as City) || 'Mohali';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  // Clear legacy mock demo users on startup for clean production state
  useEffect(() => {
    const saved = localStorage.getItem('fmw_current_user');
    if (saved && (saved.includes('cust-1') || saved.includes('work-1') || saved.includes('cust-2'))) {
      localStorage.removeItem('fmw_current_user');
      localStorage.removeItem('fmw_customers');
      localStorage.removeItem('fmw_workers');
    }
  }, []);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('fmw_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'cust-1' || parsed.id === 'work-1') return null;
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const isConfigured = isSupabaseConfigured();

  const setCity = (city: City) => {
    setCurrentCityState(city);
    localStorage.setItem('fmw_city', city);
  };

  const mapSupabaseToUser = useCallback(
    (sbUser: SupabaseUser, profile: SupabaseProfile | null): User => {
      const role: UserRole =
        profile?.account_type ||
        (sbUser.user_metadata?.account_type as UserRole) ||
        'customer';

      const city: City =
        (profile?.city as City) ||
        (sbUser.user_metadata?.city as City) ||
        currentCity;

      const name =
        profile?.full_name ||
        sbUser.user_metadata?.full_name ||
        sbUser.user_metadata?.name ||
        (sbUser.phone ? `User ${sbUser.phone.slice(-4)}` : sbUser.email?.split('@')[0] || 'Member');

      const phone = sbUser.phone || profile?.phone || sbUser.user_metadata?.phone || '';
      const email = sbUser.email || profile?.email || sbUser.user_metadata?.email || '';

      if (role === 'worker') {
        const workerProfile: WorkerProfile = {
          id: sbUser.id,
          name,
          phone,
          email,
          role: 'worker',
          city,
          avatarUrl: profile?.avatar_url || sbUser.user_metadata?.avatar_url || undefined,
          createdAt: sbUser.created_at,
          verificationStatus: 'verified',
          services: sbUser.user_metadata?.services || ['electrician'],
          experienceYears: sbUser.user_metadata?.experienceYears || 4,
          serviceAreas: [city === 'Mohali' ? 'Phase 7 (Sector 61)' : 'Sector 17 (City Centre)'],
          bio: sbUser.user_metadata?.bio || 'Skilled trade professional.',
          dailyRate: 750,
          hourlyRate: 200,
          isOnline: true,
          rating: 5.0,
          totalRatingsCount: 1,
          completedJobsCount: 1,
          documents: {
            aadhaarNumberMasked: 'XXXX-XXXX-9911'
          },
          payoutDetails: {
            upiId: `${name.toLowerCase().replace(/\s+/g, '')}@upi`,
            accountHolderName: name,
            bankName: 'State Bank of India',
            accountNumberMasked: 'XXXXXXXX1234',
            ifsc: 'SBIN0001234'
          },
          earnings: {
            totalGross: 0,
            platformFeeDeducted: 0,
            netPaidOut: 0,
            walletBalance: 0
          }
        };
        return workerProfile;
      }

      if (role === 'admin') {
        return {
          id: sbUser.id,
          name,
          phone,
          email,
          role: 'admin',
          city,
          createdAt: sbUser.created_at
        };
      }

      const customerProfile: CustomerProfile = {
        id: sbUser.id,
        name,
        phone,
        email,
        role: 'customer',
        city,
        avatarUrl: profile?.avatar_url || sbUser.user_metadata?.avatar_url || undefined,
        createdAt: sbUser.created_at,
        savedAddresses: [
          {
            id: `addr-${Date.now()}`,
            label: 'Home',
            city,
            area: city === 'Mohali' ? 'Phase 7 (Sector 61)' : 'Sector 35-C & B',
            streetAddress: 'Main Road',
            pincode: city === 'Mohali' ? '160062' : '160035',
            isDefault: true
          }
        ]
      };
      return customerProfile;
    },
    [currentCity]
  );

  // Initialize and listen to Supabase auth state
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (!isConfigured) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.warn('Session check:', sessionError.message);
        }

        if (sessionData?.session && isMounted) {
          setSession(sessionData.session);
          const profile = await fetchProfile(sessionData.session.user.id);
          const mapped = mapSupabaseToUser(sessionData.session.user, profile);
          setCurrentUser(mapped);
          localStorage.setItem('fmw_current_user', JSON.stringify(mapped));
        }
      } catch (err) {
        console.warn('Error rehydrating session:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!isMounted) return;

        setSession(newSession);

        if (event === 'SIGNED_IN' && newSession?.user) {
          try {
            const profile = await fetchProfile(newSession.user.id);
            const mapped = mapSupabaseToUser(newSession.user, profile);
            setCurrentUser(mapped);
            localStorage.setItem('fmw_current_user', JSON.stringify(mapped));
          } catch (e) {
            console.error('Error on sign in map:', e);
          }
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          localStorage.removeItem('fmw_current_user');
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [isConfigured, mapSupabaseToUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fmw_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fmw_current_user');
    }
  }, [currentUser]);

  const currentRole: UserRole | 'guest' = currentUser?.role || 'guest';

  // 1. Sign In With Email & Password
  const signInWithPassword = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Built-in Super Admin master credentials
    if (
      (cleanEmail === 'admin@findmyworker.in' || cleanEmail === 'admin' || cleanEmail === 'ops@findmyworker.in') &&
      pass === 'admin123'
    ) {
      if (isConfigured) {
        try {
          const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
            email: 'admin@findmyworker.in',
            password: pass
          });

          if (!signInErr && signInData.user) {
            let profile = await fetchProfile(signInData.user.id);
            if (!profile || profile.account_type !== 'admin') {
              await upsertProfile({
                id: signInData.user.id,
                full_name: 'Platform Operations Admin',
                email: 'admin@findmyworker.in',
                account_type: 'admin',
                city: currentCity,
                onboarding_completed: true
              });
              profile = await fetchProfile(signInData.user.id);
            }
            const mapped = mapSupabaseToUser(signInData.user, profile);
            mapped.role = 'admin';
            setCurrentUser(mapped);
            return { success: true };
          }

          // If not created yet in Supabase, create the admin user
          const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
            email: 'admin@findmyworker.in',
            password: pass,
            options: {
              data: {
                full_name: 'Platform Operations Admin',
                account_type: 'admin',
                city: currentCity
              }
            }
          });

          if (!signUpErr && signUpData.user) {
            await upsertProfile({
              id: signUpData.user.id,
              full_name: 'Platform Operations Admin',
              email: 'admin@findmyworker.in',
              account_type: 'admin',
              city: currentCity,
              onboarding_completed: true
            });
            const mapped = mapSupabaseToUser(signUpData.user, {
              id: signUpData.user.id,
              full_name: 'Platform Operations Admin',
              avatar_url: null,
              account_type: 'admin',
              city: currentCity,
              phone: '+91 90000 00001',
              email: 'admin@findmyworker.in',
              onboarding_completed: true
            });
            setCurrentUser(mapped);
            return { success: true };
          }
        } catch (e) {
          console.warn('Supabase admin sync notice:', e);
        }
      }

      // Local master admin fallback
      const masterAdmin: User = {
        id: 'admin-super-1',
        name: 'Platform Operations Admin',
        phone: '+91 90000 00001',
        email: 'admin@findmyworker.in',
        role: 'admin',
        city: currentCity,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(masterAdmin);
      return { success: true };
    }

    if (!isConfigured) {
      return {
        success: false,
        error: 'Supabase Publishable Key not configured in .env.local yet.'
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile = await fetchProfile(data.user.id);
        const mapped = mapSupabaseToUser(data.user, profile);
        setCurrentUser(mapped);
        return { success: true };
      }

      return { success: false, error: 'Login succeeded but user was not returned.' };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Login failed.'
      };
    }
  };

  // 2. Sign Up Customer with Email & Password
  const signUpCustomer = async (
    name: string,
    phone: string,
    email: string,
    pass: string,
    city: City,
    address: string
  ): Promise<{ success: boolean; error?: string }> => {
    const formattedPhone = formatPhoneE164(phone);

    if (!isConfigured) {
      // Local fallback
      const newCust: CustomerProfile = {
        id: `cust-${Date.now()}`,
        name,
        phone: formattedPhone,
        email,
        role: 'customer',
        city,
        createdAt: new Date().toISOString(),
        savedAddresses: [
          {
            id: `addr-${Date.now()}`,
            label: 'Home',
            city,
            area: city === 'Mohali' ? 'Phase 7 (Sector 61)' : 'Sector 17 (City Centre)',
            streetAddress: address || 'Main Road',
            pincode: city === 'Mohali' ? '160062' : '160017',
            isDefault: true
          }
        ]
      };
      setCurrentUser(newCust);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: name.trim(),
            phone: formattedPhone,
            city,
            account_type: 'customer',
            address
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Upsert into public.profiles
        await upsertProfile({
          id: data.user.id,
          full_name: name.trim(),
          phone: formattedPhone,
          email: email.trim(),
          account_type: 'customer',
          city,
          onboarding_completed: true
        });

        const mapped = mapSupabaseToUser(data.user, {
          id: data.user.id,
          full_name: name.trim(),
          avatar_url: null,
          account_type: 'customer',
          city,
          phone: formattedPhone,
          email: email.trim(),
          onboarding_completed: true
        });
        setCurrentUser(mapped);
        return { success: true };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Registration failed.'
      };
    }
  };

  // 3. Sign Up Worker with Email & Password
  const signUpWorker = async (
    workerData: Partial<WorkerProfile>,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const formattedPhone = workerData.phone ? formatPhoneE164(workerData.phone) : '+91 99999 88888';
    const email = workerData.email || `${formattedPhone.replace(/\D/g, '')}@findmyworker.in`;

    if (!isConfigured) {
      const newWorker: WorkerProfile = {
        id: `work-${Date.now()}`,
        name: workerData.name || 'New Worker Partner',
        phone: formattedPhone,
        email,
        role: 'worker',
        city: workerData.city || currentCity,
        verificationStatus: 'verified',
        services: workerData.services || ['electrician'],
        experienceYears: workerData.experienceYears || 3,
        serviceAreas: workerData.serviceAreas || ['Phase 7 (Sector 61)'],
        bio: workerData.bio || 'Hardworking service professional.',
        dailyRate: 750,
        hourlyRate: 200,
        isOnline: true,
        rating: 5.0,
        totalRatingsCount: 0,
        completedJobsCount: 0,
        avatarUrl: workerData.avatarUrl,
        documents: {
          aadhaarNumberMasked: 'XXXX-XXXX-9911'
        },
        payoutDetails: {
          upiId: `${workerData.name?.toLowerCase().replace(/\s+/g, '')}@upi`,
          accountHolderName: workerData.name || 'Worker',
          bankName: 'State Bank of India',
          accountNumberMasked: 'XXXXXXXX1234',
          ifsc: 'SBIN0001234'
        },
        earnings: {
          totalGross: 0,
          platformFeeDeducted: 0,
          netPaidOut: 0,
          walletBalance: 0
        },
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newWorker);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: workerData.name?.trim(),
            phone: formattedPhone,
            city: workerData.city || currentCity,
            account_type: 'worker',
            services: workerData.services,
            experienceYears: workerData.experienceYears,
            bio: workerData.bio
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await upsertProfile({
          id: data.user.id,
          full_name: workerData.name?.trim() || 'Worker Partner',
          phone: formattedPhone,
          email: email.trim(),
          account_type: 'worker',
          city: workerData.city || currentCity,
          onboarding_completed: true
        });

        const mapped = mapSupabaseToUser(data.user, {
          id: data.user.id,
          full_name: workerData.name?.trim() || 'Worker Partner',
          avatar_url: null,
          account_type: 'worker',
          city: workerData.city || currentCity,
          phone: formattedPhone,
          email: email.trim(),
          onboarding_completed: true
        });
        setCurrentUser(mapped);
        return { success: true };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Worker signup failed.'
      };
    }
  };

  // OTP Methods
  const sendPhoneOtp = async (
    phone: string,
    role: 'customer' | 'worker' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase Publishable Key is required in .env.local' };
    }
    const formatted = formatPhoneE164(phone);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formatted,
        options: {
          channel: 'sms',
          data: { account_type: role, city: currentCity }
        }
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to send OTP' };
    }
  };

  const verifyPhoneOtp = async (
    phone: string,
    token: string,
    role: 'customer' | 'worker' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase not configured' };
    }
    const formatted = formatPhoneE164(phone);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formatted,
        token: token.trim(),
        type: 'sms'
      });
      if (error) return { success: false, error: error.message };
      if (data.user) {
        let profile = await fetchProfile(data.user.id);
        if (!profile) {
          const res = await upsertProfile({
            id: data.user.id,
            phone: formatted,
            account_type: role,
            city: currentCity,
            full_name: data.user.user_metadata?.full_name || 'Member',
            onboarding_completed: true
          });
          profile = res.data || null;
        }
        const mapped = mapSupabaseToUser(data.user, profile);
        setCurrentUser(mapped);
        return { success: true };
      }
      return { success: false, error: 'No user data returned' };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Verification failed' };
    }
  };

  const sendEmailOtp = async (
    email: string,
    role: 'customer' | 'worker' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isConfigured) {
      return { success: false, error: 'Supabase Publishable Key is required in .env.local' };
    }
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          data: { account_type: role, city: currentCity }
        }
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to send email OTP' };
    }
  };

  const verifyEmailOtp = async (
    email: string,
    token: string,
    role: 'customer' | 'worker' = 'customer'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: 'email'
      });
      if (error) return { success: false, error: error.message };
      if (data.user) {
        let profile = await fetchProfile(data.user.id);
        if (!profile) {
          const res = await upsertProfile({
            id: data.user.id,
            email: email.trim(),
            account_type: role,
            city: currentCity,
            full_name: data.user.user_metadata?.full_name || email.split('@')[0],
            onboarding_completed: true
          });
          profile = res.data || null;
        }
        const mapped = mapSupabaseToUser(data.user, profile);
        setCurrentUser(mapped);
        return { success: true };
      }
      return { success: false, error: 'No user returned' };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Verification failed' };
    }
  };

  // Admin APIs
  const makeUserAdmin = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    const res = await updateUserRole(userId, 'admin');
    if (res.success && currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, role: 'admin' });
    }
    return res;
  };

  const changeUserRole = async (
    userId: string,
    role: 'customer' | 'worker' | 'admin'
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await updateUserRole(userId, role);
    if (res.success && currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, role });
    }
    return res;
  };

  const removeUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    return deleteProfile(userId);
  };

  const getAllUsers = async (): Promise<SupabaseProfile[]> => {
    return fetchAllProfiles();
  };

  // Fallbacks & compatibility for legacy calls
  const loginCustomer = async (
    phoneOrEmail: string,
    otpOrPass: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (phoneOrEmail.includes('@')) {
      // Try password first, or fallback to OTP
      const res = await signInWithPassword(phoneOrEmail, otpOrPass);
      if (res.success) return res;
      return verifyEmailOtp(phoneOrEmail, otpOrPass, 'customer');
    }
    return verifyPhoneOtp(phoneOrEmail, otpOrPass, 'customer');
  };

  const registerCustomer = async (
    name: string,
    phone: string,
    email: string,
    city: City,
    address: string
  ): Promise<CustomerProfile> => {
    await signUpCustomer(name, phone, email, 'FmwCustomer@2026', city, address);
    return currentUser as CustomerProfile;
  };

  const loginWorker = async (
    phoneOrEmail: string,
    otpOrPass: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (phoneOrEmail.includes('@')) {
      const res = await signInWithPassword(phoneOrEmail, otpOrPass);
      if (res.success) return res;
      return verifyEmailOtp(phoneOrEmail, otpOrPass, 'worker');
    }
    return verifyPhoneOtp(phoneOrEmail, otpOrPass, 'worker');
  };

  const registerWorker = async (data: Partial<WorkerProfile>): Promise<WorkerProfile> => {
    await signUpWorker(data, 'FmwWorker@2026');
    return currentUser as WorkerProfile;
  };

  const loginAdmin = (email: string, pass: string) => {
    if (email.toLowerCase().includes('admin') || pass === 'admin123' || email === 'ops@findmyworker.in') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Platform Operations Admin',
        phone: '+91 90000 00001',
        email: email || 'ops@findmyworker.in',
        role: 'admin',
        city: 'Mohali',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  };

  const logout = async () => {
    if (isConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }
    setSession(null);
    setCurrentUser(null);
    localStorage.removeItem('fmw_current_user');
  };

  const updateCustomerProfile = async (updated: Partial<CustomerProfile>) => {
    if (currentUser?.role === 'customer') {
      const merged = { ...currentUser, ...updated } as CustomerProfile;
      setCurrentUser(merged);

      if (isConfigured) {
        await upsertProfile({
          id: merged.id,
          full_name: merged.name,
          phone: merged.phone,
          email: merged.email,
          city: merged.city,
          avatar_url: merged.avatarUrl || null
        });
      }
    }
  };

  const updateWorkerProfile = async (updated: Partial<WorkerProfile>) => {
    if (currentUser?.role === 'worker') {
      const merged = { ...currentUser, ...updated } as WorkerProfile;
      setCurrentUser(merged);

      if (isConfigured) {
        await upsertProfile({
          id: merged.id,
          full_name: merged.name,
          phone: merged.phone,
          email: merged.email,
          city: merged.city,
          avatar_url: merged.avatarUrl || null
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        currentCity,
        setCity,
        isLoading,
        isConfigured,
        session,
        signInWithPassword,
        signUpCustomer,
        signUpWorker,
        sendPhoneOtp,
        verifyPhoneOtp,
        sendEmailOtp,
        verifyEmailOtp,
        makeUserAdmin,
        changeUserRole,
        removeUser,
        getAllUsers,
        loginCustomer,
        registerCustomer,
        loginWorker,
        registerWorker,
        loginAdmin,
        logout,
        updateCustomerProfile,
        updateWorkerProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
