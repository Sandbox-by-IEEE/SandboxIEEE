/**
 * ============================================================================
 * REDIS / UPSTASH CACHING LAYER
 * ============================================================================
 *
 * Ready-to-use caching module for Upstash Redis.
 *
 * Setup:
 * 1. Create an Upstash Redis instance at https://upstash.com
 * 2. Add env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 * 3. Install: npm install @upstash/redis
 * 4. Uncomment the Redis implementation below and delete the fallback.
 *
 * Features:
 * - Generic get/set/del with TTL
 * - JSON serialization built-in
 * - Falls back to in-memory Map when Redis is not configured
 * ============================================================================
 */

// ===== FALLBACK: In-Memory Cache (current) =====
// Replace with Upstash when ready

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry>();

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const entry = memoryCache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      memoryCache.delete(key);
      return null;
    }
    return entry.value as T;
  },

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  async del(key: string): Promise<void> {
    memoryCache.delete(key);
  },

  async flush(): Promise<void> {
    memoryCache.clear();
  },
};

// ===== UPSTASH REDIS IMPLEMENTATION (uncomment when ready) =====
//
// import { Redis } from '@upstash/redis';
//
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });
//
// export const cache = {
//   async get<T>(key: string): Promise<T | null> {
//     return redis.get<T>(key);
//   },
//
//   async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
//     await redis.set(key, value, { ex: ttlSeconds });
//   },
//
//   async del(key: string): Promise<void> {
//     await redis.del(key);
//   },
//
//   async flush(): Promise<void> {
//     await redis.flushdb();
//   },
// };
