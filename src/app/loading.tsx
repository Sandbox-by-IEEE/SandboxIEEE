import TitleSection from '@/components/TitleSection';

const Loading = () => {
  return (
    <main className='flex flex-auto items-center justify-center w-full h-screen bg-[#040B15]'>
      <div className='flex flex-col items-center'>
        <div className='relative'>
          <div className='absolute -top-[35%] -left-[35%] w-[35vw] h-[35vw] bg-gradient-radial from-[#255763] to-[#0B305F] opacity-20 blur-[120px] rounded-full'></div>
          {/* Logo */}
          <div
            className='w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] z-10'
            style={{
              backgroundImage: `url(/loading.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Text */}

          <TitleSection size='md' animation={false}>
            Loading...
          </TitleSection>
        </div>
      </div>
    </main>
  );
};

export default Loading;
