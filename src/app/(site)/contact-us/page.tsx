import { type Metadata } from 'next';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import GradientBox from '@/components/GradientBox';
import LineIcon from '@/components/icons/LineIcon';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import TitleSection from '@/components/TitleSection';
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
    <main className='relative w-full z-5 flex flex-col min-h-screen justify-center items-center py-28 pt-14 lg:py-28 lg:pt-36 gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      {/* Title Page */}
      <TitleSection data-aos='zoom-in'>{data.contactUsTitle}</TitleSection>

      {/* Container details */}
      <div className='w-full flex flex-col gap-10 lg:gap-14 items-center justify-center'>
        {/* Description */}
        <h3
          className='relative z-10 text-white break-all font-poppins text-justify text-[15px] lg:text-lg lg:px-10 xl:px-40'
          data-aos='fade-up'
        >
          <StructuredText data={data.description} />
        </h3>
        <GradientBox type='blue' className='w-full relative'>
          {/* Sub-CP */}
          <div className='m-6 md:m-12 flex flex-col gap-6 lg:gap-8 items-center justify-center'>
            <ul className='list-none flex flex-col w-full gap-3 lg:gap-6'>
              {allContactPeople.map((person) => (
                <li
                  key={person.id}
                  className='flex md:flex-row flex-col text-white font-poppins justify-between gap-4 lg:gap-10 w-full'
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
        </GradientBox>
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
