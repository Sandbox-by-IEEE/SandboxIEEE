import React from 'react';

function GoldenBorderBox({ children }) {
  return (
    <div className='px-0.5 py-0.5 bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)] m-4'>
      {' '}
      <div className='w-full h-full bg-green-primary rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)_inset] p-4 flex flex-row justify-center items-center'>
        {children}
      </div>
    </div>
  );
}

export default function PastEvent() {
  return (
    <div className='bg-green-primary h-[100vh]'>
      <GoldenBorderBox>
        <h1 className='font-museo-muderno font-bold text-transparent text-sm bg-clip-text  bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]  drop-shadow-[0px_0px_5px_rgba(112,82,41,1)]'>
          Our Past Events
        </h1>
      </GoldenBorderBox>
    </div>
  );
}
