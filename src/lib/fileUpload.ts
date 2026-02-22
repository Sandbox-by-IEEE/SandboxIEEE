/**
 * ============================================================================
 * FILE UPLOAD SERVICE - SUPABASE STORAGE
 * ============================================================================
 *
 * Handles all file uploads to Supabase Storage buckets.
 * Supabase Storage is REQUIRED — no local filesystem fallback.
 * Vercel is serverless with a read-only filesystem.
 *
 * Features:
 * - Supabase Storage integration with signed URLs
 * - Automatic file naming with collision prevention
 * - File type and size validation (via fileConfig.ts)
 * - Old file cleanup on re-upload
 *
 * ============================================================================
 */

import { getSupabaseAdmin, type StorageBucket } from '@/lib/supabase';

export interface UploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  storagePath?: string; // Supabase storage path for deletion
}

/**
 * Upload a file to Supabase Storage.
 *
 * Supabase must be configured with NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY environment variables.
 *
 * @param file - The File object to upload
 * @param bucket - Storage bucket name (payments, preliminary, semifinal, final)
 * @param prefix - Optional prefix for the filename (e.g., "PTC-TeamName")
 * @returns UploadResult with URL, filename, and size
 */
export async function uploadFile(
  file: File,
  bucket: string,
  prefix?: string,
): Promise<UploadResult> {
  return uploadToSupabase(file, bucket as StorageBucket, prefix);
}

/**
 * Upload file to Supabase Storage
 */
async function uploadToSupabase(
  file: File,
  bucket: StorageBucket,
  prefix?: string,
): Promise<UploadResult> {
  const supabase = getSupabaseAdmin();

  const ext = getFileExtension(file.name);
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_');
  const timestamp = Date.now();
  const storagePath = prefix
    ? `${prefix}_${timestamp}${ext}`
    : `${timestamp}_${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
      cacheControl: '3600',
    });

  if (error) {
    console.error(`❌ Supabase upload error [${bucket}]:`, error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Generate a signed URL (valid for 7 days — admin will review within this time)
  const { data: signedUrlData, error: signedError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(data.path, 7 * 24 * 60 * 60); // 7 days

  if (signedError || !signedUrlData?.signedUrl) {
    // Fallback: generate a public URL if signed URL fails
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: publicUrlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
      storagePath: data.path,
    };
  }

  return {
    url: signedUrlData.signedUrl,
    fileName: file.name,
    fileSize: file.size,
    storagePath: data.path,
  };
}

/**
 * Delete a file from Supabase Storage
 *
 * @param fileUrl - The file URL or storage path to delete
 * @param bucket - Optional bucket name (auto-detected from URL if omitted)
 * @param storagePath - Optional Supabase storage path (more reliable than URL parsing)
 */
export async function deleteFile(
  fileUrl: string,
  bucket?: string,
  storagePath?: string,
): Promise<void> {
  if (!fileUrl) return;

  try {
    const supabase = getSupabaseAdmin();
    const targetBucket = bucket || detectBucketFromUrl(fileUrl);
    const targetPath = storagePath || extractPathFromUrl(fileUrl, targetBucket);

    if (targetBucket && targetPath) {
      const { error } = await supabase.storage
        .from(targetBucket)
        .remove([targetPath]);

      if (error) {
        console.warn(
          `⚠️ Could not delete from Supabase [${targetBucket}]:`,
          error.message,
        );
      }
    }
  } catch (err) {
    console.warn('⚠️ Supabase delete failed:', err);
  }
}

/**
 * Generate a fresh signed URL for a file (useful for expired URLs)
 */
export async function getSignedUrl(
  bucket: string,
  storagePath: string,
  expiresInSeconds: number = 7 * 24 * 60 * 60,
): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, expiresInSeconds);

    if (error || !data?.signedUrl) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot >= 0 ? filename.substring(lastDot) : '';
}

function detectBucketFromUrl(url: string): string | null {
  const buckets = ['payments', 'preliminary', 'semifinal', 'final'];
  for (const bucket of buckets) {
    if (url.includes(`/${bucket}/`)) return bucket;
  }
  return null;
}

function extractPathFromUrl(url: string, bucket: string | null): string | null {
  if (!bucket) return null;
  const bucketPattern = `/${bucket}/`;
  const index = url.indexOf(bucketPattern);
  if (index < 0) return null;

  let path = url.substring(index + bucketPattern.length);
  // Remove query parameters
  const queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    path = path.substring(0, queryIndex);
  }
  return path;
}
