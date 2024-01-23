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

// type Window = {
//   height?: number;
//   width?: number;
// };

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
    <div className='min-w-[150px] xl:max-w-[150px] relative'>
      <Dropdown
        color='cream'
        options={['Exhibition', 'Grand Seminar', 'PTC', 'TPC']}
        placeholder='EVENTS'
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
    text: 'EVENTS',
    route: '/events',
  },
  {
    text: 'OUR MENTORS',
    route: '/our-mentors',
  },
  // {
  //   text: 'OUR PAST EVENTS',
  //   route: '/past-events',
  // },
  { text: 'CONTACT US', route: '/contact-us' },
  {
    text: 'SPONSORSHIPS',
    route: '/sponsorships',
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
        const isActive = pathname.startsWith(tuple.route);
        return tuple.text == 'EVENTS' ? (
          <div key={idx} className='-mb-2'>
            <EventDropdown isActive={isActive} />
          </div>
        ) : (
          <Link
            className={` font-poppins text-[15px] tracking-wide lg:text-lg font-semibold mx-4 ${
              isActive ? 'text-cream-secondary-normal' : 'text-white'
            }`}
            href={tuple.route}
            key={idx}
          >
            {tuple.text}
          </Link>
        );
      })}

      <Button
        color='light-gold'
        onClick={session ? () => signOut() : () => signIn()}
        isFullWidth
      >
        {session && session.user ? 'Logout' : 'Sign In'}
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
        const isActive = pathname.startsWith(tuple.route);
        return tuple.text == 'EVENTS' ? (
          <div key={idx}>
            <EventDropdown isActive={isActive} />
          </div>
        ) : (
          <Link
            className={`font-poppins text-sm lg:text-[15px] tracking-wide font-semibold mx-4 ${
              isActive ? 'text-cream-secondary-normal' : 'text-white'
            }`}
            href={tuple.route}
            key={idx}
          >
            {tuple.text}
          </Link>
        );
      })}

      <Button
        color='light-gold'
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session && session.user ? 'Logout' : 'Sign In'}
      </Button>
    </div>
  );
}
function NavBarLarge({ session }: { session: Session | null }) {
  const [navbarPos, setNavbarPos] = useState<number>(0);
  const pathname = usePathname();

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
      className={`sticky bg-green-gradient z-50 w-full top-[${navbarPos}px]`}
      style={{
        borderBottom: '6px solid transparent',
        borderImage: 'linear-gradient(180deg, #AB814E 0%, #FFE1B9 100%) 0.5',
        boxShadow:
          '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(112, 82, 41, 0.25)',
      }}
    >
      <div className='bg-green-gradient h-24 w-full relative z-50'>
        <div className='aspect-square h-36 absolute -z-2 pointer-events-none top-[-30px]'>
          <Image src='/comet.svg' alt='commet' fill />
        </div>

        <div className='bg-green-gradient w-full h-24 flex justify-center items-center relative'>
          <div className='flex flex-row items-center justify-between w-full px-10 2xl:px-20'>
            <button
              className='aspect-square h-20 flex flex-row items-center justify-center z-20'
              aria-label='Home button'
            >
              <SandboxLogo />
            </button>

            <MenuComponentLarge session={session} pathname={pathname} />
          </div>
        </div>

        <div className='aspect-square h-8 absolute top-0 right-4 -z-2 pointer-events-none'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>

        <div className='aspect-square h-16 absolute top-1/3 right-1/4 -z-2 pointer-events-none'>
          <Image src='/twinkle.svg' alt='commet' fill />
        </div>
      </div>
    </div>
  );
}

function NavBarSmall({ session }: { session: Session | null }) {
  const [navbarPos, setNavbarPos] = useState<number>(0);
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
    <div>
      <div
        className={`fixed h-[100vh] bg-black transition-all opacity-40 ease-in duration-300 top-0 right-0 z-[49] ${
          isOpen ? 'w-full' : 'hidden'
        }`}
        onClick={() => closeDrawer()}
      ></div>
      <div
        className={`sticky bg-green-gradient max-w-full min-w-full py-1 z-50 top-[${navbarPos}px]`}
        style={{
          borderBottom: '4px solid transparent',
          borderImage: 'linear-gradient(180deg, #AB814E 0%, #FFE1B9 100%) 1',
          boxShadow:
            '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(112, 82, 41, 0.25)',
        }}
      >
        <div className='bg-green-gradient w-full h-16 relative'>
          <div className='aspect-square h-36 absolute z-10 top-[-50px]'>
            <Image src='/comet.svg' alt='commet' fill />
          </div>

          <div className='bg-green-gradient w-full h-16 flex justify-center items-center relative'>
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
          <div className='w-full bg-green-primary h-full relative' content=''>
            <div className='aspect-square h-64 top-[-2rem] left[-0.5rem] absolute '>
              <Image src='/top-drawer.svg' alt='Top drawer' fill />
            </div>

            <div
              className='w-full bg-green-primary h-full flex flex-col items-center'
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
