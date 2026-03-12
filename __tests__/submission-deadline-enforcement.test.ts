/**
 * ============================================================================
 * SUBMISSION DEADLINE ENFORCEMENT — INTEGRATION TESTS
 * ============================================================================
 *
 * Tests for deadline validation logic across all three submission phases.
 * Validates that submissions are blocked outside their designated windows.
 *
 * Test Coverage:
 *   1. Phase window detection (start date, deadline, current phase status)
 *   2. Submission blocking before phase starts
 *   3. Submission blocking after deadline passes
 *   4. Submissions allowed within valid windows
 *   5. Timezone correctness (WIB / UTC+7)
 *   6. Each competition (BCC, PTC, TPC) with their unique schedules
 * ============================================================================
 */

import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Test helper: Create a date in WIB timezone
 */
function wib(dateStr: string): Date {
  return new Date(`${dateStr}+07:00`);
}

/**
 * Test helper: Format date as ISO string
 */
function toISO(date: Date): string {
  return date.toISOString();
}

// ============================================================================
// TEST DATA: Competition Dates (March 12, 2026 is current date)
// ============================================================================

const currentDate = new Date('2026-03-12T15:00:00+07:00');

// PTC dates
const ptcCompetition = {
  code: 'PTC',
  name: 'ProtoTech Competition',
  preliminaryStart: wib('2026-02-23T00:00:00'),
  preliminaryDeadline: wib('2026-03-18T23:59:59'),
  semifinalStart: wib('2026-03-23T00:00:00'),
  semifinalDeadline: wib('2026-03-30T23:59:59'),
  finalStart: wib('2026-04-04T00:00:00'),
  finalDeadline: wib('2026-04-24T23:59:59'),
};

// TPC dates
const tpcCompetition = {
  code: 'TPC',
  name: 'Technovate Paper Competition',
  preliminaryStart: wib('2026-02-23T00:00:00'),
  preliminaryDeadline: wib('2026-03-19T23:59:59'),
  semifinalStart: wib('2026-03-24T00:00:00'),
  semifinalDeadline: wib('2026-04-11T23:59:59'),
  finalStart: null,
  finalDeadline: null,
};

// BCC dates
const bccCompetition = {
  code: 'BCC',
  name: 'Business Case Competition',
  preliminaryStart: wib('2026-02-23T00:00:00'),
  preliminaryDeadline: wib('2026-03-19T23:59:59'),
  semifinalStart: wib('2026-03-24T00:00:00'),
  semifinalDeadline: wib('2026-04-04T23:59:59'),
  finalStart: wib('2026-04-16T00:00:00'),
  finalDeadline: wib('2026-04-22T23:59:59'),
};

// ============================================================================
// HELPER: Submission Window Validator
// ============================================================================

type Competition = {
  code: string;
  name: string;
  preliminaryStart: Date;
  preliminaryDeadline: Date;
  semifinalStart: Date;
  semifinalDeadline: Date;
  finalStart: Date | null;
  finalDeadline: Date | null;
};

function isSubmissionOpen(
  competition: Competition,
  phase: 'preliminary' | 'semifinal' | 'final',
  now: Date = currentDate,
): boolean {
  switch (phase) {
    case 'preliminary':
      return (
        now >= competition.preliminaryStart &&
        now <= competition.preliminaryDeadline
      );
    case 'semifinal':
      return (
        now >= competition.semifinalStart &&
        now <= competition.semifinalDeadline
      );
    case 'final':
      if (!competition.finalStart || !competition.finalDeadline) return false;
      return now >= competition.finalStart && now <= competition.finalDeadline;
    default:
      return false;
  }
}

function getDeadlineStatus(
  competition: Competition,
  phase: 'preliminary' | 'semifinal' | 'final',
  now: Date = currentDate,
): { status: 'before_open' | 'open' | 'after_deadline' } {
  let start, deadline;

  switch (phase) {
    case 'preliminary':
      start = competition.preliminaryStart;
      deadline = competition.preliminaryDeadline;
      break;
    case 'semifinal':
      start = competition.semifinalStart;
      deadline = competition.semifinalDeadline;
      break;
    case 'final':
      if (!competition.finalStart || !competition.finalDeadline) {
        return { status: 'after_deadline' };
      }
      start = competition.finalStart;
      deadline = competition.finalDeadline;
      break;
    default:
      return { status: 'after_deadline' };
  }

  if (now < start) return { status: 'before_open' };
  if (now > deadline) return { status: 'after_deadline' };
  return { status: 'open' };
}

