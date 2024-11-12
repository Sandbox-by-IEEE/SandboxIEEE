'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth/core/types';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
import XIcon from '@/components/icons/XIcon';

type PairDrawerButton = {
  text: string;
  route: string;
};

/**
 * @desc dibuat  jd internal components karena kayaknya ngga akan ada lagi yang butuh.
 */

function SandboxLogo() {
  return (
    <Link
      className='aspect-square z-[15] h-12 flex flex-row items-center justify-center'
      href='/'
    >
      <div className='aspect-square h-12 absolute flex flex-row justify-center align-center'>
        <Image
          priority
          src='/sandbox-gold.svg'
          alt='sandbox'
          width={50}
          height={50}
          className='relative'
          sizes='50px'
        />
      </div>
    </Link>
  );
}

/**
 *
 * DIJADIIN KOMPONEN YANG SMALL SAMA YANG LARGE BIAR CEPET AJA DEVELOPNYA,
 */

function EventDropdown({ isActive }: { isActive?: boolean }) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  return (
    <div className='w-auto relative'>
      <Dropdown
        color='transparent'
        options={['PTC', 'HCI']}
        placeholder='Events'
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fullWidth={true}
        type='routes'
        isActive={isActive}
      />
    </div>
  );
}

const MENU: PairDrawerButton[] = [
  {
    text: 'Homepage',
    route: '/',
  },
  {
    text: 'Events',
    route: '/events',
  },
  { text: 'Sponsorships', route: '/sponsorships' },
  {
    text: 'Contact Us',
    route: '/contact-us',
  },
];

function MenuComponentSmall({
  session,
  pathname,
}: {
  session: Session | null;
  pathname: string;
}) {
  return (
    <div className='w-4/5 flex flex-col gap-y-7 pt-24 z-20 relative'>
      {MENU.map((tuple: PairDrawerButton, idx: number) => {
        const isEventsActive =
          tuple.text === 'Events' && pathname.startsWith('/events');
        const isActive = pathname === tuple.route;
        return tuple.text == 'EVENTS' ? (
          <div key={idx} className='-mb-2'>
            <EventDropdown isActive={isEventsActive} />
          </div>
        ) : (
          <Link
            className={` font-poppins text-[15px] tracking-wide lg:text-lg font-semibold mx-4 ${
              isActive ? 'text-white' : 'text-white'
            }`}
            href={tuple.route}
            key={idx}
          >
            {tuple.text}
          </Link>
        );
      })}

      <Button
        color='transparent'
        onClick={session ? () => signOut() : () => signIn()}
        isFullWidth
      >
        {session && session.user ? 'Log Out' : 'Log In'}
      </Button>
    </div>
  );
}

