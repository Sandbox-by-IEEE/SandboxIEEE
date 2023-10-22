import { Metadata } from 'next';

import Footer from '@/components/footer';
import NavBar from '@/components/Navbar';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-clip'>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default SiteLayout;

export const metadata: Metadata = {
  title: 'Coming Soon | Sandbox IEEE ITB',
  description:
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  category: 'Technology',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'IEEE ITB',
    'ITB',
    'TPC',
    'PTC',
  ],
  colorScheme: 'dark',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US/',
      'id-ID': '/id-ID/',
    },
  },
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  verification: {
    google: 'GNYbAgsMCZ49BqBiEJz5TQE0X3H0XZGtURIryEvrNU8',
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    url: 'https://sandbox.ieeeitb.com/',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: 'https://www.datocms-assets.com/104656/1697807711-sandbox.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    images: [
      {
        url: 'https://www.datocms-assets.com/104656/1697807711-sandbox.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
  },
};
