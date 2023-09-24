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
    <footer className=' w-screen h-[512px] flex bg-[#082211] text-white'>
      <div className='absolute hidden sm:block'>
        <Star1 size={25} />
      </div>
      <div className='absolute hidden right-0 sm:block'>
        <Star2 size={25} />
      </div>
      <div className='absolute right-0 sm:hidden'>
        <Starsm size={25} />
      </div>
      <div className='w-full h-full container mx-auto flex flex-col items-center justify-center z-10'>
        <div className='justify-between w-[320px] sm:max-md sm:w-[1300px] flex-col sm:flex sm:flex-row pb-[40px] sm:pb-[60px] border-b-2 border-[#AB814E]'>
          {/* Column 1 */}
          <div className='hidden sm:block mr-[180px]'>
            <Logo size={25} />
          </div>
          <div className='mb-10 block sm:hidden'>
            <Logosm size={25} />
          </div>

          {/* Column 2 */}
          <div className='flex justify-between'>
            <div className='flex-col sm:flex sm:flex-row justify-between p-text-xs'>
              <div className='mb-8 sm:mb-0 sm:mr-20'>
                <a href={''} target='_blank' rel=''>
                  <h3 className='hover:underline text-base sm:text-lg  font-semibold mb-1'>
                    Home
                  </h3>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Timeline
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1 '>
                    Merchandise
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Past Events
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Our Mentors
                  </p>
                </a>
              </div>

              {/* Column 3 */}
              <div className='sm:mr-20'>
                <a href={''} target='_blank' rel=''>
                  <h3 className='hover:underline text-base sm:text-lg  font-semibold mb-1'>
                    Events
                  </h3>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    PTC
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    TPC
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Exhibition
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Grand Seminar
                  </p>
                </a>
              </div>
            </div>
            {/* Column 4 */}
            <div className='flex-col sm:flex sm:flex-row  mr-4'>
              <div className='mb-8 sm:mb-0 sm:mr-20'>
                <a href={''} target='_blank' rel=''>
                  <h3 className='hover:underline text-base sm:text-lg  font-semibold mb-1'>
                    Sponsor & Media
                  </h3>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Our Sponsor
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Our Media partner
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Be Our Sponsor
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Be Our Media Partner
                  </p>
                </a>
              </div>

              {/* Column 5 */}
              <div className='sm:mr-20'>
                <a href={''} target='_blank' rel=''>
                  <h3 className='hover:underline text-base sm:text-lg font-semibold mb-1'>
                    Help Center
                  </h3>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Register
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    About Us
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    FAQ
                  </p>
                </a>
                <a href={''} target='_blank' rel=''>
                  <p className='hover:underline text-xs sm:text-base mb-1'>
                    Contact US
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[320px] sm:w-[1300px] flex mt-4 items-center justify-between'>
          <div className='hidden sm:block'>
            <Copyright size={25} />
          </div>
          <div className='block sm:hidden'>
            <Copyrightsm size={25} />
          </div>
          <div className='hidden sm:flex'>
            <div className='ml-4 hover:scale-110'>
              <a href='https://www.instagram.com'>
                <Instagram size={25} />
              </a>
            </div>
            <div className='ml-4 hover:scale-110'>
              <a href='https://www.instagram.com'>
                <Linkedin size={25} />
              </a>
            </div>
            <div className='ml-4 hover:scale-110'>
              <a href='https://www.instagram.com'>
                <Tiktok size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
