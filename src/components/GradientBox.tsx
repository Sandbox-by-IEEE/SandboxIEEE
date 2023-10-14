import React from 'react';

const GradientBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[660px] w-[1206px] max-w-full mx-auto rounded-xl border-2 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] flex flex-col items-center justify-center gap-8 p-4 shadow-lg shadow-[#d8c09f]'>
      {children}
    </div>
  );
};

export default GradientBox;
