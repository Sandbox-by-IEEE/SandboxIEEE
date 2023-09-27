import Link from 'next/link';
import React from 'react';

import Copyright from './icons/copyright';
import Copyrightsm from './icons/copyrightsm';
import Instagram from './icons/instagram';
import Linkedin from './icons/linkedin';
import Logo from './icons/logo';
import Logosm from './icons/logosm';
import Star1 from './icons/star1';
import Star2 from './icons/star2';
import Starsm from './icons/starsm';
import Tiktok from './icons/tiktok';
const Footer: React.FC = () => {
  return (
    <footer className='w-screen h-[512px] flex bg-[#082211] text-white'>
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
        <div className='justify-between w-full flex-col lg:flex lg:flex-row pb-[40px] sm:pb-[60px] border-b-2 border-[#AB814E]'>
          {/* Column 1 */}
          <div className='hidden lg:block'>
            <Logo size={25} />
          </div>
          <div className='mb-10 block lg:hidden'>
            <Logosm size={25} />
          </div>

          {/* Column 2 */}
          <div className='grid grid-cols-2 lg:flex lg:grid-cols-0'>
            <div className='flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row'>
              <div className='mb-8 md:mr-10 sm:mb-0 xl:mr-20'>
                <Link href=''>
                  <h3 className='hover:underline text-base md:text-lg  font-semibold mb-1'>
                    Home
                  </h3>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Timeline
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1 '>
                    Merchandise
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Past Events
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Our Mentors
                  </p>
                </Link>
              </div>

              {/* Column 3 */}
              <div className='md:mr-10 xl:mr-20'>
                <Link href=''>
                  <h3 className='hover:underline text-base md:text-lg  font-semibold mb-1'>
                    Events
                  </h3>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    PTC
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    TPC
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Exhibition
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Grand Seminar
                  </p>
                </Link>
              </div>
            </div>
            {/* Column 4 */}
            <div className='flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row'>
              <div className='mb-8 md:mr-10 sm:mb-0 xl:mr-20'>
                <Link href=''>
                  <h3 className='hover:underline text-base md:text-lg  font-semibold mb-1'>
                    Sponsor & Media
                  </h3>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Our Sponsor
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Our Media partner
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Be Our Sponsor
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Be Our Media Partner
                  </p>
                </Link>
              </div>

              {/* Column 5 */}
              <div className='md:mr-10 xl:mr-20'>
                <Link href=''>
                  <h3 className=' hover:underline text-base md:text-lg font-semibold mb-1'>
                    Help Center
                  </h3>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Register
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    About Us
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    FAQ
                  </p>
                </Link>
                <Link href=''>
                  <p className='hover:underline text-xs md:text-sm lg:text-base mb-1'>
                    Contact US
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex mt-4 items-center justify-between'>
          <div className='hidden sm:block'>
            <Copyright size={25} />
          </div>
          <div className='block sm:hidden'>
            <Copyrightsm size={25} />
          </div>
          <div className='hidden sm:flex'>
            <div className='ml-4 transition-all duration-300 hover:scale-110'>
              <Link href=''>
                <Instagram size={25} />
              </Link>
            </div>
            <div className='ml-4 transition-all duration-300 hover:scale-110'>
              <Link href='https://www.instagram.com/'>
                <Linkedin size={25} />
              </Link>
            </div>
            <div className='ml-4 transition-all duration-300 hover:scale-110'>
              <Link href=''>
                <Tiktok size={25} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
