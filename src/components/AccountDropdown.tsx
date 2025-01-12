import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';

import Button from '@/components/Button';

function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative h-auto'>
      <Button
        color='transparent2'
        isAccount={true}
        onClick={toggleDropdown}
        className='hover:scale-[1.05] text-[32px] text-white flex flex-row items-center justify-center'
      >
        <RiAccountCircleLine className='w-6 h-6' />
        <MdKeyboardArrowDown
          className={`w-6 h-6 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <div className='absolute right-0 mt-3 w-48 bg-customGreen border-2 text-white border-white rounded-md shadow-lg'>
          <Link href='events/dashboard'>
            <p className='block rounded-t-md px-4 py-2 hover:bg-white hover:bg-opacity-20'>
              Dashboard
            </p>
          </Link>
          <button
            onClick={() => signOut()}
            className='block w-full rounded-b-md text-left px-4 py-2 hover:bg-white hover:bg-opacity-20'
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
