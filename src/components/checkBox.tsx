'use client';
import React, { useState } from 'react';

const Checkbox = () => {
  const [checkboxes, setCheckboxes] = useState([false, false, false]);

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  return (
    <div className='bg-black mt-2 flex flex-col'>
      <label className='text-white inline-flex items-center'>
        <input
          type='checkbox'
          className='appearance-none h-[17px] w-[17px] cursor-pointer border-2 border-solid border-white flex justify-center content-center outline-none
          after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          hover:border-2 hover:border-solid hover:border-[#ab814e]
          checked:border-0 checked:border-solid
          checked:after:block'
          checked={checkboxes[0]}
          onChange={() => toggleCheckbox(0)}
        />
        <span className='ml-2'>Option 1</span>
      </label>
      <label className='text-white inline-flex items-center mt-2'>
        <input
          type='checkbox'
          className='appearance-none h-[17px] w-[17px] cursor-pointer border-2 border-solid border-white flex justify-center content-center outline-none
          after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          hover:border-2 hover:border-solid hover:border-[#ab814e]
          checked:border-0 checked:border-solid
          checked:after:block'
          checked={checkboxes[1]}
          onChange={() => toggleCheckbox(1)}
        />
        <span className='ml-2'>Option 2</span>
      </label>
      <label className='text-white inline-flex items-center mt-2'>
        <input
          type='checkbox'
          className='appearance-none h-[17px] w-[17px] cursor-pointer border-2 border-solid border-white flex justify-center content-center outline-none
          after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
          hover:border-2 hover:border-solid hover:border-[#ab814e]
          checked:border-0 checked:border-solid
          checked:after:block'
          checked={checkboxes[2]}
          onChange={() => toggleCheckbox(2)}
        />
        <span className='ml-2'>Option 3</span>
      </label>
    </div>
  );
};

export default Checkbox;
