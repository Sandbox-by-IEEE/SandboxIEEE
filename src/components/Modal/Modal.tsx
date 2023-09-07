'use client';
import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import BorderCircleTopLeft from '@/components/icons/BorderCircleTopLeft';
import CloseIcon from '@/components/icons/CloseIcon';
import BorderStar from '@/components/icons/stars/BorderStar';
import CircularStarBottomRight from '@/components/icons/stars/CircularStarBottomRight';
import CircularStarTopLeft from '@/components/icons/stars/CircularStarTopLeft';
import FilledStar from '@/components/icons/stars/FilledStar';
import FilledStars from '@/components/icons/stars/FilledStars';
import {
  ModalContext,
  ModalContextContextType,
} from '@/components/Modal/ModalContext';

const Modal = ({
  title,
  description,
  onClickButtonOne = () => {},
  onClickButtonTwo = () => {},
}: {
  title: string;
  description: string;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
}) => {
  const context = useContext<ModalContextContextType>(ModalContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const setOpenModal = context?.setOpenModal ?? function () {};

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setOpenModal(false), 500);
  };

  return createPortal(
    <div
      className={`fixed inset-0 backdrop-blur-sm z-[200] flex justify-center items-center bg-black/40 ease-in duration-300 ${
        isOpen
          ? 'opacity-1 transform translate-y-0 transition-all duration-300 ease-in-out'
          : 'opacity-0 transform -translate-y-20 transition-all duration-300 ease-in-out'
      }`}
      onClick={closeModal}
    >
      <div
        className="relative max-w-[300px] md:max-w-[560px] pt-4 pb-8 px-8 text-orange-300 rounded-lg text-center md:text-left bg-[url('/assets/ModalBackground.png')] bg-no-repeat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Design & Decorations */}
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
        <div className='flex flex-col w-fit md:flex-row justify-end md:w-full gap-3 font-bold mx-auto'>
          <button
            className='rounded-[4px] overflow-hidden hover:brightness-[80%]'
            onClick={() => {
              onClickButtonOne();
              closeModal();
            }}
          >
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
