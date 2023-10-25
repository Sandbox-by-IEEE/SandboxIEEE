import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { type Mentor } from '@/types/our-mentors';
interface MentorCardsProps {
  options: Mentor[];
}

const MentorCards: React.FC<MentorCardsProps> = ({ options }) => {
  return (
    <div className='flex flex-wrap gap-10 md:gap-12 lg:gap-14 2xl:gap-16 items-center justify-center'>
      {options.map((option, index) => (
        <article
          key={index}
          className={`w-[270px] sm:w-full lg:max-w-[1000px] flex bg-dark-green ${
            index % 2 == 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'
          } h-fit rounded-3xl flex-col sm:flex-row shadow-[0px_0px_10px_5px_rgba(0,0,0,1)] shadow-[#8c6e47] overflow-hidden`}
        >
          {/* Setting for div imageUrl and the text imageUrl */}
          <Image
            src={option.image.url}
            className={`w-full sm:w-[250px] md:w-[300px] xl:w-[400px] h-[250px] sm:min-h-[300px] lg:min-h-[350px] object-cover object-center`}
            width={417}
            height={255}
            alt={option.image.title}
          ></Image>
          {/* Text Content */}
          <div className={`flex flex-col flex-1 gap-5 p-5 lg:p-[25px]`}>
            {/* Identity Gradient Box*/}
            <div className='bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
              <div className='bg-dark-green rounded-3xl m-[4px]'>
                <div className='bg-gradient-to-br p-1 lg:p-2 from-[#84694875] via-white/5 to-[#84694875] rounded-3xl flex flex-col text-center items-center justify-center'>
                  {/* Name */}
                  <h3 className='text-center text-xl lg:text-2xl p-1 font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                    {option.name}
                  </h3>
                  <div className='flex gap-2 items-center justify-center'>
                    {/* Position */}
                    <span className='text-center font-poppins font-bold text-base lg:text-lg bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                      {option.post} at
                    </span>
                    <Image
                      src={option.company.url}
                      className='w-[70px] h-[40px] object-contain object-center'
                      width={option.company.width}
                      height={option.company.height}
                      alt={option.company.title}
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
            {/* Children */}
            <div
              className={`flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs sm:text-sm lg:text-base tracking-wide`}
            >
              <StructuredText data={option.desc} />
            </div>
            <div className='gap-2 flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs sm:text-sm lg:text-base tracking-wide'>
              {option.linkedin && (
                <>
                  <LinkedInIcon size={25} className='fill-[#FFE1B9]' />
                  {option.linkedin}
                </>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MentorCards;
