/**
 * ============================================================================
 * CENTRALIZED ERROR HANDLER
 * ============================================================================
 * 
 * Purpose: Standardize error responses across all API endpoints
 * Features: Type-safe error codes, structured logging, user-friendly messages
 * 
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Standard error codes for API responses
 */
export enum ErrorCode {
  // Validation errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Authentication errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',

  // Authorization errors (403)
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Not found errors (404)
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  COMPETITION_NOT_FOUND = 'COMPETITION_NOT_FOUND',

  // Conflict errors (409)
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  TEAM_NAME_TAKEN = 'TEAM_NAME_TAKEN',
  ALREADY_REGISTERED = 'ALREADY_REGISTERED',

  // Rate limit errors (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Server errors (500)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',

  // Service unavailable (503)
  COMPETITION_CLOSED = 'COMPETITION_CLOSED',
  MAINTENANCE_MODE = 'MAINTENANCE_MODE',
}

/**
 * API Error class with structured properties
 */
export class APIError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Create user-friendly error responses
 */
export function createErrorResponse(error: unknown): NextResponse {
  // Handle custom API errors
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
      },
      { status: 400 }
    );
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; meta?: unknown };

    switch (prismaError.code) {
      case 'P2002':
        return NextResponse.json(
          {
            error: {
              code: ErrorCode.DUPLICATE_ENTRY,
              message: 'A record with this information already exists',
              details: prismaError.meta,
            },
          },
          { status: 409 }
        );

      case 'P2025':
        return NextResponse.json(
          {
            error: {
              code: ErrorCode.RESOURCE_NOT_FOUND,
              message: 'The requested resource was not found',
            },
          },
          { status: 404 }
        );

      default:
        // Log Prisma error for debugging (TODO: send to monitoring service)
        break;
    }
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    // Check for known error messages
    if (error.message.includes('password')) {
      return NextResponse.json(
        {
          error: {
            code: ErrorCode.INVALID_CREDENTIALS,
            message: error.message,
          },
        },
        { status: 401 }
      );
    }

    if (error.message.includes('OAuth')) {
      return NextResponse.json(
        {
          error: {
            code: ErrorCode.INVALID_INPUT,
            message: error.message,
          },
        },
        { status: 400 }
      );
    }
  }

  // Default: Internal server error
  // TODO: Log unexpected errors to monitoring service
  return NextResponse.json(
    {
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred. Please try again later.',
      },
    },
    { status: 500 }
  );
}

/**
 * Helper functions to create specific errors
 */
export const Errors = {
  validation: (message: string, details?: unknown) =>
    new APIError(ErrorCode.VALIDATION_ERROR, message, 400, details),

  unauthorized: (message = 'Authentication required') =>
    new APIError(ErrorCode.UNAUTHORIZED, message, 401),

  forbidden: (message = 'You do not have permission to perform this action') =>
    new APIError(ErrorCode.FORBIDDEN, message, 403),

  notFound: (resource: string) =>
    new APIError(ErrorCode.RESOURCE_NOT_FOUND, `${resource} not found`, 404),

  duplicate: (field: string) =>
    new APIError(
      ErrorCode.DUPLICATE_ENTRY,
      `${field} already exists`,
      409
    ),

  rateLimit: (retryAfter: number) =>
    new APIError(
      ErrorCode.RATE_LIMIT_EXCEEDED,
      `Too many requests. Please try again in ${retryAfter} seconds`,
      429,
      { retryAfter }
    ),

  internal: (message = 'Internal server error') =>
    new APIError(ErrorCode.INTERNAL_SERVER_ERROR, message, 500),

  competitionClosed: (competitionName: string) =>
    new APIError(
      ErrorCode.COMPETITION_CLOSED,
      `Registration for ${competitionName} is closed`,
      503
    ),
};

/**
 * Async error handler wrapper for API routes
 * Usage: export const POST = asyncHandler(async (req) => { ... })
 */
export function asyncHandler(
  handler: (req: Request) => Promise<NextResponse>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      return createErrorResponse(error);
    }
  };
}
