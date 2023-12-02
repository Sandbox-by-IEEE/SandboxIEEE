const Loading = () => {
  return (
    <main className='flex flex-auto items-center justify-center w-full h-screen bg-gradient-green'>
      <div className='flex flex-col items-center gap-8 lg:gap-14 2xl:gap-20'>
        {/* Spinning stuff */}
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-cream-secondary-normal border-t-cream-secondary-normal xl:h-20 xl:w-20' />

        {/* Text */}

        <h1
          style={{
            ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
          }}
          className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
        >
          Loading...
        </h1>
      </div>
    </main>
  );
};

export default Loading;
