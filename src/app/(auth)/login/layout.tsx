import { type Metadata } from 'next';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: 'Login | Sandbox IEEE ITB',
  description:
    'Log in now to join a series of exciting events, including a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Learn from experts, showcase your innovations, and compete for awards on Exhibition day.',
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
    canonical: '/login',
    languages: {
      'en-US': '/en-US/login',
      'id-ID': '/id-ID/login',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'Log in now to join a series of exciting events, including a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Learn from experts, showcase your innovations, and compete for awards on Exhibition day.',
    url: 'https://sandbox.ieeeitb.com/login',
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
      'Log in now to join a series of exciting events, including a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Learn from experts, showcase your innovations, and compete for awards on Exhibition day.',
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
