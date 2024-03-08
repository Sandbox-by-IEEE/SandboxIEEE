'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';

import Button from '@/components/Button';
import NormalSlider from '@/components/Slider/NormalSlider';
import { callLoading, callToast } from '@/components/Toast';

const TitleSection = dynamic(() => import('@/components/TitleSection'), {
  ssr: false,
});
const CoverFlowSlider = dynamic(
  () => import('@/components/Slider/CoverflowSlider'),
  {
    ssr: false,
  },
);

export default function FinalProjectVote() {
  // Fetch Data DatoCMS
  // useEffect(() => {
  //   const CMS_QUERY = `
  //   {
  //     exhibition {
  //       backgroundImage {
  //         url
  //         title
  //         width
  //         height
  //       }
  //       buttonShowFinal
  //       buttonTextRegister
  //       buttonTextSeeMore
  //       buttonTextSeeMote
  //       countdownTitle
  //       embedLocationUrl
  //       urlLocationMaps
  //       buttonTextBackgroundOne
  //       explanationDescription {
  //         value
  //       }
  //       explanationTitle
  //       faqSectionTitle
  //       finalProjectTitle
  //       guideDescription {
  //         value
  //       }
  //       guideTitle
  //       imageMascot {
  //         height
  //         url
  //         title
  //         width
  //       }
  //       targetDate
  //       timelineSectionTitle
  //       titleExhibitionPage
  //       titleLocation
  //       ptcSubtitle
  //       tpcSubtitle
  //     }
  //     allFinalProjectsPtcExhibitions(orderBy: teamsName_ASC) {
  //       topic
  //       teamsName
  //       projectsUrl
  //       image {
  //         url
  //         width
  //         height
  //         title
  //       }
  //       id
  //     }
  //     allFinalProjectsTpcExhibitions(orderBy: teamsName_ASC) {
  //       image {
  //         url
  //         title
  //         width
  //         height
  //       }
  //       projectsUrl
  //       teamsName
  //       topic
  //       id
  //     }
  //     allFaqExhibitions(orderBy: question_ASC) {
  //       id
  //       answer {
  //         value
  //       }
  //       question
  //     }
  //     allTimelineExhibitions(orderBy: date_ASC) {
  //       text
  //       date
  //     }
  //   }`;

  //   const getData = async () => {
  //     const {
  //       exhibition,
  //       allFinalProjectsTpcExhibitions: TPCData,
  //       allFinalProjectsPtcExhibitions: PTCData,
  //       allFaqExhibitions: faqData,
  //       allTimelineExhibitions: timelineData,
  //     }: ExhibitionDataProps = await performRequest({
  //       query: CMS_QUERY,
  //       revalidate: 0,
  //     });
  //   }

  //   getData();

  // });

  const PTC = [
    {
      id: 1,
      label: 'Item 1',
      name: 'Eureka',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/ptc/finalist-overview/Eureka',
      topic: 'Green Keys',
      desc: ' Keyboard ramah lingkungan kami mengurangi limbah elektronik dengan casing dari filamen PLA.',
    },
    {
      id: 2,
      label: 'Item 2',
      name: 'FansPakBandung',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/ptc/finalist-overview/FansPakBandung',
      topic: 'AFMS',
      desc: ' Our system revolutionizes agriculture with smart sensors and machine learning for efficient, sustainable farming.',
    },
    {
      id: 3,
      label: 'Item 3',
      name: 'HehoGawk',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/ptc/finalist-overview/HehoGawk',
      topic: 'ReformX',
      desc: ' Reform The Reformer',
    },
    {
      id: 3,
      label: 'Item 4',
      name: 'Bangan',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/ptc/finalist-overview/Bangan',
      topic: 'Hysteresis Dynamic Response Adapter (HYDRA)',
      desc: ' HYDRA offers a bidirectional inverter with an extremely fast.',
    },
    {
      id: 4,
      label: 'Item 5',
      name: 'WANGSIT NEW GEN',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/ptc/finalist-overview/WANGSIT-NEW-GEN',
      topic: 'Ufobi',
      desc: " We don't have to sacrifice a strong economy for a healthy environment. Ufobi is the solution.",
    },
  ];

  const TPC = [
    {
      id: 1,
      label: 'Item 1',
      name: 'Doa (W)ibu',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/tpc/finalist-overview/Doa-(W)ibu',
      topic:
        'Microbial Fuel Cell sebagai Solusi Green Technology yang Inovatif untuk Pengelolaan Limbah Rumah Tangga dan Pembangkitan Energi Listrik Skala Mikro',
      desc: 'Take Action',
    },
    {
      id: 2,
      label: 'Item 2',
      name: 'BIO-WANA',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/tpc/finalist-overview/BIO-WANA',
      topic:
        'PERANCANGAN PERSEMAIAN BALANGERAN (Shorea Balangeran): INFRASTRUKTUR BERKELANJUTAN DALAM MENDUKUNG UPAYA RESTORASI LAHAN GAMBUT DI IBU KOTA NUSANTARA',
      desc: '',
    },
    {
      id: 3,
      label: 'Item 3',
      name: 'Kuya Kuyi Adhira',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/tpc/finalist-overview/Kuya-Kuyi-Adhira',
      topic:
        'HEJO (HARMONIOUS ECO-FRIENDLY JOINT OPERATIONS): STRATEGI INFRASTRUKTUR BERKELANJUTAN BERBASIS SPONGE CITY DI KOTA BANDUNG DAN IMPLEMENTASINYA DI KECAMATAN COBLONG',
      desc: 'Take Action',
    },
    {
      id: 3,
      label: 'Item 4',
      name: 'Venter',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/tpc/finalist-overview/Venter',
      topic:
        'Implementasi SPKLU Mini Hybrid Tenaga Surya sebagai Solusi Unggul dalam Mengatasi Kelangkaan SPKLU pada Era Modern',
      desc: 'Take Action',
    },
    {
      id: 4,
      label: 'Item 5',
      name: 'environtmeng',
      imgUrl: 'https://sandbox.ieeeitb.com/sandbox-gold.svg',
      instagramLink: 'https://instagram.com',
      introductionLink:
        'https://sandbox.ieeeitb.com/events/tpc/finalist-overview/Environtmeng',
      topic:
        'GREENTAVI: PERANCANGAN KONSEP BIOPACKAGING SERUM  TAVI BERBASIS BIOPLASTIK PEF/TiO2 NANOWIRES DAN  KARTON TERLAPISI NANOFIBRIL CELLULOSE (NFC)  BERBAHAN LIMBAH SEKAM PADI DAN BAGASSE',
      desc: 'Take Action',
    },
  ];

  const handleButtonVote = async (karyaId: string) => {
    try {
      // hit API here
      const loadingToastId = callLoading('Registering your choice...');

      const response = await fetch(`/api/voting/karya`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ karyaId }),
      });
      const data = await response.json();

      if (response.status != 200) {
        callToast({
          status: 'error',
          description: data.message,
        });
        return;
      } else {
        callToast({
          status: 'success',
          description: data.message,
        });
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='relative flex min-h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-start py-16 px-10'>
      <div className='scale-125'>
        <TitleSection>Vote For Final Project&apos; s Team</TitleSection>
      </div>
      <p className='text-white font-poppins max-w-[70em] py-16 tracking-widest font-extralight text-center'>
        Welcome to the voting page for The Sandbox Technovate Paper Competition
        and Prototech Contest. As we explore groundbreaking ideas and
        technological advancements, your input is invaluable. By participating
        in this vote, you contribute to the evolution of innovation. Take a
        thoughtful look at the submissions and cast your vote for the most
        promising vision. Together, let’s pave the way for a brighter tomorrow!
      </p>

      <div className='scale-100'>
        <TitleSection>Technovate Paper Competition</TitleSection>
      </div>
      <section className='hidden w-full max-w-[1200px] h-fit md:flex flex-row py-8 items-center justify-evenly overflow-visible'>
        <CoverFlowSlider>
          {TPC.map((item) => (
            <div
              key={item.id}
              className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[30%] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                {/* <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a> */}
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}&apos;
              </p>

              <Button
                type='button'
                color='green'
                onClick={() => {
                  handleButtonVote(item.name);
                }}
              >
                Vote
              </Button>
            </div>
          ))}
        </CoverFlowSlider>
      </section>

      <section className='md:hidden w-full max-w-[1200px] h-fit flex flex-row sm:py-8 items-center justify-evenly overflow-visible'>
        <NormalSlider>
          {TPC.map((item) => (
            <div
              key={item.id}
              className={`carousel-item m-auto w-full bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[200px] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                {/* <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a> */}
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}&apos;
              </p>

              <Button
                type='button'
                color='green'
                onClick={() => {
                  handleButtonVote(item.name);
                }}
              >
                Vote
              </Button>
            </div>
          ))}
        </NormalSlider>
      </section>

      {/* Bagian 2 */}
      <div className='scale-100 mt-20'>
        <TitleSection>Prototech Contest</TitleSection>
      </div>
      <section className='hidden w-full max-w-[1200px] h-fit md:flex flex-row py-8 items-center justify-evenly overflow-visible'>
        <CoverFlowSlider>
          {PTC.map((item) => (
            <div
              key={item.id}
              className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[30%] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                {/* <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a> */}
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}:{item.desc}&apos;
              </p>

              <Button
                type='button'
                color='green'
                onClick={() => {
                  handleButtonVote(item.name);
                }}
              >
                Vote
              </Button>
            </div>
          ))}
        </CoverFlowSlider>
      </section>

      <section className='md:hidden w-full max-w-[1200px] h-fit flex flex-row sm:py-8 items-center justify-evenly overflow-visible'>
        <NormalSlider>
          {PTC.map((item) => (
            <div
              key={item.id}
              className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] rounded-lg flex flex-col justify-center items-center  py-8 gap-2 cursor-pointer transform transition-transform h-[80%] max-h-[80%] text-lg px-4 text-center w-full m-auto`}
              style={{ maxWidth: 'fit-content', width: 'fit-content' }}
            >
              <p className='text-2xl font-bold'>{item.name}</p>
              <div className='rounded-full w-[200px] overflow-hidden'>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  className='object-cover w-full h-auto aspect-square object-center'
                  width={600}
                  height={600}
                />
              </div>
              <div className='flex justify-center w-fit gap-4 text-blue-800'>
                {/* <a
                  href={item.instagramLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  instagram
                </a> */}
                <a
                  href={item.introductionLink}
                  className='flex gap-2 items-center'
                >
                  <AiOutlineLink />
                  Introduction
                </a>
              </div>

              <p className='font-bold text-2xl pb-4'>
                &apos;{item.topic}:{item.desc}&apos;
              </p>

              <Button
                type='button'
                color='green'
                onClick={() => {
                  handleButtonVote(item.name);
                }}
              >
                Vote
              </Button>
            </div>
          ))}
        </NormalSlider>
      </section>
    </main>
  );
}
