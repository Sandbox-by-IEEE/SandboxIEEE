'use client';

import 'react-modern-drawer/dist/index.css';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';

import { DropdownForNavBar } from '@/components/Dropdown';
import XIcon from '@/components/icons/XIcon';
import SandboxLogo from '@/components/SandboxLogo';

type PairDrawerButton = {
  text: string;
  route: string;
};

type Window = {
  height?: number;
  width?: number;
};

/**
 *
 * NOTE: SORRY NGGA DRY-PRINCIPLE TERLALU BANYAK CONDITIONA HUEHUE
 */

function EventDropdown({ devSize }: { devSize: 'sm' | 'lg' }) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <DropdownForNavBar
      color='peach'
      options={['Exhibition', 'Grandseminar', 'PTC', 'TPC']}
      placeholder='EVENT'
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      isFullWidth={true}
      devSize={devSize}
    />
  );
}

const MENU: PairDrawerButton[] = [
  { text: 'HOMEPAGE', route: '/' },
  {
    text: 'EVENT',
    route: '/event',
  },
  {
    text: 'OUR MENTORS',
    route: '/mentors',
  },
  {
    text: 'OUR PAST EVENT',
    route: '/pastevent',
  },
  { text: 'MERCHANDISE', route: '/merchandise' },
  {
    text: 'SPONSORSHIPS',
    route: '/sponsorships',
  },
];

function MenuComponentSmall({ auth }: { auth: boolean }) {
  const profileButton: PairDrawerButton = {
    text: !auth ? 'REGISTER' : 'PROFILE',
    route: auth ? '/profile' : 'register',
  };

  return (
    <div className='w-4/5 flex flex-col gap-y-12 pt-36'>
      {MENU.map((tuple: PairDrawerButton, idx: number) => {
        return tuple.text == 'EVENT' ? (
          <EventDropdown devSize='sm' />
        ) : (
          <Link
            className='text-white font-inter text-lg font-semibold mx-4'
            href={tuple.route}
            key={idx}
          >
            {tuple.text}
          </Link>
        );
      })}

      <Link
        className='text-black font-inter text-lg font-semibold'
        href={profileButton.route}
      >
        <div className='w-full z-20 h-12 bg-[#FFE1B9] rounded-xl flex justify-center items-center shadow-gray-800 shadow-md'>
          {profileButton.text}
        </div>
      </Link>
    </div>
  );
}

function MenuComponentLarge({ auth }: { auth: boolean }) {
  const profileButton: PairDrawerButton = {
    text: !auth ? 'REGISTER' : 'PROFILE',
    route: auth ? '/profile' : 'register',
  };

  return (
    <div className='h-4/5 flex flex-row gap-x-8 items-center'>
      {MENU.map((tuple: PairDrawerButton, idx: number) => {
        return tuple.text == 'EVENT' ? (
          <EventDropdown devSize='lg' />
        ) : (
          <Link
            className='text-white font-poppins text-sm lg:text-md font-semibold mx-4'
            href={tuple.route}
            key={idx}
          >
            {tuple.text}
          </Link>
        );
      })}

      <Link
        className='text-black font-inter text-md lg:text-md font-semibold'
        href={profileButton.route}
      >
        <div className='px-4 py-2  bg-[#FFE1B9] rounded-xl flex justify-center items-center shadow-gray-800 shadow-md'>
          {profileButton.text}
        </div>
      </Link>
    </div>
  );
}

