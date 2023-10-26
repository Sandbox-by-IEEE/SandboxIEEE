'use client';
import React, { useEffect, useState } from 'react';

import { FileInputType } from '@/components/FileInput/fileInput-type';
import FormDetails from '@/components/Forms/FormDetails';
import {
  InputData,
  IsWarnedInputData,
  MemberInfo,
} from '@/components/Forms/inputData-type';
import { callToast } from '@/components/Toast';

export default function Home() {
  const [inputData, setInputData] = useState<InputData>({
    teamName: '',
    memberCount: 1,
    members: [
      {
        name: '',
        email: '',
        institution: '',
        phoneNumber: '',
        age: 0,
        twibbonProof: '',
        twibbonProofName: '',
        studentProof: '',
        studentProofName: '',
      },
    ],
    paymentMethod: '',
    paymentProofUrl: [],
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
          twibbonProof: false,
          twibbonProofName: false,
          studentProof: false,
          studentProofName: false,
        },
      ],
      paymentMethod: false,
      paymentProofUrl: [],
    },
  );
  const [filesForm2, setFilesForm2] = useState<FileInputType[] | undefined>();
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
          twibbonProof: '',
          twibbonProofName: '',
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
        if (newInputData.memberCount <= 0) {
          newInputData.memberCount = inputData.memberCount;
          callToast({
            status: 'error',
            description: 'Member count must be 1 to 5',
          });
        }
        if (newInputData.memberCount > 5) {
          newInputData.memberCount = inputData.memberCount;
          callToast({
            status: 'error',
            description: 'Member count must be 1 to 5',
          });
        }
      }
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
            twibbonProof: '',
            twibbonProofName: '',
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
          twibbonProof: false,
          twibbonProofName: false,
          studentProof: false,
          studentProofName: false,
        });
      }
      while (newInputData.memberCount < newIsWarnedInputData.members.length) {
        newIsWarnedInputData.members.pop();
      }

      newInputData.members = newMembers;
    }

    if (newInputData !== inputData) {
      setInputData(newInputData);
      localStorage.setItem('inputData', JSON.stringify(newInputData));
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
      newIsWarnedInputData.members[memberIndex][prop] = true;

      return newIsWarnedInputData;
    });
  };

  const handleSubmitFormIdentity = (e) => {
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
      checkAndWarn(el.age <= 0, 'age');
      checkAndWarn(!el.institution, 'institution');
      checkAndWarn(!el.twibbonProof, 'twibbonProof');
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

    console.log('POST to cms', inputData);
  };

  useEffect(() => {
    if (filesForm2?.length) {
      const newInputData = { ...inputData };
      newInputData.paymentProofUrl = filesForm2;

      setInputData(newInputData);
      localStorage.setItem('inputData', JSON.stringify(newInputData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesForm2]);

  useEffect(() => {
    const memoryInputData = localStorage.getItem('inputData');
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
                institution: '',
                phoneNumber: '',
                age: 0,
                twibbonProof: '',
                twibbonProofName: '',
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
          } = historyInputData;

          setInputData({
            teamName,
            memberCount,
            members,
            paymentMethod,
            paymentProofUrl,
          });
          localStorage.setItem(
            'inputData',
            JSON.stringify({
              teamName,
              memberCount,
              members,
              paymentMethod,
              paymentProofUrl,
            }),
          );
        } else {
          localStorage.removeItem('inputData');
        }
      } catch (error) {
        localStorage.removeItem('inputData');
      }
    }
  }, []);

  return (
    <main className='bg-gradient-to-t from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <nav className='fixed top-0 left-0 h-20 w-full bg-slate-950 z-[100]'>
        replace with navbar{' '}
      </nav>
      <div className='h-fit w-full max-w-[1000px] py-10 px-4 pt-24 font-poppins'>
        <Title text='Complete your details Below' />
        <FormDetails
          inputData={inputData}
          setInputData={setInputData}
          handleChange={handleChange}
          fillMemberIndex={fillMemberIndex}
          setFillMemberIndex={setFillMemberIndex}
          handleSubmitFormIdentity={handleSubmitFormIdentity}
          isWarnedInputData={isWarnedInputData}
          setIsWarnedInputData={setIsWarnedInputData}
        />
      </div>
    </main>
  );
}

const Title = ({ text }) => (
  <div className='relative text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);
