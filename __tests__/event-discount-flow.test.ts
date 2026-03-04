/**
 * ============================================================================
 * EVENT REGISTRATION & EARLY-PRICE PARITY — UNIT TESTS
 * ============================================================================
 *
 * Tests covering the full end-to-end flow:
 *   1. Discount config & early-price parity calculation
 *   2. Event content integrity
 *   3. Discount eligibility determination
 *   4. Edge cases (already early price, unknown competition, etc.)
 *
 * These tests validate the core business logic without hitting the database
 * or network. API route integration tests would require a test DB.
 * ============================================================================
 */

import { beforeAll, describe, expect, it } from 'vitest';

import {
  calculateDiscountedFee,
  COMPETITION_PRICING,
  DiscountConfig,
  EVENT_DISCOUNT,
} from '@/lib/discount-config';
import {
  EventContent,
  getAllEventCodes,
  getEventContent,
} from '@/lib/event-content';

/* ═══════════════════════════════════════════════════════════════════════════
 * 1. DISCOUNT CONFIGURATION TESTS
 * ═══════════════════════════════════════════════════════════════════════════ */

describe('EVENT_DISCOUNT config', () => {
  it('should use early-price parity (no percentage/flat fields)', () => {
    // The new config should NOT have percentageDiscount or flatDiscount
    expect('percentageDiscount' in EVENT_DISCOUNT).toBe(false);
    expect('flatDiscount' in EVENT_DISCOUNT).toBe(false);
  });

  it('should qualify yif-x-grand-seminar event code', () => {
    expect(EVENT_DISCOUNT.qualifyingEventCodes).toContain(
      'yif-x-grand-seminar',
    );
  });

  it('should have a human-readable label', () => {
    expect(EVENT_DISCOUNT.label).toBeTruthy();
    expect(typeof EVENT_DISCOUNT.label).toBe('string');
  });

  it('should have a description mentioning early registration price', () => {
    expect(EVENT_DISCOUNT.description).toBeTruthy();
    expect(EVENT_DISCOUNT.description.toLowerCase()).toContain('early');
  });
});

