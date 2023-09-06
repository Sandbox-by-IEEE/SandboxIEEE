'use client';
import { useContext } from 'react';

import Modal from '@/components/Modal';
import { ManagedUI, ManagedUIContextType } from '@/contexts/ManagedUI';

export default function Home() {
  const { openModal, setOpenModal } =
    useContext<ManagedUIContextType>(ManagedUI);

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        {/* Moodal */}
        {openModal && (
          <Modal
            title='Modals Title'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet auctor viverra. Nulla facilisis elit ac leo ornare congue. Morbi sed lectus maximus, efficitur orci a.'
            onClickButtonOne={() => {}}
            onClickButtonTwo={() => {}}
          />
        )}
        <button onClick={() => setOpenModal(true)}>Open Modal</button>
      </main>
    </>
  );
}
