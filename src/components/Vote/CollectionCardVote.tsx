'use client';
import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import VoteCard from '@/components/Vote/VoteCard';
export interface VoteCardProps {
  teamsName: string;
  topic: string;
  imageUrl: string;
  urlCreation?: string;
}

const CollectionVoteCards = ({
  voteSelectedId,
  isOpenModal,
  setIsOpenModal,
  setSelectedCardId,
  title,
  data,
}: {
  voteSelectedId: (voteSelected?: string) => void;
  isOpenModal: boolean;
  setSelectedCardId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  data: VoteCardProps[];
}) => {
  const [voteStatus, setVoteStatus] = useState<string>('');
  const [tempVoteStatus, setTempVoteStatus] = useState<string>('');
  const [voteSelected, setVoteSelected] = useState<boolean>(false);

  // Handle vote onClick Card
  const handleChange = (id: string) => {
    setIsOpenModal(true);
    setSelectedCardId(title);
    setTempVoteStatus(id);
  };

  // Handle vote onClick Modal
  const handleVote = (id: string) => {
    setVoteSelected(true);
    setVoteStatus(id);
    if (voteSelectedId) {
      voteSelectedId(id);
    }
    setIsOpenModal(false);
    setSelectedCardId(null);
  };

  return (
    <section className='flex flex-col gap-10 items-center justify-center'>
      {/* Title */}
      <h3 className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'>
        {title}
      </h3>
      {/* Mapping Card Data */}
      <div className='flex items-stretch justify-center flex-wrap gap-4 lg:gap-6 2xl:gap-10'>
        {data.map((card, index) => (
          <VoteCard
            urlCreation={card.urlCreation}
            key={index}
            teamsName={card.teamsName}
            topic={card.topic}
            imageUrl={card.imageUrl}
            isVoted={true}
            onVote={() => {
              handleChange(card.teamsName);
            }}
            alreadyVoted={voteStatus === card.teamsName}
            isDisabled={voteSelected}
          />
        ))}
      </div>
      {isOpenModal && (
        <Modal
          title='Are you sure want to vote?'
          description="Once you have voted, you can't change your choice."
          buttonText1='Cancel'
          buttonText2='Vote'
          onClickButtonOne={() => setIsOpenModal(false)}
          onClickButtonTwo={() => handleVote(tempVoteStatus)}
        />
      )}
    </section>
  );
};

export default CollectionVoteCards;
