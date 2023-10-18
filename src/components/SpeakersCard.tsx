import Image from 'next/image';

const SpeakersCard = (props) => {
  return (
    <div
      className={`SpeakersCard w-[400px] h-[800px] rounded-3xl block overflow-hidden relative ${props.style}`}
    >
      <div className='BaganFoto w-full h-[45%] overflow-hidden justify-center relative'>
        <div className='absolute inset-0 bg-gradient-light-cards animate-pulse'></div>
        <Image
          src={'/assets/R-dummy.jpeg'}
          alt={'ImagePoltrait'}
          width={400}
          height={400}
          className='h-full w-fit object-cover object-center relative'
        ></Image>
      </div>
      <div className='Description w-full h-[calc(45%)] bg-[#071D10] p-6 pt-4'>
        <div className='outerBadge w-full h-fit rounded-[30px] bg-gradient-light-brown drop-shadow-[0_0px_10px_rgba(219,184,139,0.7)] flex'>
          <div className='innerBadge w-[calc(100%-8px)] h-fit mt-[4px] mb-[4px] m-auto rounded-[28px] bg-gradient-light-cards pl-5 pr-5 block items-center overflow-hidden min-h-fit pt-3 pb-3'>
            <h2 className='w-full font-poppins text-center text-[#FFE1B9] drop-shadow-[0_0px_10px_rgba(200,170,78,1)] font-semibold text-2xl'>
              Aiman Wicaksono
            </h2>
            <div className='BaganGelar w-full h-fit flex'>
              <div className='containerGelar h-fit w-fit m-auto flex justify-center'>
                <div className='textContainer flex w-fit h-full'>
                  <h3 className='w-fit m-auto font-poppins text-center text-[#DBB88B] drop-shadow-[0_0px_10px_rgba(200,170,78,1)] font-semibold text-lg mr-2 '>
                    Vice President at
                  </h3>
                </div>
                <Image
                  src={'/google-dummy.png'}
                  alt={'ImageCompany'}
                  width={100}
                  height={100}
                  className='h-[30px] w-fit object-cover object-center relative drop-shadow-[0_0px_10px_rgba(200,170,78,1)]'
                ></Image>
              </div>
            </div>
          </div>
        </div>
        <p className='w-full h-max pt-5 text-justify font-poppins font-normal text-[13pt] overflow-auto text-[#FFE1B9]'>
          “I’m never gonna give you up,” begitulah ucapan inspiratif yang sering
          kita dengar dari Jajang, penulis buku ternama “Let You Down”. Dengan
          karya tersebut, Jajang berhasil menjadi penulis terproduktif se-dunia
          2023 versi Majalah Times New Roman
        </p>
      </div>
      <div className='socialmedia w-full h-[10%] bg-[#071D10] flex'>
        <div className='container m-auto ml-0 pl-6 pr-6 flex h-[25px]'>
          <Image
            src={'/logoIG.svg'}
            alt={'SocialMedia'}
            width={100}
            height={100}
            className='h-[25px] w-fit object-cover object-center relative drop-shadow-[0_0px_10px_rgba(200,170,78,1)]'
          ></Image>
          <div className='TextContainer h-hit flex w-fit'>
            <p className='idIG font-poppins font-normal text-[14pt] text-[#FFE1B9] m-auto pl-4 drop-shadow-[0_0px_10px_rgba(200,170,78,1)]'>
              @rick_ashley
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakersCard;
