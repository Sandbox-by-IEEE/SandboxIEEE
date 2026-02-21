import './globals.css';
import 'aos/dist/aos.css';

import { type Metadata, type Viewport } from 'next';
import { Gemunu_Libre, Inter, MuseoModerno, Poppins } from 'next/font/google';
import Script from 'next/script';

import AOSClient from '@/provider/aos';
import AuthProvider from '@/provider/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-poppins',
});

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-museo-moderno',
});

const gemunuLibre = Gemunu_Libre({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-gemunu-libre',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${poppins.variable} ${museoModerno.variable} ${gemunuLibre.variable}`}
    >
      <AuthProvider>
        <body suppressHydrationWarning={true}>
          <AOSClient />
          {children}
        </body>
      </AuthProvider>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-YQC27F86L7'
      />
      <Script
        id='google-analytics'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-YQC27F86L7');`,
        }}
      />
      {/* <!-- Hotjar Tracking Code for Sandbox IEEE ITB --> */}
      <Script
        id='hotjar'
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3712758,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    </html>
  );
}

export const viewport: Viewport = {
  colorScheme: 'normal',
};

export const metadata: Metadata = {
  title: 'Sandbox IEEE ITB',
  description:
    'The Sandbox 3.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
  generator: 'Next.js',
  category: 'Events',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'Sandbox ITB',
    'IEEE ITB',
    'ITB',
    'TPC',
    'PTC',
  ],
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
      'The Sandbox 3.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
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
      'The Sandbox 3.0 by IEEE ITB Student Branch is a national-level competition event featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC). Through structured competition flows, participants are encouraged to develop innovative solutions using smart automation technology to address real-world challenges.',
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
