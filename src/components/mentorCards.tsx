import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import Instagram from '@/components/icons/instagram';
import { type Mentor } from '@/types/our-mentors';

const MentorCard: React.FC<Mentor> = ({
  name,
  post,
  instagram,
  image,
  company,
  desc,
  invert,
  horizontal,
}) => {
  return (
    <article
      className={`my-6 ${
        horizontal
          ? 'w-[80%] flex-col sm:flex sm:flex-row items-stretch '
          : 'w-[229px] lg:w-[297px] flex-col'
      } ${invert ? 'sm:flex-row-reverse' : 'flex-row'}
      h-fit rounded-3xl bg-dark-green shadow-[0px_0px_10px_5px_rgba(0,0,0,1)] shadow-[#8c6e47]`}
    >
      {/* Setting for div imageUrl and the text imageUrl */}
      {image && (
        <div
          className={`relative  ${horizontal ? 'rounded-3xl' : 'rounded-3xl'} ${
            invert ? 'rounded-3xl' : 'rounded-3xl'
          }
          bg-neutral-300 shadow-none ${
            !horizontal
              ? desc
                ? 'h-[194px] w-full lg:h-[251px]'
                : 'h-[244px] w-full lg:h-[316.85px]'
              : 'h-[310px] w-full sm:w-[40%] lg:h-[361.68px]'
          }`}
        >
          <Image
            src={image.url}
            className={`w-full h-full object-cover rounded-t-3xl ${
              invert
                ? 'sm:rounded-r-3xl sm:rounded-tr-3xl sm:rounded-l-none'
                : 'sm:rounded-l-3xl sm:rounded-tr-none '
            }`}
            width={417}
            height={255}
            alt={image.title}
          ></Image>
        </div>
      )}
      {/* Text Content */}
      <div
        className={`flex flex-col ${
          desc
            ? 'gap-2 sm:gap-2 lg:gap-[22px] lg:pt-[15px]'
            : 'py-[15px] lg:pt-[35px] lg:pb-[30px]'
        } p-5 lg:p-[19px]  ${horizontal && 'flex-1 lg:mx-3'}`}
      >
        {/* Title */}
        <div className='bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
          <div className='bg-dark-green rounded-3xl m-[3px]'>
            <div className='align-middle py-3 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl h-[80px] flex flex-col text-center justify-center'>
              <span
                className='text-center align-middle text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
                style={{
                  textShadow: `
              0px 0px 0.9732px #705229,
              0px 0px 1.9464px #705229,
              0px 0px 40.8744px #705229
              0px 0px 23.3568px #705229,
              0px 0px 13.6248px #705229,
              0px 0px 6.8124px #705229,
              `,
                }}
              >
                {name}
              </span>
              <div className='align-middle flex gap-1 items-center justify-center'>
                <span className='align-middle text-center font-poppins font-bold text-sm bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                  {post} at
                </span>
                <div className='h-[25px] w-[50px]'>
                  <Image
                    src={company.url}
                    className='w-[50px] h-[25px]'
                    width={company.width}
                    height={company.height}
                    alt={company.title}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Children */}
        <p
          className={`flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs sm:text-sm lg:text-base tracking-wide`}
        >
          <StructuredText data={desc} />
        </p>
        <div className='gap-2 flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs sm:text-sm lg:text-base tracking-wide'>
          <Instagram size={20} /> {instagram}
        </div>
      </div>
    </article>
  );
};

interface MentorCardsProps {
  options: Mentor[];
}

const MentorCards: React.FC<MentorCardsProps> = ({ options }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {options?.map((option) => (
        <MentorCard
          id={option.id}
          key={option.name}
          name={option.name}
          post={option.post}
          instagram={option.instagram}
          desc={option.desc}
          image={option.image}
          company={option.company}
          invert={option.invert || false}
          horizontal={option.horizontal || true}
        />
      ))}
    </div>
  );
};

export default MentorCards;
