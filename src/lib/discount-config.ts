/**
 * ============================================================================
 * DISCOUNT CONFIGURATION - Event-to-Competition Discount System
 * ============================================================================
 *
 * Users who have an APPROVED event registration (e.g. YIF x Grand Seminar)
 * receive an automatic discount on competition registration fees.
 *
 * The discount is applied server-side and verified against the database.
 * No voucher codes — eligibility is determined by the user's approved
 * event registration status.
 * ============================================================================
 */

export interface DiscountConfig {
  /** Flat discount in IDR (applied after percentage if both exist) */
  flatDiscount: number;
  /** Percentage discount (0-100). Set to 0 to use flat only. */
  percentageDiscount: number;
  /** Which event codes qualify for the discount */
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
  flatDiscount: 0, // No flat discount
  percentageDiscount: 5, // 5% off competition registration
  qualifyingEventCodes: ['yif-x-grand-seminar'],
  label: 'YIF Participant Discount',
  description:
    'As an approved YIF x Grand Seminar participant, you receive a 5% discount on competition registration.',
};

/**
 * Calculate the discounted fee.
 * Applies percentage first (if any), then flat discount.
 * Never returns below 0.
 */
export function calculateDiscountedFee(
  originalFee: number,
  config: DiscountConfig = EVENT_DISCOUNT,
): { discountedFee: number; discountAmount: number } {
  let fee = originalFee;

  // Apply percentage discount first
  if (config.percentageDiscount > 0) {
    fee = fee * (1 - config.percentageDiscount / 100);
  }

  // Apply flat discount
  if (config.flatDiscount > 0) {
    fee = fee - config.flatDiscount;
  }

  // Never go below 0
  fee = Math.max(0, Math.round(fee));

  return {
    discountedFee: fee,
    discountAmount: originalFee - fee,
  };
}
