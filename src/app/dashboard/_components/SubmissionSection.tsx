'use client';

import { Clock, Lock } from 'lucide-react';

import { formatDateWIB } from '@/lib/phase-utils';

import FinalSubmissionForm from './submissions/FinalSubmissionForm';
import PreliminarySubmissionForm from './submissions/PreliminarySubmissionForm';
import SemifinalSubmissionForm from './submissions/SemifinalSubmissionForm';

interface SubmissionSectionProps {
  registration: any;
  onSuccess: () => void;
}

export default function SubmissionSection({
  registration,
  onSuccess,
}: SubmissionSectionProps) {
  const {
    currentPhase,
    isPreliminaryQualified,
    isSemifinalQualified,
    competition,
  } = registration;

  // Determine if a phase is actually open for submissions
  const now = new Date();
  const preliminaryStart = new Date(competition.preliminaryStart);
  const preliminaryDeadline = new Date(competition.preliminaryDeadline);
  const semifinalStart = new Date(competition.semifinalStart);
  const semifinalDeadline = new Date(competition.semifinalDeadline);
  const finalStart = competition.finalStart
    ? new Date(competition.finalStart)
    : null;
  const finalDeadline = competition.finalDeadline
    ? new Date(competition.finalDeadline)
    : null;

  // Phase not yet started checks
  const isPreliminaryNotStarted =
    currentPhase === 'preliminary' && now < preliminaryStart;
  const isSemifinalNotStarted =
    currentPhase === 'semifinal' && now < semifinalStart;
  const isFinalNotStarted =
    currentPhase === 'final' && finalStart && now < finalStart;

  // Freeze state: deadline has passed
  const isPreliminaryFrozen =
    currentPhase === 'preliminary' && now > preliminaryDeadline;
  const isSemifinalFrozen =
    currentPhase === 'semifinal' &&
    isPreliminaryQualified &&
    now > semifinalDeadline;
  const isFinalFrozen =
    currentPhase === 'final' &&
    isSemifinalQualified &&
    finalDeadline &&
    now > finalDeadline;

  // Wrap in outer container like registration page
  return (
    <div className='relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl mb-8'>
      {/* Phase 1: Preliminary (after registration approved) */}
      {currentPhase === 'preliminary' &&
        !isPreliminaryNotStarted &&
        !isPreliminaryFrozen && (
          <PreliminarySubmissionForm
            registration={registration}
            onSuccess={onSuccess}
          />
        )}

      {/* Preliminary not yet started */}
      {isPreliminaryNotStarted && (
        <NotStartedState phase='Preliminary' startDate={preliminaryStart} />
      )}

      {/* Preliminary frozen */}
      {isPreliminaryFrozen && (
        <FreezeState
          phase='Preliminary'
          message='The preliminary submission deadline has passed. Results will be announced soon.'
        />
      )}

      {/* Phase 2: Semifinal (after preliminary approved) */}
      {currentPhase === 'semifinal' &&
        !isSemifinalNotStarted &&
        !isSemifinalFrozen && (
          <SemifinalSubmissionForm
            registration={registration}
            onSuccess={onSuccess}
          />
        )}

      {/* Semifinal not yet started */}
      {isSemifinalNotStarted && (
        <NotStartedState phase='Semifinal' startDate={semifinalStart} />
      )}

      {/* Phase 2 Frozen: Semifinal deadline passed, waiting */}
      {isSemifinalFrozen && (
        <FreezeState
          phase='Semifinal'
          message='The semifinal submission deadline has passed. Results will be announced soon.'
        />
      )}

      {/* Phase 3: Final */}
      {currentPhase === 'final' && !isFinalNotStarted && !isFinalFrozen && (
        <FinalSubmissionForm
          registration={registration}
          onSuccess={onSuccess}
        />
      )}

      {/* Final not yet started */}
      {isFinalNotStarted && finalStart && (
        <NotStartedState phase='Final' startDate={finalStart} />
      )}

      {/* Phase 3 Frozen: Final deadline passed, waiting */}
      {isFinalFrozen && (
        <FreezeState
          phase='Final'
          message='The final submission deadline has passed. Winners will be announced soon. Good luck! 🏆'
        />
      )}
    </div>
  );
}

function NotStartedState({
  phase,
  startDate,
}: {
  phase: string;
  startDate: Date;
}) {
  return (
    <div className='text-center py-12'>
      <div className='w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center border-2 border-blue-500/30 mb-6'>
        <Clock className='w-10 h-10 text-blue-400' />
      </div>
      <h3 className='text-2xl font-bold mb-3 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
        {phase} Phase Not Yet Open
      </h3>
      <p className='text-gray-400 text-base max-w-md mx-auto'>
        Submissions will open on {formatDateWIB(startDate)}. Please check back
        later.
      </p>
    </div>
  );
}

function FreezeState({ phase, message }: { phase: string; message: string }) {
  return (
    <div className='text-center py-12'>
      <div className='w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center border-2 border-purple-500/30 mb-6'>
        <Lock className='w-10 h-10 text-purple-400' />
      </div>
      <h3 className='text-2xl font-bold mb-3 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
        {phase} Phase Complete
      </h3>
      <p className='text-gray-400 text-base max-w-md mx-auto'>{message}</p>
    </div>
  );
}
