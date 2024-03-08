'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const LableValue = ({ lable, children }) => (
  <>
    <p className='text-[#FFE1B9] py-1'>{lable}</p>
    <div className='py-1'>{children}</div>
  </>
);

const TPCTeamInformation = () => {
  const [teamInfo, setTeamInfo] = useState({
    data: {
      id: '',
      teamName: 'BIO-WANA',
      chairmanName: 'Zahrah Faridathul Athifah',
      chairmanEmail: '',
      members: [
        { name: 'Zahrah Faridathul Athifah' },
        { name: 'Sang Ara Musthika' },
        { name: "Haliza Qintar Ma'aya" },
      ],
      teamStatus: 'ga',
      topicName:
        'PERANCANGAN PERSEMAIAN BALANGERAN (Shorea Balangeran): INFRASTRUKTUR BERKELANJUTAN DALAM MENDUKUNG UPAYA RESTORASI LAHAN GAMBUT DI IBU KOTA NUSANTARA',
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
                className='bg-gradient-brown ml-0 m-auto text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-bold text-left max-w-full md:max-w-[50%]'
              >
                BIO-WANA
              </h1>
              {/* <h2 className='font-bold text-3xl lg:text-[40px] max-w-full md:max-w-[50%]'>
                Insert Topic Name
              </h2> */}
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
            <div className='judul bg-gradient-to-br from-green-200 to-green-500 bg-clip-text text-transparent max-w-full md:max-w-[50%] font-bold leading-loose text-justify font-'>
              {teamInfo.data.topicName}
            </div>
            <p className='max-w-full md:max-w-[50%] font-bold leading-loose text-justify'>
              Persemaian Balangeran (Shorea Balangeran) adalah infrastruktur
              berkelanjutan yang berfokus sebagai penyuplai bibit berkualitas
              Shorea Balangeran yang akan ditanam pada lahan gambut dengan
              potensi kerusakan tinggi terutama di Kalimantan Timur sebagai
              upaya merestorasi lahan gambut di Ibu Kota Nusantara. Persemaian
              ini mampu memproduksi 3000 bibit setiap tahunnya untuk merestorasi
              lahan gambut seluas 2,7 Ha setiap tahunnya. Pengaruh perlakuan
              Perendaman dengan tinggi polybag setinggi 17 cm yang memberikan
              pengaruh pertambahan tinggi sekitar 2 cm. Pengaruh perlakuan
              penyimpanan selama 6 hari di dalam kardus pada shade house dan
              tanpa perlakuan pemeliharaan dalam sungkup yang memberikan
              pengaruh pertambahan tinggi sebesar 3,25 cm. Melalui pemulihan
              29.7 hektar lahan gambut dalam waktu 10 tahun diproyeksikan mampu
              menghasilkan keuntungan ekonomi dengan NPV sebesar
              Rp8.868.180.533,24 dengan rasio B/C sebesar 10.35. Perancangan
              persemaian ini akan memberikan potensi restorasi yang baik untuk
              lahan gambut dengan proyeksi keuntungan ekonomi berkelanjutan
            </p>
          </div>
        </section>
      </section>

      {/* Poster */}
      <section className='w-full max-w-[800px] max-h-fit mx-auto p-4'>
        <Image
          src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709921097/The%20Sandbox%20by%20IEEE%20ITBSB/yzuyntba185tip76xbnh.png'
          width={1000}
          height={1000}
          alt='Mascot'
          className='min-w-full w-full h-auto object-contain bg-slate-100'
        />
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
export default TPCTeamInformation;
