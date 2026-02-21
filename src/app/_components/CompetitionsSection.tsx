import Link from 'next/link';

interface Competition {
  id: string;
  code: string;
  name: string;
  description: string | null;
  registrationFee: number;
  minTeamSize: number;
  maxTeamSize: number;
}

interface CompetitionsSectionProps {
  competitions: Competition[];
}

export default function CompetitionsSection({
  competitions,
}: CompetitionsSectionProps) {
  const getCompetitionColor = (code: string) => {
    switch (code) {
      case 'BCC':
        return 'from-[#8B3A3A] to-[#5A2424]';
      case 'TPC':
        return 'from-[#8B5A3A] to-[#5A3824]';
      case 'PTC':
        return 'from-[#8B2635] to-[#5A1623]';
      default:
        return 'from-[#8B3A3A] to-[#5A2424]';
    }
  };

  const getShortName = (name: string) => {
    return name;
  };

  const getPricing = (code: string) => {
    switch (code) {
      case 'BCC':
        return { early: 150000, normal: 180000 };
      case 'TPC':
        return { early: 125000, normal: 150000 };
      case 'PTC':
        return { early: 200000, normal: 220000 };
      default:
        return { early: 0, normal: 0 };
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <section id='competitions' className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 font-gemunu'
          style={{
            background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Competitions
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className={`bg-gradient-to-br ${getCompetitionColor(competition.code)} rounded-3xl md:rounded-[54px] p-6 md:p-8 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300`}
            >
              <h3 className='text-2xl sm:text-3xl font-bold text-white font-gemunu mb-3 md:mb-4'>
                {getShortName(competition.name)}
              </h3>

              <p className='text-white/80 font-gemunu mb-4 md:mb-6 line-clamp-4 text-sm sm:text-base'>
                {competition.description}
              </p>

              <div className='space-y-2 mb-4 md:mb-6 text-white/70 font-gemunu text-xs sm:text-sm'>
                <p>
                  Team size:{' '}
                  {competition.minTeamSize === competition.maxTeamSize
                    ? competition.minTeamSize
                    : `${competition.minTeamSize}-${competition.maxTeamSize}`}{' '}
                  members
                </p>
                <p>
                  Early: {formatCurrency(getPricing(competition.code).early)}
                </p>
                <p>
                  Normal: {formatCurrency(getPricing(competition.code).normal)}
                </p>
              </div>

              <Link
                href={`/competitions/${competition.code.toLowerCase()}`}
                className='block w-full h-[35px] bg-black/30 hover:bg-black/50 text-white text-center leading-[35px] rounded-full font-gemunu font-semibold transition-colors border border-white/10 text-sm sm:text-base'
              >
                Explore Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
