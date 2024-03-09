'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DynamicQr({ params }) {
  const target = params.id;

  //Fungsi untuk redirect ke halaman lain
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk redirect ke halaman lain berdasarkan nilai target
    switch (target) {
      case 'PTC-Team1':
        router.push('/events/ptc/finalist-overview/Bangan');
        break;
      case 'PTC-Team2':
        router.push('/events/ptc/finalist-overview/Eureka');
        break;
      case 'PTC-Team3':
        router.push('/events/ptc/finalist-overview/FansPakBandung');
        break;
      case 'PTC-Team4':
        router.push('/events/ptc/finalist-overview/HehoGawk');
        break;
      case 'PTC-Team5':
        router.push('/events/ptc/finalist-overview/WANGSIT-NEW-GEN');
        break;

      case 'TPC-Team1':
        router.push('/events/tpc/finalist-overview/BIO-WANA');
        break;
      case 'TPC-Team2':
        router.push('/events/tpc/finalist-overview/Doa-(W)ibu');
        break;
      case 'TPC-Team3':
        router.push('/events/tpc/finalist-overview/Environtmeng');
        break;
      case 'TPC-Team4':
        router.push('/events/tpc/finalist-overview/Kuya-Kuyi-Adhira');
        break;
      case 'TPC-Team5':
        router.push('/events/tpc/finalist-overview/Venter');
        break;
      default:
        router.push('/404');
        break;
    }
  }, [target, router]);

  return (
    <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-center px-10'>
      <h1 className='title text-[#ffff] color-white font-medium'>
        Hold on, we’re getting it ready
      </h1>
    </main>
  );
}
