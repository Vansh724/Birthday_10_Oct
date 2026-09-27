/**
 * A single, shared Supabase client for the backend.
 *
 * Uses the SERVICE ROLE key (not the anon/public key) because this
 * server-side code needs to read/write the subscriptions table directly.
 * The service role key must NEVER reach the frontend — it lives only
 * here, read from .env.
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    '[db] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from .env — ' +
    'subscription storage will fail until these are set. See backend/.env.example.'
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

module.exports = { supabase };
