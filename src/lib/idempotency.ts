/**
 * ============================================================================
 * IDEMPOTENCY KEY STORE
 * ============================================================================
 *
 * Prevents duplicate registration submissions caused by:
 * - Network retries
 * - Double-clicks that bypass frontend guards
 * - Browser back/forward + resubmit
 *
 * In-memory implementation (works for single-instance).
 * For multi-instance deployments, swap to Redis (Upstash).
 * ============================================================================
 */

interface IdempotencyEntry {
  status: 'processing' | 'completed';
  response?: {
    body: unknown;
    status: number;
  };
  createdAt: number;
}

const store = new Map<string, IdempotencyEntry>();

// TTL: 1 hour (clean up old entries)
const TTL_MS = 60 * 60 * 1000;
// Cleanup interval: every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

// Periodic cleanup of expired entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now - entry.createdAt > TTL_MS) {
        store.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

/**
 * Check if an idempotency key has been seen before.
 * Returns the cached response if the request was already completed,
 * or 'processing' if it's currently being handled.
 */
export function checkIdempotencyKey(key: string): IdempotencyEntry | null {
  const entry = store.get(key);
  if (!entry) return null;

  // Check TTL
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(key);
    return null;
  }

  return entry;
}

/**
 * Mark an idempotency key as processing (request is being handled).
 */
export function markProcessing(key: string): void {
  store.set(key, {
    status: 'processing',
    createdAt: Date.now(),
  });
}

/**
 * Mark an idempotency key as completed with its response.
 */
export function markCompleted(
  key: string,
  response: { body: unknown; status: number },
): void {
  store.set(key, {
    status: 'completed',
    response,
    createdAt: Date.now(),
  });
}

/**
 * Remove an idempotency key (e.g., on error, allow retry).
 */
export function removeIdempotencyKey(key: string): void {
  store.delete(key);
}
