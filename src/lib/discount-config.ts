/**
 * ============================================================================
 * DISCOUNT CONFIGURATION - Event-to-Competition Price Parity System
 * ============================================================================
 *
 * Users who have an APPROVED event registration (e.g. YIF x Grand Seminar)
 * are entitled to register for any competition at the early registration
 * price, regardless of the current registration phase.
 *
 * This is NOT a percentage or flat discount — it is price parity.
 * Example: If BCC early = Rp150.000 and normal = Rp180.000, an approved
 * event participant registering during the normal phase pays Rp150.000.
 *
 * The discount is applied server-side and verified against the database.
 * No voucher codes — eligibility is determined by the user's approved
 * event registration status.
 * ============================================================================
 */

/**
 * Per-competition pricing tiers.
 * Each competition has an early and normal registration fee.
 * Approved event participants always pay the early price.
 */
export const COMPETITION_PRICING: Record<
  string,
  { early: number; normal: number }
> = {
  BCC: { early: 150_000, normal: 180_000 },
  TPC: { early: 125_000, normal: 150_000 },
  PTC: { early: 200_000, normal: 220_000 },
};

export interface DiscountConfig {
  /** Which event codes qualify for the early-price parity */
  qualifyingEventCodes: string[];
  /** Human-readable label for the discount */
  label: string;
  /** Description shown to the user */
  description: string;
}

/**
 * Current discount configuration.
 * Change these values to adjust the discount without code changes.
 */
export const EVENT_DISCOUNT: DiscountConfig = {
  qualifyingEventCodes: ['yif-x-grand-seminar'],
  label: 'YIF Participant Benefit',
  description:
    'As an approved YIF x Grand Seminar participant, you are entitled to register for any competition at the early registration price, regardless of the current registration phase.',
};

/**
 * Calculate the discounted fee using early-price parity.
 *
 * If the user is eligible and the current fee is the normal-phase fee,
 * the fee is replaced with the early-phase fee for that competition.
 * If the user is already paying the early price (or early price is not
 * set), no adjustment is made.
 *
 * @param currentFee  The fee the user would normally pay (based on current batch)
 * @param competitionCode  The competition code (e.g. "BCC", "TPC", "PTC")
 * @returns Object with the final fee and discount amount (0 if no adjustment)
 */
export function calculateDiscountedFee(
  currentFee: number,
  competitionCode: string,
): { discountedFee: number; discountAmount: number } {
  const pricing = COMPETITION_PRICING[competitionCode];

  // If pricing is not configured for this competition, no discount
  if (!pricing) {
    return { discountedFee: currentFee, discountAmount: 0 };
  }

  // The eligible price is always the early registration price
  const earlyPrice = pricing.early;

  // If the current fee is already at or below the early price, no adjustment
  if (currentFee <= earlyPrice) {
    return { discountedFee: currentFee, discountAmount: 0 };
  }

  // Replace the fee with the early registration price
  return {
    discountedFee: earlyPrice,
    discountAmount: currentFee - earlyPrice,
  };
}
