import Link from 'next/link';
import React from 'react';

import Instagram from '@/components/icons/instagram';

import Copyright from './icons/copyright';
import Copyrightsm from './icons/copyrightsm';
import Logo from './icons/logo';
import Logosm from './icons/logosm';
import Star1 from './icons/star1';
import Star2 from './icons/star2';
import Starsm from './icons/starsm';

const LinkColumn = ({ header, links }) => (
  <div className='flex flex-col mb-8 md:mr-10 sm:mb-0 xl:mr-20 w-fit'>
    <p className='text-base md:text-lg font-semibold mb-1 w-fit'>{header}</p>
    {links.map((link, index) => (
      <Link
        href={link.href}
        key={index}
        aria-label={link.text}
        className='hover:underline text-xs md:text-sm lg:text-base mb-1 w-fit'
      >
        {link.text}
      </Link>
    ))}
  </div>
);

const linksData = [
  [
    {
      header: 'Home',
      links: [
        // { href: '/past-events', text: 'Past Events' },
        { href: '/our-mentors', text: 'Our Mentors' },
      ],
    },
    {
      header: 'Events',
      links: [
        { href: '/events/ptc', text: 'PTC' },
        { href: '/events/tpc', text: 'TPC' },
        { href: '/events/exhibition', text: 'Exhibition' },
        { href: '/events/grand-seminar', text: 'Grand Seminar' },
      ],
    },
  ],
  [
    {
      header: 'Sponsor & Media',
      links: [{ href: '/sponsorships', text: 'Sponsorship' }],
    },
    {
      header: 'Help Center',
      links: [{ href: '/contact-us', text: 'Contact-us' }],
    },
  ],
];

const SocialIcon = ({ LinkComponent, href, size, label }) => (
  <div className='transition-all duration-300 hover:scale-110'>
    <Link href={href} aria-label={label}>
      <LinkComponent
        size={size}
        className='w-[18px] lg:w-[25px] aspect-square'
      />
    </Link>
  </div>
);

const Footer = () => (
  <footer className='w-full relative z-[99] h-fit max-lg:py-10 lg:h-[512px] flex bg-[#082211] text-white'>
    <div className='absolute hidden lg:block'>
      <Star1 size={25} />
    </div>
    <div className='absolute hidden right-0 lg:block'>
      <Star2 size={25} />
    </div>
    <div className='absolute right-0 lg:hidden'>
      <Starsm size={25} />
    </div>
    <div className='w-full h-full mr-10 ml-10 mx-auto sm:mr-[100px] sm:ml-[100px] flex flex-col items-center justify-center z-10'>
      {/* Main text and links */}
      <div className='justify-between xl:justify-around w-full flex-col lg:flex lg:flex-row pb-[40px] sm:pb-[60px] border-b-2 border-[#AB814E]'>
        <div className='hidden lg:block'>
          <Logo size={25} />
        </div>
        <div className='mb-10 block lg:hidden'>
          <Logosm size={25} />
        </div>
        <div className='grid grid-cols-2 lg:flex lg:grid-cols-0'>
          {linksData.map((pair, index) => (
            <div
              className='flex-col px-2 max-lg:px-5 sm:grid sm:grid-cols-2 lg:flex lg:flex-row'
              key={index}
            >
              {pair.map((columnData, columnIndex) => (
                <LinkColumn
                  key={columnIndex}
                  header={columnData.header}
                  links={columnData.links}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Social Media */}
      <div className='w-full flex mt-4 items-center justify-between'>
        <div className='hidden sm:block'>
          <Copyright size={25} />
        </div>
        <div className='block sm:hidden'>
          <Copyrightsm size={25} />
        </div>
        <div className='flex gap-2 lg:gap-4'>
          {/*                              <SocialIcon LinkComponent={Instagram} href='' size={25} /> */}
          <SocialIcon
            label={'Instagram'}
            LinkComponent={Instagram}
            href='https://www.instagram.com/thesandbox.itb/'
            size={25}
          />
          {/* <SocialIcon LinkComponent={Tiktok} href='' size={25} /> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
