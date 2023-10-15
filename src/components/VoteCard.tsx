import Image from 'next/image';

import Button from '@/components/Button';

interface VoteCardProps {
  teamsName: string;
  topic: string;
  imageUrl: string;
  isVote?: boolean;
  urlCreation?: string;
}

const VoteCard: React.FC<VoteCardProps> = ({
  teamsName,
  topic,
  imageUrl,
  isVote,
  urlCreation,
}) => {
  return (
    <div className='w-[250px] lg:w-[330px] flex items-center justify-center rounded-xl shadow-custom-card-vote flex-col gap-2 lg:gap-4 p-5 bg-gradient-card-vote'>
      <h4 className='text-black font-poppins text-center text-xl lg:text-2xl font-bold'>
        {teamsName}
      </h4>
      <Image
        src={imageUrl}
        width={140}
        height={140}
        alt={teamsName}
        className='w-[100px] lg:w-[130px] aspect-square rounded-full overflow-hidden object-cover object-center'
      />
      <p className='text-black font-poppins text-lg text-center lg:text-xl font-semibold'>
        {topic}
      </p>
      {isVote && <Button color='green'>Vote</Button>}
    </div>
  );
};
export default VoteCard;
