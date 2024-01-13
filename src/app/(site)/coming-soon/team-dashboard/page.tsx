import Image from 'next/image';

import GradientBox from '@/components/GradientBox';
import Triangle from '@/components/icons/Triangle';

const LableValue = ({ lable, children }) => (
  <>
    <p className='text-[#FFE1B9] py-1'>{lable}</p>
    <div className='py-1'>{children}</div>
  </>
);

const StageCircle = ({
  stage,
  bgColor,
}: {
  stage: number;
  bgColor: string;
}) => (
  <div
    className='w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-poppins font-bold'
    style={{ backgroundColor: bgColor }}
  >
    <p>STAGE</p>
    <p className='text-3xl'>{stage}</p>
  </div>
);

const width = {
  currentStage: 'w-1/3 flex-grow md:flex-grow-0',
  notCurrentStage: 'w-[10%] md:w-1/3',
};

const className = {
  currentStage:
    'w-1/3 flex-grow md:flex-grow-0 flex flex-col justify-between items-center gap-8',
  notCurrentStage:
    'w-[10%] md:w-1/3 flex flex-col justify-between items-center gap-8',
};

const page = () => {
  return (
    <section className='min-h-screen w-full bg-gradient-to-b from-[#051F12] to-[#06190C] flex justify-center pb-4'>
      <div className='max-w-[1200px] w-full p-2 sm:p-4 space-y-8 md:space-y-20'>
        <h1 className='font-museo-muderno text-center font-bold text-[32px] md:text-[50px] bg-clip-text text-[#00000000] bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'>
          Team Information
        </h1>
        {/* Stage Timeline */}
        <section>
          <div className='w-full flex items-center justify-between'>
            <div className={className.notCurrentStage}>
              <div className='hidden md:block'>
                <StageCircle stage={1} bgColor='#49784F' />
              </div>
            </div>
            <div className={className.currentStage}>
              <GradientBox
                className='min-h-[660px] w-[100%] md:w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center text-sm sm:text-lg md:text-2xl'
                style={{ borderRadius: '30px' }}
                aos='fade-in'
                duration={400}
              >
                Abstract Submission
              </GradientBox>
              <Triangle
                position='bottom'
                className='scale-150'
                style={{ backgroundColor: '#B4B39D' }}
              />
            </div>
            <div className={className.notCurrentStage}>
              <div className='hidden md:block'>
                <StageCircle stage={3} bgColor='#ffe1b98a' />
              </div>
            </div>
          </div>
          <div className='w-full text-sm md:text-2xl flex font-bold font-poppins text-center'>
            <div
              className={`bg-[#49784F] rounded-l-2xl py-2 ${width.notCurrentStage}`}
            ></div>
            <div className={`bg-[#B4B39D] py-2 ${width.currentStage}`}>
              You are Here!
            </div>
            <div
              className={`bg-[#ffe1b98a] rounded-r-2xl py-2 ${width.notCurrentStage}`}
            ></div>
          </div>
          <div className='w-full flex justify-between'>
            <div className={className.notCurrentStage}>
              <div className='hidden md:block'>
                <Triangle
                  position='top'
                  className='scale-150'
                  style={{ backgroundColor: '#49784F' }}
                />
              </div>
              <div className='hidden md:block'>
                <GradientBox
                  className='min-h-[660px] w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center text-sm sm:text-lg md:text-2xl'
                  style={{ borderRadius: '30px' }}
                  aos='fade-in'
                  duration={400}
                >
                  <p className='px-8 py-4'>Registration</p>
                </GradientBox>
              </div>
            </div>
            <div className={className.currentStage}>
              <div className='pt-6'>
                <StageCircle stage={2} bgColor='#B4B39D' />
              </div>
            </div>
            <div className={className.notCurrentStage}>
              <div className='hidden md:block'>
                <Triangle
                  position='top'
                  className='scale-150'
                  style={{ backgroundColor: '#ffe1b98a' }}
                />
              </div>
              <div className='hidden md:block'>
                <GradientBox
                  className='min-h-[660px] w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center  text-sm sm:text-lg md:text-2xl'
                  style={{ borderRadius: '30px' }}
                  aos='fade-in'
                  duration={400}
                >
                  Full Paper Submission
                </GradientBox>
              </div>
            </div>
          </div>
        </section>

        {/* Team Profile */}
        <section className='flex flex-col gap-4 w-full font-poppins'>
          <div className='bg-[#49784F] text-center rounded-lg'>
            <p className='font-bold text-[30px] py-1.5 text-white'>
              Team Profile
            </p>
          </div>
          <div className='w-full justify-between h-fit flex flex-row gap-4'>
            <section className='bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] w-[32%] rounded-lg hidden md:flex md:flex-col justify-center items-center font-bold text-3xl py-8 gap-4'>
              <p>Hi,</p>
              <p>TEAM ABC</p>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='w-[80%] h-auto'
              />
            </section>
            <section className='w-0 flex-grow bg-[#49784F] rounded-lg p-4 text-white font-semibold flex justify-between flex-col-reverse md:flex-row flex-wrap gap-4'>
              <div className='w-fit flex-grow-0 flex-shrink-0'>
                <LableValue lable='Name'>Fairuz Aseloleh M.D</LableValue>
                <LableValue lable='Position'>Ketua</LableValue>
                <LableValue lable='Email Address'>
                  Fairuzaseloleh@gmai.com
                </LableValue>
                <LableValue lable='Whatsapp Number'>081234567890</LableValue>
                <LableValue lable='Institution'>
                  Institut Terbaik Bangsa
                </LableValue>
                <LableValue lable='Team members :'>
                  <ul className='list-disc'>
                    <li>Fairuz Satu</li>
                    <li>Fairuz Dua</li>
                    <li>Fairuz Lagi</li>
                  </ul>
                </LableValue>
              </div>
              <div className='w-full md:w-0 sm:min-w-[200px] flex-grow flex flex-col items-center justify-center'>
                <Image
                  src='/assets/R-dummy.jpeg'
                  width={200}
                  height={200}
                  alt='Mascot'
                  className='h-[200px] w-[170px] md:h-[80%] md:w-auto md:aspect-[2/3] object-cover'
                />
                <p className='text-[#FFE1B9] py-2'>Team Status : Stage 2</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default page;
