// Node script to test Supabase configuration and connectivity
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
let supabaseUrl = 'https://nsuwerblfagvzgqqadjz.supabase.co';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.split('=')[1]?.trim() || supabaseUrl;
    }
    if (trimmed.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) {
      supabaseKey = trimmed.split('=')[1]?.trim() || '';
    }
  }
}

console.log('----------------------------------------------------');
console.log('FindMyWorker — Supabase Diagnostic Tool');
console.log('----------------------------------------------------');
console.log('Target URL:', supabaseUrl);
console.log('Key Status:', supabaseKey && !supabaseKey.includes('YOUR_') ? 'Key provided' : 'Placeholder / Missing');

if (!supabaseKey || supabaseKey.includes('YOUR_')) {
  console.log('\n[INFO] VITE_SUPABASE_PUBLISHABLE_KEY is currently a placeholder.');
  console.log('To connect to live Supabase:');
  console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/nsuwerblfagvzgqqadjz');
  console.log('2. Navigate to Project Settings -> API (or Data API).');
  console.log('3. Copy the "Publishable Key" (starts with sb_publishable_ or legacy anon key).');
  console.log('4. Paste it into .env.local as VITE_SUPABASE_PUBLISHABLE_KEY=...');
  process.exit(0);
}

const client = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    console.log('\nTesting Supabase connection...');
    const { data, error } = await client.from('profiles').select('id').limit(1);
    if (error) {
      if (error.code === '42P01') {
        console.log(' Connection verified! (Supabase responded, but public.profiles table has not been created yet.)');
        console.log('Please execute the migration script in supabase/migrations/20261031_create_profiles.sql');
      } else {
        console.log(' Supabase response:', error.message, `(Code: ${error.code})`);
      }
    } else {
      console.log(' Connection verified & profiles table is active!');
    }
  } catch (err) {
    console.error(' Error querying Supabase:', err.message);
  }
}

run();

