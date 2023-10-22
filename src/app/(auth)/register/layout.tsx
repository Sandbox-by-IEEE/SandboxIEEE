import { Metadata } from 'next';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children};</>;
}
export const metadata: Metadata = {
  title: 'Login | Sandbox IEEE ITB',
  description:
    "Welcome back! Log in to your account to access exclusive content, personalized recommendations, and a seamless experience tailored just for you. Your journey towards innovation and learning starts here. If you don't have an account yet, sign up now to unlock a world of opportunities. Let's get started - log in and make the most of what we have to offer. We're glad to have you with us!",
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
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  alternates: {
    canonical: '/login',
    languages: {
      'en-US': '/en-US/login',
      'id-ID': '/id-ID/login',
    },
  },
  verification: {
    google: 'GNYbAgsMCZ49BqBiEJz5TQE0X3H0XZGtURIryEvrNU8',
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Welcome back! Log in to your account to access exclusive content, personalized recommendations, and a seamless experience tailored just for you. Your journey towards innovation and learning starts here. If you don't have an account yet, sign up now to unlock a world of opportunities. Let's get started - log in and make the most of what we have to offer. We're glad to have you with us!",
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
      "Welcome back! Log in to your account to access exclusive content, personalized recommendations, and a seamless experience tailored just for you. Your journey towards innovation and learning starts here. If you don't have an account yet, sign up now to unlock a world of opportunities. Let's get started - log in and make the most of what we have to offer. We're glad to have you with us!",
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
