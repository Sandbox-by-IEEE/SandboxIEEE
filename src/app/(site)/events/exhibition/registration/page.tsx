'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import FormDetails from '@/components/Forms/FormDetailsRegist2';
import {
  type InputData,
  type IsWarnedInputData,
  type MemberInfo,
} from '@/components/Forms/inputData-type2';
import GradientBox from '@/components/GradientBox';
import TextInput from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

export default function PTCRegist() {
  const inputDataHistoryKey = 'exhibition-regist-history';
  // for checkbox
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const router = useRouter();
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState<InputData>({
    memberCount: 1,
    members: [
      {
        name: '',
        email: '',
        phoneNumber: '',
        lineId: '',
      },
    ],
    bankAccName: '',
    registrationType: '',
    paymentProofName: '',
    paymentMethod: '',
    paymentProofUrl: '',
  });
  const [isWarnedInputData, setIsWarnedInputData] = useState<IsWarnedInputData>(
    {
      memberCount: false,
      members: [
        {
          name: false,
          email: false,
          phoneNumber: false,
          lineId: false,
        },
      ],
      bankAccName: false,
      registrationType: false,
      paymentProofName: false,
      paymentMethod: false,
      paymentProofUrl: false,
    },
  );
  const [filesForm2, setFilesForm2] = useState<string>();
  const [step, setStep] = useState<number>(0);
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(false);
  const [fillMemberIndex, setFillMemberIndex] = useState<number>(0);
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
          phoneNumber: '',
          lineId: '',
        };
      }

      newInputData.members[memberIndex][memberField] = value;
    } else {
      // Handle top-level fields
      newInputData[name] = value;
    }

    if (name === 'memberCount') {
      setFillMemberIndex(0);
      if (newInputData.memberCount) {
        if (newInputData.memberCount <= 0 || newInputData.memberCount > 5) {
          newInputData.memberCount = inputData.memberCount;
          callToast({
            status: 'error',
            description: 'Member count must be 1 to 5',
          });
        }
      }

      if (
        !newInputData.memberCount ||
        newInputData.memberCount <= 0 ||
        newInputData.memberCount > 5
      ) {
        setIsDisabledNext(true);
      } else {
        setIsDisabledNext(false);
      }

      if (newInputData.memberCount) {
        const newMembers: MemberInfo[] = [];
        for (let i = 0; i < newInputData.memberCount; i++) {
          if (newInputData.members[i]) {
            newMembers.push(newInputData.members[i]);
          } else {
            newMembers.push({
              name: '',
              email: '',
              phoneNumber: '',
              lineId: '',
            });
          }
        }

        const newIsWarnedInputData = { ...isWarnedInputData };
        while (newInputData.memberCount > newIsWarnedInputData.members.length) {
          newIsWarnedInputData.members.push({
            name: false,
            email: false,
            phoneNumber: false,
            lineId: false,
          });
        }
        while (newInputData.memberCount < newIsWarnedInputData.members.length) {
          newIsWarnedInputData.members.pop();
        }
        if (isWarnedInputData !== newIsWarnedInputData) {
          setIsWarnedInputData(newIsWarnedInputData);
        }

        newInputData.members = newMembers;
      }
    }

    if (newInputData !== inputData) {
      setInputData(newInputData);
      localStorage.setItem(inputDataHistoryKey, JSON.stringify(newInputData));
    }
  };

  const warn = (
    memberIndex: number,
    prop:
      | 'name'
      | 'email'
      | 'institution'
      | 'phoneNumber'
      | 'lineId'
      | 'twibbonProof'
      | 'twibbonProofName'
      | 'studentProof'
      | 'studentProofName',
  ) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      if (newIsWarnedInputData.members[memberIndex]) {
        newIsWarnedInputData.members[memberIndex][prop] = true;
      }

      return newIsWarnedInputData;
    });
  };
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
    setStep(1);
  };

  const handleSubmitFormIdentity = async (e) => {
    e.preventDefault();

    const isEmailValid = (email: string): boolean => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    let isToastTriggered = false;

    inputData.members.forEach((el, i) => {
      let warnedHere = false;
      const checkAndWarn = (
        bool: boolean,
        prop:
          | 'name'
          | 'email'
          | 'institution'
          | 'phoneNumber'
          | 'lineId'
          | 'twibbonProof'
          | 'twibbonProofName'
          | 'studentProof'
          | 'studentProofName',
      ) => {
        if (bool) {
          setFillMemberIndex(i);
          warn(i, prop);
          isToastTriggered = true;
          warnedHere = true;
        }
      };
      checkAndWarn(!el.name, 'name');
      checkAndWarn(!isEmailValid(el.email), 'email');
      checkAndWarn(el.phoneNumber[0] != "'", 'phoneNumber');
      checkAndWarn(!el.lineId, 'lineId');
      if (warnedHere) {
        callToast({
          status: 'error',
          description: `Please fill in the ${
            i + 1
          } member's personal data correctly`,
        });
      }
    });
    if (isToastTriggered) {
      return;
    }

    const loadingToastId = callLoading(
      'Processing your PTC form registration...',
    ); // Tampilkan toast loading

    // Submit data shoot API
    try {
      const dataTicket = {
        competitionType: 'PTC',
        chairmanName: inputData.members[0].name,
        chairmanEmail: inputData.members[0].email,
        members: inputData.members.map((member) => {
          return {
            name: member.name,
            email: member.email,
            phoneNumber: member.phoneNumber,
            lineId: member.lineId,
          };
        }),
      };

      const response = await fetch('/api/ticket/competition', {
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
        router.push('/events/exhibition');
        localStorage.removeItem(inputDataHistoryKey);
      }
    } catch (err) {
      callToast({
        status: 'error',
        description:
          'Something went wrong while submit your data, please try again',
      });
    } finally {
      toast.dismiss(loadingToastId); // Dismiss toast loading ketika proses pengiriman formulir selesai
    }
  };

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!session?.user) {
      //
    } else {
      if (
        session.user.ticket?.PTC.buy &&
        session.user.ticket.PTC.verified === 'pending'
      ) {
        callToast({
          status: 'error',
          description: 'You have purchased this ticket, Waiting for validation',
        });
        router.push('/');
      } else if (
        session.user.ticket?.PTC.buy &&
        session.user.ticket.PTC.verified === 'verified'
      ) {
        callToast({
          status: 'error',
          description:
            'You have purchased this ticket, Your ticket has been validated',
        });
        router.push('/');
      } else if (
        session.user.ticket?.PTC.buy &&
        session.user.ticket.PTC.verified === 'rejected'
      ) {
        callToast({
          status: 'error',
          description: 'You have purchased this ticket, Your ticket rejected',
        });
        router.push('/');
      }
    }
  }, [status, router, session?.user]);

  useEffect(() => {
    if (filesForm2?.length) {
      const newInputData = { ...inputData };
      newInputData.paymentProofUrl = filesForm2;

      setInputData(newInputData);
      localStorage.setItem(inputDataHistoryKey, JSON.stringify(newInputData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesForm2]);

  useEffect(() => {
    const memoryInputData = localStorage.getItem(inputDataHistoryKey);
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
                phoneNumber: '',
                lineId: '',
              },
            ];
          }

          const {
            teamName,
            memberCount,
            members,
            bankAccName,
            registrationType,
            paymentMethod,
            paymentProofName,
            paymentProofUrl,
          } = historyInputData;

          setInputData({
            memberCount,
            members,
            bankAccName,
            registrationType,
            paymentMethod,
            paymentProofName,
            paymentProofUrl,
          });

          const newIsWarnedInputData = { ...isWarnedInputData };
          while (
            historyInputData.memberCount > newIsWarnedInputData.members.length
          ) {
            newIsWarnedInputData.members.push({
              name: false,
              email: false,
              phoneNumber: false,
              lineId: false,
            });
          }
          while (
            historyInputData.memberCount < newIsWarnedInputData.members.length
          ) {
            newIsWarnedInputData.members.pop();
          }
          if (isWarnedInputData !== newIsWarnedInputData) {
            setIsWarnedInputData(newIsWarnedInputData);
          }

          localStorage.setItem(
            inputDataHistoryKey,
            JSON.stringify({
              teamName,
              memberCount,
              members,
              registrationType,
              paymentMethod,
              paymentProofUrl,
            }),
          );
        } else {
          localStorage.removeItem(inputDataHistoryKey);
        }
      } catch (error) {
        localStorage.removeItem(inputDataHistoryKey);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='bg-gradient-to-t px-4 sm:px-10 md:px-20 lg:px-40 from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <div className='h-fit w-full max-w-[1000px] space-y-2 lg:space-y-4 py-10 px-4 pt-16 lg:pt-24 font-poppins'>
        <Title text='Exhibition Early Registration' />
        <Title text='Complete your details below' />
        {step === 0 && (
          <form onSubmit={handleNext} className='space-y-2 py-6 w-full'>
            <FormDetails
              inputData={inputData}
              setInputData={setInputData}
              handleChange={handleChange}
              fillMemberIndex={fillMemberIndex}
              setFillMemberIndex={setFillMemberIndex}
              handleSubmitFormIdentity={handleSubmitFormIdentity}
              isWarnedInputData={isWarnedInputData}
              setIsWarnedInputData={setIsWarnedInputData}
              isDisabledNext={isDisabledNext}
              inputDataHistoryKey={inputDataHistoryKey}
              submissionText='Submit'
            />
            <div className='w-fit max-w-fit mx-auto'>
              <Button type='submit' color='gold' isFullWidth isDisabled={false}>
                <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                  Next
                </span>
              </Button>
            </div>
          </form>
        )}
        {step === 1 && (
          <form onSubmit={handleNext} className='space-y-2 py-6 w-full'>
            <div className='flex flex-col gap-7 flex-wrap justify-center w-full border-y-2 pt-4 pb-14 border-[#bb9567]'>
              <p className='text-2xl font-bold text-left'>
                Choose Your Registration type
              </p>
              <div className='flex gap-8 items-stretch flex-wrap'>
                <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                  <input
                    type='radio'
                    name='registrationType'
                    id='single'
                    className='scale-150'
                    onChange={handleChange}
                    checked={inputData.registrationType === 'Single'}
                    value='Single'
                  />
                  <label htmlFor='Single' className='w-full h-full'>
                    <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                      <p className='border-b-2 py-2 w-full'>1 Person</p>
                      <p className='py-1 sm:py-2 font-bold'>Rp 30.000,00</p>
                    </GradientBox>
                  </label>
                </div>
                <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                  <input
                    type='radio'
                    name='registrationType'
                    id='Collective-3'
                    className='scale-150'
                    checked={inputData.registrationType === 'Collective-3'}
                    onChange={handleChange}
                    value='Collective-3'
                  />
                  <label htmlFor='Collective-3' className='w-full h-full'>
                    <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                      <p className='border-b-2 py-2 w-full'>3 Person</p>
                      <p className='py-1 sm:py-2 font-bold'>Rp 75.000,00</p>
                    </GradientBox>
                  </label>
                </div>
                <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                  <input
                    type='radio'
                    name='registrationType'
                    id='Collective-5'
                    className='scale-150'
                    checked={inputData.registrationType === 'Collective-5'}
                    onChange={handleChange}
                    value='Collective-5'
                  />
                  <label htmlFor='Collective-5' className='w-full h-full'>
                    <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                      <p className='border-b-2 py-2 w-full'>5 Person</p>
                      <p className='py-1 sm:py-2 font-bold'>Rp 100.000,00</p>
                    </GradientBox>
                  </label>
                </div>
              </div>
            </div>
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
            <div>
              <label className='text-white inline-flex items-center'>
                <input
                  type='checkbox'
                  className='appearance-none h-[17px] w-[17px] cursor-pointer border-2 border-solid border-white flex justify-center content-center outline-none
                after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked1.svg")] after:bg-no-repeat after:bg-center
                hover:border-2 hover:border-solid hover:border-[#ab814e]
                checked:border-0 checked:border-solid
                checked:after:block'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  required
                />
                <span className='ml-2'>Setuju dengan Syarat dan Ketentuan</span>
              </label>
            </div>
            <div className='w-fit max-w-fit mx-auto pt-8 flex gap-4'>
              <Button
                type='button'
                color='trans-orange'
                isFullWidth
                isDisabled={false}
                onClick={() => setStep(0)}
              >
                <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                  Back
                </span>
              </Button>
              <Button type='submit' color='gold' isFullWidth isDisabled={false}>
                <span className='w-fit min-w-fit max-w-fit whitespace-nowrap px-20'>
                  Submit
                </span>
              </Button>
            </div>
          </form>
        )}
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
