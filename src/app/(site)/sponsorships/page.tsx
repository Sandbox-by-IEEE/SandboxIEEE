import { type Metadata } from 'next';
import Image from 'next/image';

import { performRequest } from '@/lib/datocms';
import { type OurSponsorsPageProps } from '@/types/sponsors';

export default async function GrandSeminar() {
  const CMS_QUERY = `{
    ourSponsorsPage {
      ourSponsorSectionTitle
      ourMediaPartner
      ourMediaPartnerLogo {
        url
        width
        title
        id
        height
      }
      ourSponsorLogo {
        url
        width
        title
        id
        height
      }
    }
  }`;
  const { ourSponsorsPage }: OurSponsorsPageProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });
  return (
    <main className='min-h-screen h-fit w-full block bg-[#081E11] overflow-hidden'>
      <div className='w-full h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] flex flex-col gap-8 lg:gap-20 py-20 lg:py-28 bg-cover '>
        <section className='px-8 sm:px-10 md:px-20 lg:px-40 h-fit w-full flex flex-col gap-14 lg:gap-20'>
          {/* Decoration */}
          <Image
            src={'/StarDecoration1.svg'}
            alt={'decoration1'}
            height={90}
            width={90}
            className='absolute left-[0px] top-[300px] w-[60px] lg:w-[90px] opacity-50'
            data-aos='fade-in'
            sizes='(max-width: 1024px) 60px, 90px'
          />
          <Image
            src={'/Starburst2.svg'}
            alt={'decoration1'}
            height={90}
            width={90}
            className='absolute right-[0px] top-[500px] w-[60px] lg:w-[90px] opacity-50'
            data-aos='fade-in'
            sizes='(max-width: 1024px) 60px, 90px'
          />
          {/* Title */}
          <div
            data-aos='flip-up'
            className='m-auto w-fit h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'
          >
            <div className=' w-fit h-fit rounded-[28px] bg-gradient-light-cards px-12 py-5 flex items-center overflow-hidden m-[6px]'>
              <h2
                data-aos='zoom-in'
                className='font-museo-muderno text-center w-full break-word font-bold text-3xl lg:text-[40px] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '
              >
                {ourSponsorsPage.ourSponsorSectionTitle}
              </h2>
            </div>
          </div>
          <div
            data-aos='fade-in'
            className='m-auto w-full sm:w-[80%] h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'
          >
            <div className=' m-auto w-[calc(100%-16px)] h-fit rounded-[28px] bg-gradient-light-cards flex items-center px-8 py-12 lg:p-16 my-2 overflow-hidden'>
              <div className=' w-full flex flex-wrap justify-center items-center gap-6 md:gap-6 lg:gap-10'>
                {ourSponsorsPage.ourSponsorLogo.map((logo, index) => (
                  <Image
                    key={logo.id}
                    src={logo.url}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.title}
                    data-aos='fade-up'
                    data-aos-duration={500 + index * 100}
                    className='w-[130px] lg:w-[180px] 2xl:w-[200px] object-contain'
                    sizes='(max-width: 1024px) 130px, (max-width: 1536px) 180px, 200px'
                    priority
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className='relative px-8 sm:px-10 md:px-20 lg:px-40 h-fit w-full flex flex-col gap-14 lg:gap-20'>
          <div className='decorationSection h-0'>
            <Image
              src={'/Ring.svg'}
              alt={'decoration3'}
              height={90}
              width={90}
              className='absolute left-0 top-[300px] w-[60px] lg:w-[90px] opacity-50'
              data-aos='fade-in'
              sizes='(max-width: 1024px) 60px, 90px'
            />
            <Image
              src={'/Ellipse123.svg'}
              alt={'decoration4'}
              height={90}
              width={90}
              className='absolute left-18 top-[500px] w-[60px] lg:w-[90px] opacity-50'
              data-aos='fade-in'
              sizes='(max-width: 1024px) 60px, 90px'
            />
            <Image
              src={'/StarDecoration2.svg'}
              alt={'decoration5'}
              height={90}
              width={90}
              className='absolute right-0 top-[700px] w-[60px] lg:w-[90px] opacity-50'
              data-aos='fade-in'
              sizes='(max-width: 1024px) 60px, 90px'
            />
          </div>
          <div
            data-aos='flip-up'
            className='m-auto w-fit h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'
          >
            <div className=' w-fit h-fit rounded-[28px] bg-gradient-light-cards px-12 py-5 flex items-center overflow-hidden m-[6px]'>
              <h2
                data-aos='zoom-in'
                className='font-museo-muderno text-center w-full break-word font-bold text-3xl lg:text-[40px] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '
              >
                {ourSponsorsPage.ourMediaPartner}
              </h2>
            </div>
          </div>
          <div
            data-aos='fade-in'
            className='m-auto w-full sm:w-[80%] h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'
          >
            <div className=' m-auto w-[calc(100%-16px)] h-fit rounded-[28px] bg-gradient-light-cards flex items-center px-8 py-12 lg:p-16 my-2 overflow-hidden'>
              <div className=' w-full flex flex-wrap justify-center items-center gap-6 md:gap-6 lg:gap-10'>
                {ourSponsorsPage.ourMediaPartnerLogo.map((logo, index) => (
                  <Image
                    key={logo.id}
                    src={logo.url}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.title}
                    className='w-[130px] lg:w-[180px] 2xl:w-[200px] object-contain'
                    data-aos='fade-up'
                    data-aos-duration={500 + index * 100}
                    sizes='(max-width: 1024px) 130px, (max-width: 1536px) 180px, 200px'
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Sponsorships | Sandbox IEEE ITB',
  description:
    'We offer a variety of sponsorship opportunities that allow you to engage with our diverse audience and gain valuable exposure for your brand. By sponsoring our event, you not only support the advancement of technology and innovation, but also have the chance to showcase your products and services to a targeted audience that values excellence and creativity.',
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
    canonical: '/sponsorships',
    languages: {
      'en-US': '/en-US/sponsorships',
      'id-ID': '/id-ID/sponsorships',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'We offer a variety of sponsorship opportunities that allow you to engage with our diverse audience and gain valuable exposure for your brand. By sponsoring our event, you not only support the advancement of technology and innovation, but also have the chance to showcase your products and services to a targeted audience that values excellence and creativity.',
    url: 'https://sandbox.ieeeitb.com/sponsorships',
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
      'We offer a variety of sponsorship opportunities that allow you to engage with our diverse audience and gain valuable exposure for your brand. By sponsoring our event, you not only support the advancement of technology and innovation, but also have the chance to showcase your products and services to a targeted audience that values excellence and creativity.',
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
