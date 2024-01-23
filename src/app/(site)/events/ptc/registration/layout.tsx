import { type Metadata } from 'next';
import React from 'react';

const LayoutRegistration = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LayoutRegistration;

export const metadata: Metadata = {
  title: 'PTC Registration | Sandbox IEEE ITB',
  description:
    'ProtoTech Contest is a national-scale Prototype innovation competition with ten stages, namely abstract submission, PTC semi-finalist announcement,  technical mentoring by IEEE, idea pitching, introduction to professional mentor, PTC finalist announcement, professional mentor selection, prototyping weekly, progress report, and final pitching.',
  generator: 'Next.js',
  category: 'Events',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'Sandbox IEEE',
    'IEEE ITB',
    'ITB',
    'Lomba',
    'TPC',
    'PTC',
  ],
  colorScheme: 'normal',
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  alternates: {
    canonical: '/events/ptc/registration',
    languages: {
      'en-US': '/en-US/events/ptc/registration',
      'id-ID': '/id-ID/events/ptc/registration',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'ProtoTech Contest is a national-scale Prototype innovation competition with ten stages, namely abstract submission, PTC semi-finalist announcement,  technical mentoring by IEEE, idea pitching, introduction to professional mentor, PTC finalist announcement, professional mentor selection, prototyping weekly, progress report, and final pitching.',
    url: 'https://sandbox.ieeeitb.com/events/ptc/registration',
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
      'ProtoTech Contest is a national-scale Prototype innovation competition with ten stages, namely abstract submission, PTC semi-finalist announcement,  technical mentoring by IEEE, idea pitching, introduction to professional mentor, PTC finalist announcement, professional mentor selection, prototyping weekly, progress report, and final pitching.',
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
