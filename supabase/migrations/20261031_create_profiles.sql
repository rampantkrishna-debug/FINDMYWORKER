-- ==============================================================================
-- FindMyWorker: Supabase Database Migration
-- Table: public.profiles
-- Linked to: auth.users(id)
-- Row Level Security (RLS) & Triggers Included
-- ==============================================================================

-- 1. Create public.profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  account_type TEXT NOT NULL DEFAULT 'customer' CHECK (account_type IN ('customer', 'worker', 'admin')),
  city TEXT,
  phone TEXT,
  email TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index frequently queried columns
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON public.profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);

-- 2. Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_set_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Automatically create profile row when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_full_name TEXT;
  v_account_type TEXT;
  v_city TEXT;
BEGIN
  -- Extract optional metadata provided during signup
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '');
  v_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'customer');
  v_city := COALESCE(NEW.raw_user_meta_data->>'city', 'Mohali');

  -- Ensure account_type is valid, fallback to 'customer' if invalid or unauthorized
  IF v_account_type NOT IN ('customer', 'worker') THEN
    v_account_type := 'customer';
  END IF;

  INSERT INTO public.profiles (id, full_name, avatar_url, account_type, city, phone, email, onboarding_completed)
  VALUES (
    NEW.id,
    NULLIF(v_full_name, ''),
    NEW.raw_user_meta_data->>'avatar_url',
    v_account_type,
    v_city,
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone'),
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email'),
    FALSE
  )
  ON CONFLICT (id) DO UPDATE
  SET
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Define RLS Policies

-- Policy A: Users can view their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy B: Anyone (authenticated or guest) can view worker profiles
-- (Needed so customers can discover workers, view bios, and see ratings)
DROP POLICY IF EXISTS "Public can view worker profiles" ON public.profiles;
CREATE POLICY "Public can view worker profiles"
  ON public.profiles
  FOR SELECT
  TO public
  USING (account_type = 'worker');

-- Policy C: Users can insert their own profile matching their auth UID
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    -- Prevent self-granting admin role
    AND account_type IN ('customer', 'worker')
  );

-- Policy D: Users can update their own profile, but cannot elevate themselves to admin
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- User cannot set account_type to 'admin' unless they were already an admin
    AND (
      account_type = (SELECT account_type FROM public.profiles WHERE id = auth.uid())
      OR (SELECT account_type FROM public.profiles WHERE id = auth.uid()) = 'admin'
    )
  );

-- Policy E: Admins can view and manage all profiles
DROP POLICY IF EXISTS "Admins have full access" ON public.profiles;
CREATE POLICY "Admins have full access"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  );

