/**
 * ============================================================================
 * RATE LIMITING MIDDLEWARE
 * ============================================================================
 *
 * Production-grade rate limiter using token bucket algorithm.
 * Supports IP-based, user-based, and composite key identification.
 *
 * In-memory implementation — works for single-instance.
 * For multi-instance, swap Map to Redis/Upstash.
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per window
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

// In-memory cache
const cache = new Map<string, TokenBucket>();

// Periodic cleanup of stale buckets (every 10 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      cleanupRateLimitCache();
    },
    10 * 60 * 1000,
  );
}

/**
 * Rate limiter using token bucket algorithm.
 *
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @param keyParts - Optional extra strings to include in the rate limit key
 *                   (e.g., userId, competitionCode for per-user-per-competition limits)
 * @returns null if allowed, NextResponse if rate limited
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 10,
  },
  ...keyParts: string[]
): Promise<NextResponse | null> {
  const ip = getClientIP(request);
  const identifier =
    keyParts.length > 0 ? `${ip}:${keyParts.join(':')}` : `ip:${ip}`;

  const now = Date.now();
  const bucket = cache.get(identifier) || {
    tokens: config.uniqueTokenPerInterval,
    lastRefill: now,
  };

  // Refill tokens based on time elapsed
  const timeSinceLastRefill = now - bucket.lastRefill;
  const refillAmount = Math.floor(
    (timeSinceLastRefill / config.interval) * config.uniqueTokenPerInterval,
  );

  if (refillAmount > 0) {
    bucket.tokens = Math.min(
      config.uniqueTokenPerInterval,
      bucket.tokens + refillAmount,
    );
    bucket.lastRefill = now;
  }

  // Check if request is allowed
  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    cache.set(identifier, bucket);
    return null; // Allow request
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((config.interval - timeSinceLastRefill) / 1000);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests. Try again in ${retryAfter} seconds.`,
      },
    },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': config.uniqueTokenPerInterval.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(now + retryAfter * 1000).toISOString(),
      },
    },
  );
}

/**
 * Rate limit by user identity (email or ID) + optional scope.
 * Use for per-user-per-competition rate limiting.
 */
export async function rateLimitByUser(
  request: NextRequest,
  userId: string,
  config: RateLimitConfig,
  scope?: string,
): Promise<NextResponse | null> {
  return rateLimit(
    request,
    config,
    `user:${userId}`,
    ...(scope ? [scope] : []),
  );
}

/**
 * Extract client IP from request headers.
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}

/**
 * Clear expired entries from cache.
 */
export function cleanupRateLimitCache(maxAge: number = 60 * 60 * 1000): void {
  const now = Date.now();
  for (const [key, bucket] of cache.entries()) {
    if (now - bucket.lastRefill > maxAge) {
      cache.delete(key);
    }
  }
}

/**
 * Preset rate limit configurations
 */
export const RATE_LIMITS = {
  /** Auth endpoints: 5 attempts per 15 minutes */
  AUTH: {
    interval: 15 * 60 * 1000,
    uniqueTokenPerInterval: 5,
  },

  /** Competition registration: 3 per hour per IP */
  REGISTRATION: {
    interval: 60 * 60 * 1000,
    uniqueTokenPerInterval: 3,
  },

  /** Per-user registration: 2 per hour per user (defense in depth) */
  USER_REGISTRATION: {
    interval: 60 * 60 * 1000,
    uniqueTokenPerInterval: 2,
  },

  /** General API endpoints: 30 requests per minute */
  API: {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 30,
  },

  /** Public read endpoints: 100 per minute */
  PUBLIC: {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 100,
  },
};
