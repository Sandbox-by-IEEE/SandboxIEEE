/**
 * ============================================================================
 * REGISTRATION LOCK
 * ============================================================================
 *
 * Prevents duplicate concurrent registration submissions per user.
 * Uses a simple in-memory lock with a short TTL (30 seconds max).
 *
 * Key format: registration:lock:${userId}
 * Lock is ALWAYS released in a finally block — never left dangling.
 *
 * For multi-instance deployments, swap to Redis/Upstash.
 * ============================================================================
 */

interface LockEntry {
  lockedAt: number;
}

const locks = new Map<string, LockEntry>();

/** Maximum lock duration in ms — auto-expires after this */
const LOCK_TTL_MS = 30_000; // 30 seconds

/**
 * Attempt to acquire a registration lock for a user.
 * Returns true if lock acquired, false if already locked.
 */
export function acquireRegistrationLock(userId: string): boolean {
  const key = `registration:lock:${userId}`;
  const existing = locks.get(key);

  if (existing) {
    // Check if the existing lock has expired (stale)
    if (Date.now() - existing.lockedAt > LOCK_TTL_MS) {
      // Stale lock — safe to reclaim
      locks.delete(key);
    } else {
      // Active lock — reject
      return false;
    }
  }

  locks.set(key, { lockedAt: Date.now() });
  return true;
}

/**
 * Release a registration lock for a user.
 * Always call this in a finally block.
 */
export function releaseRegistrationLock(userId: string): void {
  const key = `registration:lock:${userId}`;
  locks.delete(key);
}
