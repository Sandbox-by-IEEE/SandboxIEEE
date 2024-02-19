import { type Metadata } from 'next';
const ProtectedLayout = ({ children }) => {
  return <>{children}</>;
};
export default ProtectedLayout;

export const metadata: Metadata = {
  title: 'QR | Sandbox IEEE ITB',
  description:
    'RSVP form for VIP Guests of Sandbox IEEE ITB. Please fill the form to confirm your attendance.',
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
    canonical: '/rsvp',
    languages: {
      'en-US': '/en-US/rsvp',
      'id-ID': '/id-ID/rsvp',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'RSVP form for VIP Guests of Sandbox IEEE ITB. Please fill the form to confirm your attendance.',
    url: 'https://sandbox.ieeeitb.com/rsvp',
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
      'RSVP form for VIP Guests of Sandbox IEEE ITB. Please fill the form to confirm your attendance.',
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
