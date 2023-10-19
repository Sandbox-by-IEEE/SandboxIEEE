import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import Button from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import Footer from '@/components/footer';
import Timeline from '@/components/Timeline';
import { performRequest } from '@/lib/datocms';
import { TPCProps } from '@/types/tpc-type';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

function Judule({ title, colorClass }: { title: string; colorClass?: string }) {
  return (
    <div className='relative text-4xl font-extrabold text-[#9a7037] px-4 py-2 inline-block'>
      {/* <div className='aspect-square w-8 absolute z-10 top-[-20px] left-[-30px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 bottom-[-10px] left-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 top-[-20px] w-[32px] right-[-20px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-8 absolute z-10 bottom-[-10px] right-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div> */}
      <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] inline-block text-transparent bg-clip-text px-4 py-2'>
        {title}
      </p>
      <h2 className={`text-[#AB814E] text-[36px]`}>{title}</h2>
    </div>
  );
}

const TPC = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `{
    tpcPage {
      tpcSectionTitles 
      titleTpcPages
      timelineSectionTitle
      date1
      date2
      date3
      date4
      date5
      kegiatanz1
      kegiatanz2
      kegiatanz3
      kegiatanz4
      targetDate
      regisFeesSectionTitle
      regisFeesDescription {
        value
      }
      imageMascot {
        title
        width
        url
        height
      }
      hadiahDescription {
        value
      }
      hadiahSectionTitle
      guideSectionTitle
      guideDescription {
        value
      }
      faqSectionTitle
      explanationDescription {
        value
      }
      countdownSectionTitle
      buttonTextSeeMore
      buttonTextRegister
      backgroundImage {
        width
        url
        title
        height
      }
    }
    allFaqTpcs {
      id
      question
      answer {
        value
      }
    }
  }`;

  const { tpcPage, allFaqTpcs }: TPCProps = await performRequest({
    query: CMS_QUERY,
  });

  return (
    <main className='flex w-full flex-col font-museo-muderno'>
      {/*PROTOTECH CONTEST*/}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a]'
        style={
          {
            // backgroundImage: 'url(public/assets/image8.png)',
          }
        }
      >
        <div className='p-6 rounded-md flex flex-col items-center gap-8 mx-4 my-12'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title={tpcPage.titleTpcPages}
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div
            className='rounded-lg'
            style={{ boxShadow: '0px 0px 5px 2px rgba(171,129,78,0.8)' }}
          >
            <Button
              color='green'
              isIcon={false}
              isFullWidth={true}
              isDisabled={false}
            >
              {tpcPage.buttonTextRegister}
            </Button>
          </div>
        </div>
      </section>
      {/* END PROTOTECH CONTEST */}

      {/*APA ITU TPC*/}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '
        style={{
          backgroundImage: 'linear-gradient(to bottom, #0b2713, #0f3015)',
        }}
      >
        <div
          className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12 bg-gradient-to-r from-[#AB814E] to-[#FFFBB9]'
          style={{ backgroundColor: 'rgba(171,129,78,0.8)' }}
        >
          <div
            className='h-full w-full rounded-xl'
            style={{
              backgroundImage: 'linear-gradient(to bottom, #0b2713, #0f3015)',
            }}
          >
            <div className='w-full flex flex-row items-center justify-center mt-8'>
              <Judule
                title={tpcPage.tpcSectionTitles}
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-left items-center mb-8'>
              <div className='aspect-video w-full lg:w-[40%] relative'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Group_1235.png'}
                    objectFit='contain'
                  />
                </div>
              </div>
              <article className='w-full lg:w-[50%] lg:-mx-16 font-poppins justify-center text-justify'>
                <div className='text-[#FFE1B9] text-lg mx-2'>
                  <StructuredText data={tpcPage.explanationDescription} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* END APA ITU TPC */}

      {/* HADIAH */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title={tpcPage.hadiahSectionTitle}
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center mb-12'>
            <div className='aspect-video w-full lg:w-[30%] relative lg:mr-32 left-[-20px]'>
              <div className='aspect-square w-[40%] absolute z-10 lg:top-[-40px] w-[32px] lg:left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[40%] font-poppins text-justify justify-center'>
              <div className='text-[#FFE1B9] text-xl font-semibold'>
                <StructuredText data={tpcPage.hadiahDescription} />
              </div>
            </article>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END HADIAH */}

      {/* REGULASI */}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(5, 31, 18, 0.9961), rgba(6, 25, 12, 0.9961))',
        }}
      >
        <div
          className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12'
          style={{
            backgroundColor: '#0F3015',
            boxShadow: '0px 0px 5px 3px rgba(171,129,78,0.8)',
          }}
        >
          <div className='h-full w-full rounded-xl px-2'>
            <div className='my-8 w-full flex flex-row items-center justify-center text-center'>
              <Judule
                title={tpcPage.guideSectionTitle}
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center lg:px-20 pb-12'>
              <article className='w-full lg:w-[100%] font-poppins text-justify justify-center'>
                <div className='text-white text-base font-semibold'>
                  <StructuredText data={tpcPage.guideDescription} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* END REGULASI */}

      {/* REGISTRATION */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8 '>
          <div className='w-full flex flex-row items-center justify-center text-center'>
            <Judule
              title={tpcPage.regisFeesSectionTitle}
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center pb-8'>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[40%] absolute z-10 top-[-40px] w-[32px] left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[40%] font-poppins text-justify justify-center'>
              <div className='text-[#FFFBB9] text-xl font-semibold'>
                <StructuredText data={tpcPage.regisFeesDescription} />
              </div>
            </article>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END REGISTRATION */}

      {/* COUNTDOWN */}
      <section className='h-auto p-10 py-16 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-8 my-12 bg-gradient-to-r from-[#AB814E] to-[#FFFBB9]'>
          <div className='h-full w-full rounded-xl py-16 bg-gradient-to-b from-[#0b2712] to-[#123b1a]'>
            <div className='w-full flex flex-row items-center justify-center text-center'>
              <Judule
                title={tpcPage.countdownSectionTitle}
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-center items-center text-center mt-12'>
              <div className='aspect-video w-full w-[30%] relative'>
                <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'></div>
              </div>
              <article className='w-full lg:w-[70%] lg:px-20 font-poppins px-2'>
                <Countdown targetDate={new Date(tpcPage.targetDate)} />
              </article>
              <div className='aspect-video w-full w-[30%] relative'>
                <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'></div>
              </div>
            </div>

            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-2 mt-12  '>
              <div
                className='w-[180px] bg-gradient-to-tr rounded-lg'
                style={{ boxShadow: '0px 0px 5px 2px rgba(171,129,78,0.8)' }}
              >
                <Button
                  color='gold'
                  isIcon={false}
                  isFullWidth={true}
                  isDisabled={false}
                >
                  {tpcPage.buttonTextRegister}
                </Button>
              </div>
              <div className='border-2 border-[#AB814E] rounded-lg w-[180px]'>
                <Button
                  color='green'
                  isIcon={false}
                  isFullWidth={true}
                  isDisabled={false}
                >
                  {tpcPage.buttonTextSeeMore}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END COUNTDOWN */}

      {/* TIMELINE */}
      <section className='h-auto p-10 flex flex-col gap-16 bg-[#071D10]'>
        <div className='p-2 rounded-xl flex flex-col items-center gap-8 mx-12 my-12 bg-gradient-to-r from-[#AB814E] to-[#FFFBB9]'>
          <div
            className='p-6 w-full rounded-xl flex flex-row items-center justify-center'
            style={{ backgroundColor: 'rgba(7, 29, 16)' }}
          >
            <Judule
              title={tpcPage.timelineSectionTitle}
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
        </div>

        <Timeline
          items={[
            { date: new Date(tpcPage.date1), text: `${tpcPage.kegiatanz1}` },
            { date: new Date(tpcPage.date2), text: `${tpcPage.kegiatanz2}` },
            { date: new Date(tpcPage.date3), text: `${tpcPage.kegiatanz3}` },
            { date: new Date(tpcPage.date4), text: `${tpcPage.kegiatanz4}` },
            { date: new Date(tpcPage.date5), text: `${tpcPage.kegiatanz4}` },
          ]}
        />
      </section>
      {/* END TIMELINE */}

      {/* FAQ */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col'>
        <div className='p-6 flex flex-col items-center gap-8 mx-12'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title={tpcPage.faqSectionTitle}
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full mt-8 flex flex-col gap-8 lg:flex-col justify-left items-center'>
            {allFaqTpcs.map((faq, index) => (
              <FAQ key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      {/* END FAQ */}
      <Footer />
    </main>
  );
};

export default TPC;
