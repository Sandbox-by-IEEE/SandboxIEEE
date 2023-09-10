'use client';
import React, { useState } from 'react';

type RadioButtonValue = 'option1' | 'option2' | 'option3';

const RadioButtons = () => {
  const [selectedOption, setSelectedOption] = useState<RadioButtonValue | null>(
    null,
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as RadioButtonValue);
  };

  return (
    <div className='bg-black mt-2 flex flex-col'>
      <label className='text-white inline-flex items-center'>
        <input
          type='radio'
          className='appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio flex items-center justify-center outline-none
          hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b]'
          value='option1'
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
        <span className='ml-2'>Option 1</span>
      </label>
      <label className='text-white inline-flex items-center mt-2'>
        <input
          type='radio'
          className='appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio
          hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b]'
          value='option2'
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        <span className='ml-2'>Option 2</span>
      </label>
      <label className='text-white inline-flex items-center mt-2'>
        <input
          type='radio'
          className='appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio
          hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b]'
          value='option3'
          checked={selectedOption === 'option3'}
          onChange={handleOptionChange}
        />
        <span className='ml-2'>Option 3</span>
      </label>
    </div>
  );
};

export default RadioButtons;
