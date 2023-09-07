'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import BorderCircleTopLeft from '@/components/icons/BorderCircleTopLeft';
import BorderStar from '@/components/icons/stars/BorderStar';
import CircularStarBottomRight from '@/components/icons/stars/CircularStarBottomRight';
import CircularStarTopLeft from '@/components/icons/stars/CircularStarTopLeft';
import FilledStar from '@/components/icons/stars/FilledStar';
import FilledStars from '@/components/icons/stars/FilledStars';
import { ManagedUI, ManagedUIContextType } from '@/contexts/ManagedUI';

import ModalBackground from '../../public/assets/ModalBackground.png';

interface CloseIconProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <div className='relative cursor-pointer' onClick={onClick}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='white'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 z-[2]'
      >
        <path
          d='M3.27295 0.000306869C2.99382 0.000306869 2.71439 0.106634 2.50166 0.319901L0.319901 2.50166C-0.106634 2.9282 -0.106634 3.61879 0.319901 4.04424L8.27566 12L0.319901 19.9558C-0.106634 20.3823 -0.106634 21.0729 0.319901 21.4983L2.50166 23.6801C2.9282 24.1066 3.61879 24.1066 4.04424 23.6801L12 15.7243L19.9558 23.6801C20.3812 24.1066 21.0729 24.1066 21.4983 23.6801L23.6801 21.4983C24.1066 21.0718 24.1066 20.3812 23.6801 19.9558L15.7243 12L23.6801 4.04424C24.1066 3.61879 24.1066 2.92711 23.6801 2.50166L21.4983 0.319901C21.0718 -0.106634 20.3812 -0.106634 19.9558 0.319901L12 8.27566L4.04424 0.319901C3.83097 0.106634 3.55208 0.000306869 3.27295 0.000306869Z'
          fill='white'
        />
      </svg>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='#745735'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 right-0 blur w-4 h-4 md:w-6 md:h-6'
      >
        <path
          d='M3.27295 0.000306869C2.99382 0.000306869 2.71439 0.106634 2.50166 0.319901L0.319901 2.50166C-0.106634 2.9282 -0.106634 3.61879 0.319901 4.04424L8.27566 12L0.319901 19.9558C-0.106634 20.3823 -0.106634 21.0729 0.319901 21.4983L2.50166 23.6801C2.9282 24.1066 3.61879 24.1066 4.04424 23.6801L12 15.7243L19.9558 23.6801C20.3812 24.1066 21.0729 24.1066 21.4983 23.6801L23.6801 21.4983C24.1066 21.0718 24.1066 20.3812 23.6801 19.9558L15.7243 12L23.6801 4.04424C24.1066 3.61879 24.1066 2.92711 23.6801 2.50166L21.4983 0.319901C21.0718 -0.106634 20.3812 -0.106634 19.9558 0.319901L12 8.27566L4.04424 0.319901C3.83097 0.106634 3.55208 0.000306869 3.27295 0.000306869Z'
          fill='white'
        />
      </svg>
    </div>
  );
};

const Modal = ({
  title,
  description,
  onClickButtonOne = () => {},
  onClickButtonTwo = () => {},
}: {
  title: string;
  description: string;
  onClickButtonOne: () => void;
  onClickButtonTwo: () => void;
}) => {
  const context = useContext<ManagedUIContextType>(ManagedUI);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const setOpenModal = context?.setOpenModal ?? function () {};

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setOpenModal(false), 500);
  };

  return createPortal(
    <div
      className={`fixed inset-0 backdrop-blur-sm z-[200] flex justify-center items-center bg-black/40 ease-in duration-300 ${
        isOpen ? 'modal-open' : 'modal-closed'
      }`}
      onClick={closeModal}
    >
      <div
        className='relative max-w-[300px] md:max-w-[560px] pt-4 pb-8 px-8 text-orange-300 rounded-lg text-center md:text-left'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Design & Decorations */}
        <Image
          className='w-full h-full absolute top-0 left-0 rounded-lg z-[-1]'
          alt='Modal Background'
          width={500}
          height={400}
          src={ModalBackground}
        />
        <div className='absolute top-4 right-4 md:top-8 md:right-8 cursor-pointer z-[220] hover:brightness-[80%]'>
          <CloseIcon
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              closeModal();
            }}
          />
        </div>

        {/* Desktop */}
        <div className='hidden md:block absolute left-3 top-4'>
          <FilledStars size={25} />
        </div>
        <div className='hidden md:block absolute bottom-4 left-3'>
          <BorderStar size={25} />
        </div>
        <div className='hidden md:block absolute bottom-0 right-0'>
          <CircularStarTopLeft size={25} />
        </div>
        {/* End Desktop */}

        {/* Mobile */}
        <div className='block md:hidden absolute left-0 top-0'>
          <CircularStarBottomRight size={25} />
        </div>
        <div className='block md:hidden absolute right-0 bottom-0'>
          <BorderCircleTopLeft size={25} />
        </div>
        <div className='block md:hidden absolute left-3 bottom-3'>
          <FilledStar size={25} />
        </div>
        {/* End Mobile */}

        {/* Contents */}
        <div className='z-[201]'>
          <div className='relative'>
            <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#816139] via-[#fbdfbc] to-[#ffefdb] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left'>
              {title ?? 'Modals Title'}
            </p>
            <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#8d6a41] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[4px] absolute top-0 w-full text-center md:text-left select-none z-[-1]'>
              {title ?? 'Modals Title'}
            </p>
          </div>
        </div>
        <p className='py-6 text-[#FFE1B9] z-[201]'>
          {description ??
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet auctor viverra. Nulla facilisis elit ac leo ornare congue. Morbi sed lectus maximus, efficitur orci a.'}
        </p>
        <div
          className='flex flex-col w-fit md:flex-row justify-end md:w-full gap-3 font-bold mx-auto'
          onClick={() => {
            onClickButtonOne();
            closeModal();
          }}
        >
          <button className='radius hover:brightness-[80%]'>
            <div className='gradient-border-bg'>Button</div>
          </button>
          <button
            className='relative bg-[#AB814E] hover:brightness-[80%] py-[0.7rem] px-[4.3rem] text-white rounded-[4px]'
            onClick={() => {
              onClickButtonTwo();
              closeModal();
            }}
          >
            <div className='absolute inset-0 bg-[#AB814E] blur-sm' />
            <div className='backdrop-blur w-full'>Button</div>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
