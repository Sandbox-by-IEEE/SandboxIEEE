/**
 * ============================================================================
 * CLIENT-SIDE FILE UPLOAD VIA PRESIGNED URLs
 * ============================================================================
 *
 * Bypasses the Vercel 4.5MB serverless function body limit by uploading
 * files directly from the browser to Supabase Storage.
 *
 * Flow:
 * 1. Request a presigned upload URL from /api/upload/presign
 * 2. Upload file directly to Supabase using the signed URL + token
 * 3. Return storagePath for the server to generate read URLs
 *
 * ============================================================================
 */

import { createClient } from '@supabase/supabase-js';

export interface ClientUploadResult {
  storagePath: string;
  fileName: string;
  fileSize: number;
}

/**
 * Upload a file via presigned URL (client-side).
 *
 * @param file - The File object to upload
 * @param bucket - Storage bucket name (payments, preliminary, semifinal, final)
 * @param prefix - Optional prefix for the filename
 * @param signal - Optional AbortSignal for cancellation
 * @returns Upload result with storagePath, fileName, fileSize
 */
export async function uploadViaPresignedUrl(
  file: File,
  bucket: string,
  prefix?: string,
  signal?: AbortSignal,
): Promise<ClientUploadResult> {
  // Step 1: Get presigned upload URL from our API
  const presignRes = await fetch('/api/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bucket,
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      prefix,
    }),
    signal,
  });

  if (!presignRes.ok) {
    let errorMessage = `Failed to prepare upload (${presignRes.status})`;
    try {
      const errorData = await presignRes.json();
      if (errorData.error) errorMessage = errorData.error;
    } catch {
      // Response was not JSON — extract what we can
      try {
        const text = await presignRes.text();
        if (text) errorMessage = text;
      } catch {
        // Response was not JSON — use status-based error message
      }
    }
    throw new Error(errorMessage);
  }

  const { storagePath, token } = await presignRes.json();

  // Step 2: Upload file directly to Supabase Storage
  // Uses the anon key client — the signed token provides the actual authorization
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Upload service is not configured. Please contact support.',
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: {
      // Pass the abort signal to all fetch calls made by the Supabase client
      fetch: (input, init) => fetch(input, { ...init, signal }),
    },
  });

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(storagePath, token, file, {
      contentType: file.type,
    });

  if (uploadError) {
    console.error('Supabase upload error:', uploadError);
    throw new Error(
      uploadError.message === 'The resource already exists'
        ? 'A file with this name already exists. Please try again.'
        : `Upload failed: ${uploadError.message}`,
    );
  }

  return {
    storagePath,
    fileName: file.name,
    fileSize: file.size,
  };
}
