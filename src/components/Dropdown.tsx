import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import ArrowDropdownIcon from './icons/ArrowDropdownIcon';

interface DropdownProps {
  color?: 'green' | 'trans-green' | 'light' | 'cream';
  options: string[];
  placeholder?: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  type?: 'routes';
  fullWidth?: boolean;
  isActive?: boolean;
}

// Function to set routes options navbar
function RoutesOptions({
  options,
  colorClass,
}: {
  options: string[];
  colorClass: string;
}) {
  return (
    <>
      {options.map((option) => (
        <Link
          href={`/events/${option.toLowerCase().replace(/\s+/g, '-')}`}
          key={option}
        >
          <div
            className={`cursor-pointer break-all text-sm font-poppins transition-all duration-300 capitalize py-3 w-full px-5 ${colorClass}`}
          >
            {option}
          </div>
        </Link>
      ))}
    </>
  );
}

const Dropdown: React.FC<DropdownProps> = ({
  color = 'green', // Assign a default value here
  options,
  placeholder,
  selectedOption,
  setSelectedOption,
  type,
  fullWidth = false,
  isActive,
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
    cream: {
      parent: 'bg-cream-secondary-light text-green-primary',
      icon: 'fill-[#D8B88B]',
      'child-container':
        'bg-cream-secondary-light text-black font-poppins font-[500] z-10',
      child: 'hover:bg-white',
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

  const NavbarStylesSmall =
    'font-poppins text-sm lg:text-lg ' +
    (open
      ? colorEffect[color].parent + ' text-black'
      : isActive
      ? 'text-cream-secondary-normal'
      : 'text-white');

  return (
    <div
      className='cursor-pointer'
      ref={dropDownRef}
      onMouseEnter={() => type === 'routes' && setOpen(true)}
      onMouseLeave={() => type === 'routes' && setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      {/* Main div unaffected by open state and placeholder */}
      <div
        className={`block ${fullWidth ? 'w-full' : 'w-[256px]'} p-[1.5px] ${
          open ? 'rounded-t-md' : 'rounded-md'
        } ${type === 'routes' ? NavbarStylesSmall : colorEffect[color].parent}`}
      >
        <div
          className={`flex justify-between items-center w-full py-2 lg:px-5 ${
            type === 'routes' ? 'lg:px-[15px]' : 'py-3'
          } bg-transparent  px-4`}
        >
          <p
            className={`text-[15px] tracking-wide font-poppins capitalize font-semibold ${
              type === 'routes' && 'lg:text-lg xl:text-base'
            }`}
          >
            {selectedOption || placeholder}
          </p>
          <ArrowDropdownIcon
            size={10}
            className={`w-4 h-4 ${
              open
                ? type === 'routes'
                  ? 'rotate-180 fill-green-primary'
                  : `rotate-180 ${colorEffect[color].icon}`
                : `rotate-0  ${colorEffect[color].icon}`
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
        } transition-all duration-300 max-h-[200px] overflow-y-auto ${
          open && type == 'routes' ? 'lg:top-[44px]' : 'absolute lg:top-[70px]'
        } custom-scrollbar mb-2 left-0 w-full rounded-b-md ${
          colorEffect[color]['child-container']
        } ${type === 'routes' ? 'lg:absolute lg: y-0' : ''}`}
      >
        {/* Mapping options */}
        {type == 'routes' ? (
          <RoutesOptions
            options={options}
            colorClass={colorEffect[color].child}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
