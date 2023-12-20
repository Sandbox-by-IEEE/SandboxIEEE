'use client';
import React, { useEffect, useState } from 'react';

import { FileInputType } from '@/components/FileInput/fileInput-type';
import FormDetails from '@/components/Forms/FormDetails';
import FormPayment from '@/components/Forms/FormPayment';
import {
  InputData,
  IsWarnedInputData,
  MemberInfo,
} from '@/components/Forms/inputData-type';
import GradientBox from '@/components/GradientBox';
import { callToast } from '@/components/Toast';

export default function Home() {
  const [inputData, setInputData] = useState<InputData>({
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
  const [isWarnedInputData, setIsWarnedInputData] = useState<IsWarnedInputData>(
    {
      teamName: false,
      memberCount: false,
      members: [
        {
          name: false,
          email: false,
          institution: false,
          phoneNumber: false,
          age: false,
          twibbonProof: false,
          twibbonProofName: false,
          studentProof: false,
          studentProofName: false,
        },
      ],
      paymentMethod: false,
      paymentProofUrl: [],
    },
  );
  const [filesForm2, setFilesForm2] = useState<FileInputType[] | undefined>();
  const [fillMemberIndex, setFillMemberIndex] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const newInputData = { ...inputData };

    if (name == 'memberCount') {
      setFillMemberIndex(0);
    }

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
      const newMembers: MemberInfo[] = [];

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
    inputData.members.forEach((el, i) => {
      if (!el.twibbonProof) {
        setFillMemberIndex(i);
        isEmptyTwibbon = true;
      }
      if (!el.studentProof) {
        setFillMemberIndex(i);
        isEmptyStudentProof = true;
      }
      if (el.age <= 0) {
        setFillMemberIndex(i);
        isInvalidAge = true;
      }
      if (el.phoneNumber[0] != "'") {
        setFillMemberIndex(i);
        isInvalidPhoneNumber = true;
      }
    });
    if (isEmptyTwibbon) {
      callToast({ status: 'error', description: 'Please fill all twibbons' });
    }
    if (isEmptyStudentProof) {
      callToast({
        status: 'error',
        description: 'Please fill all Student Card Proof',
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
    if (!inputData.paymentProofUrl?.length) {
      callToast({
        status: 'error',
        description: 'Please include your proof of payment',
      });
    }
    if (!inputData.paymentMethod || !inputData.paymentProofUrl?.length) {
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
        const historyInputData: InputData = JSON.parse(memoryInputData);

        if (
          typeof historyInputData === 'object' &&
          'teamName' in historyInputData &&
          'memberCount' in historyInputData &&
          'members' in historyInputData &&
          Array.isArray(historyInputData.members) &&
          'paymentMethod' in historyInputData &&
          Array.isArray(historyInputData.paymentProofUrl)
        ) {
          if (historyInputData.paymentProofUrl)
            setFilesForm2(historyInputData.paymentProofUrl);

          if (!historyInputData.memberCount) {
            historyInputData.memberCount = 1;
          }
          if (!historyInputData.members.length) {
            historyInputData.members = [
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
            ];
          }

          const {
            teamName,
            memberCount,
            members,
            paymentMethod,
            paymentProofUrl,
          } = historyInputData;

          setInputData({
            teamName,
            memberCount,
            members,
            paymentMethod,
            paymentProofUrl,
          });
          localStorage.setItem(
            'inputData',
            JSON.stringify({
              teamName,
              memberCount,
              members,
              paymentMethod,
              paymentProofUrl,
            }),
          );
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
              fillMemberIndex={fillMemberIndex}
              setFillMemberIndex={setFillMemberIndex}
              isWarnedInputData={isWarnedInputData}
              setIsWarnedInputData={setIsWarnedInputData}
              submissionText='Next'
              inputDataHistoryKey='payment-regist-01'
              isDisabledNext
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
              step={step}
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
