/**
 * ============================================================================
 * SHARED ZOD SCHEMAS FOR ADMIN API ROUTES
 * ============================================================================
 */

import { z } from 'zod';

/** Schema for registration rejection */
export const rejectRegistrationSchema = z.object({
  reason: z
    .string()
    .min(3, 'Rejection reason must be at least 3 characters')
    .max(1000, 'Rejection reason must be less than 1000 characters')
    .trim(),
});

/** Schema for submission approval (feedback optional) */
export const approveSubmissionSchema = z.object({
  adminId: z.string().optional(),
  feedback: z
    .string()
    .max(2000, 'Feedback must be less than 2000 characters')
    .trim()
    .optional()
    .default(''),
});

/** Schema for submission rejection (feedback required) */
export const rejectSubmissionSchema = z.object({
  adminId: z.string().optional(),
  feedback: z
    .string()
    .min(3, 'Feedback must be at least 3 characters')
    .max(2000, 'Feedback must be less than 2000 characters')
    .trim(),
});

/** Schema for cron job authorization */
export const cronAuthSchema = z.object({
  authorization: z.string().min(1, 'Authorization header is required'),
});
