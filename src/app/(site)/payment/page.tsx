'use client';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import MultipleFileInput from '@/components/FileInput/MultipleFileInput';
import { FileInputType } from '@/components/FileInput/SingleFileInput';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import GradientBox from '@/components/GradientBox';
import FileIcon from '@/components/icons/FileIcon';
import TextInput from '@/components/TextInput';
import { callToast } from '@/components/Toast';

type memberInfo = {
  name: string;
  email: string;
  institution: string;
  phoneNumber: string;
  age: number;
  twibbonProof: string;
  twibbonProofName: string;
  studentProof: string;
  studentProofName: string;
};

type inputData = {
  teamName: string;
  memberCount: number;
  members: memberInfo[];
  paymentMethod: string;
  paymentProofUrl: FileInputType[];
};

export default function Home() {
  const [inputData, setInputData] = useState<inputData>({
    teamName: '',
    memberCount: 1,
    members: [
      {
        name: '',
        email: '',
        institution: '',
        phoneNumber: '',
        age: 0,
        twibbonProof: '',
        twibbonProofName: '',
        studentProof: '',
        studentProofName: '',
      },
    ],
    paymentMethod: '',
    paymentProofUrl: [],
  });
  const [filesForm2, setFilesForm2] = useState<FileInputType[] | undefined>();
  const [step, setStep] = useState<number>(1);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const newInputData = { ...inputData };

    // Use regex to extract the member index and field name
    const match = name.match(/members\[(\d+)\]\.(.+)/);

    if (match) {
      const memberIndex = parseInt(match[1]);
      const memberField = match[2];

      // Ensure members array exists
      if (!newInputData.members) {
        newInputData.members = [];
      }

      // Ensure the member exists
      if (!newInputData.members[memberIndex]) {
        newInputData.members[memberIndex] = {
          name: '',
          email: '',
          institution: '',
          phoneNumber: '',
          age: 0,
          twibbonProof: '',
          twibbonProofName: '',
          studentProof: '',
          studentProofName: '',
        };
      }

      newInputData.members[memberIndex][memberField] = value;
    } else {
      // Handle top-level fields
      newInputData[name] = value;
    }

    if (name === 'memberCount') {
      const newMembers: memberInfo[] = [];

      for (let i = 0; i < newInputData.memberCount; i++) {
        if (newInputData.members[i]) {
          newMembers.push(newInputData.members[i]);
        } else {
          newMembers.push({
            name: '',
            email: '',
            institution: '',
            phoneNumber: '',
            age: 0,
            twibbonProof: '',
            twibbonProofName: '',
            studentProof: '',
            studentProofName: '',
          });
        }
      }

      newInputData.members = newMembers;
    }

    setInputData(newInputData);
    localStorage.setItem('inputData', JSON.stringify(newInputData));
  };

  const handleSubmitFormIdentity = (e) => {
    e.preventDefault();
    let isEmptyTwibbon = false;
    let isEmptyStudentProof = false;
    let isInvalidAge = false;
    let isInvalidPhoneNumber = false;
    inputData.members.forEach((el) => {
      if (!el.twibbonProof) {
        isEmptyTwibbon = true;
      }
      if (!el.studentProof) {
        isEmptyStudentProof = true;
      }
      if (el.age <= 0) {
        isInvalidAge = true;
      }
      if (el.phoneNumber[0] != "'") {
        isInvalidPhoneNumber = true;
      }
    });
    if (isEmptyTwibbon) {
      callToast({ status: 'error', description: 'Please fill all twibbons' });
    }
    if (isEmptyStudentProof) {
      callToast({
        status: 'error',
        description: 'Please fill all Student Proof',
      });
    }
    if (isInvalidAge) {
      callToast({
        status: 'error',
        description: 'Please fill age correctly',
      });
    }
    if (isInvalidPhoneNumber) {
      callToast({
        status: 'error',
        description: 'Please fill phone number correctly (see description)',
      });
    }
    if (
      isEmptyTwibbon ||
      isEmptyStudentProof ||
      isInvalidAge ||
      isInvalidPhoneNumber
    ) {
      return;
    }

    setStep(2);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    //submission here
    if (!inputData.paymentMethod) {
      callToast({
        status: 'error',
        description: 'Please choose payment method',
      });
    }
    if (!inputData.paymentProofUrl.length) {
      callToast({
        status: 'error',
        description: 'Please include your proof of payment',
      });
    }
    if (!inputData.paymentMethod || !inputData.paymentProofUrl.length) {
      return;
    }
    console.log(inputData);
  };

  useEffect(() => {
    if (filesForm2?.length) {
      const newInputData = { ...inputData };
      newInputData.paymentProofUrl = filesForm2;

      setInputData(newInputData);
      localStorage.setItem('inputData', JSON.stringify(newInputData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesForm2]);

  useEffect(() => {
    const memoryInputData = localStorage.getItem('inputData');
    if (memoryInputData) {
      try {
        const historyInputData: inputData = JSON.parse(memoryInputData);

        if (typeof historyInputData === 'object') {
          setInputData(historyInputData);
          setFilesForm2(historyInputData.paymentProofUrl);
        } else {
          localStorage.removeItem('inputData');
        }
      } catch (error) {
        localStorage.removeItem('inputData');
      }
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
              setInputData={setInputData}
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
              handleSubmitFinal={handleSubmitFinal}
              filesForm2={filesForm2}
              setFilesForm2={setFilesForm2}
              setStep={setStep}
            />
          </>
        )}
      </div>
    </main>
  );
}

const Title = ({ text }) => (
  <div className='relative text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);

const FormDetails = ({
  inputData,
  setInputData,
  handleChange,
  handleSubmitFormIdentity,
}) => (
  <form onSubmit={handleSubmitFormIdentity} className=' space-y-8 py-6 w-full'>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Team Name</label>
      <TextInput
        placeholder={''}
        type='text'
        name='teamName'
        text={inputData.teamName}
        color='white'
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Member Count</label>
      <label className='font-thin text-sm pb-1'>
        Please enter number of members
      </label>
      <TextInput
        placeholder={''}
        type='number'
        name='memberCount'
        text={inputData.memberCount}
        color='white'
        minValue={1}
        onChange={handleChange}
        fullwidth
        required
      />
    </div>
    <div className='w-full flex justify-center'>
      <p className='text-3xl font-bold'>Chairman&apos;s Data</p>
    </div>
    {inputData.members?.map((_, i) => (
      <section key={i} className='w-full space-y-8'>
        <div className='flex flex-col'>
          <label className='text-xl py-2'>Name</label>
          <label className='font-thin text-sm pb-1 text-slate-200'>
            Please enter your full name
          </label>
          <TextInput
            placeholder={''}
            type='text'
            name={`members[${i}].name`}
            text={inputData.members[i].name}
            color='white'
            onChange={handleChange}
            fullwidth
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl py-2'>Email</label>
          <label className='font-thin text-sm pb-1 text-slate-200'>
            Please enter your active email address
          </label>
          <TextInput
            placeholder={''}
            type='email'
            name={`members[${i}].email`}
            text={inputData.members[i].email}
            color='white'
            onChange={handleChange}
            fullwidth
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl py-2'>WhatsApp Number</label>
          <label className='font-thin text-sm pb-1 text-slate-200'>
            Please add &apos; before your number! (e.g. &apos;08111839019)
          </label>
          <TextInput
            placeholder={''}
            type='text'
            name={`members[${i}].phoneNumber`}
            text={inputData.members[i].phoneNumber}
            color='white'
            onChange={handleChange}
            fullwidth
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl py-2'>Age</label>
          <label className='font-thin text-sm pb-1 text-slate-200'>
            Please enter the valid age based on the student card
          </label>
          <TextInput
            placeholder={''}
            type='number'
            name={`members[${i}].age`}
            text={inputData.members[i].age}
            color='white'
            onChange={handleChange}
            fullwidth
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xl py-2'>Institution</label>
          <label className='font-thin text-sm pb-1 text-slate-200'>
            Please write your high school or university name in its Indonesian
            version (e.g. Institut Teknologi Bandung)
          </label>
          <TextInput
            placeholder={''}
            type='text'
            name={`members[${i}].institution`}
            text={inputData.members[i].institution}
            color='white'
            onChange={handleChange}
            fullwidth
            required
          />
        </div>
        <div className='w-full pb-20'>
          <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
            <div className='w-full md:w-[49%]'>
              <p className='text-3xl py-4 text-center'>
                Student Card Proof {i + 1}
              </p>
              <SingleFileInput
                key={'FormDetailsA' + i}
                message='Student Card Proof'
                file={{
                  fileName: inputData.members[i].studentProofName,
                  fileUrl: inputData.members[i].studentProof,
                }}
                setFile={(newFile: FileInputType) => {
                  setInputData((inputData) => {
                    const newInputData = { ...inputData };
                    newInputData.members[i].studentProof =
                      newFile?.fileUrl as string;
                    newInputData.members[i].studentProofName =
                      newFile?.fileName as string;

                    localStorage.setItem(
                      'inputData',
                      JSON.stringify(newInputData),
                    );

                    return newInputData;
                  });
                }}
              />
            </div>
            <div className='w-full md:w-[49%]'>
              <p className='text-3xl py-4 text-center'>Twibbon Proof {i + 1}</p>
              <SingleFileInput
                key={'FormDetailsB' + i}
                message='Twibbon Proof'
                file={{
                  fileName: inputData.members[i].twibbonProofName,
                  fileUrl: inputData.members[i].twibbonProof,
                }}
                setFile={(newFiles) => {
                  setInputData((inputData) => {
                    const newInputData = { ...inputData };
                    newInputData.members[i].twibbonProof =
                      newFiles?.fileUrl as string;
                    newInputData.members[i].twibbonProofName =
                      newFiles?.fileName as string;

                    localStorage.setItem(
                      'inputData',
                      JSON.stringify(newInputData),
                    );

                    return newInputData;
                  });
                }}
              />
            </div>
          </div>
        </div>
      </section>
    ))}

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
  filesForm2,
  setFilesForm2,
  handleSubmitFinal,
  setStep,
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
                    setFilesForm2((filesForm2: FileInputType[]) => {
                      const newFilesForm: FileInputType[] = [];
                      for (let j = 0; j < filesForm2.length; j++) {
                        if (j == i) continue;
                        newFilesForm.push(filesForm2[j]);
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
      <Button color='green' onClick={() => setStep(1)}>
        Back
      </Button>
      <Button color='gold'>Submit</Button>
    </div>
  </form>
);
