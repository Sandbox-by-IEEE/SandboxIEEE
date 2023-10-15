'use client';
import { useContext, useState } from 'react';

import {
  ModalContext,
  ModalContextContextType,
} from '@/components/Modal/ModalContext';
import CollectionVoteCards, {
  VoteCardProps,
} from '@/components/Vote/CollectionCardVote';

const ClientVotePage = ({
  TPCData,
  PTCData,
}: {
  TPCData: VoteCardProps[];
  PTCData: VoteCardProps[];
}) => {
  const { setOpenModal } = useContext<ModalContextContextType>(ModalContext);
  const [selectedTPC, setSelectedTPC] = useState<string | undefined>('');
  const [selectedPTC, setSelectedPTC] = useState<string | undefined>('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  return (
    <section className='flex flex-col gap-10 items-center justify-center'>
      {/* PTC */}
      <CollectionVoteCards
        isOpenModal={selectedCardId === 'PTC'}
        setSelectedCardId={setSelectedCardId}
        setIsOpenModal={setOpenModal}
        data={PTCData}
        title='PTC'
        voteSelectedId={(isVote?: string) => {
          const newSelectedPTC = isVote;
          setSelectedPTC(newSelectedPTC);
        }}
      />
      {/* TPC */}
      <CollectionVoteCards
        isOpenModal={selectedCardId === 'TPC'}
        setSelectedCardId={setSelectedCardId}
        setIsOpenModal={setOpenModal}
        data={TPCData}
        title='TPC'
        voteSelectedId={(isVote?: string) => {
          const newSelectedTPC = isVote;
          setSelectedTPC(newSelectedTPC);
        }}
      />
    </section>
  );
};

export default ClientVotePage;
