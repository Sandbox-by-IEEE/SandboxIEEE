import React from 'react';

const ShadowGradientText = ({ text }: { text: string }) => {
  return (
    <div className='relative w-full text-center'>
      <div className='rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
        <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] font-extrabold tracking-wider w-full text-center shadow-lg'>
          {text}
        </p>
      </div>
      <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
        <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] font-extrabold tracking-wider w-full text-center shadow-lg'>
          {text}
        </p>
      </div>
    </div>
  );
};

export default ShadowGradientText;
