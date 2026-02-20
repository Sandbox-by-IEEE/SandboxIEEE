/**
 * File Upload Configuration
 * Centralized config for file size limits and accepted file types
 */

export const FILE_SIZE_LIMITS = {
  // Preliminary phase: Abstract/Proposal (PDF)
  preliminary: {
    maxSizeMB: 10,
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    acceptedTypes: ['application/pdf'],
    acceptedExtensions: ['.pdf'],
    description: 'PDF files up to 10MB',
  },

  // Payment phase: Payment proof (Images/PDF)
  payment: {
    maxSizeMB: 5,
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
    acceptedExtensions: ['.jpg', '.jpeg', '.png', '.pdf'],
    description: 'JPG, PNG, or PDF files up to 5MB',
  },

  // Semifinal phase: Competition-specific submissions
  semifinal: {
    maxSizeMB: 20,
    maxSizeBytes: 20 * 1024 * 1024, // 20MB
    acceptedTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
    ],
    acceptedExtensions: ['.pdf', '.doc', '.docx'],
    description: 'PDF or Word files up to 20MB',
  },

  // Final phase: Presentation materials
  final: {
    maxSizeMB: 25,
    maxSizeBytes: 25 * 1024 * 1024, // 25MB
    acceptedTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/vnd.ms-powerpoint', // .ppt
    ],
    acceptedExtensions: ['.pdf', '.ppt', '.pptx'],
    description: 'PDF or PowerPoint files up to 25MB',
  },
} as const;

/**
 * Validate file size and type (client-side)
 */
export function validateFile(
  file: File,
  phase: keyof typeof FILE_SIZE_LIMITS,
): { valid: boolean; error?: string } {
  const config = FILE_SIZE_LIMITS[phase];

  if (file.size > config.maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${config.maxSizeMB}MB limit. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  if (!(config.acceptedTypes as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Please upload: ${config.description}`,
    };
  }

  return { valid: true };
}

/**
 * Validate file on server-side (from FormData)
 */
export function validateFileServer(
  file: { name: string; size: number; type: string },
  phase: keyof typeof FILE_SIZE_LIMITS,
): { valid: boolean; error?: string } {
  const config = FILE_SIZE_LIMITS[phase];

  if (file.size > config.maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${config.maxSizeMB}MB limit. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  if (!(config.acceptedTypes as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Please upload: ${config.description}`,
    };
  }

  return { valid: true };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
