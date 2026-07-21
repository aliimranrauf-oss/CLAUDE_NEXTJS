import { createClient } from '@supabase/supabase-js'

// ── Server-only Supabase client ─────────────────────────────────────────────
// Uses the SERVICE ROLE key, which must NEVER be prefixed with NEXT_PUBLIC_
// and must never be imported from a 'use client' file or any code that ships
// to the browser. Only import this inside app/api/**/route.ts files.
//
// This is what lets us safely bypass RLS for trusted server-side writes
// (e.g. inserting a new order) without exposing that power to the browser,
// unlike lib/supabaseClient.ts which uses the public anon key.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars on the server.'
    )
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
