import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { prisma } from '@/lib/db';

import AboutSection from './_components/AboutSection';
import CompetitionsSection from './_components/CompetitionsSection';
import EventSection from './_components/EventSection';
import FAQSection from './_components/FAQSection';
import HeroSection from './_components/HeroSection';
import StatsSection from './_components/StatsSection';
import TimelineSection from './_components/TimelineSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch competitions data — fallback to empty on DB error
  let competitions: Awaited<ReturnType<typeof prisma.competition.findMany>> =
    [];
  try {
    competitions = await prisma.competition.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });
  } catch {
    // DB unreachable — render page without competition data
  }

  // Get earliest registration deadline for countdown
  const earliestDeadline =
    competitions.length > 0
      ? competitions.reduce((earliest, comp) => {
          return new Date(comp.registrationDeadline) < new Date(earliest)
            ? comp.registrationDeadline
            : earliest;
        }, competitions[0].registrationDeadline)
      : new Date();

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#190204] to-[#080203]'>
      <Navbar />

      <main>
        <HeroSection deadline={earliestDeadline} />
        <AboutSection />
        <StatsSection />
        <TimelineSection />
        <CompetitionsSection competitions={competitions} />
        <EventSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