function MenuLogo() {
  return (
    <div className='aspect-square h-20 absolute flex flex-row justify-center items-center'>
      <Image src='/3-lines.svg' alt='MENU' fill className='relative' />
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Window>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function NavBarLarge() {
  const [navbarPos, setNavbarPos] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = false;
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  //   Scroll mechanism algorithm
  useEffect(() => {
    let prevScrollPosY = window.scrollY;

    const detectScrollY = () => {
      if (window.scrollY <= prevScrollPosY) {
        setNavbarPos(0);
      } else {
        setNavbarPos(-100);
      }
      prevScrollPosY = window.scrollY;
    };

    window.addEventListener('scroll', detectScrollY);
    return () => {
      window.removeEventListener('scroll', detectScrollY);
    };
  });

  return (
    <div
      className={`fixed bg-green-gradient w-full h-24 z-50 top-[${navbarPos}px]`}
    >
      <div className='bg-green-gradient w-full h-24 relative'>
        <div className='aspect-square h-36 absolute z-10 top-[-30px]'>
          <Image src='/comet.svg' alt='commet' fill />
        </div>

        <div
          content=''
          className='bg-green-gradient w-full h-24 flex justify-center items-center relative'
        >
          <div className='flex flex-row items-center gap-[150px] w-full px-20'>
            <button className='aspect-square h-20 flex flex-row items-center justify-center z-20'>
              <SandboxLogo />
            </button>

            <MenuComponentLarge auth={auth} />
          </div>
        </div>

        <div className='aspect-square h-8 absolute top-0 right-4'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-16 absolute top-1/3 right-1/4'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>
      </div>
    </div>
  );
}

function NavBarSmall() {
  const [navbarPos, setNavbarPos] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = false;
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  //   Scroll mechanism algorithm
  useEffect(() => {
    let prevScrollPosY = window.scrollY;

    const detectScrollY = () => {
      if (window.scrollY <= prevScrollPosY) {
        setNavbarPos(0);
      } else {
        setNavbarPos(-100);
      }
      prevScrollPosY = window.scrollY;
    };

    window.addEventListener('scroll', detectScrollY);
    return () => {
      window.removeEventListener('scroll', detectScrollY);
    };
  });

  return (
    <div
      className={`fixed bg-green-gradient w-full h-24 z-50 top-[${navbarPos}px]`}
    >
      <div className='bg-green-gradient w-full h-24 relative'>
        <div className='aspect-square h-36 absolute z-10 top-[-50px]'>
          <Image src='/comet.svg' alt='commet' fill />
        </div>

        <div
          content=''
          className='bg-green-gradient w-full h-24 flex justify-center items-center relative'
        >
          <div className='flex flex-row items-center justify-between w-5/6'>
            <button className='aspect-square h-20 flex flex-row items-center justify-center'>
              <SandboxLogo />
            </button>
            <button
              className='h-20 aspect-square flex flex-row justify-center items-center'
              onClick={toggleDrawer}
            >
              <MenuLogo />
            </button>
          </div>
        </div>

        <div className='aspect-square h-8 absolute top-0 right-4'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-16 absolute top-1/3 right-1/4'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        size='70vw'
      >
        <div className='w-full bg-green-primary h-full relative' content=''>
          <div className='aspect-square h-64 top-[-2rem] left[-0.5rem] absolute '>
            <Image src='/top-drawer.svg' alt='.' fill />
          </div>

          <div
            className='w-full bg-green-primary h-full flex flex-col items-center'
            content=''
          >
            <MenuComponentSmall auth={auth} />
          </div>
        </div>

        <div className='aspect-square h-72 bottom-[-25px] right-0 absolute '>
          <Image src='/bottom-drawer.svg' alt='.' fill />
        </div>

        <button
          className='aspect-square h-8 top-20 right-5 rounded absolute text-white'
          onClick={toggleDrawer}
        >
          <XIcon className='' size={20} />
        </button>

        <div className='w-full h-[2rem] flex justify-center align-center absolute bottom-[3.5rem]'>
          <div className='w-[6rem] h-[2rem] absolute'>
            <Image src='/logo-gold.png' alt='.' fill className='relative' />
          </div>
        </div>

        <div className='aspect-square h-8 absolute top-0 right-4'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-16 absolute top-72 right-1/2'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-12 absolute top-1/2 right-0'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-12 absolute top-3/4 right-1/3'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>
      </Drawer>
    </div>
  );
}

function NavBar() {
  const { width, height } = useWindowSize();
  if (!width || !height) return <></>;

  return width > 1280 ? (
    <>
      <NavBarLarge />
    </>
  ) : (
    <>
      <NavBarSmall />
    </>
  );
}

export default NavBar;
