'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';

function PTCnavigation() {
  const router = useRouter();
  const { data: session } = useSession();

  const submissionHandler = () => {
    router.push('');
  };

  const dashboardHandler = () => {
    router.push('');
  };

  const [teamInfo, setTeamInfo] = useState({
    data: {
      id: '',
      teamName: '',
      chairmanName: '',
      chairmanEmail: '',
      members: [{ name: '' }],
      teamStatus: '',
      abstract: { status: '' },
      fullPaper: {},
    },
    message: '',
  });

  useEffect(() => {
    if (session?.user.id) {
      getUserInfo();
    }
  }, [session?.user.id]);

  const getUserInfo = async () => {
    try {
      // const response = await axios.get(
      //   `/api/user/${sessionData?.user.id}/participant?type=PTC`,
      // );

      // DEBUG LINK
      const response = await axios.get(
        `/api/user/clqrpmgkd0000k108s2o27cmw/participant?type=TPC`,
      );
      getTeamInfo(response.data.data.teamId);
    } catch (error) {
      console.error(error);
    }
  };

  const getTeamInfo = async (teamId) => {
    try {
      const response = await axios.get(`/api/team/${teamId}`);
      setTeamInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Tanggal dan waktu tenggat
  const deadline = new Date('2024-01-23T21:00:00'); // Batas Waktu

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='container w-fit flex'>
      {session?.user.ticket?.PTC.isLeader &&
        now < deadline &&
        teamInfo.data.teamStatus === 'Stage 3' && (
          <a
            className='button ml-2 mr-2'
            target='_blank'
            onClick={() => {
              submissionHandler();
            }}
          >
            <Button color='green' isFullWidth>
              Re-registration and Video Submisson
            </Button>
          </a>
        )}
      <a
        className='button ml-2 mr-2'
        target='_blank'
        onClick={() => {
          dashboardHandler();
        }}
      >
        <Button color='green' isFullWidth>
          PTC Team Dashboard
        </Button>
      </a>
    </div>
  );
}

export default PTCnavigation;
