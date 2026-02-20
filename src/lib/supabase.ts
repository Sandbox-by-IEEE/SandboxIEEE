/**
 * ============================================================================
 * SUPABASE CLIENT CONFIGURATION
 * ============================================================================
 *
 * Purpose: Initialize Supabase client for Storage operations
 * Features: Server-side admin client with service role key
 *
 * Required Environment Variables:
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (server-side only)
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Anon key (client-side)
 *
 * ============================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Validate required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-side Supabase client with admin privileges
 * Use this for server actions & API routes (file uploads, storage management)
 * NEVER expose this client to the browser
 */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required',
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Client-side Supabase client with anon key
 * Use for public operations (reading public file URLs)
 */
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required',
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Storage bucket names used across the platform
 */
export const STORAGE_BUCKETS = {
  /** Payment proof uploads (registration phase) */
  PAYMENTS: 'payments',
  /** Preliminary submission files (PDFs) */
  PRELIMINARY: 'preliminary',
  /** Semifinal submission files */
  SEMIFINAL: 'semifinal',
  /** Final submission files */
  FINAL: 'final',
} as const;

export type StorageBucket =
  (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
