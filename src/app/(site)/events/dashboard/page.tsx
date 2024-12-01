'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { callToast } from '@/components/Toast';

const DASHBOARD = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [teamData, setTeamData] = useState<any>(null); // Adjust the type based on your API response structure
  const [competitionType, setCompetitionType] = useState('');

  const fetchTeamData = async (teamId: string) => {
    try {
      const response = await fetch(`/api/team/${teamId}`); // Use the correct dynamic route
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const { data } = await response.json();
      setTeamData(data);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to fetch team data',
      });
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      callToast({
        status: 'error',
        description: 'Unauthorized, please login first',
      });
      router.push('/login');
    } else {
      const ticket = session.user.ticket;
      if (ticket?.PTC.buy && ticket.PTC.verified === 'verified') {
        setCompetitionType('PTC');
        fetchTeamData(ticket.PTC.teamId);
      } else if (ticket?.H4H.buy && ticket.H4H.verified === 'verified') {
        setCompetitionType('H4H');
        fetchTeamData(ticket.H4H.teamId);
      } else if (ticket?.PTC.buy && ticket.PTC.verified === 'rejected') {
        callToast({
          status: 'error',
          description:
            'You have purchased this ticket, Your ticket was rejected',
        });
        router.push('/');
      } else if (ticket?.H4H.buy && ticket.H4H.verified === 'rejected') {
        callToast({
          status: 'error',
          description:
            'You have purchased this ticket, Your ticket was rejected',
        });
        router.push('/');
      }
    }
  }, [status, router, session?.user]);

  return (
    <main className='px-4 sm:px-10 md:px-15 lg:px-20 text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip w-full'>
      <div className='h-fit w-full max-w-[1200px] py-10 pt-16 lg:pt-24 font-poppins'>
        {competitionType !== '' ? (
          <>
            <h1 className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
              {competitionType} Dashboard
            </h1>
            <h2 className='text-lg lg:text-2xl font-semibold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
              {teamData?.teamName}
            </h2>
            {/* <FormDetails
              inputData={inputData}
              setInputData={setInputData}
              validRefferalCode={validRefferalCode}
              setValidRefferalCode={setValidRefferalCode}
              handleChange={handleChange}
              fillMemberIndex={fillMemberIndex}
              setFillMemberIndex={setFillMemberIndex}
              handleSubmitFormIdentity={handleSubmitFormIdentity}
              isWarnedInputData={isWarnedInputData}
              setIsWarnedInputData={setIsWarnedInputData}
              isDisabledNext={isDisabledNext}
              inputDataHistoryKey={inputDataHistoryKey}
              submissionText='Submit'
            /> */}
          </>
        ) : (
          <h1 className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
            Register First
          </h1>
        )}
      </div>
    </main>
  );
};

export default DASHBOARD;
