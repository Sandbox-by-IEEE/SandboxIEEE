'use client';

import toast, { Toaster } from 'react-hot-toast';

interface ToastProps {
  status: 'error' | 'success';
  description: string;
}

const styleOpt = {
  success: {},
  error: {},
};

export default function Toast(props: ToastProps) {
  const notify = () => toast('Here is your toast.');
  return (
    <div>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            animation: t.visible
              ? 'custom-enter 1s ease'
              : 'custom-exit 1s ease',
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
      <button onClick={notify}>Make a toast</button>
    </div>
  );
}
