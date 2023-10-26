import Button from '@/components/Button';
import { FileInputType } from '@/components/FileInput/fileInput-type';
import MultipleFileInput from '@/components/FileInput/MultipleFileInput';
import { InputData } from '@/components/Forms/inputData-type';
import GradientBox from '@/components/GradientBox';
import FileIcon from '@/components/icons/FileIcon';

const FormPayment = ({
  handleChange,
  inputData,
  filesForm2,
  setFilesForm2,
  handleSubmitFinal,
  step,
  setStep,
}: {
  handleChange: (e: any) => void;
  inputData: InputData;
  filesForm2: FileInputType[] | undefined;
  setFilesForm2: React.Dispatch<
    React.SetStateAction<FileInputType[] | undefined>
  >;
  handleSubmitFinal: (e: React.FormEvent<HTMLFormElement>) => void;
  step: number;
  setStep: (number) => void;
}) => (
  <form
    className='flex flex-col gap-8 py-8 font-poppins text-center w-full'
    onSubmit={handleSubmitFinal}
  >
    <p className='text-2xl font-bold text-left'>Choose Your Payment method</p>

    <div className='flex gap-7 flex-wrap justify-between w-full border-b-2 pb-14 border-[#bb9567]'>
      <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
        <input
          type='radio'
          name='paymentMethod'
          id='BNI'
          className='scale-150'
          onChange={handleChange}
          checked={inputData.paymentMethod === 'BNI'}
          value='BNI'
        />
        <label htmlFor='BNI' className='w-full'>
          <GradientBox className='px-2 sm:px-8 sm:py-1 w-full'>
            <p className='border-b-2 py-2'>BNI</p>
            <p className='px-4 sm:px-6 py-1 sm:py-2'>12345678910</p>
            <p className='px-4 sm:px-6 pb-2'>A. N. Spongebob</p>
          </GradientBox>
        </label>
      </div>

      <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
        <input
          type='radio'
          name='paymentMethod'
          id='BCA'
          className='scale-150'
          checked={inputData.paymentMethod === 'BCA'}
          onChange={handleChange}
          value='BCA'
        />
        <label htmlFor='BCA' className='w-full'>
          <GradientBox className='px-2 sm:px-8 sm:py-1 w-full'>
            <p className='border-b-2 py-2'>BCA</p>
            <p className='px-4 sm:px-6 py-1 sm:py-2'>12345678910</p>
            <p className='px-4 sm:px-6 pb-2'>A. N. Spongebob</p>
          </GradientBox>
        </label>
      </div>

      <div className='flex gap-3 items-start min-w-[230px] sm:w-[30%]'>
        <input
          type='radio'
          name='paymentMethod'
          id='GOPAY'
          className='scale-150'
          checked={inputData.paymentMethod === 'GOPAY'}
          onChange={handleChange}
          value='GOPAY'
        />
        <label htmlFor='GOPAY' className='w-full'>
          <GradientBox className='px-2 sm:px-8 sm:py-1 w-full'>
            <p className='border-b-2 py-2'>GOPAY</p>
            <p className='px-4 sm:px-6 py-1 sm:py-2'>12345678910</p>
            <p className='px-4 sm:px-6 pb-2'>A. N. Spongebob</p>
          </GradientBox>
        </label>
      </div>

      <div className='flex gap-3 items-start min-w-[230px] sm:w-[30%]'>
        <input
          type='radio'
          name='paymentMethod'
          id='QRIS'
          className='scale-150'
          onChange={handleChange}
          value='QRIS'
        />
        <label htmlFor='QRIS' className='w-full'>
          <GradientBox className='px-2 sm:px-8 sm:py-1 w-full'>
            <p className='border-b-2 py-2'>QRIS</p>
            <div className='py-4 px-2 w-48'>
              <Button color='gold' isFullWidth>
                Pay With QRIS
              </Button>
            </div>
          </GradientBox>
        </label>
      </div>
    </div>

    <div className='pt-8'>
      <p className='text-2xl font-bold text-left'>Proof of Payment</p>
      <div className='flex flex-col md:flex-row flex-wrap pt-4 justify-between'>
        <div className='w-full md:w-[49%]'>
          <MultipleFileInput
            key='FormPayment'
            message='Secondary Message'
            files={filesForm2}
            setFiles={setFilesForm2}
          />
        </div>
        <div className='w-full md:w-[47%] text-left pt-8 md:pt-0'>
          <p className='text-2xl'>Uploaded Files</p>
          <ul className='list-none h-[300px] overflow-y-scroll pr-2'>
            {filesForm2?.map((el, i) => (
              <li
                key={'filesForm2' + i}
                className={
                  i > 0
                    ? 'w-full h-fit flex py-4 border-t-2 border-[#4D4D4D]'
                    : 'w-full h-fit flex py-4'
                }
              >
                <div className='w-fit p-2 px-4'>
                  <FileIcon scale={1.7} fill='#FFE1B9' />
                </div>
                <div className='w-0 flex-grow flex flex-col justify-start'>
                  <p>{el.fileName}</p>
                  <a href={el.fileUrl} className='text-blue-500'>
                    view file
                  </a>
                </div>
                <button
                  className='w-4 h-full flex text-lg font-bold'
                  onClick={() =>
                    setFilesForm2((filesForm2: FileInputType[] | undefined) => {
                      const newFilesForm: FileInputType[] = [];
                      if (filesForm2?.length) {
                        for (let j = 0; j < filesForm2.length; j++) {
                          if (j == i) continue;
                          newFilesForm.push(filesForm2[j]);
                        }
                      }
                      return newFilesForm;
                    })
                  }
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className='w-full flex justify-center py-6 gap-3'>
      <Button color='green' onClick={() => setStep(step - 1)} type='button'>
        Back
      </Button>
      <Button color='gold' type='submit'>
        Submit
      </Button>
    </div>
  </form>
);

export default FormPayment;
