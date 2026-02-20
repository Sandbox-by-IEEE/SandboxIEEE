/**
 * ============================================================================
 * SUPABASE STORAGE BUCKET SETUP SCRIPT
 * ============================================================================
 *
 * Run: npx tsx scripts/setup-supabase-storage.ts
 *
 * Creates required storage buckets with appropriate access policies:
 * - payments: Authenticated upload, admin read
 * - preliminary: Authenticated upload, admin read
 * - semifinal: Authenticated upload, admin read
 * - final: Authenticated upload, admin read
 *
 * ============================================================================
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    '❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env',
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BUCKETS = [
  {
    name: 'payments',
    public: false,
    fileSizeLimit: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ],
  },
  {
    name: 'preliminary',
    public: false,
    fileSizeLimit: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: ['application/pdf'],
  },
  {
    name: 'semifinal',
    public: false,
    fileSizeLimit: 20 * 1024 * 1024, // 20MB
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ],
  },
  {
    name: 'final',
    public: false,
    fileSizeLimit: 25 * 1024 * 1024, // 25MB
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
    ],
  },
];

async function setupBuckets() {
  console.log('🪣 Setting up Supabase Storage buckets...\n');

  for (const bucket of BUCKETS) {
    // Check if bucket exists
    const { data: existing } = await supabase.storage.getBucket(bucket.name);

    if (existing) {
      console.log(
        `  ✅ Bucket "${bucket.name}" already exists — updating settings...`,
      );
      const { error } = await supabase.storage.updateBucket(bucket.name, {
        public: bucket.public,
        fileSizeLimit: bucket.fileSizeLimit,
        allowedMimeTypes: bucket.allowedMimeTypes,
      });
      if (error) {
        console.error(`  ❌ Failed to update "${bucket.name}":`, error.message);
      } else {
        console.log(`  ✅ Updated "${bucket.name}" successfully`);
      }
    } else {
      const { error } = await supabase.storage.createBucket(bucket.name, {
        public: bucket.public,
        fileSizeLimit: bucket.fileSizeLimit,
        allowedMimeTypes: bucket.allowedMimeTypes,
      });

      if (error) {
        console.error(`  ❌ Failed to create "${bucket.name}":`, error.message);
      } else {
        console.log(`  ✅ Created bucket "${bucket.name}"`);
      }
    }
  }

  console.log('\n✨ Storage setup complete!');
  console.log('\n📋 Important: Configure RLS policies in Supabase Dashboard:');
  console.log('   1. Go to Storage → Policies');
  console.log(
    '   2. For each bucket, enable access via service_role key (already done via admin client)',
  );
  console.log(
    '   3. All uploads go through our API routes (server-side) using the service role key',
  );
  console.log('   4. File URLs are generated as signed URLs with expiry\n');
}

setupBuckets().catch(console.error);
