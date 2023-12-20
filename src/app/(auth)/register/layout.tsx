import { type Metadata } from 'next';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: 'Register | Sandbox IEEE ITB',
  description: `Sign up today and become part of a series of events that will challenge and inspire you. By registering, you'll gain access to a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Plus, you'll have the chance to learn from expert trainers, judges, and webinar speakers, showcase your innovations, and compete for awards on Exhibition day.`,
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
    canonical: '/register',
    languages: {
      'en-US': '/en-US/register',
      'id-ID': '/id-ID/register',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description: `Sign up today and become part of a series of events that will challenge and inspire you. By registering, you'll gain access to a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Plus, you'll have the chance to learn from expert trainers, judges, and webinar speakers, showcase your innovations, and compete for awards on Exhibition day.`,
    url: 'https://sandbox.ieeeitb.com/register',
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
    description: `Sign up today and become part of a series of events that will challenge and inspire you. By registering, you'll gain access to a Grand Seminar, the ProtoTech Contest (a practical electrical engineering contest), and the Technovate Paper Competition (a research and technical documents competition). Plus, you'll have the chance to learn from expert trainers, judges, and webinar speakers, showcase your innovations, and compete for awards on Exhibition day.`,
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
