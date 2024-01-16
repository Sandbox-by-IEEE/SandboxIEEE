'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import GradientBox from '@/components/GradientBox';
import TextInput from '@/components/TextInput';
import { callLoading } from '@/components/Toast';
import { callToast } from '@/components/Toast';

export default function RegistWithPaper() {
  const router = useRouter();
  const inputDataHistoryKey = 'ptc-regist-paper-history';

  // const router = useRouter();
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState({
    teamName: '',
    paperUrl: '',
    bankAccName: '',
    paymentMethod: '',
    paymentProofName: '',
    paymentProofUrl: '',
  });

  const [isWarnedInputData, setIsWarnedInputData] = useState({
    teamName: false,
    paperUrl: false,
    bankAccName: false,
    paymentMethod: false,
    paymentProofName: false,
    paymentProofUrl: false,
  });
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Text Input onChange handler
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const newInputData = { ...inputData };

    // Handle top-level fields
    // Handle top-level fields
    if (name === 'teamName') {
      newInputData.teamName = value;
    } else if (name === 'videoUrl') {
      newInputData.paperUrl = value;
    } else {
      newInputData[name] = value;
    }

    if (newInputData !== inputData) {
      setInputData(newInputData);
      localStorage.setItem(inputDataHistoryKey, JSON.stringify(newInputData));
    }
  };

  // Handle warn state function
  const setWarn = (
    prop:
      | 'teamName'
      | 'paperUrl'
      | 'bankAccName'
      | 'paymentMethod'
      | 'paymentProofName'
      | 'paymentProofUrl',
    bool: boolean,
  ) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      newIsWarnedInputData[prop] = bool;
      return newIsWarnedInputData;
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    let isToastTriggered = false;
    const checkAndWarn = (bool: boolean, prop: 'teamName' | 'paperUrl') => {
      if (bool) {
        setWarn(prop, true);
        isToastTriggered = true;
      }
    };
    checkAndWarn(!inputData.teamName, 'teamName');
    checkAndWarn(!inputData.paperUrl, 'paperUrl');

    if (isToastTriggered) {
      callToast({
        status: 'error',
        description: `Please fill all the required fields correctly`,
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isToastTriggered = false;
    const checkAndWarn = (
      bool: boolean,
      prop:
        | 'teamName'
        | 'paperUrl'
        | 'bankAccName'
        | 'paymentMethod'
        | 'paymentProofName'
        | 'paymentProofUrl',
    ) => {
      if (bool) {
        setWarn(prop, true);
        isToastTriggered = true;
      }
    };
    checkAndWarn(!inputData.teamName, 'teamName');
    checkAndWarn(!inputData.paperUrl, 'paperUrl');
    checkAndWarn(!inputData.bankAccName, 'bankAccName');
    checkAndWarn(!inputData.paymentProofName, 'paymentProofName');

    if (isToastTriggered) {
      callToast({
        status: 'error',
        description: `Please fill all the required fields correctly`,
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const loadingToastId = callLoading('Submitting Registration Form...'); // Tampilkan toast loading
      try {
        setIsLoading(true);
        const dataTicket = {
          teamName: inputData.teamName,
          linkGDrive: inputData.paperUrl,
          paymentProof: inputData.paymentProofUrl,
          paymentMethod: inputData.paymentMethod,
          billName: inputData.bankAccName,
          karya: '',
          type: 'PTC',
        };
        const response = await fetch('/api/regist3', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataTicket),
        });
        const bodyResponse = await response.json();
        if (!response.ok) {
          callToast({
            status: 'error',
            description: bodyResponse.message,
          });
        } else {
          callToast({
            status: 'success',
            description: bodyResponse.message,
          });
          router.push('/events/ptc');
          localStorage.removeItem(inputDataHistoryKey);
        }
      } catch (err) {
        callToast({
          status: 'error',
          description:
            'Something went wrong while submit your data, please try again',
        });
        setIsLoading(false);
      } finally {
        toast.dismiss(loadingToastId); // Dismiss toast loading ketika proses pengiriman formulir selesai
        setIsLoading(false);
      }
    }
  };

  // Page handling session user
  // useEffect(() => {
  //   if (status === 'loading') {
  //     return;
  //   }
  //   // If the user is not logged in, redirect to login page
  //   if (!session?.user) {
  //     callToast({
  //       status: 'error',
  //       description: 'Unauthorized, please login first',
  //     });
  //     router.push('/login');
  //   }
  //   // Case not buy the ticket or not verified
  //   else if (
  //     session.user.ticket?.PTC.buy == false ||
  //     session.user.ticket?.PTC.verified !== 'verified'
  //   ) {
  //     // Case the ticket pending or rejected
  //     if (
  //       session.user.ticket?.PTC.buy &&
  //       (session.user.ticket.PTC.verified === 'pending' ||
  //         session.user.ticket.PTC.verified === 'rejected')
  //     ) {
  //       callToast({
  //         status: 'error',
  //         description:
  //           'You cannot access this stage, thanks for your participation',
  //       });
  //       router.push('/events/ptc');
  //     }
  //     // Case not buy the ticket or not verified
  //     else if (
  //       session.user.ticket?.PTC.buy == false &&
  //       session.user.ticket.PTC.verified === ''
  //     ) {
  //       callToast({
  //         status: 'error',
  //         description:
  //           'You cannot access this stage, you have not purchased the ticket before',
  //       });
  //       router.push('/events/ptc');
  //     }
  //     // Unknown case
  //     else {
  //       callToast({
  //         status: 'error',
  //         description: 'Something went wrong, please contact our admin',
  //       });
  //       router.push('/events/ptc');
  //     }
  //   }
  // }, [status, router, session?.user]);

  // Load Local Storage

  useEffect(() => {
    const memoryInputData = localStorage.getItem(inputDataHistoryKey);
    if (memoryInputData) {
      try {
        const historyInputData = JSON.parse(memoryInputData);

        if (
          typeof historyInputData === 'object' &&
          'teamName' in historyInputData &&
          'paperUrl' in historyInputData &&
          'bankAccName' in historyInputData &&
          'paymentMethod' in historyInputData &&
          'paymentProofName' in historyInputData &&
          'paymentProofUrl' in historyInputData
        ) {
          const {
            teamName,
            paperUrl,
            bankAccName,
            paymentMethod,
            paymentProofName,
            paymentProofUrl,
          } = historyInputData;

          setInputData({
            teamName,
            paperUrl,
            bankAccName,
            paymentMethod,
            paymentProofName,
            paymentProofUrl,
          });
        } else {
          localStorage.removeItem(inputDataHistoryKey);
        }
      } catch (error) {
        localStorage.removeItem(inputDataHistoryKey);
      }
    }
  }, []);

  return (
    <main className='bg-gradient-to-t px-4 sm:px-10 md:px-20 lg:px-40 from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <div className='h-fit w-full max-w-[1000px] space-y-2 lg:space-y-4 py-10 px-4 pt-16 lg:pt-24 font-poppins'>
        <Title text='Second Stage Registration and Video Pitching Submission' />
        {step === 0 && (
          <>
            <Title text='Complete your details below' isSmall />
            <form onSubmit={handleNext} className='space-y-2 py-6 w-full'>
              <div className='flex flex-col'>
                <label
                  className='text-xl py-2'
                  style={
                    isWarnedInputData.teamName
                      ? { color: 'rgba(255, 0, 0, 0.9)' }
                      : {}
                  }
                >
                  Team Name
                </label>
                <p className='mb-2'>
                  Please enter the team name as previously registered
                </p>
                <TextInput
                  placeholder={''}
                  type='text'
                  name='teamName'
                  text={inputData.teamName}
                  color='white'
                  onChange={handleChange}
                  onFocus={() => setWarn('teamName', false)}
                  isWarned={isWarnedInputData.teamName}
                  fullwidth
                />
                <span
                  className='mt-1'
                  style={{ color: 'rgba(255, 0, 0, 0.9)' }}
                >
                  {isWarnedInputData.teamName && 'Please fill this data first'}
                </span>
              </div>
              <div className='flex flex-col'>
                <label
                  className='text-xl py-2'
                  style={
                    isWarnedInputData.paperUrl
                      ? { color: 'rgba(255, 0, 0, 0.9)' }
                      : {}
                  }
                >
                  Video Pitching Link
                </label>
                <p className='mb-2'>Please submit your link here</p>
                <TextInput
                  placeholder={''}
                  type='text'
                  name='videoUrl'
                  text={inputData.paperUrl}
                  color='white'
                  onChange={handleChange}
                  onFocus={() => setWarn('paperUrl', false)}
                  isWarned={isWarnedInputData.paperUrl}
                  fullwidth
                />
                <span
                  className='mt-1'
                  style={{ color: 'rgba(255, 0, 0, 0.9)' }}
                >
                  {isWarnedInputData.paperUrl && 'Please fill this data first'}
                </span>
              </div>
              <div className='w-fit max-w-fit mx-auto pt-8'>
                <Button
                  type='submit'
                  color='gold'
                  isFullWidth
                  isDisabled={isLoading || status == 'loading'}
                >
                  <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                    Next
                  </span>
                </Button>
              </div>
            </form>
          </>
        )}
        {step === 1 && (
          <>
            <Title text='Complete payment below' isSmall />
            <form onSubmit={handleSubmit} className='space-y-2 py-6 w-full'>
              <div className='flex flex-col pb-6'>
                <label
                  className='text-xl py-2'
                  style={
                    isWarnedInputData.bankAccName
                      ? { color: 'rgba(255, 0, 0, 0.9)' }
                      : {}
                  }
                >
                  Bank Account Username
                </label>
                <p className='mb-2'>
                  Please enter the you bank account username correctly
                </p>
                <TextInput
                  placeholder={''}
                  type='text'
                  name='bankAccName'
                  text={inputData.bankAccName}
                  color='white'
                  onChange={handleChange}
                  onFocus={() => setWarn('bankAccName', false)}
                  isWarned={isWarnedInputData.bankAccName}
                  fullwidth
                />
                <span
                  className='mt-1'
                  style={{ color: 'rgba(255, 0, 0, 0.9)' }}
                >
                  {isWarnedInputData.teamName && 'Please fill this data first'}
                </span>
              </div>
              <div className='flex flex-col gap-7 flex-wrap justify-center w-full border-y-2 pt-4 pb-14 border-[#bb9567]'>
                <p className='text-2xl font-bold text-left'>
                  Choose Your Payment method
                </p>
                <div className='flex gap-8 items-stretch flex-wrap'>
                  <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      id='BCA'
                      className='scale-150'
                      onChange={handleChange}
                      checked={inputData.paymentMethod === 'BCA'}
                      value='BCA'
                    />
                    <label htmlFor='BCA' className='w-full h-full'>
                      <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                        <p className='border-b-2 py-2 w-full'>BCA</p>
                        <p className='py-1 sm:py-2'>0860838494</p>
                        <p className='pb-2'>a.n. Grace Edwina Tarigan</p>
                      </GradientBox>
                    </label>
                  </div>
                  <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                    <input
                      type='radio'
                      name='paymentMethod'
                      id='Gopay'
                      className='scale-150'
                      checked={inputData.paymentMethod === 'Gopay'}
                      onChange={handleChange}
                      value='Gopay'
                    />
                    <label htmlFor='Gopay' className='w-full h-full'>
                      <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                        <p className='border-b-2 py-2 w-full'>Gopay</p>
                        <p className='py-1 sm:py-2'>081277521268</p>
                        <p className='pb-2'>a.n Rezki</p>
                      </GradientBox>
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex justify-between pt-10 items-stretch flex-wrap'>
                <div
                  className='w-full'
                  onClick={() => {
                    setWarn('paymentProofName', false);
                  }}
                >
                  <p
                    className='text-3xl py-4 text-center'
                    style={
                      isWarnedInputData.paymentProofName
                        ? { color: 'rgba(255, 0, 0, 0.9)' }
                        : {}
                    }
                  >
                    Payment Proof
                  </p>
                  <SingleFileInput
                    key={'Payment Proof'}
                    message='Payment Proof'
                    file={{
                      fileName: inputData?.paymentProofName,
                      fileUrl: inputData?.paymentProofUrl,
                    }}
                    allowedFileTypes={['application/pdf']}
                    setFile={(newFiles) => {
                      setInputData((inputData) => {
                        const newInputData = { ...inputData };
                        newInputData.paymentProofUrl =
                          newFiles?.fileUrl as string;
                        newInputData.paymentProofName =
                          newFiles?.fileName as string;

                        localStorage.setItem(
                          inputDataHistoryKey,
                          JSON.stringify(newInputData),
                        );

                        return newInputData;
                      });
                    }}
                  />
                </div>
              </div>

              <div className='w-fit max-w-fit mx-auto pt-8 flex gap-4'>
                <Button
                  type='button'
                  color='trans-orange'
                  isFullWidth
                  isDisabled={isLoading || status == 'loading'}
                  onClick={() => setStep(0)}
                >
                  <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                    Back
                  </span>
                </Button>
                <Button
                  type='submit'
                  color='gold'
                  isFullWidth
                  isDisabled={isLoading || status == 'loading'}
                >
                  <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                    Submit
                  </span>
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

const Title = ({ text, isSmall = false }) => (
  <div
    className={`relative ${
      isSmall ? 'text-xl lg:text-2xl' : 'text-3xl lg:text-5xl'
    } font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal`}
  >
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);
