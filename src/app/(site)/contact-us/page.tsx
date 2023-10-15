import dynamic from 'next/dynamic';
import React from 'react';

const LineIcon = dynamic(() => import('@/components/icons/LineIcon'));
const WhatsAppIcon = dynamic(() => import('@/components/icons/WhatsAppIcon'));

const ContactUs = () => {
  return (
    <main className='w-full min-h-screen flex flex-col items-center py-20 pt-14 lg:py-20 bg-gradient-green gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      <h1 className='text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'>
        Contact Us
      </h1>

      <div className='flex flex-col gap-10'>
        <h2 className='text-cream-secondary-light font-poppins text-justify text-base lg:text-lg'>
          Any question or remarks? Just write us a message!
        </h2>
        <div className='bg-gradient-brown p-1.5 lg:p-2 rounded-md'>
          <div className='bg-gradient-green flex flex-col items-center justify-center py-10 px-8 lg:px-16 gap-10'>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <h3 className='text-secondary-cream-light font-poppins'>
                Main Event
              </h3>
              <div className='flex text-white font-poppins justify-between gap-5'>
                <h4>Fairuzz Mohammed Salim</h4>
                <ul className='list-none'>
                  <li className='text-secondary-cream-light flex gap-2'>
                    <WhatsAppIcon size={20} />
                    <span>+628123456789</span>
                  </li>
                  <li className='text-secondary-cream-light flex gap-2'>
                    <LineIcon size={20} />
                    <span>fairuzalld</span>
                  </li>
                </ul>
              </div>
              <div className='flex text-white font-poppins justify-between gap-5'>
                <p>Fairuzz Mohammed Salim</p>
                <ul className='list-none'>
                  <li className='text-secondary-cream-light flex gap-2'>
                    <WhatsAppIcon size={20} />
                    <span>+628123456789</span>
                  </li>
                  <li className='text-secondary-cream-light flex gap-2'>
                    <LineIcon size={20} />
                    <span>fairuzalld</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
