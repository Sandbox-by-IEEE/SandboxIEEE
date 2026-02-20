/**
 * ============================================================================
 * PHASE UTILITY MODULE
 * ============================================================================
 *
 * Real-time phase evaluation based on Competition date fields.
 * All phase checks use the DB dates — no hardcoded dates.
 *
 * Usage:
 *   import { getPhaseStatus, isRegistrationOpen } from '@/lib/phase-utils';
 *   const status = getPhaseStatus(competition);
 * ============================================================================
 */

export interface CompetitionDates {
  registrationOpen: Date;
  registrationDeadline: Date;
  preliminaryStart: Date;
  preliminaryDeadline: Date;
  semifinalStart: Date;
  semifinalDeadline: Date;
  finalStart: Date | null;
  finalDeadline: Date | null;
  grandFinalDate: Date | null;
}

export type PhaseKey =
  | 'pre_registration'
  | 'registration'
  | 'preliminary'
  | 'semifinal'
  | 'final'
  | 'grand_final'
  | 'completed';

export interface PhaseStatus {
  currentPhase: PhaseKey;
  label: string;
  isRegistrationOpen: boolean;
  isPreliminaryOpen: boolean;
  isSemifinalOpen: boolean;
  isFinalOpen: boolean;
  isGrandFinal: boolean;
  isCompleted: boolean;
  nextDeadline: Date | null;
  nextDeadlineLabel: string | null;
}

/**
 * Determine the active phase status for a competition in real-time.
 * Uses the competition's DB date fields.
 */
export function getPhaseStatus(competition: CompetitionDates): PhaseStatus {
  const now = new Date();

  const regOpen = new Date(competition.registrationOpen);
  const regClose = new Date(competition.registrationDeadline);
  const prelimStart = new Date(competition.preliminaryStart);
  const prelimEnd = new Date(competition.preliminaryDeadline);
  const semiStart = new Date(competition.semifinalStart);
  const semiEnd = new Date(competition.semifinalDeadline);
  const finalStart = competition.finalStart
    ? new Date(competition.finalStart)
    : null;
  const finalEnd = competition.finalDeadline
    ? new Date(competition.finalDeadline)
    : null;
  const grandFinal = competition.grandFinalDate
    ? new Date(competition.grandFinalDate)
    : null;

  // Check phases in reverse order (latest first) for correct precedence
  // Grand final completed
  if (grandFinal && now > grandFinal) {
    return {
      currentPhase: 'completed',
      label: 'Competition Completed',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: true,
      nextDeadline: null,
      nextDeadlineLabel: null,
    };
  }

  // Grand Final day
  if (grandFinal && now >= grandFinal) {
    return {
      currentPhase: 'grand_final',
      label: 'Grand Final & Awarding',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: true,
      isCompleted: false,
      nextDeadline: grandFinal,
      nextDeadlineLabel: 'Grand Final',
    };
  }

  // Final phase (if exists)
  if (finalStart && finalEnd && now >= finalStart && now <= finalEnd) {
    return {
      currentPhase: 'final',
      label: 'Final Phase',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: true,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: finalEnd,
      nextDeadlineLabel: 'Final Submission Deadline',
    };
  }

  // Semifinal phase
  if (now >= semiStart && now <= semiEnd) {
    return {
      currentPhase: 'semifinal',
      label: 'Semifinal Phase',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: true,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: semiEnd,
      nextDeadlineLabel: 'Semifinal Deadline',
    };
  }

  // Preliminary phase
  if (now >= prelimStart && now <= prelimEnd) {
    return {
      currentPhase: 'preliminary',
      label: 'Preliminary Phase',
      isRegistrationOpen: now >= regOpen && now <= regClose,
      isPreliminaryOpen: true,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: prelimEnd,
      nextDeadlineLabel: 'Preliminary Deadline',
    };
  }

  // Registration open
  if (now >= regOpen && now <= regClose) {
    return {
      currentPhase: 'registration',
      label: 'Registration Open',
      isRegistrationOpen: true,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: regClose,
      nextDeadlineLabel: 'Registration Closes',
    };
  }

  // Pre-registration (before registration opens)
  if (now < regOpen) {
    return {
      currentPhase: 'pre_registration',
      label: 'Coming Soon',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: regOpen,
      nextDeadlineLabel: 'Registration Opens',
    };
  }

  // Between phases (gap period) — default to next upcoming phase
  if (now > regClose && now < prelimStart) {
    return {
      currentPhase: 'preliminary',
      label: 'Preliminary Phase Starting',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: prelimStart,
      nextDeadlineLabel: 'Preliminary Starts',
    };
  }

  // After preliminary, before semifinal
  if (now > prelimEnd && now < semiStart) {
    return {
      currentPhase: 'semifinal',
      label: 'Awaiting Semifinal',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: semiStart,
      nextDeadlineLabel: 'Semifinal Starts',
    };
  }

  // After semifinal, before final
  if (finalStart && now > semiEnd && now < finalStart) {
    return {
      currentPhase: 'final',
      label: 'Awaiting Final',
      isRegistrationOpen: false,
      isPreliminaryOpen: false,
      isSemifinalOpen: false,
      isFinalOpen: false,
      isGrandFinal: false,
      isCompleted: false,
      nextDeadline: finalStart,
      nextDeadlineLabel: 'Final Starts',
    };
  }

  // Fallback — completed
  return {
    currentPhase: 'completed',
    label: 'Competition Completed',
    isRegistrationOpen: false,
    isPreliminaryOpen: false,
    isSemifinalOpen: false,
    isFinalOpen: false,
    isGrandFinal: false,
    isCompleted: true,
    nextDeadline: null,
    nextDeadlineLabel: null,
  };
}

/**
 * Check if registration is currently open for a competition.
 */
export function isRegistrationOpen(competition: CompetitionDates): boolean {
  const now = new Date();
  return (
    now >= new Date(competition.registrationOpen) &&
    now <= new Date(competition.registrationDeadline)
  );
}

/**
 * Check if a specific submission phase is currently open.
 */
export function isSubmissionOpen(
  competition: CompetitionDates,
  phase: 'preliminary' | 'semifinal' | 'final',
): boolean {
  const now = new Date();

  switch (phase) {
    case 'preliminary':
      return (
        now >= new Date(competition.preliminaryStart) &&
        now <= new Date(competition.preliminaryDeadline)
      );
    case 'semifinal':
      return (
        now >= new Date(competition.semifinalStart) &&
        now <= new Date(competition.semifinalDeadline)
      );
    case 'final':
      if (!competition.finalStart || !competition.finalDeadline) return false;
      return (
        now >= new Date(competition.finalStart) &&
        now <= new Date(competition.finalDeadline)
      );
    default:
      return false;
  }
}

/**
 * Format a date to WIB (Jakarta time) display string.
 */
export function formatDateWIB(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    timeZone: 'Asia/Jakarta',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format date to short format (e.g., "21 Feb").
 */
export function formatDateShort(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    timeZone: 'Asia/Jakarta',
    month: 'short',
    day: 'numeric',
  });
}