function MenuComponentLarge({
  session,
  pathname,
}: {
  session: Session | null;
  pathname: string;
}) {
  return (
    <div className='h-4/5 flex flex-row gap-x-4 items-center'>
      {MENU.map((tuple: PairDrawerButton, idx: number) => {
        const isActive = pathname === tuple.route;
        const isEventsActive =
          tuple.text === 'Events' && pathname.startsWith('/events');
        return tuple.text == 'Events' ? (
          <div key={idx}>
            <EventDropdown isActive={isEventsActive} />
          </div>
        ) : (
          <Link
            className={`font-poppins text-sm lg:text-[15px] tracking-wide font-semibold mx-4 ${
              isActive
                ? 'text-white border-[1px] border-white bg-white bg-opacity-20 rounded-full'
                : 'text-white'
            }`}
            href={tuple.route}
            key={idx}
          >
            <div
              className={` ${
                !isActive ? 'hover:bg-opacity-20 hover:bg-white' : ''
              } py-3 px-4 rounded-full`}
            >
              {tuple.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function NavBarLarge({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <div className='fixed top-0 z-50 w-full'>
      <div className='h-24 w-full relative z-50'>
        <div className='bg-gradient-to-br from-[#18635adf] to-[#082349df] backdrop-filter backdrop-blur-sm w-full h-24 flex justify-center items-center relative shadow-lg'>
          <div className='flex flex-row items-center justify-between w-full px-10 2xl:px-20'>
            <button
              className='aspect-square h-20 flex flex-row items-center justify-center z-20'
              aria-label='Home button'
            >
              <SandboxLogo />
            </button>

            <MenuComponentLarge session={session} pathname={pathname} />
            <Button
              color='transparent'
              onClick={session ? () => signOut() : () => signIn()}
              isNav={true}
            >
              {session && session.user ? 'Log Out' : 'Log In'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBarSmall({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  };
  // Close drawer every pathname changes
  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  return (
    <div>
      <div
        className={`fixed h-[100vh] bg-black transition-all opacity-40 ease-in duration-300 top-0 right-0 z-[49] ${
          isOpen ? 'w-full' : 'hidden'
        }`}
        onClick={() => closeDrawer()}
      ></div>
      <div className='sticky top-0 bg-blue-400 max-w-full min-w-full py-1 z-50'>
        <div className='bg-blue-400 w-full h-16 relative'>
          <div className='aspect-square h-36 absolute z-10 top-[-50px]'>
            <Image src='/comet.svg' alt='commet' fill />
          </div>

          <div className='bg-blue-400 w-full h-16 flex justify-center items-center relative'>
            <div className='flex flex-row items-center justify-between w-5/6'>
              <SandboxLogo />
              <button
                className='h-14 aspect-square flex flex-row justify-center items-center'
                aria-label='Menu Button'
                onClick={toggleDrawer}
              >
                <HamburgerIcon height={35} width={50} className='fill-white' />
              </button>
            </div>
          </div>

          <div className='aspect-square h-8 absolute top-0 right-4'>
            <Image src='/twinkle.svg' alt='commet' fill />
          </div>

          <div className='aspect-square h-16 absolute top-[10px] right-1/4'>
            <Image src='/twinkle.svg' alt='commet' fill />
          </div>
        </div>

        <div
          className={`fixed overflow-hidden right-0 top-0 h-[100vh] w-[70vw]  ${
            isOpen ? 'translate-x-0 ' : 'translate-x-full'
          } transition-all ease-in duration-300`}
        >
          <div className='w-full bg-blue-400 h-full relative' content=''>
            <div className='aspect-square h-64 top-[-2rem] left[-0.5rem] absolute '>
              <Image src='/top-drawer.svg' alt='Top drawer' fill />
            </div>

            <div
              className='w-full bg-blue-400 h-full flex flex-col items-center'
              content=''
            >
              <MenuComponentSmall session={session} pathname={pathname} />
            </div>
          </div>

          <div className='aspect-square h-72 bottom-[-25px] right-0 absolute '>
            <Image src='/bottom-drawer.svg' alt='.' fill />
          </div>
          <button
            aria-label='Close Button'
            className={`aspect-square h-8 top-10 right-10 z-[100] absolute text-white transition-all duration-300 ${
              isOpen
                ? 'opacity-100 pointer-events-auto rotate-[180deg]'
                : 'opacity-0 pointer-events-none rotate-[300deg]'
            }`}
            onClick={closeDrawer}
          >
            <XIcon className='fill-white' size={30} />
          </button>

          <div className='w-full h-[2rem] flex justify-center align-center absolute bottom-[3.5rem]'>
            <div className='w-[6rem] h-[2rem] absolute'>
              <Image
                src='/logo-gold.png'
                alt='Gold logo'
                width={96}
                height={32}
                className='relative'
              />
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
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <h1 className='hidden'>Navbar</h1>
      <div className='hidden xl:block'>
        <NavBarLarge session={session} />
      </div>
      <div className='block xl:hidden'>
        <NavBarSmall session={session} />
      </div>
    </nav>
  );
}

export default NavBar;
