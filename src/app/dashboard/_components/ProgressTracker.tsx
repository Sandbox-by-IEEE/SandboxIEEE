'use client';

interface ProgressTrackerProps {
  currentPhase:
    | 'registration'
    | 'preliminary'
    | 'payment'
    | 'semifinal'
    | 'final';
  verificationStatus: string;
  isPreliminaryQualified: boolean;
  isSemifinalQualified: boolean;
  competition: any;
}

export default function ProgressTracker({
  currentPhase,
  verificationStatus,
  isPreliminaryQualified,
  isSemifinalQualified,
  competition,
}: ProgressTrackerProps) {
  // Define phases to display
  const phases = [
    { key: 'preliminary', label: 'Preliminary' },
    { key: 'semifinal', label: 'Semi Final' },
    { key: 'final', label: 'Final' },
  ];

  const getCurrentPhaseIndex = () => {
    if (currentPhase === 'registration' || currentPhase === 'preliminary')
      return 0;
    if (currentPhase === 'payment' || currentPhase === 'semifinal') return 1;
    if (currentPhase === 'final') return 2;
    return 0;
  };

  const currentIndex = getCurrentPhaseIndex();

  return (
    <div className='relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl mb-8'>
      {/* Progress Header - Same style as registration */}
      <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-8 border border-white/10'>
        <h2 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
          {phases[currentIndex]?.label || 'Progress'}
        </h2>

        {/* Progress Indicator - EXACT MATCH with registration */}
        <div className='flex items-center justify-center gap-2'>
          {phases.map((phase, index) => {
            const step = index + 1;
            return (
              <div key={phase.key} className='flex items-center'>
                <div className='flex flex-col items-center'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step === currentIndex + 1
                        ? 'bg-gradient-to-br from-[#FFCD8D] to-[#E8A05D] text-[#2d0e0e] scale-110 shadow-lg shadow-orange-500/30'
                        : step < currentIndex + 1
                          ? 'bg-[#6B2D2D] text-white border-2 border-[#FFCD8D]/50'
                          : 'bg-[#3d1a1a]/60 text-gray-500 border-2 border-gray-600/30'
                    }`}
                  >
                    {step}
                  </div>
                  <span className='text-xs text-gray-400 mt-2 hidden lg:block max-w-[100px] text-center leading-tight'>
                    {phase.label}
                  </span>
                </div>
                {step < phases.length && (
                  <div
                    className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all ${
                      step < currentIndex + 1
                        ? 'bg-gradient-to-r from-[#FFCD8D] to-[#E8A05D]'
                        : 'bg-gray-700/50'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
