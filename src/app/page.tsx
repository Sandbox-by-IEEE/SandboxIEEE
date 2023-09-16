'use client';
import { useContext } from 'react';

import Modal from '@/components/Modal/Modal';
import {
  ModalContext,
  ModalContextContextType,
} from '@/components/Modal/ModalContext';

export default function Home() {
  const { openModal, setOpenModal } =
    useContext<ModalContextContextType>(ModalContext);

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center p-24 gap-4'>
        {/* Moodal */}
        {openModal && (
          <Modal
            title='Modals Title'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet auctor viverra. Nulla facilisis elit ac leo ornare congue. Morbi sed lectus maximus, efficitur orci a.'
          />
        )}
        <button
          className='px-4 py-1 bg-green-50 rounded-md'
          onClick={() => setOpenModal(true)}
        >
          Open Modal
        </button>
      </main>
    </>
  );
}
