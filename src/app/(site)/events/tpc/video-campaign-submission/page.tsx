'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { callToast } from '@/components/Toast';
import { callLoading } from '@/components/Toast';

export default function RegistWithPaper() {
  const router = useRouter();
  const inputDataHistoryKey = 'video-campaign-submission-history';

  // const router = useRouter();
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState({
    teamName: '',
    videoUrl: '',
  });

  const [isWarnedInputData, setIsWarnedInputData] = useState({
    teamName: false,
    videoUrl: false,
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
  const setWarn = (prop: 'teamName' | 'videoUrl', bool: boolean) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      newIsWarnedInputData[prop] = bool;
      return newIsWarnedInputData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isToastTriggered = false;
    const checkAndWarn = (bool: boolean, prop: 'teamName' | 'videoUrl') => {
      if (bool) {
        setWarn(prop, true);
        isToastTriggered = true;
      }
    };
    checkAndWarn(!inputData.teamName, 'teamName');

    function isUrlValid(userInput) {
      if (!userInput) return false;
      const regexQuery =
        '^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$';
      const url = new RegExp(regexQuery, 'i');
      return url.test(userInput);
    }
    checkAndWarn(!isUrlValid(inputData.videoUrl), 'videoUrl');

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
      // console.log(inputData);

      // -- EXAMPLE --
      const loadingToastId = callLoading('Submitting Video Campaign Form...'); // Tampilkan toast loading
      try {
        setIsLoading(true);
        const dataTicket = {
          teamName: inputData.teamName,
          linkVideo: inputData.videoUrl,
        };
        const response = await fetch('/api/video-tpc', {
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
          router.push('/events/tpc');
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
      session.user.ticket?.TPC.buy == false ||
      session.user.ticket?.TPC.verified !== 'verified'
    ) {
      // Case the ticket pending or rejected
      if (
        session.user.ticket?.TPC.buy &&
        (session.user.ticket.TPC.verified === 'pending' ||
          session.user.ticket.TPC.verified === 'rejected')
      ) {
        callToast({
          status: 'error',
          description:
            'You cannot access this stage, thanks for your participation',
        });
        router.push('/events/tpc');
      }
      // Case not buy the ticket or not verified
      else if (
        session.user.ticket?.TPC.buy == false &&
        session.user.ticket.TPC.verified === ''
      ) {
        callToast({
          status: 'error',
          description:
            'You cannot access this stage, you have not purchased the ticket before',
        });
        router.push('/events/tpc');
      }
      // Unknown case
      else {
        callToast({
          status: 'error',
          description: 'Something went wrong, please contact our admin',
        });
        router.push('/events/tpc');
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
          'videoUrl' in historyInputData
        ) {
          const { teamName, videoUrl } = historyInputData;

          setInputData({
            teamName,
            videoUrl,
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
        <Title text='Video Campaign Submission' />
        <Title text='Complete your details below' isSmall />
        <form onSubmit={handleSubmit} className='space-y-2 py-6 w-full'>
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
          <div className='flex flex-col'>
            <label
              className='text-xl py-2'
              style={
                isWarnedInputData.videoUrl
                  ? { color: 'rgba(255, 0, 0, 0.9)' }
                  : {}
              }
            >
              Video Campaign Link
            </label>
            <p className='mb-2'>Please submit your link here</p>
            <TextInput
              placeholder={''}
              type='text'
              name='videoUrl'
              text={inputData.videoUrl}
              color='white'
              onChange={handleChange}
              onFocus={() => setWarn('videoUrl', false)}
              isWarned={isWarnedInputData.videoUrl}
              fullwidth
            />
            <span className='mt-1' style={{ color: 'rgba(255, 0, 0, 0.9)' }}>
              {isWarnedInputData.videoUrl && 'Please fill a valid link'}
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
                Submit
              </span>
            </Button>
          </div>
        </form>
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
