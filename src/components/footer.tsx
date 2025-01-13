import Link from 'next/link';
import React from 'react';

import Instagram from '@/components/icons/instagram';
import Linkedin from '@/components/icons/linkedin';

import Copyright from './icons/copyright';

interface FooterProps {
  regist?: boolean;
}

const LinkColumn = ({ header }) => (
  <div className='flex flex-col justify-center w-full'>
    {header.map((link, index) => (
      <div key={index}>
        <Link
          href={link.href}
          aria-label={link.text}
          className='hover:underline text-xs md:text-sm lg:text-base mb-1 w-fit'
        >
          <p className='text-base font-semibold mb-1 w-fit'>{link.text}</p>
        </Link>
      </div>
    ))}
  </div>
);

const linksData = [
  [
    {
      header: [{ href: '/#events', text: 'Events' }],
    },
    {
      header: [{ href: '/#about', text: 'About' }],
    },
    /* {
      header: [{ href: '/', text: 'Sponsoship' }],
    }, */
    {
      header: [{ href: '/events/H4H', text: 'HCI' }],
    },
    {
      header: [{ href: '/events/ptc', text: 'PTC' }],
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

const Footer: React.FC<FooterProps> = ({ regist = false }) => (
  <footer className={`w-full relative z-[99] h-fit py-10 flex text-white`}>
    <div className='w-full h-full mr-10 ml-10 mx-auto sm:mr-[100px] sm:ml-[100px] flex flex-col items-center justify-center z-10'>
      {/* Main text and links */}
      <div className='justify-around w-full flex flex-row pb-6'>
        <div className='w-[120px] md:hidden gap-4 items-center text-center justify-center flex'>
          <SocialIcon
            label={'Instagram'}
            LinkComponent={Instagram}
            href='https://www.instagram.com/thesandbox.itb/'
            size={25}
          />
          <SocialIcon
            label={'LinkedIn'}
            LinkComponent={Linkedin}
            href='https://www.instagram.com/thesandbox.itb/'
            size={25}
          />
        </div>
        {!regist && (
          <div className='md:flex hidden'>
            {linksData.map((pair, index) => (
              <div className='flex gap-4 lg:gap-12' key={index}>
                {pair.map((columnData, columnIndex) => (
                  <LinkColumn key={columnIndex} header={columnData.header} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-[120px] flex md:hidden items-center mb-6'>
        <p className='mb-2 w-full text-center'>#NetZeroHero</p>
      </div>
      <div className='bg-gradient-to-r from-[#18635A] to-[#082349] w-full h-[4px]'></div>
      {/* Social Media */}
      <div className='w-full flex flex-row items-center mt-4'>
        <div className='w-[120px] hidden md:flex'>
          <p className='mb-2'>#NetZeroHero</p>
        </div>
        <div className='flex justify-center w-full'>
          <div className=''>
            <Copyright size={25} />
          </div>
          {/* <div className='block sm:hidden'>
            <Copyrightsm size={25} />
          </div> */}
        </div>
        <div className='w-[120px] md:flex gap-2 lg:gap-4 items-end text-right justify-end hidden'>
          <SocialIcon
            label={'Instagram'}
            LinkComponent={Instagram}
            href='https://www.instagram.com/thesandbox.itb/'
            size={25}
          />
          <SocialIcon
            label={'LinkedIn'}
            LinkComponent={Linkedin}
            href='https://www.instagram.com/thesandbox.itb/'
            size={25}
          />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
