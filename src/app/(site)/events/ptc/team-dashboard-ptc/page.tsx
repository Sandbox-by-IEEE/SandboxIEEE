'use client';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import SingleFileInput from '@/components/FileInput/SingleFileInput';
import GradientBox from '@/components/GradientBox';
import Triangle from '@/components/icons/Triangle';

const LableValue = ({ lable, children }) => (
  <>
    <p className='text-[#FFE1B9] py-1'>{lable}</p>
    <div className='py-1'>{children}</div>
  </>
);

const StageCircle = ({
  stage,
  bgColor,
}: {
  stage: number;
  bgColor: string;
}) => (
  <div
    className='w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-poppins font-bold'
    style={{ backgroundColor: bgColor }}
  >
    <p>STAGE</p>
    <p className='text-3xl'>{stage}</p>
  </div>
);

const width = {
  currentStage: 'w-1/3 flex-grow md:flex-grow-0',
  notCurrentStage: 'w-[10%] md:w-1/3',
};

const className = {
  currentStage:
    'w-1/3 flex-grow md:flex-grow-0 flex flex-col justify-between items-center gap-6',
  notCurrentStage:
    'w-[10%] md:w-1/3 flex flex-col justify-between items-center gap-6',
  isShown: 'flex-col items-center flex gap-6',
  notShown: 'flex-col items-center hidden md:flex gap-6',
};

