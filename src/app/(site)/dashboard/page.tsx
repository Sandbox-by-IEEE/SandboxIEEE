'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loading from '@/app/loading';
import Button from '@/components/Button';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import TextInput from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

const DASHBOARD = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [teamData, setTeamData] = useState<any>(null);
  const [competitionType, setCompetitionType] = useState('');
  const [file, setFile] = useState<{ fileName: string; fileUrl: string }>({
    fileName: '',
    fileUrl: '',
  });
  const [declarationFile, setDeclarationFile] = useState<{
    fileName: string;
    fileUrl: string;
  }>({
    fileName: '',
    fileUrl: '',
  });
  const [paymentProofFile, setPaymentProofFile] = useState<{
    fileName: string;
    fileUrl: string;
  }>({
    fileName: '',
    fileUrl: '',
  });
  const [paperFile, setPaperFile] = useState<{
    fileName: string;
    fileUrl: string;
  }>({
    fileName: '',
    fileUrl: '',
  });
  const [pitchingVideoUrl, setPitchingVideoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [hasSubmittedPayment, setHasSubmittedPayment] = useState(false);
  const [isEditingStage2, setIsEditingStage2] = useState(false);
  const [hasSubmittedStage2, setHasSubmittedStage2] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [isPaymentDeadlinePassed, setIsPaymentDeadlinePassed] = useState(false);
  const [isStage2DeadlinePassed, setIsStage2DeadlinePassed] = useState(false);

  const fetchTeamData = async (teamId: string) => {
    try {
      const response = await fetch(`/api/team/${teamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const { data } = await response.json();
      setTeamData(data);
      // console.log('team data', data);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to fetch team data',
      });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date('2025-02-13');

    if (currentDate >= deadlineDate) {
      setIsDeadlinePassed(true);
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date('2025-03-6');

    if (currentDate >= deadlineDate) {
      setIsStage2DeadlinePassed(true);
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date('2025-02-24');

    if (currentDate >= deadlineDate) {
      setIsPaymentDeadlinePassed(true);
    }
  }, []);

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
      if (!ticket?.H4H.buy && !ticket?.PTC.buy) {
        callToast({
          status: 'error',
          description: 'You are not registered. Please register first',
        });
        router.push('/');
      } else if (ticket?.PTC.buy && ticket.PTC.verified === 'verified') {
        setCompetitionType('PTC');
        fetchTeamData(ticket.PTC.teamId);
        // checkSubmission1Status();
        // checkSubmission12Status();
        checkSubmission2Status();
      } else if (ticket?.H4H.buy && ticket.H4H.verified === 'verified') {
        setCompetitionType('H4H');
        fetchTeamData(ticket.H4H.teamId);
        // checkSubmission1Status();
      } else if (ticket?.PTC.buy && ticket.PTC.verified === 'pending') {
        setCompetitionType('PTC');
      } else if (ticket?.H4H.buy && ticket.H4H.verified === 'pending') {
        setCompetitionType('H4H');
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

  const checkSubmission1Status = async () => {
    try {
      const response = await fetch('/api/ticket/competition/submission1', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to check stage 1 submission status');
      }

      const data = await response.json();
      if (data.submitted) {
        setFile({
          fileName: data.fileUrl.split('/').pop(),
          fileUrl: data.fileUrl,
        });
        setGithubUrl(data.githubUrl);
        setYoutubeUrl(data.youtubeUrl);
        setIsEditing(true);
        setHasSubmitted(true);
      } else {
        setHasSubmitted(false);
      }
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to check stage 1 submission status',
      });
    }
  };

  const handleFileSubmit1 = async () => {
    if (!file.fileUrl && !githubUrl && !youtubeUrl) {
      callToast({
        status: 'error',
        description: 'Please upload a file or provide URLs first',
      });
      return;
    }

    const loadingToastId = callLoading('Submitting your file...');

    try {
      const response = await fetch('/api/ticket/competition/submission1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileUrl: file.fileUrl,
          declarationFileUrl: declarationFile.fileUrl,
          githubUrl,
          youtubeUrl,
          competitionType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      callToast({
        status: 'success',
        description: 'Data submitted successfully',
      });
      setIsEditing(true);
      setHasSubmitted(true);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to submit data',
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const handleFileUpdate1 = async () => {
    if (!file.fileUrl && !githubUrl && !youtubeUrl) {
      callToast({
        status: 'error',
        description: 'Please upload a file or provide URLs first',
      });
      return;
    }

    const loadingToastId = callLoading('Updating your file...');

    try {
      const response = await fetch('/api/ticket/competition/submission1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileUrl: file.fileUrl,
          githubUrl,
          youtubeUrl,
          competitionType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      callToast({
        status: 'success',
        description: 'Data updated successfully',
      });
      setIsEditing(true);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to update data',
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  // PTC STAGE 2

  const checkSubmission2Status = async () => {
    try {
      const response = await fetch('/api/ticket/competition/submission2', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to check stage 2 submission status');
      }

      const data = await response.json();
      if (data.submitted) {
        setPaperFile({
          fileName: data.paperUrl.split('/').pop(),
          fileUrl: data.paperUrl,
        });
        setPitchingVideoUrl(data.pitchingVideoUrl);
        setIsEditingStage2(true);
        setHasSubmittedStage2(true);
      } else {
        setHasSubmittedStage2(false);
      }
    } catch (error) {
      callToast({
        status: 'error',
        description: `Failed to check stage 2 submission status: ${(error as Error).message}`,
      });
    }
  };

  const handleFileSubmit2 = async () => {
    if (!paperFile.fileUrl || !pitchingVideoUrl) {
      callToast({
        status: 'error',
        description: 'Please upload a file or provide URLs first',
      });
      return;
    }

    const loadingToastId = callLoading('Submitting your file...');

    try {
      const response = await fetch('/api/ticket/competition/submission2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paperUrl: paperFile.fileUrl,
          pitchingVideoUrl,
          competitionType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      callToast({
        status: 'success',
        description: 'Data submitted successfully',
      });
      setIsEditingStage2(true);
      setHasSubmittedStage2(true);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to submit data',
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  // PTC PAYMENT
  const checkSubmission12Status = async () => {
    try {
      const response = await fetch('/api/ticket/competition/ptcpayment', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to check payment submission status');
      }

      const data = await response.json();
      if (data.submitted) {
        setPaymentProofFile({
          fileName: data.paymentProofUrl.split('/').pop(),
          fileUrl: data.paymentProofUrl,
        });
        setIsEditingPayment(true);
        setHasSubmittedPayment(true);
      } else {
        setHasSubmittedPayment(false);
      }
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to check payment submission status',
      });
    }
  };

  const handleFileSubmit12 = async () => {
    if (!paymentProofFile.fileUrl) {
      callToast({
        status: 'error',
        description: 'Please upload a file or provide URLs first',
      });
      return;
    }

    const loadingToastId = callLoading('Updating your file...');

    try {
      const response = await fetch('/api/ticket/competition/ptcpayment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentProofUrl: paymentProofFile.fileUrl,
          competitionType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to senddata');
      }

      callToast({
        status: 'success',
        description: 'Data sent successfully',
      });
      setIsEditingPayment(true);
      setHasSubmittedPayment(true);
    } catch (error) {
      callToast({
        status: 'error',
        description: 'Failed to send data',
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const chairman = teamData?.members.find(
    (member: any) => member.name === teamData?.chairmanName,
  );

  const cleanedPhoneNumber = chairman?.phoneNumber.replace(/^'/, '');

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <main className='px-4 sm:px-10 md:px-15 lg:px-20 text-white flex h-fit flex-col items-center justify-between overflow-x-clip w-full'>
      <div className='h-fit md:w-full w-[90%] md:max-w-[1200px] py-10 pt-18 lg:pt-28 font-poppins'>
        {session &&
        session.user &&
        session.user.ticket &&
        session.user.ticket[competitionType]?.verified === 'verified' ? (
          <>
            <div
              className='bg-[url("/dashboard/profile.png")] rounded-[3vw] text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins leading-normal lg:mt-4 mt-2 px-[4vw] py-[2vw]'
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              Team Profile - {competitionType}
            </div>
            <div className='relative rounded-t-[6vw] bg-[#040B15] w-full px-[6vw] pt-[3vw] pb-20 mt-16'>
              <div className='absolute overflow-hidden rounded-t-[6vw] inset-0 flex items-center justify-center'>
                <div className='w-full items-center h-full mt-auto mx-auto bg-gradient-radial from-[#255763] to-[#0B305F] opacity-20 blur-3xl rounded-full'></div>
              </div>
              <div className='relative'>
                <div className='absolute w-full left-1/2 transform -translate-x-1/2 -top-[100px] md:-top-[170px] flex items-center justify-center'>
                  <Image
                    src='/dashboard/decoration.svg'
                    alt='decoration1'
                    width={0}
                    height={0}
                    style={{
                      height: '250px',
                      width: 'auto',
                      objectFit: 'fill',
                    }}
                    className='fixed-size rounded-r-[40px] hidden md:block'
                  />
                  <Image
                    src='/dashboard/decoration.svg'
                    alt='decoration1'
                    width={0}
                    height={0}
                    style={{
                      height: '150px',
                      width: 'auto',
                      objectFit: 'fill',
                    }}
                    className='fixed-size rounded-r-[40px] block md:hidden '
                  />
                </div>
                <div className='relative z-10 mx-4 py-[1.5vw] text-[3vw] font-bold flex items-center justify-center bg-gradient-to-r from-[#28575ca2] to-[#0d2d32a8] backdrop-filter md:backdrop-blur-md rounded-[40px] shadow-lg mb-8'>
                  <h1>Hi! Team {teamData?.teamName}</h1>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row md:gap-2 gap-[6px]'>
                  <div className='flex flex-col w-full md:gap-0 gap-[6px]'>
                    <h2 className='text-[4vw]  md:text-[1.5vw] font-semibold'>
                      Chairman Name
                    </h2>
                    <h1 className='text-[3vw] font-normal md:text-[2vw] md:font-bold'>
                      {teamData?.chairmanName}
                    </h1>
                    <h2 className='text-[4vw]  md:text-[1.5vw] font-semibold'>
                      Chairman Email
                    </h2>
                    <h1 className='text-[3vw] font-normal md:text-[2vw] md:font-bold'>
                      {teamData?.chairmanEmail}
                    </h1>
                  </div>
                  <div className='flex flex-col w-full md:gap-0 gap-[6px]'>
                    <h2 className='text-[4vw] md:text-[1.5vw] font-semibold'>
                      Phone Number
                    </h2>
                    <h1 className='text-[3vw] font-normal md:text-[2vw] md:font-bold'>
                      {cleanedPhoneNumber}
                    </h1>
                    <h2 className='text-[4vw] md:text-[1.5vw] font-semibold'>
                      Institution
                    </h2>
                    <h1 className='text-[3vw] font-normal md:text-[2vw] md:font-bold'>
                      {chairman?.institution}
                    </h1>
                  </div>
                </div>
                <div className='flex w-full items-center justify-center'>
                  <div className='font-semibold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
                    <h2 className='text-[5vw] md:text-[1.5vw] font-semibold'>
                      Team Members
                    </h2>
                    {teamData?.members && teamData.members.length - 1 > 0 ? (
                      teamData.members
                        .filter(
                          (member: any) =>
                            member.name !== teamData?.chairmanName,
                        )
                        .map((member: any) => (
                          <div key={member.id}>
                            <h1 className='md:text-[2vw] text-[3vw] font-normal md:font-bold'>
                              {member.name}
                            </h1>
                          </div>
                        ))
                    ) : (
                      <p className='md:text-[2vw] text-[3vw] font-normal md:font-bold'>
                        -
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className='bg-[url("/dashboard/profile-bot.png")] text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins leading-normal px-[6vw] py-[3vw] rounded-b-[6vw]'
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {'Stage'} {teamData?.teamStage}
            </div>
            {/* LOWER SECTION */}
            <div>
              <div
                className='bg-[url("/dashboard/profile.png")] rounded-[3vw] text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins leading-normal lg:mt-12 mt-6 px-[4vw] py-[2vw]'
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {competitionType} Submission
              </div>
              {teamData?.teamStage === 1 ? (
                <div className='mt-10 flex flex-col items-center justify-between'>
                  {isDeadlinePassed ? (
                    <div className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
                      The deadline has been reached
                    </div>
                  ) : (
                    <>
                      {competitionType === 'PTC' ? (
                        <div>
                          <h2 className='flex items-center w-full justify-center mb-4 text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins leading-normal lg:mt-12 mt-6'>
                            Abstract Submission
                          </h2>
                          {isEditing ? (
                            <div className='flex flex-col w-full items-center justify-center'>
                              <p className='font-bold md:text-xl text-lg'>
                                Abstract Link:
                              </p>
                              <Link
                                target='_blank'
                                href={file.fileUrl}
                                className='text-lg hover:underline hover:text-blue-400'
                              >
                                {file.fileUrl}
                              </Link>
                              {/* <Button
                          onClick={() => setIsEditing(false)}
                          type='button'
                          color='white-2'
                          className='mt-6'
                        >
                          Edit File
                        </Button> */}
                            </div>
                          ) : (
                            <div className='flex flex-col w-full items-center justify-center'>
                              <div className='flex flex-row gap-4'>
                                <div className='flex flex-col gap-2 items-center justify-center'>
                                  <h2 className='font-bold'>Abstract</h2>
                                  <SingleFileInput
                                    message='Upload your file'
                                    allowedFileTypes={['.pdf']}
                                    file={file}
                                    setFile={(newFile) =>
                                      setFile({
                                        fileName: newFile?.fileName as string,
                                        fileUrl: newFile?.fileUrl as string,
                                      })
                                    }
                                  />
                                </div>
                                <div className='flex flex-col gap-2 items-center justify-center'>
                                  <h2 className='font-bold'>
                                    declaration of authenticity
                                  </h2>
                                  <SingleFileInput
                                    message='Upload your file'
                                    allowedFileTypes={['.pdf']}
                                    file={declarationFile}
                                    setFile={(newFile) =>
                                      setDeclarationFile({
                                        fileName: newFile?.fileName as string,
                                        fileUrl: newFile?.fileUrl as string,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className='flex flex-row gap-4'>
                                {hasSubmitted && (
                                  <Button
                                    onClick={() => setIsEditing(true)}
                                    type='button'
                                    color='trans-red'
                                    className='mt-6'
                                  >
                                    cancel
                                  </Button>
                                )}
                                <Button
                                  onClick={
                                    hasSubmitted
                                      ? handleFileUpdate1
                                      : handleFileSubmit1
                                  }
                                  type='button'
                                  color='white-2'
                                  className='mt-6'
                                >
                                  {hasSubmitted ? 'Update File' : 'Submit File'}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {isEditing ? (
                            <>
                              <p className='text-lg'>
                                GitHub URL:{' '}
                                <Link
                                  target='_blank'
                                  href={githubUrl}
                                  className='text-lg hover:underline hover:text-blue-400'
                                >
                                  {githubUrl}
                                </Link>
                              </p>
                              <p className='text-lg'>
                                YouTube URL:{' '}
                                <Link
                                  target='_blank'
                                  href={youtubeUrl}
                                  className='text-lg hover:underline hover:text-blue-400'
                                >
                                  {youtubeUrl}
                                </Link>
                              </p>
                              <Button
                                onClick={() => setIsEditing(false)}
                                type='button'
                                color='white-2'
                                className='mt-6'
                              >
                                Edit Links
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className='flex gap-2 flex-col w-full items-center justify-center'>
                                <p className='text-lg md:text-xl'>
                                  Github URL:
                                </p>
                                <TextInput
                                  placeholder='GitHub URL'
                                  type='text'
                                  name='githubUrl'
                                  text={githubUrl}
                                  color='trans'
                                  onChange={(e) => setGithubUrl(e.target.value)}
                                  fullwidth
                                />
                                <p className='text-lg md:text-xl'>
                                  Youtube URL:
                                </p>
                                <TextInput
                                  placeholder='YouTube URL'
                                  type='text'
                                  name='youtubeUrl'
                                  text={youtubeUrl}
                                  color='trans'
                                  onChange={(e) =>
                                    setYoutubeUrl(e.target.value)
                                  }
                                  fullwidth
                                />
                              </div>
                              <div className='flex flex-row gap-4'>
                                {hasSubmitted && (
                                  <Button
                                    onClick={() => setIsEditing(true)}
                                    type='button'
                                    color='trans-red'
                                    className='mt-6'
                                  >
                                    cancel
                                  </Button>
                                )}
                                <Button
                                  onClick={
                                    hasSubmitted
                                      ? handleFileUpdate1
                                      : handleFileSubmit1
                                  }
                                  type='button'
                                  color='white-2'
                                  className='mt-6'
                                >
                                  {hasSubmitted ? 'Update File' : 'Submit File'}
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : teamData?.teamStage == 1.5 ? (
                //STAGE 1.5
                <div>
                  <>
                    {competitionType === 'PTC' && (
                      <div>
                        <h2 className='flex items-center w-full justify-center mb-4 text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins leading-normal lg:mt-12 mt-6'>
                          Payment proof Submission
                        </h2>
                        {isEditingPayment ? (
                          <div className='flex flex-col w-full items-center justify-center'>
                            <p className='font-bold md:text-xl text-lg'>
                              Payment Proof Link:
                            </p>
                            <Link
                              target='_blank'
                              href={paymentProofFile.fileUrl}
                              className='text-lg hover:underline hover:text-blue-400'
                            >
                              {paymentProofFile.fileUrl}
                            </Link>
                          </div>
                        ) : (
                          <div className='flex flex-col w-full items-center justify-center'>
                            <div className='flex flex-row gap-4'>
                              <div className='flex flex-col gap-2 items-center justify-center'>
                                <h2 className='font-bold'>
                                  Total: Rp 285.000,00
                                </h2>
                                <p className='flex items-center text-center'>
                                  EIFELLYN CHEVARA
                                  <br />
                                  Bank Mandiri
                                  <br />
                                  1710013587376
                                </p>
                                <SingleFileInput
                                  message='Upload your file'
                                  allowedFileTypes={[
                                    '.pdf',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                  ]}
                                  file={paymentProofFile}
                                  setFile={(newFile) =>
                                    setPaymentProofFile({
                                      fileName: newFile?.fileName as string,
                                      fileUrl: newFile?.fileUrl as string,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                              <Button
                                onClick={handleFileSubmit12}
                                type='button'
                                color='white-2'
                                className='mt-6'
                              >
                                {'Submit File'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                </div>
              ) : (
                //STAGE 2
                <div>
                  { isStage2DeadlinePassed ? (
                    <div className='text-3xl mt-24 lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal'>
                      The deadline has been reached
                    </div>
                  ) : (
                  isEditingStage2 ? (
                    <div className='mt-12 flex flex-col w-full items-center justify-center'>
                      <p className='font-bold md:text-xl text-lg'>
                        Pitching video URL:
                      </p>
                        <Link
                          target='_blank'
                          href={pitchingVideoUrl}
                          className='text-lg hover:underline hover:text-blue-400'
                        >
                          {pitchingVideoUrl}
                        </Link>
                      
                      <p className='font-bold md:text-xl text-lg'>
                        Paper File URL:
                      </p>
                      <Link
                        target='_blank'
                        href={paperFile.fileUrl}
                        className='text-lg hover:underline hover:text-blue-400'
                      >
                        {paperFile.fileUrl}
                      </Link>
                    </div>
                  ) : (
                    <div className='flex flex-col w-full items-center justify-center'>
                      <div className='flex flex-row gap-4'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <div className='flex items-center flex-col gap-4'>
                            <div className='mt-6'>
                              <p className='text-lg md:text-xl'>
                                Pitching Video URL:
                              </p>
                              <TextInput
                                placeholder='Idea Pitching Video URL'
                                type='text'
                                name='pitchingVideoUrl'
                                text={pitchingVideoUrl}
                                color='trans'
                                onChange={(e) =>
                                  setPitchingVideoUrl(e.target.value)
                                }
                                fullwidth
                              />
                            </div>
                            <SingleFileInput
                              message='Upload your file'
                              allowedFileTypes={['.pdf']}
                              file={paperFile}
                              setFile={(newFile) =>
                                setPaperFile({
                                  fileName: newFile?.fileName as string,
                                  fileUrl: newFile?.fileUrl as string,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <Button
                          onClick={handleFileSubmit2}
                          type='button'
                          color='white-2'
                          className='mt-6'
                        >
                          {'Submit File'}
                        </Button>
                      </div>
                    </div>
                  )
                )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
            Verification is on progress
          </div>
        )}
      </div>
    </main>
  );
};

export default DASHBOARD;
