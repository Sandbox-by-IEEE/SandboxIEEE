'use client';

import Image from 'next/image';

export default function GrandSeminar() {
  return (
    <div className=' min-h-screen h-fit w-[100vw] min-w-[600px] block bg-[#081E11]'>
      {/* replace with navbar */}
      <nav className='w-full h-20 bg-[#051F12] sticky top-0 left-0 flex-shrink-0 z-[500]'>
        Navbar
      </nav>

      <section className='Section w-full h-fit pl-[100px] pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover block '>
        <div className='PastSponsorsContainer min-h-[720px] h-fit w-full block pb-28'>
          <div className='titleSegment w-full h-[300px] flex'>
            <div className='containerLuar m-auto w-fit h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'>
              <div className='containerdalam w-fit h-fit rounded-[28px] bg-gradient-light-cards pl-16 pr-16 pt-6 pb-6 flex items-center overflow-hidden m-[6px]'>
                <h1 className='title font-museo-muderno text-center w-full font-bold text-[26pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '>
                  Our Past Sponsor
                </h1>
              </div>
            </div>
          </div>
          <div className='SponsorListSegment'>
            <div className='containerLuar m-auto w-[80%] min-w-[400px] h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'>
              <div className='containerdalam m-auto w-[calc(100%-16px)] h-fit rounded-[28px] bg-gradient-light-cards flex items-center p-20 mt-[8px] mb-[8px] overflow-hidden'>
                <div className='container w-full inline-flex flex-wrap justify-center'>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className='dummyLogo w-auto h-[200px] m-10'>
                      <Image
                        src={'/SandboxGold.svg'}
                        alt={'SandBox'}
                        width={100}
                        height={100}
                        className='h-full w-auto'
                      ></Image>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='PastSponsorsContainer min-h-[720px] h-fit w-full block pb-40'>
          <div className='titleSegment w-full h-[300px] flex'>
            <div className='containerLuar m-auto w-fit h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'>
              <div className='containerdalam w-fit h-fit rounded-[28px] bg-gradient-light-cards pl-16 pr-16 pt-6 pb-6 flex items-center overflow-hidden m-[6px]'>
                <h1 className='title font-museo-muderno text-center w-full font-bold text-[26pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '>
                  Our Past Events
                </h1>
              </div>
            </div>
          </div>
          <div className='SponsorListSegment'>
            <div className='containerLuar m-auto w-[80%] min-w-[400px] h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'>
              <div className='containerdalam m-auto w-[calc(100%-16px)] h-fit rounded-[28px] bg-gradient-light-cards flex items-center p-20 mt-[8px] mb-[8px] overflow-hidden'>
                <div className='container w-full inline-flex flex-wrap justify-center'>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className='dummyLogo w-auto h-[150px] m-10'>
                      <Image
                        src={'/IEEEGold.svg'}
                        alt={'Events'}
                        width={100}
                        height={100}
                        className='h-full w-auto'
                      ></Image>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <footer>Footer</footer>  */}
    </div>
  );
}
