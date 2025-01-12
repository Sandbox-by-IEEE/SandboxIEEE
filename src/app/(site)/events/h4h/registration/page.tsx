'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { type FileInputType } from '@/components/FileInput/fileInput-type';
import FormDetails from '@/components/Forms/FormDetailsRegist1';
import {
  type InputData,
  type IsWarnedInputData,
  type MemberInfo,
} from '@/components/Forms/inputData-type';
import { callLoading, callToast } from '@/components/Toast';

export default function H4HRegist() {
  const inputDataHistoryKey = 'h4h-regist-history';
  const createMember = () => ({
    name: '',
    email: '',
    institution: '',
    phoneNumber: '',
    age: 0,
    studentProof: '',
    studentProofName: '',
  });
  const members = Array(2)
    .fill(null)
    .map(() => createMember());

  const router = useRouter();
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState<InputData>({
    teamName: '',
    memberCount: 2,
    members,
    paymentMethod: '',
    paymentProofUrl: [],
    refferalCode: '',
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
          studentProof: false,
          studentProofName: false,
        },
      ],
      paymentMethod: false,
      paymentProofUrl: [],
      refferalCode: false,
    },
  );
  const [validRefferalCode, setValidRefferalCode] = useState<boolean>(false);
  const [filesForm2, setFilesForm2] = useState<FileInputType[] | undefined>();
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
          institution: '',
          phoneNumber: '',
          age: 0,
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
      setFillMemberIndex(0);
      if (newInputData.memberCount) {
        if (newInputData.memberCount <= 1 || newInputData.memberCount > 5) {
          newInputData.memberCount = inputData.memberCount;
          callToast({
            status: 'error',
            description: 'Member count must be 2 to 5',
          });
        }
      }

      if (
        !newInputData.memberCount ||
        newInputData.memberCount <= 1 ||
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
              institution: '',
              phoneNumber: '',
              age: 0,
              studentProof: '',
              studentProofName: '',
            });
          }
        }

        const newIsWarnedInputData = { ...isWarnedInputData };
        while (newInputData.memberCount > newIsWarnedInputData.members.length) {
          newIsWarnedInputData.members.push({
            name: false,
            email: false,
            institution: false,
            phoneNumber: false,
            age: false,
            studentProof: false,
            studentProofName: false,
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
      | 'age'
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
          | 'age'
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
      checkAndWarn(el.age <= 0, 'age');
      checkAndWarn(!el.institution, 'institution');
      // checkAndWarn(!el.twibbonProof, 'twibbonProof');
      checkAndWarn(!el.studentProof, 'studentProof');
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

    if (inputData.refferalCode !== '' && !validRefferalCode) {
      callToast({
        status: 'error',
        description: 'Invalid referral code. Please enter a valid code.',
      });
      return;
    }

    if (
      (inputData.paymentProofUrl?.length ?? 0) === 0 ||
      (inputData.paymentProofUrl ?? []).every(
        (file) =>
          (Object.keys(file).length === 0 && file.constructor === Object) ||
          !file.fileName ||
          !file.fileUrl,
      )
    ) {
      callToast({
        status: 'error',
        description: 'Please upload your payment proof',
      });
      return;
    }

    const loadingToastId = callLoading(
      'Processing your H4H form registration...',
    ); // Tampilkan toast loading

    try {
      const dataTicket = {
        competitionType: 'H4H',
        teamName: inputData.teamName,
        chairmanName: inputData.members[0].name,
        chairmanEmail: inputData.members[0].email,
        members: inputData.members.map((member) => {
          return {
            name: member.name,
            email: member.email,
            phoneNumber: member.phoneNumber,
            institution: member.institution,
            age: member.age.toString(),
            studentProof: member.studentProof,
            // twibbonProof: member.twibbonProof,
          };
        }),
        refferalCode: inputData.refferalCode,
        paymentProofUrl: inputData.paymentProofUrl,
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
        router.push('/events/h4h');
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
    if (status === 'loading') return;
    if (!session?.user) {
      callToast({
        status: 'error',
        description: 'Unauthorized, please login first',
      });
      router.push('/login');
    } else {
      if (
        (session.user.ticket?.H4H.buy &&
          session.user.ticket.H4H.verified === 'pending') ||
        (session.user.ticket?.PTC.buy &&
          session.user.ticket.PTC.verified === 'pending')
      ) {
        callToast({
          status: 'error',
          description: 'You have purchased this ticket, Waiting for validation',
        });
        router.push('/');
      } else if (
        session.user.ticket?.H4H.buy &&
        session.user.ticket.H4H.verified === 'verified'
      ) {
        callToast({
          status: 'error',
          description:
            'You have purchased this ticket, Your ticket has been validated',
        });
        router.push('/');
      } else if (
        session.user.ticket?.H4H.buy &&
        session.user.ticket.H4H.verified === 'rejected'
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
    const validateRefferalCode = async (code: string) => {
      if (code.length > 0) {
        try {
          const response = await fetch(`/api/refferal-code?code=${code}`);
          const data = await response.json();

          if (response.ok && data.status === 200) {
            setValidRefferalCode(true);
          } else {
            setValidRefferalCode(false);
          }
        } catch (error) {
          setValidRefferalCode(false);
        }
      } else {
        setValidRefferalCode(false);
      }
    };

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
          Array.isArray(historyInputData.paymentProofUrl) &&
          'refferalCode' in historyInputData
        ) {
          if (historyInputData.paymentProofUrl)
            setFilesForm2(historyInputData.paymentProofUrl);

          if (!historyInputData.memberCount) {
            historyInputData.memberCount = 2;
          }
          if (!historyInputData.members.length) {
            historyInputData.members = [
              {
                name: '',
                email: '',
                institution: '',
                phoneNumber: '',
                age: 0,
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
            refferalCode,
          } = historyInputData;

          setInputData({
            teamName,
            memberCount,
            members,
            paymentMethod,
            paymentProofUrl,
            refferalCode,
          });

          // Validate the referral code
          if (refferalCode) {
            validateRefferalCode(refferalCode);
          }

          const newIsWarnedInputData = { ...isWarnedInputData };
          while (
            historyInputData.memberCount > newIsWarnedInputData.members.length
          ) {
            newIsWarnedInputData.members.push({
              name: false,
              email: false,
              institution: false,
              phoneNumber: false,
              age: false,
              studentProof: false,
              studentProofName: false,
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
              paymentMethod,
              paymentProofUrl,
              refferalCode,
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
    <main className='px-4 sm:px-10 md:px-15 lg:px-20 text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip w-full'>
      <div className='h-fit w-full max-w-[1200px] py-10 pt-16 lg:pt-24 font-poppins'>
        <h1 className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
          H4H Registration
        </h1>
        <h1 className='text-3xl lg:text-5xl font-bold text-[#ffffff] font-poppins text-center leading-normal lg:mt-4 mt-2'>
          Complete your details below
        </h1>
        <FormDetails
          competitionType='H4H'
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
        />
      </div>
    </main>
  );
}

// const Title = ({ text }) => (
//   <div className='relative text-3xl lg:text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal'>
//     <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
//       {text}
//     </div>
//     <h2 className='z-10'>{text}</h2>
//   </div>
// );
