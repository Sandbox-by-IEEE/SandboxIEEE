'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';

import Button from '@/components/Button';
import NormalSlider from '@/components/Slider/NormalSlider';

const TitleSection = dynamic(() => import('@/components/TitleSection'), {
  ssr: false,
});
const CoverFlowSlider = dynamic(
  () => import('@/components/Slider/CoverflowSlider'),
  {
    ssr: false,
  },
);

export default function FinalProjectVote() {
  const items = [
    {
      id: 1,
      label: 'Item 1',
      name: "Team's Name",
      imgUrl:
        'https://res.cloudinary.com/dbdrtwtzl/image/upload/v1708269822/koxqcs2thoz97d4mqt8c.png',
      instagramLink: 'https://instagram.com',
      introductionLink: 'https://instagram.com',
      topic: 'Topic Name Topic Name Topic Name',
      desc: 'Take Action',
    },
    {
      id: 2,
      label: 'Item 2',
      name: "Team's Name",
      imgUrl:
        'https://res.cloudinary.com/dbdrtwtzl/image/upload/v1708269822/koxqcs2thoz97d4mqt8c.png',
      instagramLink: 'https://instagram.com',
      introductionLink: 'https://instagram.com',
      topic: 'Topic Name Topic Name Topic Name',
      desc: 'Take Action',
    },
    {
      id: 3,
      label: 'Item 3',
      name: "Team's Name",
      imgUrl:
        'https://res.cloudinary.com/dbdrtwtzl/image/upload/v1708269822/koxqcs2thoz97d4mqt8c.png',
      instagramLink: 'https://instagram.com',
      introductionLink: 'https://instagram.com',
      topic: 'Topic Name Topic Name Topic Name',
      desc: 'Take Action',
    },
    {
      id: 3,
      label: 'Item 4',
      name: "Team's Name",
      imgUrl:
        'https://res.cloudinary.com/dbdrtwtzl/image/upload/v1708269822/koxqcs2thoz97d4mqt8c.png',
      instagramLink: 'https://instagram.com',
      introductionLink: 'https://instagram.com',
      topic: 'Topic Name Topic Name Topic Name',
      desc: 'Take Action',
    },
    {
      id: 4,
      label: 'Item 5',
      name: "Team's Name",
      imgUrl:
        'https://res.cloudinary.com/dbdrtwtzl/image/upload/v1708269822/koxqcs2thoz97d4mqt8c.png',
      instagramLink: 'https://instagram.com',
      introductionLink: 'https://instagram.com',
      topic: 'Topic Name Topic Name Topic Name',
      desc: 'Take Action',
    },
  ];

  const handleButtonVote = async () => {
    try {
      // hit API here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='relative flex min-h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-start py-16 px-10'>
      <div className='scale-125'>
        <TitleSection>Vote For Final Project&apos; s Team</TitleSection>
      </div>
      <p className='text-white font-poppins max-w-[70em] py-16 tracking-widest font-extralight'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum
        at sapien dignissim interdum sit amet sit amet nisl. Vestibulum quis
        volutpat ipsum, consequat blandit mi. Vivamus id porta dolor, vel
        tristique libero. Cras scelerisque purus in quam posuere blandit. Lorem
        ipsum dolor sit amet, consectetur adipiscing
      </p>

      <section className='hidden w-full max-w-[1200px] h-fit md:flex flex-row py-8 items-center justify-evenly overflow-visible'>
        <CoverFlowSlider>
          {items.map((item) => (
            <div
              key={item.id}
              className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[30%] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a>
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}:{item.desc}&apos;
              </p>

              <Button type='button' color='green'>
                Vote
              </Button>
            </div>
          ))}
        </CoverFlowSlider>
      </section>

      <section className='md:hidden w-full max-w-[1200px] h-fit flex flex-row sm:py-8 items-center justify-evenly overflow-visible'>
        <NormalSlider>
          {items.map((item) => (
            <div
              key={item.id}
              className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[200px] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a>
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}:{item.desc}&apos;
              </p>

              <Button type='button' color='green' onClick={handleButtonVote}>
                Vote
              </Button>
            </div>
          ))}
        </NormalSlider>
      </section>
    </main>
  );
}
