/**
 * ============================================================================
 * EVENT REGISTRATION & DISCOUNT FLOW — UNIT TESTS
 * ============================================================================
 *
 * Tests covering the full end-to-end flow:
 *   1. Discount config & fee calculation (pure logic)
 *   2. Event content integrity
 *   3. Discount eligibility determination
 *   4. Edge cases (0% discount, 100% discount, large fees, etc.)
 *
 * These tests validate the core business logic without hitting the database
 * or network. API route integration tests would require a test DB.
 * ============================================================================
 */

import { beforeAll, describe, expect, it } from 'vitest';

import {
  calculateDiscountedFee,
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
  it('should have a 5% percentage discount', () => {
    expect(EVENT_DISCOUNT.percentageDiscount).toBe(5);
  });

  it('should have no flat discount', () => {
    expect(EVENT_DISCOUNT.flatDiscount).toBe(0);
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

  it('should have a description', () => {
    expect(EVENT_DISCOUNT.description).toBeTruthy();
    expect(EVENT_DISCOUNT.description).toContain('5%');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
 * 2. calculateDiscountedFee() — PURE LOGIC TESTS
 * ═══════════════════════════════════════════════════════════════════════════ */

describe('calculateDiscountedFee', () => {
  describe('with default EVENT_DISCOUNT (5% percentage, 0 flat)', () => {
    it('should apply 5% discount to BCC early fee (150_000)', () => {
      const result = calculateDiscountedFee(150_000);
      expect(result.discountedFee).toBe(142_500);
      expect(result.discountAmount).toBe(7_500);
    });

    it('should apply 5% discount to BCC normal fee (180_000)', () => {
      const result = calculateDiscountedFee(180_000);
      expect(result.discountedFee).toBe(171_000);
      expect(result.discountAmount).toBe(9_000);
    });

    it('should apply 5% discount to TPC early fee (125_000)', () => {
      const result = calculateDiscountedFee(125_000);
      expect(result.discountedFee).toBe(118_750);
      expect(result.discountAmount).toBe(6_250);
    });

    it('should apply 5% discount to TPC normal fee (150_000)', () => {
      const result = calculateDiscountedFee(150_000);
      expect(result.discountedFee).toBe(142_500);
      expect(result.discountAmount).toBe(7_500);
    });

    it('should apply 5% discount to PTC early fee (200_000)', () => {
      const result = calculateDiscountedFee(200_000);
      expect(result.discountedFee).toBe(190_000);
      expect(result.discountAmount).toBe(10_000);
    });

    it('should apply 5% discount to PTC normal fee (220_000)', () => {
      const result = calculateDiscountedFee(220_000);
      expect(result.discountedFee).toBe(209_000);
      expect(result.discountAmount).toBe(11_000);
    });

    it('should return 0 discount for a 0 fee', () => {
      const result = calculateDiscountedFee(0);
      expect(result.discountedFee).toBe(0);
      expect(result.discountAmount).toBe(0);
    });

    it('should round result to nearest integer', () => {
      // 33_333 * 0.95 = 31_666.35 → rounds to 31_666
      const result = calculateDiscountedFee(33_333);
      expect(Number.isInteger(result.discountedFee)).toBe(true);
      expect(Number.isInteger(result.discountAmount)).toBe(true);
    });
  });

  describe('with custom DiscountConfig', () => {
    it('should apply flat discount only when percentage is 0', () => {
      const config: DiscountConfig = {
        flatDiscount: 10_000,
        percentageDiscount: 0,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      const result = calculateDiscountedFee(150_000, config);
      expect(result.discountedFee).toBe(140_000);
      expect(result.discountAmount).toBe(10_000);
    });

    it('should apply both percentage and flat discount', () => {
      const config: DiscountConfig = {
        flatDiscount: 5_000,
        percentageDiscount: 10,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      // 150_000 * 0.9 = 135_000 - 5_000 = 130_000
      const result = calculateDiscountedFee(150_000, config);
      expect(result.discountedFee).toBe(130_000);
      expect(result.discountAmount).toBe(20_000);
    });

    it('should never return negative fee (flat > original)', () => {
      const config: DiscountConfig = {
        flatDiscount: 500_000,
        percentageDiscount: 0,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      const result = calculateDiscountedFee(100_000, config);
      expect(result.discountedFee).toBe(0);
      expect(result.discountAmount).toBe(100_000);
    });

    it('should never return negative fee (100% + flat)', () => {
      const config: DiscountConfig = {
        flatDiscount: 10_000,
        percentageDiscount: 100,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      const result = calculateDiscountedFee(150_000, config);
      expect(result.discountedFee).toBe(0);
      expect(result.discountAmount).toBe(150_000);
    });

    it('should handle 100% percentage discount', () => {
      const config: DiscountConfig = {
        flatDiscount: 0,
        percentageDiscount: 100,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      const result = calculateDiscountedFee(200_000, config);
      expect(result.discountedFee).toBe(0);
      expect(result.discountAmount).toBe(200_000);
    });

    it('should handle no discount at all (0% and 0 flat)', () => {
      const config: DiscountConfig = {
        flatDiscount: 0,
        percentageDiscount: 0,
        qualifyingEventCodes: ['test'],
        label: 'No Discount',
        description: 'Test',
      };
      const result = calculateDiscountedFee(150_000, config);
      expect(result.discountedFee).toBe(150_000);
      expect(result.discountAmount).toBe(0);
    });

    it('should apply percentage before flat discount (order matters)', () => {
      const config: DiscountConfig = {
        flatDiscount: 10_000,
        percentageDiscount: 50,
        qualifyingEventCodes: ['test'],
        label: 'Test',
        description: 'Test',
      };
      // 100_000 * 0.5 = 50_000 - 10_000 = 40_000 (percentage first)
      // If flat first: (100_000 - 10_000) * 0.5 = 45_000 (wrong order)
      const result = calculateDiscountedFee(100_000, config);
      expect(result.discountedFee).toBe(40_000);
      expect(result.discountAmount).toBe(60_000);
    });

    it('should handle very large fees', () => {
      const result = calculateDiscountedFee(10_000_000);
      expect(result.discountedFee).toBe(9_500_000);
      expect(result.discountAmount).toBe(500_000);
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

    it('should have exactly 3 speakers', () => {
      expect(content.speakers).toBeDefined();
      expect(content.speakers!.length).toBe(3);
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

  it('discount description should mention the correct percentage', () => {
    expect(EVENT_DISCOUNT.description).toContain(
      `${EVENT_DISCOUNT.percentageDiscount}%`,
    );
  });

  it('should correctly calculate discounts for all competition pricing tiers', () => {
    // All known competition fees (early and normal)
    const competitionFees = [
      { competition: 'BCC', type: 'early', fee: 150_000 },
      { competition: 'BCC', type: 'normal', fee: 180_000 },
      { competition: 'TPC', type: 'early', fee: 125_000 },
      { competition: 'TPC', type: 'normal', fee: 150_000 },
      { competition: 'PTC', type: 'early', fee: 200_000 },
      { competition: 'PTC', type: 'normal', fee: 220_000 },
    ];

    for (const { competition, type, fee } of competitionFees) {
      const result = calculateDiscountedFee(fee);
      const expectedDiscounted = Math.round(
        fee * (1 - EVENT_DISCOUNT.percentageDiscount / 100),
      );

      expect(result.discountedFee).toBe(expectedDiscounted);
      expect(result.discountAmount).toBe(fee - expectedDiscounted);
      expect(result.discountedFee).toBeLessThan(fee);
      expect(result.discountedFee).toBeGreaterThan(0);

      // Sanity check: discount amount should be reasonable
      expect(result.discountAmount).toBeGreaterThan(0);
      expect(result.discountAmount).toBeLessThan(fee);
    }
  });

  it('discountedFee + discountAmount should always equal originalFee', () => {
    const fees = [100_000, 125_000, 150_000, 180_000, 200_000, 220_000];
    for (const fee of fees) {
      const result = calculateDiscountedFee(fee);
      expect(result.discountedFee + result.discountAmount).toBe(fee);
    }
  });

  it('discount should be idempotent (same input → same output)', () => {
    const result1 = calculateDiscountedFee(150_000);
    const result2 = calculateDiscountedFee(150_000);
    expect(result1).toEqual(result2);
  });
});
