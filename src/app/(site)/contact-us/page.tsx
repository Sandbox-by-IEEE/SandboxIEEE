import { type Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import LineIcon from '@/components/icons/LineIcon';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { performRequest } from '@/lib/datocms';
import { type ContactUsPageProps } from '@/types/contact-us';

const ContactUs = async () => {
  const CMS_QUERY = `{
    contactUsPage {
      contactUsTitle
      description {
        value
      }
    }
    allContactPeople {
      id
      lineId
      nameContactPerson
      phoneNumber
    }
  } `;

  const { contactUsPage: data, allContactPeople }: ContactUsPageProps =
    await performRequest({
      query: CMS_QUERY,
      revalidate: 0,
    });
  return (
    <main className='relative w-full z-5 flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-[#081B0E] to-[#0e371d] py-28 pt-14 lg:py-28 lg:pt-20 gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      {/* Title Page */}
      <h2
        className='relative z-5 text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
        data-aos='zoom-in'
      >
        {data.contactUsTitle}
      </h2>
      {/* Hiasan */}
      <Image
        src='/contact-us-assets/blink.svg'
        width={275}
        height={246}
        alt='Blink'
        priority
        className='absolute w-[190px] h-[120px] xl:w-[275px] xl:h-[246px] -top-4 xl:-top-10 -left-10 -z-1 opacity-50'
        data-aos='zoom-in'
        sizes='(max-width: 1280px) 190px, 275px'
      />
      <Image
        src='/contact-us-assets/mini-sparkle.svg'
        width={40}
        height={40}
        alt='mini-sparkle'
        className='absolute w-[20px] aspect-square xl:w-[40px] bottom-[200px] right-[50px] xl:right-[200px] -z-5'
        data-aos='fade-in'
        sizes='(max-width: 1280px) 20px, 40px'
      />
      <Image
        src='/contact-us-assets/sparkle.svg'
        width={55}
        height={55}
        alt='sparkle'
        className='absolute w-[30px] aspect-square xl:w-[55px] bottom-[150px] right-[60px] xl:right-[240px] -z-5'
        data-aos='fade-in'
        sizes='(max-width: 1280px) 30px, 55px'
      />
      <Image
        src='/contact-us-assets/mascot-top.png'
        width={112}
        height={164}
        alt='mascot-top'
        className='absolute w-[70px] h-[100px] xl:w-[112px] xl:h-[164px] top-8 xl:top-[50px] right-10 xl:right-[210px] -z-5'
        data-aos='fade-down-left'
        sizes='(max-width: 1280px) 70px, 112px'
      />
      <Image
        src='/contact-us-assets/mascot-bottom.png'
        width={125}
        height={182}
        alt='mascot-bottom'
        className='absolute w-[90px] h-[124px] xl:w-[125px] xl:h-[182px] bottom-[50px] left-4 xl:left-[150px] -z-5'
        data-aos='fade-up-right'
        sizes='(max-width: 1280px) 90px, 125px'
      />

      {/* Container details */}
      <div className='flex flex-col gap-10 lg:gap-14 items-center justify-center'>
        {/* Description */}
        <h3
          className='relative z-10 text-cream-secondary-light break-all font-poppins text-justify text-[15px] lg:text-lg lg:px-10 xl:px-40'
          data-aos='fade-up'
        >
          <StructuredText data={data.description} />
        </h3>
        <div
          className='bg-gradient-brown p-1 rounded-3xl w-full lg:max-w-[750px]'
          data-aos='flip-down'
        >
          <div
            className='bg-gradient-to-bl w-full from-[#081B0E] to-[#0e371d] rounded-3xl flex flex-col items-center justify-center py-8 lg:py-10 px-8 lg:px-16 gap-8 lg:gap-10'
            style={{
              boxShadow:
                '0px 4px 1px 0px #705229, 0px 4px 40px 0px #705229, 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Sub-CP */}
            <div className='flex flex-col gap-6 lg:gap-8 items-center justify-center w-full'>
              <ul className='list-none flex flex-col w-full gap-3 lg:gap-6'>
                {allContactPeople.map((person) => (
                  <li
                    key={person.id}
                    className='flex text-white font-poppins justify-between gap-4 lg:gap-10 w-full'
                  >
                    <p className='text-base lg:text-lg' data-aos='fade-right'>
                      {person.nameContactPerson}
                    </p>
                    {/* Number */}
                    <ul
                      className='list-none flex gap-1 lg:gap-2 flex-col'
                      data-aos='fade-left'
                    >
                      {/* Whatsapp */}
                      {person.phoneNumber && (
                        <li className='text-secondary-cream-light text-sm lg:text-base flex gap-2'>
                          <WhatsAppIcon size={20} />
                          <p>{person.phoneNumber}</p>
                        </li>
                      )}
                      {/* Line */}
                      <li className='text-secondary-cream-light text-sm lg:text-base flex gap-2'>
                        <LineIcon size={20} />
                        <p>{person.lineId}</p>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;

export const metadata: Metadata = {
  title: 'Contact Us | Sandbox IEEE ITB',
  description:
    "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
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
    canonical: '/contact-us',
    languages: {
      'en-US': '/en-US/contact-us',
      'id-ID': '/id-ID/contact-us',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
    url: 'https://sandbox.ieeeitb.com/contact-us',
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
      "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
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
