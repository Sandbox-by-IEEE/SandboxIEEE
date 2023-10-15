import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import ChainLinkIcon from '@/components/icons/ChainLinkIcon';

interface VoteCardProps {
  teamsName: string;
  topic: string;
  imageUrl: string;
  isVoted?: boolean;
  onVote?: () => void;
  alreadyVoted?: boolean;
  isDisabled?: boolean;
  imageHeight: number;
  imageWidth: number;
  imageAlt: string;
  urlCreation?: string;
}

const VoteCard: React.FC<VoteCardProps> = ({
  teamsName,
  topic,
  imageUrl,
  imageHeight,
  imageWidth,
  imageAlt,
  isVoted,
  onVote,
  alreadyVoted,
  isDisabled,
  urlCreation,
}) => {
  return (
    <div className='w-[250px] lg:w-[330px] flex items-center justify-center rounded-xl shadow-custom-card-vote flex-col gap-2 lg:gap-4 p-5 bg-gradient-card-vote'>
      <h4 className='text-black font-poppins text-center text-xl lg:text-2xl font-bold'>
        {teamsName}
      </h4>
      <Image
        src={imageUrl}
        width={imageWidth}
        height={imageHeight}
        alt={imageAlt}
        className='w-[100px] lg:w-[130px] aspect-square rounded-full overflow-hidden object-cover object-center'
      />
      {urlCreation && (
        <div className='flex items-center justify-center gap-2'>
          <ChainLinkIcon
            size={20}
            className='h-5 w-5 fill-[#046EE7] -rotate-45 '
          />
          <Link href={urlCreation}>
            <p className='font-gantari-4 text-base text-[#046EE7] underline-offset-4 hover:underline'>
              See More Details
            </p>
          </Link>
        </div>
      )}
      <p className='text-black font-poppins text-lg text-center lg:text-xl font-semibold'>
        {topic}
      </p>
      {isVoted && (
        <Button
          color='green'
          onClick={() => {
            onVote && !alreadyVoted && onVote();
          }}
          isDisabled={isDisabled && !alreadyVoted}
        >
          {alreadyVoted ? 'Voted!' : 'Vote'}
        </Button>
      )}
    </div>
  );
};

export default VoteCard;
