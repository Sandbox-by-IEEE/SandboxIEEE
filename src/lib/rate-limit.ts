/**
 * ============================================================================
 * RATE LIMITING MIDDLEWARE
 * ============================================================================
 *
 * Purpose: Prevent abuse and DDoS attacks on API endpoints
 * Strategy: Token bucket algorithm with in-memory cache
 * Production: Replace with Redis for distributed rate limiting
 *
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

// In-memory cache (replace with Redis in production)
const cache = new Map<string, TokenBucket>();

/**
 * Rate limiter using token bucket algorithm
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns null if allowed, NextResponse if rate limited
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  },
): Promise<NextResponse | null> {
  // Get client identifier (IP address or user ID from auth)
  const identifier = getClientIdentifier(request);

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
      error: 'Too many requests',
      retryAfter: `${retryAfter} seconds`,
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
 * Get client identifier from request
 * Priority: User ID (if authenticated) > IP address
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get user ID from session/auth (implement based on your auth system)
  // For now, use IP address

  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Clear expired entries from cache (run periodically)
 * Call this in a background job or cron
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
 * Preset rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Authentication endpoints (stricter)
  AUTH: {
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 5, // 5 attempts per 15 minutes
  },

  // Registration endpoints (moderate)
  REGISTRATION: {
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 3, // 3 registrations per hour
  },

  // General API endpoints (lenient)
  API: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 30, // 30 requests per minute
  },

  // Public read endpoints (very lenient)
  PUBLIC: {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 100, // 100 requests per minute
  },
};
