'use client';

import { callToast } from '@/components/Toast';

const status = 'error';
const desc = 'Pokoknya ada masalah lah pas lagi fetch datanya.';

export default function Page() {
  return (
    <>
      <div className='flex gap-4'>
        <button
          onClick={() => callToast({ status, description: desc })}
          className='bg-red-300'
        >
          Make an error-type toast
        </button>
        <button
          onClick={() =>
            callToast({
              status: 'success',
              description: 'Ganti password berhasil.',
            })
          }
          className='bg-green-300'
        >
          Make a success-type toast
        </button>
      </div>
    </>
  );
}