describe('COMPETITION_PRICING', () => {
  it('should have pricing for BCC, TPC, PTC', () => {
    expect(COMPETITION_PRICING['BCC']).toBeDefined();
    expect(COMPETITION_PRICING['TPC']).toBeDefined();
    expect(COMPETITION_PRICING['PTC']).toBeDefined();
  });

  it('should have early < normal for all competitions', () => {
    for (const [code, pricing] of Object.entries(COMPETITION_PRICING)) {
      expect(pricing.early).toBeLessThan(pricing.normal);
    }
  });

  it('should have correct BCC pricing', () => {
    expect(COMPETITION_PRICING['BCC'].early).toBe(150_000);
    expect(COMPETITION_PRICING['BCC'].normal).toBe(180_000);
  });

  it('should have correct TPC pricing', () => {
    expect(COMPETITION_PRICING['TPC'].early).toBe(125_000);
    expect(COMPETITION_PRICING['TPC'].normal).toBe(150_000);
  });

  it('should have correct PTC pricing', () => {
    expect(COMPETITION_PRICING['PTC'].early).toBe(200_000);
    expect(COMPETITION_PRICING['PTC'].normal).toBe(220_000);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
 * 2. calculateDiscountedFee() — EARLY-PRICE PARITY TESTS
 * ═══════════════════════════════════════════════════════════════════════════ */

describe('calculateDiscountedFee (early-price parity)', () => {
  describe('when user pays normal price → should be reduced to early price', () => {
    it('BCC normal (180_000) → early (150_000)', () => {
      const result = calculateDiscountedFee(180_000, 'BCC');
      expect(result.discountedFee).toBe(150_000);
      expect(result.discountAmount).toBe(30_000);
    });

    it('TPC normal (150_000) → early (125_000)', () => {
      const result = calculateDiscountedFee(150_000, 'TPC');
      expect(result.discountedFee).toBe(125_000);
      expect(result.discountAmount).toBe(25_000);
    });

    it('PTC normal (220_000) → early (200_000)', () => {
      const result = calculateDiscountedFee(220_000, 'PTC');
      expect(result.discountedFee).toBe(200_000);
      expect(result.discountAmount).toBe(20_000);
    });
  });

  describe('when user already pays early price → no adjustment', () => {
    it('BCC early (150_000) → stays 150_000', () => {
      const result = calculateDiscountedFee(150_000, 'BCC');
      expect(result.discountedFee).toBe(150_000);
      expect(result.discountAmount).toBe(0);
    });

    it('TPC early (125_000) → stays 125_000', () => {
      const result = calculateDiscountedFee(125_000, 'TPC');
      expect(result.discountedFee).toBe(125_000);
      expect(result.discountAmount).toBe(0);
    });

    it('PTC early (200_000) → stays 200_000', () => {
      const result = calculateDiscountedFee(200_000, 'PTC');
      expect(result.discountedFee).toBe(200_000);
      expect(result.discountAmount).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should return original fee for unknown competition code', () => {
      const result = calculateDiscountedFee(999_000, 'UNKNOWN');
      expect(result.discountedFee).toBe(999_000);
      expect(result.discountAmount).toBe(0);
    });

    it('should return 0 fee as-is (no negative)', () => {
      const result = calculateDiscountedFee(0, 'BCC');
      expect(result.discountedFee).toBe(0);
      expect(result.discountAmount).toBe(0);
    });

    it('should handle fee below early price (no adjustment)', () => {
      const result = calculateDiscountedFee(100_000, 'BCC');
      expect(result.discountedFee).toBe(100_000);
      expect(result.discountAmount).toBe(0);
    });

    it('should handle fee exactly equal to early price', () => {
      const result = calculateDiscountedFee(150_000, 'BCC');
      expect(result.discountedFee).toBe(150_000);
      expect(result.discountAmount).toBe(0);
    });

    it('should handle fee higher than normal price (caps at early)', () => {
      // e.g., if a future price tier is higher than normal
      const result = calculateDiscountedFee(300_000, 'BCC');
      expect(result.discountedFee).toBe(150_000);
      expect(result.discountAmount).toBe(150_000);
    });
  });

  describe('invariants', () => {
    it('discountedFee + discountAmount should always equal currentFee', () => {
      const testCases = [
        { fee: 180_000, code: 'BCC' },
        { fee: 150_000, code: 'BCC' },
        { fee: 150_000, code: 'TPC' },
        { fee: 125_000, code: 'TPC' },
        { fee: 220_000, code: 'PTC' },
        { fee: 200_000, code: 'PTC' },
        { fee: 999_000, code: 'UNKNOWN' },
      ];
      for (const { fee, code } of testCases) {
        const result = calculateDiscountedFee(fee, code);
        expect(result.discountedFee + result.discountAmount).toBe(fee);
      }
    });

    it('discount should be idempotent (same input → same output)', () => {
      const result1 = calculateDiscountedFee(180_000, 'BCC');
      const result2 = calculateDiscountedFee(180_000, 'BCC');
      expect(result1).toEqual(result2);
    });

    it('discountedFee should never be negative', () => {
      for (const code of ['BCC', 'TPC', 'PTC']) {
        for (const fee of [0, 50_000, 100_000, 150_000, 200_000, 300_000]) {
          const result = calculateDiscountedFee(fee, code);
          expect(result.discountedFee).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
 * 3. EVENT CONTENT INTEGRITY TESTS
 * ═══════════════════════════════════════════════════════════════════════════ */

describe('Event Content', () => {
  describe('getEventContent', () => {
    it('should return content for yif-x-grand-seminar', () => {
      const content = getEventContent('yif-x-grand-seminar');
      expect(content).not.toBeNull();
      expect(content!.code).toBe('yif-x-grand-seminar');
    });

    it('should return null for non-existent event', () => {
      const content = getEventContent('non-existent-event');
      expect(content).toBeNull();
    });

    it('should be case-insensitive', () => {
      const content = getEventContent('YIF-X-GRAND-SEMINAR');
      // The function lowercases the code
      expect(content).not.toBeNull();
    });
  });

  describe('getAllEventCodes', () => {
    it('should return all event codes', () => {
      const codes = getAllEventCodes();
      expect(codes).toContain('yif-x-grand-seminar');
      expect(codes.length).toBeGreaterThan(0);
    });
  });

  describe('YIF x Grand Seminar content', () => {
    let content: EventContent;

    beforeAll(() => {
      content = getEventContent('yif-x-grand-seminar')!;
    });

    it('should have correct name', () => {
      expect(content.name).toBe('YIF x Grand Seminar');
    });

    it('should have a tagline', () => {
      expect(content.tagline).toBeTruthy();
    });

    it('should have an ISO date for countdown', () => {
      expect(content.dateISO).toBeTruthy();
      const date = new Date(content.dateISO);
      expect(date.getTime()).not.toBeNaN();
    });

    it('should have exactly 2 speakers', () => {
      expect(content.speakers).toBeDefined();
      expect(content.speakers!.length).toBe(2);
    });

    it('should have speakers with actual photo URLs (not SVG placeholders)', () => {
      for (const speaker of content.speakers!) {
        expect(speaker.imageUrl).toBeDefined();
        expect(speaker.imageUrl).not.toContain('.svg');
        expect(speaker.imageUrl).toMatch(/\.(jpg|jpeg|JPG|png|webp)$/);
      }
    });

    it('should have speakers with required fields', () => {
      for (const speaker of content.speakers!) {
        expect(speaker.name).toBeTruthy();
        expect(speaker.title).toBeTruthy();
        expect(speaker.organization).toBeTruthy();
        expect(speaker.description).toBeTruthy();
      }
    });

    it('should have speakers with highlights', () => {
      for (const speaker of content.speakers!) {
        expect(speaker.highlights).toBeDefined();
        expect(speaker.highlights!.length).toBeGreaterThan(0);
      }
    });

    it('should have valid links', () => {
      expect(content.links.length).toBeGreaterThan(0);
      for (const link of content.links) {
        expect(link.label).toBeTruthy();
        expect(link.url).toBeTruthy();
      }
    });

    it('should have a register link pointing to the correct path', () => {
      const registerLink = content.links.find((l) =>
        l.label.toLowerCase().includes('register'),
      );
      expect(registerLink).toBeDefined();
      expect(registerLink!.url).toBe('/event/yif-x-grand-seminar/register');
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
 * 4. DISCOUNT ELIGIBILITY — FLOW VALIDATION TESTS
 * ═══════════════════════════════════════════════════════════════════════════ */

describe('Discount Eligibility Flow', () => {
  it('qualifying event code should match event content code', () => {
    // The discount system should reference the same event code
    // that exists in the event content
    const eventCodes = getAllEventCodes();
    for (const qualifyingCode of EVENT_DISCOUNT.qualifyingEventCodes) {
      expect(eventCodes).toContain(qualifyingCode);
    }
  });

  it('discount description should mention early registration', () => {
    expect(EVENT_DISCOUNT.description.toLowerCase()).toContain('early');
    expect(EVENT_DISCOUNT.description.toLowerCase()).toContain('registration');
  });

  it('should correctly apply early-price parity for all competitions during normal phase', () => {
    // All competitions: normal phase fee should be reduced to early price
    for (const [code, pricing] of Object.entries(COMPETITION_PRICING)) {
      const result = calculateDiscountedFee(pricing.normal, code);
      expect(result.discountedFee).toBe(pricing.early);
      expect(result.discountAmount).toBe(pricing.normal - pricing.early);
      expect(result.discountedFee).toBeLessThan(pricing.normal);
      expect(result.discountedFee).toBeGreaterThan(0);
    }
  });

  it('should not apply discount when already at early price', () => {
    for (const [code, pricing] of Object.entries(COMPETITION_PRICING)) {
      const result = calculateDiscountedFee(pricing.early, code);
      expect(result.discountedFee).toBe(pricing.early);
      expect(result.discountAmount).toBe(0);
    }
  });

  it('discountedFee + discountAmount should always equal currentFee', () => {
    for (const [code, pricing] of Object.entries(COMPETITION_PRICING)) {
      for (const fee of [pricing.early, pricing.normal]) {
        const result = calculateDiscountedFee(fee, code);
        expect(result.discountedFee + result.discountAmount).toBe(fee);
      }
    }
  });

  it('discount should be idempotent (same input → same output)', () => {
    const result1 = calculateDiscountedFee(180_000, 'BCC');
    const result2 = calculateDiscountedFee(180_000, 'BCC');
    expect(result1).toEqual(result2);
  });
});
