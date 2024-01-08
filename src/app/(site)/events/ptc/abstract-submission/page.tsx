'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import TextInput from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

export default function PTCRegist() {
  const inputDataHistoryKey = 'abstraction-submit-history';

  const router = useRouter();
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState({
    teamName: '',
    plagiarismName: '',
    plagiarismUrl: '',
    abstractName: '',
    abstractUrl: '',
  });

  const [isWarnedInputData, setIsWarnedInputData] = useState({
    teamName: false,
    plagiarismName: false,
    plagiarismUrl: false,
    abstractName: false,
    abstractUrl: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Text Input onChange handler
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const newInputData = { ...inputData };

    // Handle top-level fields
    newInputData[name] = value;

    if (newInputData !== inputData) {
      setInputData(newInputData);
      localStorage.setItem(inputDataHistoryKey, JSON.stringify(newInputData));
    }
  };

  // Handle warn state function
  const setWarn = (
    prop:
      | 'teamName'
      | 'plagiarismName'
      | 'plagiarismUrl'
      | 'abstractName'
      | 'abstractUrl',
    bool: boolean,
  ) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      newIsWarnedInputData[prop] = bool;
      return newIsWarnedInputData;
    });
  };

  const handleSubmitFormIdentity = async (e) => {
    e.preventDefault();

    let isToastTriggered = false;
    const checkAndWarn = (
      bool: boolean,
      prop:
        | 'teamName'
        | 'plagiarismName'
        | 'plagiarismUrl'
        | 'abstractName'
        | 'abstractUrl',
    ) => {
      if (bool) {
        setWarn(prop, true);
        isToastTriggered = true;
      }
    };
    checkAndWarn(!inputData.teamName, 'teamName');
    checkAndWarn(!inputData.abstractUrl, 'abstractUrl');
    checkAndWarn(!inputData.plagiarismUrl, 'plagiarismUrl');

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
      //shoot API here
      const loadingToastId = callLoading('Submitting PTC abstract...'); // Tampilkan toast loading
      try {
        setIsLoading(true);
        const dataTicket = {
          teamName: inputData.teamName,
          letterPlagiarism: inputData.plagiarismUrl,
          abstract: inputData.abstractUrl,
          type: 'PTC',
        };

        const response = await fetch('/api/regist2', {
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
  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    // If the user is not logged in, redirect to login page
    if (!session?.user) {
      callToast({
        status: 'error',
        description: 'Unauthorized, please login first',
      });
      router.push('/login');
    }
    // Case not buy the ticket or not verified
    else if (
      session.user.ticket?.PTC.buy == false ||
      session.user.ticket?.PTC.verified !== 'verified'
    ) {
      // Case the ticket pending or rejected
      if (
        session.user.ticket?.PTC.buy &&
        (session.user.ticket.PTC.verified === 'pending' ||
          session.user.ticket.PTC.verified === 'rejected')
      ) {
        callToast({
          status: 'error',
          description:
            'You cannot access this stage, thanks for your participation',
        });
        router.push('/events/ptc');
      }
      // Case not buy the ticket or not verified
      else if (
        session.user.ticket?.PTC.buy == false &&
        session.user.ticket.PTC.verified === ''
      ) {
        callToast({
          status: 'error',
          description:
            'You cannot access this stage, you have not purchased the ticket before',
        });
        router.push('/events/ptc');
      }
      // Unknown case
      else {
        callToast({
          status: 'error',
          description: 'Something went wrong, please contact our admin',
        });
        router.push('/events/ptc');
      }
    }
  }, [status, router, session?.user]);

  // Load Local Storage
  useEffect(() => {
    const memoryInputData = localStorage.getItem(inputDataHistoryKey);
    if (memoryInputData) {
      try {
        const historyInputData = JSON.parse(memoryInputData);

        if (
          typeof historyInputData === 'object' &&
          'teamName' in historyInputData &&
          'plagiarismName' in historyInputData &&
          'plagiarismUrl' in historyInputData &&
          'abstractName' in historyInputData &&
          'abstractUrl' in historyInputData
        ) {
          const {
            teamName,
            plagiarismName,
            plagiarismUrl,
            abstractName,
            abstractUrl,
          } = historyInputData;

          setInputData({
            teamName,
            plagiarismName,
            plagiarismUrl,
            abstractName,
            abstractUrl,
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
        <Title text='PTC Abstract Submission' />
        <Title text='Complete your details below' />
        <form
          onSubmit={handleSubmitFormIdentity}
          className='space-y-2 py-6 w-full'
        >
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
            <span className='mt-1' style={{ color: 'rgba(255, 0, 0, 0.9)' }}>
              {isWarnedInputData.teamName && 'Please fill this data first'}
            </span>
          </div>
          <div className='flex justify-between pt-10 items-stretch flex-wrap'>
            <div
              className='w-full md:w-[49%]'
              onClick={() => {
                setWarn('plagiarismUrl', false);
              }}
            >
              <p
                className='text-3xl py-4 text-center'
                style={
                  isWarnedInputData.plagiarismUrl
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Letter of Plagiarism
              </p>
              <SingleFileInput
                key={'PlagiarismRegist2'}
                message='Letter of Plagiarism'
                file={{
                  fileName: inputData?.plagiarismName,
                  fileUrl: inputData?.plagiarismUrl,
                }}
                allowedFileTypes={['application/pdf']}
                setFile={(newFiles) => {
                  setInputData((inputData) => {
                    const newInputData = { ...inputData };
                    newInputData.plagiarismUrl = newFiles?.fileUrl as string;
                    newInputData.plagiarismName = newFiles?.fileName as string;

                    localStorage.setItem(
                      inputDataHistoryKey,
                      JSON.stringify(newInputData),
                    );

                    return newInputData;
                  });
                }}
              />
            </div>
            <div
              className='w-full md:w-[49%]'
              onClick={() => {
                setWarn('abstractUrl', false);
              }}
            >
              <p
                className='text-3xl py-4 text-center'
                style={
                  isWarnedInputData.abstractUrl
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Abstract
              </p>
              <SingleFileInput
                key={'AbstractionRegist2'}
                message='Abstraction'
                allowedFileTypes={['application/pdf']}
                file={{
                  fileName: inputData?.abstractName,
                  fileUrl: inputData?.abstractUrl,
                }}
                setFile={(newFiles) => {
                  setInputData((inputData) => {
                    const newInputData = { ...inputData };
                    newInputData.abstractUrl = newFiles?.fileUrl as string;
                    newInputData.abstractName = newFiles?.fileName as string;

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
          <div className='w-fit max-w-fit mx-auto pt-20'>
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
      </div>
    </main>
  );
}

const Title = ({ text }) => (
  <div className='relative text-3xl lg:text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);
