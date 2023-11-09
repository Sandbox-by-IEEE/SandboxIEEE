'use client';

import { useState } from 'react';

import { callLoading, callToast } from '@/components/Toast';

const status = 'error';
const desc = 'Pokoknya ada masalah lah pas lagi fetch datanya.';

export default function Page() {
  const [loadingId, setLoadingId] = useState<string>('');
  const handleLoading = () => {
    setLoadingId(callLoading(desc));
  };

  return (
    <div className='flex gap-4'>
      <button onClick={() => handleLoading()}>Loading</button>
      <button
        onClick={() =>
          callToast({ status, description: desc, toastLoadingId: loadingId })
        }
        className='bg-red-300'
      >
        Make an error-type toast
      </button>
      <button
        onClick={() =>
          callToast({
            status: 'success',
            description: 'Ganti password berhasil.',
            toastLoadingId: loadingId,
          })
        }
        className='bg-green-300'
      >
        Make a success-type toast
      </button>
    </div>
  );
}
