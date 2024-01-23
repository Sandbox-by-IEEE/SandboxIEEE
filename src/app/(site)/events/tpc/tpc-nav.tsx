'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';

function TPCnavigation() {
  const router = useRouter();
  const { data: session } = useSession();

  const submissionHandler = (type: string) => {
    if (type == 'paper') {
      router.push('/events/tpc/tpc-registration-stage2');
    } else if (type == 'video') {
      // router.push('/events/tpc/video-campaign-submission');
      console.log('hiya');
    }
  };

  const dashboardHandler = () => {
    router.push('/events/tpc/team-dashboard-tpc');
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
      // getUserInfo();
      getTeamInfo(session.user.ticket?.TPC.teamId);
    }
  }, [session?.user.id]);

  // const getUserInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/user/${session?.user.id}/participant?type=PTC`,
  //     );

  //     // // DEBUG LINK
  //     // const response = await axios.get(
  //     //   `/api/user/clqrpmgkd0000k108s2o27cmw/participant?type=TPC`,
  //     // );
  //     getTeamInfo(response.data.data.teamId);
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error(error);
  //   }
  // };

  const getTeamInfo = async (teamId) => {
    try {
      const response = await axios.get(`/api/team/${teamId}`);
      setTeamInfo(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  // Tanggal dan waktu tenggat
  const deadline = new Date('2024-01-30T22:00:00'); // Batas Waktu
  const videoOpen = new Date('2024-02-09T00:00:00');
  const videoDeadline = new Date('2024-02-15T18:00:00');

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='rows w-full block'>
      <div className='row1 w-full flex'>
        <div className='container w-fit flex m-auto'>
          {session?.user.ticket?.TPC.isLeader &&
            now < deadline &&
            teamInfo.data.teamStatus.substring(0, 7) == 'Stage 3' && (
              <a
                className='button ml-2 mr-2'
                target='_blank'
                onClick={() => {
                  submissionHandler('paper');
                }}
              >
                <Button color='green' isFullWidth>
                  Re-registration and Paper Submisson
                </Button>
              </a>
            )}
          {teamInfo.data.id && (
            <a
              className='button ml-2 mr-2'
              target='_blank'
              onClick={() => {
                dashboardHandler();
              }}
            >
              <Button color='green' isFullWidth>
                TPC Team Dashboard
              </Button>
            </a>
          )}
        </div>
      </div>
      <div className='row2 w-full flex'>
        <div className='container w-fit flex m-auto'>
          {session?.user.ticket?.TPC.isLeader &&
            // now > videoOpen &&
            now < videoDeadline &&
            teamInfo.data.teamStatus.substring(0, 7) == 'Stage 3' && (
              <a
                className='button ml-2 mr-2 mt-4'
                target='_blank'
                onClick={() => {
                  submissionHandler('video');
                }}
              >
                <Button color='green' isFullWidth>
                  Video Campaign Submission
                </Button>
              </a>
            )}
        </div>
      </div>
    </div>
  );
}

export default TPCnavigation;
