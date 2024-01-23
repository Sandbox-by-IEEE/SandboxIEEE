import { type Metadata } from 'next';
import React from 'react';

const LayoutRegistration = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LayoutRegistration;
export const metadata: Metadata = {
  title: 'TPC Registration | Sandbox IEEE ITB',
  description:
    'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
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
    canonical: '/events/tpc/registration',
    languages: {
      'en-US': '/en-US/events/tpc/registration',
      'id-ID': '/id-ID/events/tpc/registration',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
    url: 'https://sandbox.ieeeitb.com/events/tpc/registration',
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
      'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
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
