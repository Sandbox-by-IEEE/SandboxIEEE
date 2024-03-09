'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const LableValue = ({ lable, children }) => (
  <>
    <p className='text-[#FFE1B9] py-1'>{lable}</p>
    <div className='py-1'>{children}</div>
  </>
);

const PTCTeamInformation = () => {
  const [teamInfo, setTeamInfo] = useState({
    data: {
      id: '',
      teamName: 'WANGSIT NEW GEN',
      chairmanName: 'Nabila Rohmawati',
      chairmanEmail: 'waduh',
      members: [
        { name: 'Nabila Rohmawati' },
        { name: 'Jihan Prihatini' },
        { name: 'Muhammad Fadhilah Akbar' },
      ],
      teamStatus: 'ga',
      topicName: 'Ufobi',
      abstract: { status: '' },
      institution: 'Institut Teknologi Bandung',
      fullPaper: {},
    },
    message: '',
  });

  return (
    <div className='h-fit min-h-screen w-0 min-w-full flex flex-col bg-gradient-to-b from-[#051F12] to-[#06190C] gap-6'>
      {/* Team Name, topic, and album */}
      <section className='flex w-full max-w-[1000px] mx-auto py-8 lg:py-16'>
        <section className='flex flex-col text-white font-museo-muderno gap-6 p-4'>
          {/* Team Name & topic */}
          <div className='h-28 flex w-full'>
            <div className='flex md:hidden h-0 min-h-full w-auto aspect-square rounded-full bg-slate-100 justify-center items-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
            <div className='flex flex-col p-4 lg:p-8 justify-start text-start gap-2 flex-grow'>
              <h1
                style={{
                  ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                }}
                className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-bold text-left max-w-full md:max-w-[50%]'
              >
                {teamInfo.data.teamName}
              </h1>
              <h2 className='font-bold text-lg lg:text-[30px] max-w-full md:max-w-[50%]'>
                {teamInfo.data.topicName}
              </h2>
            </div>
          </div>

          {/* Description & image */}
          <div className='relative h-fit min-h-[50%] w-full p-4 lg:px-8 rounded-md bg-[#49784F] mx-auto'>
            <div className='hidden absolute right-4 sm:right-8 md:right-12 lg:right-20 -top-36 w-72 h-72 rounded-full bg-slate-50 md:flex items-center justify-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
            <p className='max-w-full md:max-w-[50%] font-bold leading-loose text-justify'>
              We don&#39;t have to sacrifice a strong economy for a healthy
              environment. Target menjadi project dalam karbon offset guna
              mengurangi emisi CO₂ dan mendukung pembangunan berkelanjutan
              dengan teknologi ramah lingkungan, serta peningkatan perekonomian
              dan kesehatan.
            </p>
            <div className='grid grid-cols-2 h-fit py-4 lg:pt-16 gap-8'>
              <div className='flex'>
                <Image
                  src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709943365/The%20Sandbox%20by%20IEEE%20ITBSB/PTCModels/WANGSIT%20NEW%20GEN/nldw0lykbavkceuuvrmi.jpg'
                  width={600}
                  height={600}
                  alt='Mascot'
                  className='min-w-full w-0 h-fit m-auto'
                />
              </div>
              <div className='flex'>
                <Image
                  src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709943364/The%20Sandbox%20by%20IEEE%20ITBSB/PTCModels/WANGSIT%20NEW%20GEN/wejat44hew1h1v9tfbe4.jpg'
                  width={600}
                  height={600}
                  alt='Mascot'
                  className='min-w-full w-0 h-fit m-auto'
                />
              </div>
              <div className='flex'>
                <Image
                  src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709943363/The%20Sandbox%20by%20IEEE%20ITBSB/PTCModels/WANGSIT%20NEW%20GEN/cmpkemsznibwhcwgm5x1.jpg'
                  width={600}
                  height={600}
                  alt='Mascot'
                  className='min-w-full w-0 h-fit m-auto'
                />
              </div>
              <div className='flex'>
                <Image
                  src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709943364/The%20Sandbox%20by%20IEEE%20ITBSB/PTCModels/WANGSIT%20NEW%20GEN/k7uczwif4rulrcjyyhuz.jpg'
                  width={600}
                  height={600}
                  alt='Mascot'
                  className='min-w-full w-0 h-fit m-auto'
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Prototype Video */}
      <section className='w-full max-w-[1240px] mx-auto flex flex-col justify-center items-center py-16 bg-[#0E3D1F] rounded-lg gap-8'>
        <h3
          style={{
            ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
          }}
          className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-bold text-left max-w-full md:max-w-[50%]'
        >
          Prototype Video
        </h3>
        <div className='w-full max-w-[80%] h-auto aspect-[5/3]'>
          <iframe
            className='video w-full h-full'
            width='847'
            height='476'
            src='https://www.youtube.com/embed/x5ujsR9MUC8'
            title='WANGSIT NEW GEN - Ufobi'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          ></iframe>
        </div>
      </section>

      {/* Team Profile */}
      <section className='flex flex-col gap-4 max-w-[800px] mx-auto w-full px-4 py-16'>
        <p className='w-full py-4 text-center text-white font-bold text-3xl bg-[#49784F] rounded-lg'>
          Team Profile
        </p>
        <div className='flex flex-wrap gap-4 py-6'>
          {/* <div className='aspect-square w-0 min-w-full sm:min-w-[27rem] flex-grow grid grid-cols-2 h-fit gap-8 rounded-lg'>
            <div className='bg-slate-100 rounded-full flex justify-center items-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
            <div className='bg-slate-100 rounded-full flex justify-center items-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
            <div className='bg-slate-100 rounded-full flex justify-center items-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
            <div className='bg-slate-100 rounded-full flex justify-center items-center'>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-full w-0 h-auto'
              />
            </div>
          </div> */}
          <section className='flex-grow w-0 min-w-[10rem] flex-shrink-0 bg-[#49784F] text-white font-bold p-4 rounded-lg'>
            <LableValue lable='Team Name'>{teamInfo.data.teamName}</LableValue>
            <LableValue lable='Team Leader'>
              {teamInfo.data.chairmanName}
            </LableValue>
            <LableValue lable='Topic Name'>
              {teamInfo.data.topicName}
            </LableValue>
            <LableValue lable='Institution'>
              {teamInfo.data.institution}
            </LableValue>
            <LableValue lable='Team members :'>
              <ul className='list-disc'>
                {teamInfo.data.members.map((member, index) => (
                  <li key={index}>{member.name}</li>
                ))}
              </ul>
            </LableValue>
          </section>
        </div>
      </section>
    </div>
  );
};
export default PTCTeamInformation;
