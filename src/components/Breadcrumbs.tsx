'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const [pathSegments, setPathSegments] = useState<string[]>([]);

  useEffect(() => {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    setPathSegments(pathArray);
  }, []);

  return (
    <nav className='hidden transition-all text-left duration-300 sm:block text-base font-poppins font-semibold lg:text-lg'>
      <ol className='flex list-none'>
        <li>
          <Link href='/'>
            <span className='text-white hover:underline cursor-pointer'>
              Home
            </span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index}>
            <span className='mx-2 text-[#FFE1B9]'>{'>'}</span>
            <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
              <span
                className={`capitalize ${
                  index === pathSegments.length - 1
                    ? 'text-[#DBB88B] hover:underline cursor-pointer '
                    : 'text-white hover:underline cursor-pointer '
                }`}
              >
                {segment}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
