import { Metadata } from 'next';
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
    });
  return (
    <main className='relative w-full z-5 flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-[#081B0E] to-[#0e371d] py-28 pt-14 lg:py-28 lg:pt-20 gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      {/* Hiasan */}
      <Image
        src='/contact-us/blink.svg'
        width={275}
        height={246}
        alt='Blink'
        priority
        className='absolute w-[190px] h-[120px] xl:w-[275px] xl:h-[246px] -top-4 xl:-top-10 -left-10 -z-1 opacity-50'
      />
      <Image
        src='/contact-us/mini-sparkle.svg'
        width={40}
        height={40}
        alt='mini-sparkle'
        className='absolute w-[20px] aspect-square xl:w-[40px] bottom-[200px] right-[50px] xl:right-[200px] -z-5'
      />
      <Image
        src='/contact-us/sparkle.svg'
        width={55}
        height={55}
        alt='sparkle'
        className='absolute w-[30px] aspect-square xl:w-[55px] bottom-[150px] right-[60px] xl:right-[240px] -z-5'
      />
      <Image
        src='/contact-us/mascot-top.png'
        width={132}
        height={174}
        alt='mascot-top'
        className='absolute w-[70px] h-[100px] xl:w-[112px] xl:h-[164px] top-8 xl:top-[50px] right-10 xl:right-[210px] -z-5'
      />
      <Image
        src='/contact-us/mascot-bottom.png'
        width={155}
        height={232}
        alt='mascot-bottom'
        className='absolute w-[90px] h-[124px] xl:w-[125px] xl:h-[182px] bottom-[50px] left-4 xl:left-[150px] -z-5'
      />

      {/* Title Page */}
      <h1 className='relative z-5 text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'>
        {data.contactUsTitle}
      </h1>
      {/* Container details */}
      <div className='flex flex-col gap-10 lg:gap-14 items-center justify-center'>
        {/* Description */}

        <h2 className='relative z-10 text-cream-secondary-light break-all font-poppins text-justify text-[15px] lg:text-lg lg:px-10 xl:px-40'>
          <StructuredText data={data.description} />
        </h2>
        <div className='bg-gradient-brown p-1 rounded-3xl w-full lg:max-w-[750px]'>
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
                    <p className='text-base lg:text-lg'>
                      {person.nameContactPerson}
                    </p>
                    {/* Number */}
                    <ul className='list-none flex gap-1 lg:gap-2 flex-col'>
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
  title: 'Contact-Us | Sandbox IEEE ITB',
  description:
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  applicationName: 'Sandbox IEEE ITB',
  colorScheme: 'dark',
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    url: 'https://sandbox.ieeeitb.com/',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
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
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
  },
};
