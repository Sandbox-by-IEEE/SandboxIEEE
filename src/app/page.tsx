'use client';
import React, { useState } from 'react';

import Button from '@/components/Button';
import Footer from '@/components/footer';
import TextInput from '@/components/TextInput';

type inputData = {
  fullName: string;
  email: string;
  whatsAppNumber: string;
  age: number;
  institution: string;
};

export default function Home() {
  const [inputData, setInputData] = useState<inputData>({
    fullName: '',
    email: '',
    whatsAppNumber: '',
    age: 0,
    institution: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Post to backend/cms here
      console.log(inputData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='bg-gradient-to-t from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <nav className='h-20 w-full bg-slate-950'> replace with navbar </nav>
      <div className='h-fit w-full max-w-[840px] py-10 px-4'>
        <Title />
        <Form
          inputData={inputData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </main>
  );
}

const Title = () => (
  <div className='relative text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full '>
      Complete your details Below
    </div>
    <h2 className='z-10'>Complete your details Below</h2>
  </div>
);

const Form = ({ inputData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className='space-y-8 py-6 w-full'>
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
      />
    </div>
    <div className='w-full flex justify-center py-6'>
      <Button color='gold'>Proceed to Payment</Button>
    </div>
  </form>
);
