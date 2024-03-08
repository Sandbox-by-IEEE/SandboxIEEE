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
      teamName: 'Venter',
      chairmanName: 'Muhammad Fiqri Al Farisi Sitepu',
      chairmanEmail: '',
      members: [
        { name: 'Muhammad Fiqri Al Farisi Sitepu' },
        { name: 'Ziyad Nabil Al Ghifari' },
        { name: 'Muhammad Gilang Riandinata' },
      ],
      teamStatus: 'ga',
      topicName:
        'Implementasi SPKLU Mini Hybrid Tenaga Surya sebagai Solusi Unggul dalam Mengatasi Kelangkaan SPKLU pada Era Modern',
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
                {teamInfo.data.teamName}
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
              Era perubahan iklim mendorong fokus pada sektor transportasi untuk
              mengurangi emisi gas rumah kaca. Namun, kelangkaan SPKLU
              menghambat penggunaan kendaraan listrik. SPKLU Mini Hybrid Tenaga
              Surya merupakan inovasi yang dibawakan sebagai solusi untuk
              mengatasi kelangkaan SPKLU pada era modern, keterbatasan lahan,
              dan peningkatan aksesibilitas pengguna kendaraan listrik. SPKLU
              mini berbasis Hybrid ini menggunakan 60% energi berasal dari
              listrik dan 40% dari panel surya. Pemilihan panel surya sebagai
              salah satu sumber energi SPKLU Hybrid didasarkan pada
              keberlanjutan dan ketersediaan energi surya yang melimpah di
              Indonesia. Panel Surya yang dipasang di SPKLU diatur agar
              mengikuti arah cahaya matahari untuk memastikan pengumpulan energi
              mencapai tingkat maksimal dan mengurangi ketergantungan pada
              sumber listrik konvensional. Dengan memanfaatkan tenaga surya,
              diharapkan tercapai efisiensi optimal dalam manajemen energi.
              Langkah tambahan untuk mengatasi keterbatasan lahan dilakukan
              dengan menerapkan SPKLU mini berbasis Hybrid, dirancang khusus
              untuk meminimalkan penggunaan lahan. Hal ini diharapkan dapat
              mengatasi kelangkaan SPKLU dengan memaksimalkan pemanfaatan lahan
              yang tersedia. Adapun implementasi SPKLU mini berbasis Hybrid ini
              tidak hanya melibatkan aspek teknis, tetapi juga melibatkan aspek
              penggunaan dan aksesibilitas. Oleh karena itu, sistem pembayaran
              yang mandiri diusulkan sebagai bagian dari rekomendasi. Pengguna
              dapat melakukan pembayaran secara mandiri melalui metode QRIS atau
              menggunakan uang tunai melalui vending machine SPKLU. Hal ini
              bertujuan untuk meningkatkan kenyamanan dan aksesibilitas bagi
              pengguna kendaraan listrik. Tujuan utama penelitian ini adalah
              menciptakan solusi inovatif untuk mengatasi kelangkaan SPKLU
              melalui pendekatan berbasis Hybrid, yaitu menggabungkan Tenaga
              Surya dan Listrik Konvensional. Dengan mengkombinasikan sumber
              energi ini, diharapkan dapat menciptakan SPKLU yang lebih andal
              dan berkelanjutan.
            </p>
          </div>
        </section>
      </section>

      {/* Poster */}
      <section className='w-full max-w-[800px] max-h-fit mx-auto p-4'>
        <Image
          src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709938374/The%20Sandbox%20by%20IEEE%20ITBSB/kesustss8l1ln7d6e4zd.jpg'
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
