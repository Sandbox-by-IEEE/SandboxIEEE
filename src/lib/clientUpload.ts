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
 * 2. PUT file directly to the signed URL (no Supabase client needed)
 * 3. Return storagePath for the server to generate read URLs
 *
 * ============================================================================
 */

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
      try {
        const text = await presignRes.text();
        if (text) errorMessage = text;
      } catch {
        // Response body already consumed — use status-based error message
      }
    }
    throw new Error(errorMessage);
  }

  const { signedUrl, storagePath } = await presignRes.json();

  // Step 2: Upload file directly to Supabase via the signed URL
  // The signedUrl is a complete URL with the upload token embedded —
  // no Supabase client or env vars needed on the client side.
  const uploadRes = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
    signal,
  });

  if (!uploadRes.ok) {
    let detail = '';
    try {
      const errBody = await uploadRes.json();
      detail = errBody.error || errBody.message || errBody.statusCode || '';
    } catch {
      // ignore parse error
    }

    if (uploadRes.status === 409 || detail === 'Duplicate') {
      throw new Error(
        'A file with this name already exists. Please try again.',
      );
    }

    throw new Error(
      detail
        ? `Upload failed: ${detail}`
        : `Upload failed (${uploadRes.status}). Please try again.`,
    );
  }

  return {
    storagePath,
    fileName: file.name,
    fileSize: file.size,
  };
}