const Page = () => {
  // Shot API User Info
  const { data: sessionData, status } = useSession();
  // console.log("ini data sesi:" , sessionData?.user.id)

  const DEFAULT_PROFILE_PICTURE = '/Mascot.png';
  const [changingProfilePic, setChangingProfilePic] = useState(false);
  const [profilePic, setProfilePic] = useState({
    name: '',
    url: '',
  });

  const [userInfo, setUserInfo] = useState({
    data: {
      id: '',
      name: '',
      email: '',
      image: '',
      phoneNumber: '',
      institution: '',
      teamId: '',
      age: '',
      position: '',
    },
    message: '',
  });

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
    if (sessionData?.user.id) {
      getUserInfo();
    }
  }, [sessionData?.user.id]);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `/api/user/${sessionData?.user.id}/participant?type=PTC`,
      );

      // DEBUG LINK
      // const response = await axios.get(
      //   `/api/user/clqkz63of0007l108lq86qd4m/participant?type=PTC`,
      // );

      setUserInfo(response.data);
      setProfilePic({
        name: '',
        url: response.data.data.image,
      });

      getTeamInfo(response.data.data.teamId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getTeamInfo = async (teamId) => {
    try {
      const response = await axios.get(`/api/team/${teamId}`);
      setTeamInfo(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleChangePic = async (newFiles) => {
    try {
      setProfilePic((inputData) => {
        const newInputData = { ...inputData };
        newInputData.url = newFiles?.fileUrl as string;
        newInputData.name = newFiles?.fileName as string;

        //shoot API here
        axios
          .patch(`/api/user/${sessionData?.user.id}/image`, {
            imageUrl: newInputData.url,
          })
          .then((response) => {
            // console.log("API Response :", response)
            setChangingProfilePic(false);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });

        return newInputData;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <section className='min-h-screen w-full bg-gradient-to-b from-[#051F12] to-[#06190C] flex justify-center pb-4'>
      <div className='max-w-[1200px] w-full p-2 sm:p-4 space-y-8 md:space-y-20'>
        <h1 className='font-museo-muderno text-center font-bold text-[32px] md:text-[50px] bg-clip-text text-[#00000000] bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'>
          Team Information
        </h1>
        {/* Stage Timeline */}
        <section>
          <div className='w-full flex items-center justify-between'>
            <div className={className.notCurrentStage}>
              <div className={className.notShown}>
                <div className='pb-6'>
                  <StageCircle stage={1} bgColor='#49784F' />
                </div>
              </div>
            </div>
            <div className={className.notCurrentStage}>
              <div className={className.notShown}>
                <GradientBox
                  className='min-h-[660px] w-[100%] md:w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center text-sm sm:text-lg md:text-2xl'
                  style={{ borderRadius: '30px' }}
                  aos='fade-in'
                  duration={400}
                >
                  Abstract Submission
                </GradientBox>
                <Triangle
                  position='bottom'
                  className='scale-150'
                  style={{ backgroundColor: '#B4B39D' }}
                />
              </div>
            </div>
            <div className={className.currentStage}>
              <div className={className.isShown}>
                <div className='pb-6'>
                  <StageCircle stage={3} bgColor='#ffe1b98a' />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full text-sm md:text-2xl flex font-bold font-poppins text-center'>
            <div
              className={`bg-[#49784F] rounded-l-2xl py-2 ${width.notCurrentStage}`}
            ></div>
            <div className={`bg-[#B4B39D] py-2 ${width.notCurrentStage}`}></div>
            <div
              className={`bg-[#ffe1b98a] rounded-r-2xl py-2 ${width.currentStage}`}
            >
              {teamInfo.data.teamStatus === 'Stage 3' ? 'You are Here!' : null}
            </div>
          </div>
          <div className='w-full flex justify-between'>
            <div className={className.notCurrentStage}>
              <div className={className.notShown}>
                <Triangle
                  position='top'
                  className='scale-150'
                  style={{ backgroundColor: '#49784F' }}
                />
                <GradientBox
                  className='min-h-[660px] w-[100%] md:w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center text-sm sm:text-lg md:text-2xl'
                  style={{ borderRadius: '30px' }}
                  aos='fade-in'
                  duration={400}
                >
                  <p className='px-8 py-4'>Registration</p>
                </GradientBox>
              </div>
            </div>
            <div className={className.notCurrentStage}>
              <div className={className.notShown}>
                <div className='pt-6'>
                  <StageCircle stage={2} bgColor='#B4B39D' />
                </div>
              </div>
            </div>
            <div className={className.currentStage}>
              <div className={className.isShown}>
                <Triangle
                  position='top'
                  className='scale-150'
                  style={{ backgroundColor: '#ffe1b98a' }}
                />
                <GradientBox
                  className='min-h-[660px] w-[100%] md:w-[70%] max-w-full flex flex-col items-center justify-center gap-8 px-8 py-4 text-white font-bold text-center text-sm sm:text-lg md:text-2xl'
                  style={{ borderRadius: '30px' }}
                  aos='fade-in'
                  duration={400}
                >
                  Full Paper and Video Submission
                </GradientBox>
              </div>
            </div>
          </div>
        </section>

        {/* Team Profile */}
        <section className='flex flex-col gap-4 w-full font-poppins'>
          <div className='bg-[#49784F] text-center rounded-lg'>
            <p className='font-bold text-[30px] py-1.5 text-white'>
              Team Profile
            </p>
          </div>
          <div className='w-full justify-between h-fit flex flex-row gap-4'>
            <section className='bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] w-[32%] rounded-lg hidden md:flex md:flex-col justify-center items-center font-bold text-3xl py-8 gap-4'>
              <p>Hi,</p>
              <p>{teamInfo.data.teamName}</p>
              <Image
                src='/Group_1289.png'
                width={200}
                height={200}
                alt='Mascot'
                className='min-w-[80%] h-auto'
              />
            </section>
            <section className='w-0 flex-grow bg-[#49784F] rounded-lg p-4 text-white font-semibold flex justify-between flex-col-reverse md:flex-row flex-wrap gap-4'>
              <div className='w-fit flex-grow-0 flex-shrink-0'>
                <LableValue lable='Name'>{userInfo.data.name}</LableValue>
                <LableValue lable='Position'>
                  {userInfo.data.position}
                </LableValue>
                <LableValue lable='Email Address'>
                  {userInfo.data.email}
                </LableValue>
                <LableValue lable='Whatsapp Number'>
                  {userInfo.data.phoneNumber}
                </LableValue>
                <LableValue lable='Institution'>
                  {userInfo.data.institution}
                </LableValue>
                <LableValue lable='Team members :'>
                  <ul className='list-disc'>
                    {teamInfo.data.members.map((member, index) => (
                      <li key={index}>{member.name}</li>
                    ))}
                  </ul>
                </LableValue>
              </div>
              <div className='w-full md:w-0 sm:min-w-[200px] flex-grow flex flex-col items-center justify-center'>
                {changingProfilePic ? (
                  <div className='max-w-[90vw]'>
                    <SingleFileInput
                      key={'ProfilePic'}
                      message='suggested Profile Picture in .png, .jpeg, .jpg'
                      allowedFileTypes={['.png', '.jpeg', '.jpg']}
                      file={{
                        fileName: profilePic?.name,
                        fileUrl: profilePic?.url,
                      }}
                      setFile={handleChangePic}
                    />
                  </div>
                ) : (
                  <Image
                    src={profilePic.url || DEFAULT_PROFILE_PICTURE}
                    width={200}
                    height={200}
                    alt='Mascot'
                    className='h-[200px] w-[170px] md:h-[80%] md:w-auto md:aspect-[2/3] object-cover'
                    priority
                  />
                )}
                <p className='text-[#FFE1B9] py-2'>
                  Team Status : {teamInfo.data.teamStatus}
                </p>
                <button
                  className='text-sm text-blue-300 hover:text-blue-400 hover:scale-105'
                  onClick={() => setChangingProfilePic(!changingProfilePic)}
                >
                  Change Profile Picture
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Page;
