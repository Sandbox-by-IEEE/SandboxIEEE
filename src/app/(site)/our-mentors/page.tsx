import { Metadata } from 'next';
import React from 'react';

import Abstrak from '@/components/icons/mentors/abstrak1';
import Basket1 from '@/components/icons/mentors/basket1';
import Basket2 from '@/components/icons/mentors/basket2';
import Bintang2 from '@/components/icons/mentors/bintang2';
import Bintang1 from '@/components/icons/mentors/bintangmentor';
import Elips1 from '@/components/icons/mentors/elips1';
import Elips2 from '@/components/icons/mentors/elips2';
import Jatuh1 from '@/components/icons/mentors/jatuh1';
import Jatuh2 from '@/components/icons/mentors/jatuh2';
import MentorCards from '@/components/mentorCards';
import MentorCarousel from '@/components/mentorsCarousel';
import { performRequest } from '@/lib/datocms';
import { OurMentorsPageProps } from '@/types/our-mentors';

const OurMentorsPage = async () => {
  const options = [
    {
      name: 'option1',
      position: 'Option 1',
      instagram: '@alvinchrs',
      company: '/mentors/google.png',
      imageUrl: '/mentors/image1.jpg',
      horizontal: true,
      invert: false,
      label: ``,
    },
    {
      name: 'option2',
      position: 'Option 2',
      instagram: '@alvinchrs',
      company: '/mentors/google.png',
      imageUrl: '/mentors/image1.jpg',
      horizontal: true,
      invert: true,
      label: ``,
    },
    {
      name: 'option3',
      position: 'Option 3',
      instagram: '@alvinchrs',
      company: '/mentors/google.png',
      imageUrl: '/mentors/image1.jpg',
      horizontal: true,
      invert: false,
      label: ``,
    },
  ];

  const CMS_QUERY = `
  { 
    ourMentorsPage {
      title
    }
    allMentorDetails {
      id
      image {
        url
        width
        height
        title
      }
      name
      post
      instagram
      invert
      desc {
        value
      }
      company {
        url
        width
        height
        title
      }
      horizontal
    }
  }`;

  const { ourMentorsPage, allMentorDetails }: OurMentorsPageProps =
    await performRequest({
      query: CMS_QUERY,
      revalidate: 0,
    });

  return (
    <main className='w-screen bg-[#0b341a] text-white flex min-h-screen flex-col items-center justify-between'>
      <section className='w-screen h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        <div className='mx-20px flex flex-col justify-center items-center'>
          <div className='absolute left-0 top-[400px]'>
            <Bintang2 size={25} />
          </div>
          <div className='absolute right-0 top-[400px]'>
            <Elips1 size={25} />
          </div>
          <div className='absolute left-0 top-[1100px]'>
            <Elips2 size={25} />
          </div>
          <div className='absolute right-0 top-[1050px]'>
            <Abstrak size={25} />
          </div>
          <div className='absolute left-0 top-[750px]'>
            <Jatuh1 size={25} />
          </div>
          <div className='absolute right-0 top-[3400px] sm:top-[2850px]'>
            <Jatuh2 size={25} />
          </div>
          <div className='flex items-center justify-center w-[80%] h-[160px] mx-[10%] mt-[120px] mb-[20px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='relative w-full h-full bg-gradient-green p-4 rounded-xl'>
              <Basket1
                size={25}
                className='absolute -left-[85px] -top-[70px]'
              />
              <div className='flex items-center justify-center w-full h-full'>
                <span
                  style={{
                    ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                  }}
                  className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[50px] font-museo-muderno p-1 font-bold'
                >
                  {ourMentorsPage.title}
                </span>
              </div>
              <Basket2
                size={25}
                className='absolute -right-[100px] -bottom-[80px]'
              />
            </div>
          </div>
          <div className='h-fit w-screen flex flex-col items-center justify-center my-40'>
            <MentorCarousel options={allMentorDetails} />
          </div>
          <div className='flex items-center justify-center w-[80%] h-[160px] mx-[10%] mb-[100px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div
              id='seemore'
              className='flex items-center justify-center w-full h-full bg-gradient-green p-4 rounded-xl'
            >
              <Bintang1
                size={23}
                className='flex items-center justify-center w-full h-full'
              >
                Our Mentors
              </Bintang1>
            </div>
          </div>
          <div className='z-10 w-fit flex flex-col gap-16 items-center justify-center mb-[200px]'>
            <MentorCards options={allMentorDetails} />
          </div>
        </div>
      </section>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
};

export default OurMentorsPage;

export const metadata: Metadata = {
  title: 'Grand-Seminar | Sandbox IEEE ITB',
  description:
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  applicationName: 'Sandbox IEEE ITB',
  colorScheme: 'dark',
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
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
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
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
