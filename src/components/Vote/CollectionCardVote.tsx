'use client';
import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import { callToast } from '@/components/Toast';
import VoteCard from '@/components/Vote/VoteCard';
import { AllFinalProjectsExhibition } from '@/types/exhibition-type';
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
  data: AllFinalProjectsExhibition[];
}) => {
  const [voteStatus, setVoteStatus] = useState<string>('');
  const [tempVoteStatus, setTempVoteStatus] = useState<string>('');
  const [tempVoteStatus2, setTempVoteStatus2] = useState<string>('');
  const [voteSelected, setVoteSelected] = useState<boolean>(false);

  // Handle vote onClick Card
  const handleChange = (id: string, teamsName: string) => {
    setIsOpenModal(true);
    setSelectedCardId(title);
    setTempVoteStatus(id);
    setTempVoteStatus2(teamsName);
  };

  const handleOnSubmit = async (karyaId: string, teamsName: string) => {
    // const name = "Margaji"
    // const id = "df450508-ce3f-40ca-8235-f6304357a58d"
    // const res = await fetch(`/api/voting/team/${teamsName}`, {
    //   method: 'PATCH',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // });

    const res = await fetch(`/api/voting/karya/${karyaId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const resBody = await res.json();
    if (!res.ok) {
      callToast({ status: 'error', description: resBody.message });
      return;
    }

    callToast({ status: 'success', description: 'Voting berhasil!' });
    console.log(karyaId, teamsName);
    setIsOpenModal(false);
  };

  // Handle onVote onClick Modal Button
  const handleVote = (id: string, teamsName: string) => {
    setVoteSelected(true);
    setVoteStatus(id);
    if (voteSelectedId) {
      voteSelectedId(id);
    }
    setIsOpenModal(false);
    handleOnSubmit(id, teamsName);
    setSelectedCardId(null);
  };

  return (
    <section className='flex flex-col gap-10 items-center justify-center'>
      {/* Title */}
      <h3
        style={{
          ['text-shadow' as any]: '0px 0px 17.32px #BD9B65',
        }}
        className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'
      >
        {title}
      </h3>
      {/* Mapping Card Data */}
      <div className='flex items-stretch justify-center flex-wrap gap-10 lg:gap-14 2xl:gap-16'>
        {data.map((card) => (
          <VoteCard
            urlCreation={card.projectsUrl}
            key={card.id}
            teamsName={card.teamsName}
            topic={card.topic}
            imageUrl={card.image.url}
            imageAlt={card.image.title}
            imageHeight={card.image.height}
            imageWidth={card.image.width}
            isVoted={true}
            onVote={() => {
              handleChange(card.id, card.teamsName);
            }}
            alreadyVoted={voteStatus === card.id}
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
          onClickButtonTwo={() => handleVote(tempVoteStatus, tempVoteStatus2)}
        />
      )}
    </section>
  );
};

export default CollectionVoteCards;
