'use client';
import React, { useContext, useEffect, useState } from 'react';
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
  buttonText1,
  buttonText2,
  isColButton,
  onClickButtonOne = () => {},
  onClickButtonTwo = () => {},
  disabledButtonOne,
  disabledButtonTwo,
}: {
  title: string;
  description: React.ReactNode;
  buttonText1?: string;
  buttonText2?: string;
  isColButton?: boolean;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
  disabledButtonOne?: boolean;
  disabledButtonTwo?: boolean;
}) => {
  const context = useContext<ModalContextContextType>(ModalContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setOpenModal = context?.setOpenModal ?? function () {};

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 0);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setOpenModal(false), 500);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  return createPortal(
    <div
      className={`fixed inset-0 backdrop-blur-sm z-[50] flex justify-center items-center bg-black/60 ease-in duration-300 ${
        isOpen
          ? 'opacity-1 pointer-events-auto transform translate-y-0 transition-all duration-300 ease-in-out'
          : 'opacity-0 pointer-events-none transform -translate-y-20 transition-all duration-300 ease-in-out'
      }`}
      onClick={closeModal}
    >
      <div
        className="relative max-w-[300px] md:max-w-[560px] pt-4 pb-8 px-8 text-orange-300 rounded-lg bg-opacity-110 text-center md:text-left bg-[url('/assets/ModalBackground.png')] bg-no-repeat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Design & Decorations */}
        <div className='absolute top-4 right-4 md:top-8 md:right-8 cursor-pointer transition-all duration-300 z-[220] hover:brightness-[80%]'>
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
            <p className='py-4 px-5 text-transparent bg-clip-text bg-gradient-to-tr from-[#816139] via-[#fbdfbc] to-[#ffefdb] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left'>
              {title ?? 'Modals Title'}
            </p>
            <p className='py-4 px-5 text-transparent bg-clip-text bg-gradient-to-tr from-[#8d6a41] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[4px] absolute top-0 w-full text-center md:text-left select-none z-[-1]'>
              {title ?? 'Modals Title'}
            </p>
          </div>
        </div>
        <div className='pb-6 text-[#FFE1B9] z-[201] text-left'>
          {description ??
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet auctor viverra. Nulla facilisis elit ac leo ornare congue. Morbi sed lectus maximus, efficitur orci a.'}
        </div>
        <div
          className={`text-sm flex gap-3 lg:text-base font-poppins h-fit w-full font-bold mx-auto ${
            isColButton
              ? 'flex-col-reverse items-center justify-center gap-10'
              : 'items-stretch max-md:flex-col-reverse md:flex-row justify-end'
          } `}
        >
          <button
            className={`w-full ${
              isColButton ? 'w-full' : 'w-full md:w-fit md:max-w-[50%]'
            } disabled:cursor-not-allowed disabled:brightness-[70%] transition-all duration-300 hover:brightness-[80%]`}
            onClick={() => {
              onClickButtonOne();
              closeModal();
            }}
            disabled={disabledButtonOne}
          >
            <div className='border-[#ab814e] w-full border-[4px] overflow-hidden rounded-xl px-5 py-2.5'>
              {buttonText1}
            </div>
          </button>
          <button
            className={`bg-[#AB814E] ${
              isColButton ? 'w-full' : 'max-md:flex-1 md:w-fit'
            } hover:brightness-[80%] rounded-xl disabled:cursor-not-allowed disabled:brightness-[70%] transition-all duration-300 px-5 max-md:py-3.5 py-2.5 text-white `}
            onClick={() => {
              onClickButtonTwo();
            }}
            disabled={disabledButtonTwo}
          >
            <div className=' bg-[#AB814E] blur-sm' />
            <div className='backdrop-blur w-full'>{buttonText2}</div>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
