'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function SandboxLogo() {
  return (
    <Link
      className='aspect-square h-20 flex flex-row items-center justify-center'
      href='\home'
    >
      <div className='aspect-square h-20 absolute flex flex-row justify-center align-center'>
        <Image
          src='/sandbox-gold.svg'
          alt='sandbox'
          fill
          className='relative'
        />
      </div>
    </Link>
  );
}
