import toast, { type Toast, Toaster } from 'react-hot-toast';

/**
 *
 * CARA MEMAKAI TOAST:
 *
 * 1. Taruh <Toast/> component di paling atas sebelum isi page kalian. (bisa liat di page /gana)
 *
 * 2. panggil toastnya dengan fungsi callToast().
 * 2.a fungsi callToast punya 2 parameter wajib: status dan description.
 * 2.b parameter status ("error" | "success") buat notify user apakah hal yang dilakukannya gagal atau berhasil.
 * 2.c parameter description (string) buat ngasitau apa yang gagal. apa yang berhasil.
 */

interface ToastProps {
  status: 'error' | 'success';
  description: string;
}

function title(inputString: string) {
  if (inputString.length > 0) {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  } else {
    return '';
  }
}

function callToast({ status, description }: ToastProps): void {
  status == 'success' ? successToast(description) : errorToast(description);
}

function ToastComponent({
  toastprops: t,
  description,
}: { toastprops: Toast } & { description: string }) {
  return (
    <>
      <div className='flex gap-7 ml-3'>
        <div className='flex flex-col'>
          <h1 className='text-base md:text-xl font-poppins'>
            <strong>{title(t.type)}</strong>
          </h1>
          <p className='text-xs md:text-base font-poppins'>
            {description || t.type}
          </p>
        </div>
        <div className='w-8 justify-center rounded-full flex items-center self-center'>
          <button
            className='aspect-square w-full items-center flex justify-center '
            onClick={() => toast.dismiss(t.id)}
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
              >
                <path
                  d='M17.2725 0.500256C17.5051 0.500256 17.738 0.588861 17.9153 0.766584L19.7334 2.58472C20.0889 2.94016 20.0889 3.51566 19.7334 3.8702L13.1036 10.5L19.7334 17.1298C20.0889 17.4852 20.0889 18.0607 19.7334 18.4153L17.9153 20.2334C17.5598 20.5889 16.9843 20.5889 16.6298 20.2334L10 13.6036L3.3702 20.2334C3.01566 20.5889 2.43926 20.5889 2.08472 20.2334L0.266586 18.4153C-0.0888596 18.0598 -0.0888596 17.4843 0.266586 17.1298L6.89639 10.5L0.266586 3.8702C-0.0888596 3.51566 -0.0888596 2.93926 0.266586 2.58472L2.08472 0.766584C2.44017 0.411139 3.01566 0.411139 3.3702 0.766584L10 7.39639L16.6298 0.766584C16.8075 0.588861 17.0399 0.500256 17.2725 0.500256Z'
                  fill='#D7D2D0'
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

const successToast = (desc: string) =>
  toast.success((t) => <ToastComponent toastprops={t} description={desc} />);
const errorToast = (desc: string) =>
  toast.error((t) => <ToastComponent toastprops={t} description={desc} />);

function Toast() {
  return (
    <div>
      <Toaster
        position='top-center'
        containerStyle={{}}
        toastOptions={{
          duration: 1800,
          style: {
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), , 0 4px 6px -2px rgba(0, 0, 0, 0.05);',
            borderWidth: '0.125rem',
            borderRadius: '0.25rem',
            paddingInline: '1.25rem',
            maxWidth: '85%',
            minWidth: '250px',
          },

          error: {
            style: { borderColor: '#EF1B27' },
          },

          success: {
            style: {
              borderColor: '#3FB160 ',
            },
          },
        }}
      ></Toaster>
    </div>
  );
}

export default Toast;
export { callToast };
