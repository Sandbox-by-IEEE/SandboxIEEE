/**
 * ============================================================================
 * STANDARDIZED API RESPONSE HELPERS
 * ============================================================================
 *
 * All API routes should use these helpers to ensure consistent response shape:
 *
 * Success: { success: true, data: T, message?: string }
 * Error:   { success: false, error: { code: string, message: string, details?: unknown } }
 *
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { ErrorCode } from '@/lib/error-handler';

/**
 * Standard success response
 */
export function successResponse<T>(
  data: T,
  options?: {
    message?: string;
    status?: number;
    headers?: Record<string, string>;
  },
) {
  const body: { success: true; data: T; message?: string } = {
    success: true,
    data,
  };
  if (options?.message) {
    body.message = options.message;
  }

  return NextResponse.json(body, {
    status: options?.status ?? 200,
    headers: options?.headers,
  });
}

/**
 * Standard error response
 */
export function errorResponse(
  code: ErrorCode | string,
  message: string,
  status: number,
  details?: unknown,
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status },
  );
}

/**
 * Parse Zod validation errors into a standard error response
 */
export function zodErrorResponse(error: ZodError) {
  return errorResponse(
    ErrorCode.VALIDATION_ERROR,
    'Validation failed',
    400,
    error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    })),
  );
}

/**
 * Common error shortcuts
 */
export const ApiErrors = {
  unauthorized: (message = 'Authentication required') =>
    errorResponse(ErrorCode.UNAUTHORIZED, message, 401),

  forbidden: (message = 'Insufficient permissions') =>
    errorResponse(ErrorCode.FORBIDDEN, message, 403),

  notFound: (resource = 'Resource') =>
    errorResponse(ErrorCode.RESOURCE_NOT_FOUND, `${resource} not found`, 404),

  conflict: (message: string, details?: unknown) =>
    errorResponse(ErrorCode.DUPLICATE_ENTRY, message, 409, details),

  rateLimited: (retryAfter?: number) =>
    errorResponse(
      ErrorCode.RATE_LIMIT_EXCEEDED,
      `Too many requests.${retryAfter ? ` Try again in ${retryAfter} seconds.` : ''}`,
      429,
    ),

  internal: (message = 'Internal server error') =>
    errorResponse(ErrorCode.INTERNAL_SERVER_ERROR, message, 500),

  badRequest: (message: string, details?: unknown) =>
    errorResponse(ErrorCode.INVALID_INPUT, message, 400, details),
};
