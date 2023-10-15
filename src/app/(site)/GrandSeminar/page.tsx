'use client';

export default function GrandSeminar() {
  return (
    <div className='flex min-h-screen h-fit w-0 min-w-[100vw] flex-col bg-[#081E11]'>
      {/* replace with navbar */}
      <nav className='w-full h-20 bg-[#051F12] sticky top-0 left-0 flex-shrink-0 z-[500]'>
        Navbar
      </nav>

      <section className='HeroSection w-full h-[calc(100vh)] bg-grand-seminar-banner bg-cover flex overflow-hidden'>
        <div className='container w-full h-full bg-g-seminar-radial-gradient m-auto flex overflow-hidden'>
          <div className='objects block w-fit h-fit m-auto mt-[27%]'>
            <h1 className='title text-white font-museo-muderno text-[60pt]'>
              grand seminar
            </h1>
          </div>
        </div>
      </section>

      <section></section>

      {/* <footer>Footer</footer>  */}
    </div>
  );
}
