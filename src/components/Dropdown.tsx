import React, { useEffect, useRef, useState } from 'react';

import ArrowDropdownIcon from './icons/ArrowDropdownIcon';

interface DropdownProps {
  color?: 'green' | 'trans-green' | 'light';
  options: string[];
  placeholder?: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  color = 'green', // Assign a default value here
  options,
  placeholder,
  selectedOption,
  setSelectedOption,
}) => {
  const colorEffect = {
    green: {
      parent: 'bg-green-primary text-white',
      icon: 'fill-white',
      'child-container': 'bg-[#051a12] bg-opacity-90',
      child: 'hover:bg-black text-white',
    },
    'trans-green': {
      parent: 'bg-black border-[1px] border-green-primary text-white',
      icon: 'fill-white',
      'child-container': 'bg-black',
      child:
        'hover:bg-green-primary text-white border-y-[0.5px] border-x-[1px] border-green-primary ',
    },
    light: {
      parent: 'bg-white text-green-primary',
      icon: 'fill-green-primary',
      'child-container': 'bg-white text-green-primary bg-opacity-90 ',
      child: 'hover:bg-cream-secondary-light text-green-primary',
    },
  };

  // State to keep track of whether the dropdown is open or closed.
  const [open, setOpen] = useState(false);

  // Close Dropdown when user clicks except dropdown content
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If User click is outside dropdown
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    } // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef, setOpen]);

  // Function to handle an option click. Sets the selected option and closes the dropdown.
  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setOpen(false);
  };

  return (
    <div className='cursor-pointer' ref={dropDownRef}>
      {/* Main div unaffected by open state and placeholder */}
      <div
        className={`block w-[256px] p-[1.5px] ${
          open ? 'rounded-t-md' : 'rounded-md'
        } ${colorEffect[color].parent}`}
        onClick={() => setOpen(!open)}
      >
        <div
          className={`flex justify-between items-center w-full py-3 px-4 lg:py-4 lg:px-5 bg-transparent`}
        >
          <p className='text-sm  font-poppins capitaliz font-semibold'>
            {selectedOption || placeholder}
          </p>
          <ArrowDropdownIcon
            size={10}
            className={`${colorEffect[color].icon} w-4 h-4 ${
              open ? 'rotate-180' : 'rotate-0'
            } transition-all duration-300`}
          />
        </div>
      </div>
      {/* Dropdown open */}
      <div
        className={`${
          open
            ? 'opacity-100 translate-y-0'
            : '-translate-y-[60px] pointer-events-none opacity-0'
        } transition-all duration-300 h-[200px] overflow-y-scroll custom-scrollbar lg:top-[70px] mb-2 left-0 w-full rounded-b-md ${
          colorEffect[color]['child-container']
        }`}
      >
        {/* Mapping options */}
        <div
          onClick={() => handleOptionClick('All')}
          className={`cursor-pointer break-all text-sm font-poppins transition-all duration-300 capitalize py-3 px-5 ${colorEffect[color].child}`}
        >
          All
        </div>
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`cursor-pointer break-all text-sm font-poppins transition-all duration-300 capitalize py-3 px-5 ${colorEffect[color].child}`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
