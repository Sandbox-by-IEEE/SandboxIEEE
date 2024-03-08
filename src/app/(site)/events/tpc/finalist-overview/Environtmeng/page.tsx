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
      teamName: 'environtmeng',
      chairmanName: 'Naufal Fabianito Assariy',
      chairmanEmail: '',
      members: [
        { name: 'Naufal Fabianito Assariy' },
        { name: 'Andhika Fathurrohman' },
        { name: 'Rafif Ariq Rabbani' },
      ],
      teamStatus: 'ga',
      topicName:
        'GREENTAVI: PERANCANGAN KONSEP BIOPACKAGING SERUM TAVI BERBASIS BIOPLASTIK PEF/TiO2 NANOWIRES DAN KARTON TERLAPISI NANOFIBRIL CELLULOSE (NFC) BERBAHAN LIMBAH SEKAM PADI DAN BAGASSE',
      abstract: { status: '' },
      institution: 'Universitas Gadjah Mada dan Universitas Sepuluh Nopember',
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
              Tavi merupakan salah satu produk kosmetik yang terkenal di
              Indonesia. Namun, bahan yang digunakan sebagai kemasan kosmetik
              saat ini masih menggunakan PET yang sulit untuk didaur ulang.
              Penggunaan PEF/TiO2 Nanowires sebagai kemasan dapat digunakan
              sebagai pengganti PET karena memiliki kelebihan yaitu dapat didaur
              ulang 100%. PEF juga memiliki ketahanan tekanan, termal,
              antibakteri, dan UV yang tinggi. Selain itu, digunakan karton
              pembungkus kemasan yang terbuat dari campuran bagasse dan sekam
              padi yang terlapisi Nanofibril Cellulose dengan keunggulan ramah
              lingkungan karena cepat terdegradasi dan bahan NFC yang digunakan
              berasal dari bahan organik. Adapun tujuan dari penulisan ini
              adalah untuk menentukan komposisi nanokomposit PEF/TiO2 Nanowires
              pada bioplastik, komposisi Nanofibril Cellulose (NFC), Sekam Padi,
              dan Bagasse pada karton dengan parameter optimum, serta merancang
              desain biopackaging serum Tavi Berbasis Bioplastik PEF/TiO2
              Nanowires dan Karton Terlapisi Nanofibril Cellulose (NFC) beserta
              analisis perbandingan packaging GREENTAVI dengan brand Tavi secara
              spesifikasi dan analisis ekonomi. Metode penulisan yang digunakan
              oleh penulis adalah studi literatur dari penggabungan
              penelitian-penelitian terdahulu. Penelitian oleh Zhao(2023)
              menunjukkan bahwa penggunaan PEF/TiO2 Nanowires meningkatkan
              ketahanan termal plastik hingga 415,41°C, impact strength 60
              kJ/m², Tav-uvc (%) Tav-uvb (%) Tav-uva (%) Tav-b (%)
              berturut-turut sebesar 0.04; 0.05; 1.52; dan 13.31%, serta
              antibacterial rate sebesar 98,01%. Selain itu, penggunaan 20% w/w
              bagasse + 80% sekam padi sebagai bahan pembuatan karton oleh
              Pratima (2015) memiliki densitas 82,9 kg/m³, burst strength 1,88
              kPa m²/g, dan edgewise compressive resistance of 2.75 kN/m.
              Penelitian oleh Adriano (2022) menunjukkan bahwa coating Ca2O4Si
              10 % pada karton terbukti dapat meningkatkan kapasitas absorpsi
              air sebesar 63% dan ketahanan tekanan hingga 43 MPa. Perhitungan
              untuk melihat material yang lebih baik pada kemasan botol dan
              karton menggunakan concept scoring. Besar dimensi dari diameter
              kemasan botol menggunakan pengukuran diameter genggaman maksimal
              pada persentil 5 (P5) wanita untuk membuat produk tersebut dapat
              digunakan oleh sebagian besar populasi wanita yang ada.
              Selanjutnya, desain kemasan botol dibuat melengkung untuk
              memudahkan pengguna dalam memegang barang tersebut.. Berdasarkan
              analisis, didapatkan bahwa penggunaan Biopackaging Serum Tavi
              Berbasis Bioplastik PEF/TiO2 Nanowires dan Karton Terlapisi
              Nanofibril Cellulose (NFC) Berbahan Limbah Sekam Padi dan Bagasse
              berpotensi tinggi dan dapat diterapkan secara efektif sebagai
              pengganti packaging Tavi saat ini. Dari segi
            </p>
          </div>
        </section>
      </section>

      {/* Poster */}
      <section className='w-full max-w-[800px] max-h-fit mx-auto p-4'>
        <Image
          src='https://res.cloudinary.com/dggk9y0yt/image/upload/v1709937311/The%20Sandbox%20by%20IEEE%20ITBSB/jfjbxscegigsgliagqhx.jpg'
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