// ============================================================================
// TESTS
// ============================================================================

describe('Submission Deadline Enforcement', () => {
  describe('PTC (ProtoTech Competition)', () => {
    it('should allow preliminary submissions within window (Mar 12 is within Feb 23 - Mar 18)', () => {
      expect(isSubmissionOpen(ptcCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(ptcCompetition, 'preliminary', currentDate).status,
      ).toBe('open');
    });

    it('should block preliminary submissions before Feb 23', () => {
      const beforeOpen = new Date('2026-02-22T23:59:59+07:00');
      expect(isSubmissionOpen(ptcCompetition, 'preliminary', beforeOpen)).toBe(
        false,
      );
      expect(
        getDeadlineStatus(ptcCompetition, 'preliminary', beforeOpen).status,
      ).toBe('before_open');
    });

    it('should block preliminary submissions after Mar 18 23:59 WIB', () => {
      const afterDeadline = new Date('2026-03-19T00:00:00+07:00');
      expect(
        isSubmissionOpen(ptcCompetition, 'preliminary', afterDeadline),
      ).toBe(false);
      expect(
        getDeadlineStatus(ptcCompetition, 'preliminary', afterDeadline).status,
      ).toBe('after_deadline');
    });

    it('should block semifinal submissions before Mar 23', () => {
      const beforeSemifinal = new Date('2026-03-22T23:59:59+07:00');
      expect(
        isSubmissionOpen(ptcCompetition, 'semifinal', beforeSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(ptcCompetition, 'semifinal', beforeSemifinal).status,
      ).toBe('before_open');
    });

    it('should allow semifinal submissions within window (Mar 23 - Mar 30)', () => {
      const duringPhase = new Date('2026-03-27T12:00:00+07:00');
      expect(isSubmissionOpen(ptcCompetition, 'semifinal', duringPhase)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(ptcCompetition, 'semifinal', duringPhase).status,
      ).toBe('open');
    });

    it('should block semifinal submissions after Mar 30 23:59 WIB', () => {
      const afterSemifinal = new Date('2026-03-31T00:00:00+07:00');
      expect(
        isSubmissionOpen(ptcCompetition, 'semifinal', afterSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(ptcCompetition, 'semifinal', afterSemifinal).status,
      ).toBe('after_deadline');
    });

    it('should block final submissions before Apr 4', () => {
      const beforeFinal = new Date('2026-04-03T23:59:59+07:00');
      expect(isSubmissionOpen(ptcCompetition, 'final', beforeFinal)).toBe(
        false,
      );
      expect(
        getDeadlineStatus(ptcCompetition, 'final', beforeFinal).status,
      ).toBe('before_open');
    });

    it('should allow final submissions within window (Apr 4 - Apr 24)', () => {
      const duringFinal = new Date('2026-04-12T10:00:00+07:00');
      expect(isSubmissionOpen(ptcCompetition, 'final', duringFinal)).toBe(true);
      expect(
        getDeadlineStatus(ptcCompetition, 'final', duringFinal).status,
      ).toBe('open');
    });

    it('should block final submissions after Apr 24 23:59 WIB', () => {
      const afterFinal = new Date('2026-04-25T00:00:00+07:00');
      expect(isSubmissionOpen(ptcCompetition, 'final', afterFinal)).toBe(false);
      expect(
        getDeadlineStatus(ptcCompetition, 'final', afterFinal).status,
      ).toBe('after_deadline');
    });
  });

  describe('TPC (Technovate Paper Competition)', () => {
    it('should allow preliminary submissions within window (Feb 23 - Mar 19)', () => {
      expect(isSubmissionOpen(tpcCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(tpcCompetition, 'preliminary', currentDate).status,
      ).toBe('open');
    });

    it('should block preliminary submissions after Mar 19 23:59 WIB', () => {
      const afterDeadline = new Date('2026-03-20T00:00:00+07:00');
      expect(
        isSubmissionOpen(tpcCompetition, 'preliminary', afterDeadline),
      ).toBe(false);
      expect(
        getDeadlineStatus(tpcCompetition, 'preliminary', afterDeadline).status,
      ).toBe('after_deadline');
    });

    it('should block semifinal submissions before Mar 24', () => {
      const beforeSemifinal = new Date('2026-03-23T23:59:59+07:00');
      expect(
        isSubmissionOpen(tpcCompetition, 'semifinal', beforeSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(tpcCompetition, 'semifinal', beforeSemifinal).status,
      ).toBe('before_open');
    });

    it('should allow semifinal submissions within window (Mar 24 - Apr 11)', () => {
      const duringPhase = new Date('2026-04-01T14:30:00+07:00');
      expect(isSubmissionOpen(tpcCompetition, 'semifinal', duringPhase)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(tpcCompetition, 'semifinal', duringPhase).status,
      ).toBe('open');
    });

    it('should block semifinal submissions after Apr 11 23:59 WIB', () => {
      const afterSemifinal = new Date('2026-04-12T00:00:00+07:00');
      expect(
        isSubmissionOpen(tpcCompetition, 'semifinal', afterSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(tpcCompetition, 'semifinal', afterSemifinal).status,
      ).toBe('after_deadline');
    });

    it('should not allow final submissions (TPC has no final phase)', () => {
      const anytime = new Date('2026-04-20T10:00:00+07:00');
      expect(isSubmissionOpen(tpcCompetition, 'final', anytime)).toBe(false);
    });
  });

  describe('BCC (Business Case Competition)', () => {
    it('should allow preliminary submissions within window (Feb 23 - Mar 19)', () => {
      expect(isSubmissionOpen(bccCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(bccCompetition, 'preliminary', currentDate).status,
      ).toBe('open');
    });

    it('should block preliminary submissions after Mar 19 23:59 WIB', () => {
      const afterDeadline = new Date('2026-03-20T00:00:00+07:00');
      expect(
        isSubmissionOpen(bccCompetition, 'preliminary', afterDeadline),
      ).toBe(false);
      expect(
        getDeadlineStatus(bccCompetition, 'preliminary', afterDeadline).status,
      ).toBe('after_deadline');
    });

    it('should block semifinal submissions before Mar 24', () => {
      const beforeSemifinal = new Date('2026-03-23T23:59:59+07:00');
      expect(
        isSubmissionOpen(bccCompetition, 'semifinal', beforeSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(bccCompetition, 'semifinal', beforeSemifinal).status,
      ).toBe('before_open');
    });

    it('should allow semifinal submissions within window (Mar 24 - Apr 4)', () => {
      const duringPhase = new Date('2026-03-30T16:45:00+07:00');
      expect(isSubmissionOpen(bccCompetition, 'semifinal', duringPhase)).toBe(
        true,
      );
      expect(
        getDeadlineStatus(bccCompetition, 'semifinal', duringPhase).status,
      ).toBe('open');
    });

    it('should block semifinal submissions after Apr 4 23:59 WIB', () => {
      const afterSemifinal = new Date('2026-04-05T00:00:00+07:00');
      expect(
        isSubmissionOpen(bccCompetition, 'semifinal', afterSemifinal),
      ).toBe(false);
      expect(
        getDeadlineStatus(bccCompetition, 'semifinal', afterSemifinal).status,
      ).toBe('after_deadline');
    });

    it('should block final submissions before Apr 16', () => {
      const beforeFinal = new Date('2026-04-15T23:59:59+07:00');
      expect(isSubmissionOpen(bccCompetition, 'final', beforeFinal)).toBe(
        false,
      );
      expect(
        getDeadlineStatus(bccCompetition, 'final', beforeFinal).status,
      ).toBe('before_open');
    });

    it('should allow final submissions within window (Apr 16 - Apr 22)', () => {
      const duringFinal = new Date('2026-04-19T11:00:00+07:00');
      expect(isSubmissionOpen(bccCompetition, 'final', duringFinal)).toBe(true);
      expect(
        getDeadlineStatus(bccCompetition, 'final', duringFinal).status,
      ).toBe('open');
    });

    it('should block final submissions after Apr 22 23:59 WIB', () => {
      const afterFinal = new Date('2026-04-23T00:00:00+07:00');
      expect(isSubmissionOpen(bccCompetition, 'final', afterFinal)).toBe(false);
      expect(
        getDeadlineStatus(bccCompetition, 'final', afterFinal).status,
      ).toBe('after_deadline');
    });
  });

  describe('Timezone Correctness (WIB / UTC+7)', () => {
    it('should handle edge case at exact deadline (23:59:59 WIB)', () => {
      const exactDeadline = wib('2026-03-18T23:59:59');
      expect(
        isSubmissionOpen(ptcCompetition, 'preliminary', exactDeadline),
      ).toBe(true);
    });

    it('should block submission exactly 1 second after deadline', () => {
      const afterDeadline = wib('2026-03-19T00:00:00');
      expect(
        isSubmissionOpen(ptcCompetition, 'preliminary', afterDeadline),
      ).toBe(false);
    });

    it('should handle submission at start of phase', () => {
      const atStart = wib('2026-03-23T00:00:00');
      expect(isSubmissionOpen(ptcCompetition, 'semifinal', atStart)).toBe(true);
    });

    it('should correctly convert dates to WIB timezone', () => {
      const wibDate = wib('2026-03-12T15:00:00');
      // Verify it's correctly interpreted as WIB
      const iso = toISO(wibDate);
      expect(iso).toContain('2026-03-12');
      // WIB is UTC+7, so 15:00 WIB = 08:00 UTC
      // The ISO string will be in format like "2026-03-12T08:00:00.000Z"
      expect(iso).toMatch(/2026-03-12T08:00:00/);
    });
  });

  describe('Current Phase Status (March 12, 2026)', () => {
    it('PTC should be in preliminary phase', () => {
      expect(isSubmissionOpen(ptcCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(isSubmissionOpen(ptcCompetition, 'semifinal', currentDate)).toBe(
        false,
      );
      expect(isSubmissionOpen(ptcCompetition, 'final', currentDate)).toBe(
        false,
      );
    });

    it('TPC should be in preliminary phase', () => {
      expect(isSubmissionOpen(tpcCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(isSubmissionOpen(tpcCompetition, 'semifinal', currentDate)).toBe(
        false,
      );
      expect(isSubmissionOpen(tpcCompetition, 'final', currentDate)).toBe(
        false,
      );
    });

    it('BCC should be in preliminary phase', () => {
      expect(isSubmissionOpen(bccCompetition, 'preliminary', currentDate)).toBe(
        true,
      );
      expect(isSubmissionOpen(bccCompetition, 'semifinal', currentDate)).toBe(
        false,
      );
      expect(isSubmissionOpen(bccCompetition, 'final', currentDate)).toBe(
        false,
      );
    });
  });

  describe('Timeline Consistency Checks', () => {
    it('preliminary should end before semifinal starts for each competition', () => {
      expect(
        ptcCompetition.preliminaryDeadline < ptcCompetition.semifinalStart,
      ).toBe(true);
      expect(
        tpcCompetition.preliminaryDeadline < tpcCompetition.semifinalStart,
      ).toBe(true);
      expect(
        bccCompetition.preliminaryDeadline < bccCompetition.semifinalStart,
      ).toBe(true);
    });

    it('semifinal should end before final starts (where applicable)', () => {
      if (ptcCompetition.finalStart) {
        expect(
          ptcCompetition.semifinalDeadline < ptcCompetition.finalStart,
        ).toBe(true);
      }
      if (bccCompetition.finalStart) {
        expect(
          bccCompetition.semifinalDeadline < bccCompetition.finalStart,
        ).toBe(true);
      }
    });

    it('TPC should not have final phase dates', () => {
      expect(tpcCompetition.finalStart).toBe(null);
      expect(tpcCompetition.finalDeadline).toBe(null);
    });

    it('PTC and BCC should have final phase dates', () => {
      expect(ptcCompetition.finalStart).not.toBe(null);
      expect(ptcCompetition.finalDeadline).not.toBe(null);
      expect(bccCompetition.finalStart).not.toBe(null);
      expect(bccCompetition.finalDeadline).not.toBe(null);
    });
  });
});
