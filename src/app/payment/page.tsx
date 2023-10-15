'use client';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Footer from '@/components/footer';
import GradientBox from '@/components/GradientBox';
import TextInput from '@/components/TextInput';

type inputData = {
  fullName: string;
  email: string;
  whatsAppNumber: string;
  age: number;
  institution: string;
  paymentMethod: string;
  paymentProofUrl: string;
};

export default function Home() {
  const [inputData, setInputData] = useState<inputData>({
    fullName: '',
    email: '',
    whatsAppNumber: '',
    age: 0,
    institution: '',
    paymentMethod: '',
    paymentProofUrl: '',
  });
  const [step, setStep] = useState<number>(1);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const newInputData = {
      ...inputData,
      [name]: value,
    };

    setInputData(newInputData);
    localStorage.setItem('inputData', JSON.stringify(newInputData));
  };

  const handleSubmitFormIdentity = (e) => {
    e.preventDefault();
    setStep(2);
  };

  useEffect(() => {
    const memoryInputData = localStorage.getItem('inputData');
    if (memoryInputData) {
      setInputData(JSON.parse(memoryInputData));
    }
  }, []);

  return (
    <main className='bg-gradient-to-t from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <nav className='fixed top-0 left-0 h-20 w-full bg-slate-950 z-[100]'>
        replace with navbar{' '}
      </nav>
      <div className='h-fit w-full max-w-[1000px] py-10 px-4 pt-24 font-poppins'>
        {step === 1 && (
          <>
            <Title text='Complete your details Below' />
            <FormDetails
              inputData={inputData}
              handleChange={handleChange}
              handleSubmitFormIdentity={handleSubmitFormIdentity}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Title text='Payment' />
            <p className='w-full text-center pt-4 pb-8 font-bold'>
              Please follow the payment instructions to complete your purchase
            </p>
            <div className='flex flex-wrap justify-center w-full max-w-full gap-4 sm:gap-8 text-center text-[18px] sm:text-[24px] border-b-2 py-16 border-[#bb9567]'>
              <GradientBox className='px-2 sm:px-8 sm:py-1 w-fit'>
                <p className='border-b-2 py-2'>Early Bird</p>
                <p className='px-4 sm:px-6 py-2 '>Rp. 150.000</p>
              </GradientBox>
              <GradientBox className='px-2 sm:px-8 sm:py-1 w-fit'>
                <p className='border-b-2 py-2'>Normal</p>
                <p className='px-4 sm:px-6 py-2 '>Rp. 150.000</p>
              </GradientBox>
              <GradientBox className='px-2 sm:px-8 sm:py-1 w-fit'>
                <p className='border-b-2 py-2'>Group</p>
                <p className='px-4 sm:px-6 py-2 '>Rp. 150.000</p>
              </GradientBox>
            </div>
            <FormPayment
              handleChange={handleChange}
              inputData={inputData}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
            />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

const Title = ({ text }) => (
  <div className='relative text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full '>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);

const FormDetails = ({ inputData, handleChange, handleSubmitFormIdentity }) => (
  <form onSubmit={handleSubmitFormIdentity} className='space-y-8 py-6 w-full'>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Full Name</label>
      <TextInput
        placeholder={''}
        type='text'
        name='fullName'
        text={inputData.fullName}
        color='white'
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Email</label>
      <label className='font-thin text-sm pb-1'>
        Please enter your active email address
      </label>
      <TextInput
        placeholder={''}
        type='text'
        name='email'
        text={inputData.email}
        color='white'
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>WhatsApp Number</label>
      <label className='font-thin text-sm pb-1'>
        Please add &apos; before your number! (e.g. &apos;08111839019)
      </label>
      <TextInput
        placeholder={''}
        type='text'
        name='whatsAppNumber'
        text={inputData.whatsAppNumber}
        color='white'
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Age</label>
      <TextInput
        placeholder={''}
        type='number'
        name='age'
        text={inputData.age}
        color='white'
        onChange={handleChange}
        fullwidth
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Institution</label>
      <label className='font-thin text-sm pb-1'>
        Please write your high school or university name in its Indonesian
        version (e.g. Institut Teknologi Bandung)
      </label>
      <TextInput
        placeholder={''}
        type='text'
        name='institution'
        text={inputData.institution}
        color='white'
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='w-full flex justify-center py-6'>
      <Button color='gold' type='submit'>
        Proceed to Payment
      </Button>
    </div>
  </form>
);

const FormPayment = ({
  handleChange,
  inputData,
  uploadProgress,
  setUploadProgress,
}) => (
  <form className='flex flex-col gap-8 py-8 font-poppins text-center w-full'>
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
      <div className='flex flex-wrap'>
        <div>File Input</div>
        <div>
          <p>Uploaded Files</p>
        </div>
      </div>
    </div>
    <div className='w-full flex justify-center py-6'>
      <Button color='gold'>Submit</Button>
    </div>
  </form>
);
