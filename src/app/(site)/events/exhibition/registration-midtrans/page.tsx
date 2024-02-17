'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import FormDetails2 from '@/components/Forms/FormDetailsRegist2';
import {
  type InputData,
  type IsWarnedInputData,
  type MemberInfo,
} from '@/components/Forms/inputData-type2';
import GradientBox from '@/components/GradientBox';
import ReceiptRow from '@/components/ReceiptRows';
import { callLoading, callToast } from '@/components/Toast';

export default function ExhibitionRegist() {
  // Set Status
  const [generalStatus, setGeneralStatus] = useState('Deactivate');
  // console.log(generalStatus);

  // Price
  const SpecialPrice = {
    SingleInt: 30000,
    SingleStr: 'Rp 30.000,00',
    Collective3Int: 75000,
    Collective3Str: 'Rp 75.000,00',
    Collective5Int: 100000,
    Collective5Str: 'Rp 100.000,00',
  };
  const NormalPrice = {
    SingleInt: 40000,
    SingleStr: 'Rp 40.000,00',
    Collective3Int: 105000,
    Collective3Str: 'Rp 105.000,00',
  };

  // mengambil data waktu
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const getServerTime = async () => {
    try {
      const response = await axios.get(
        'https://worldtimeapi.org/api/timezone/Etc/UTC',
      );
      setServerTime(new Date(response.data.datetime));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    getServerTime();
  }, []);

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT;
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey!);
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Update data harga

  useEffect(() => {
    // Production Variable
    // const StartEarly = new Date('2024-02-16T17:00:00Z');
    // Development Variable
    const StartEarly = new Date('2024-01-16T17:00:00Z');
    const StartNormal = new Date('2024-03-05T17:00:00Z');
    const StartSpecial = new Date('2024-03-02T17:00:00Z');
    const EndSpecial = new Date('2024-03-03T17:00:00Z');
    const EndRegistration = new Date('2024-03-05T17:00:00Z');

    if (
      serverTime &&
      serverTime >= StartEarly &&
      serverTime <= EndRegistration
    ) {
      if (serverTime < StartNormal) {
        setGeneralStatus('Early');
      } else {
        if (serverTime >= StartSpecial && serverTime <= EndSpecial) {
          setGeneralStatus('Special');
        } else {
          setGeneralStatus('Normal');
        }
      }
    } else {
      setGeneralStatus('Deactivate');
    }

    if (!(generalStatus == 'Deactivate')) {
      setInputData({
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverTime]);

  // Mengambil data pengisian form sebelumnya (unsaved) dari local storage
  const inputDataHistoryKey = 'exhibition-regist-history';

  // State dan handle untuk menyetujui Terms and Condition
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Inisialisasi Router dan data session
  const router = useRouter();
  const { data: session, status } = useSession();

  // Inisialisasi data form pendaftaran
  const [inputData, setInputData] = useState<InputData>({
    memberCount: 0,
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

  // State pengecekan ulang adanya peringatan kolom kosong
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

  // Url single file input
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [filesForm2, setFilesForm2] = useState<string>();

  // State untuk laman pendaftaran, state 0 untuk pengisian data peserta dan state 1 untuk pembayaran
  const [step, setStep] = useState<number>(0);

  // State untuk pengecekan apakah diperbolehkan next
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(false);

  // State untuk pengecekan
  const [fillMemberIndex, setFillMemberIndex] = useState<number>(0);

  // Change Handler for All form (packed)
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
        if (generalStatus == 'Early' || generalStatus == 'Special') {
          if (
            newInputData.memberCount == 1 ||
            newInputData.memberCount == 3 ||
            newInputData.memberCount == 5
          ) {
            // do nothing
          } else {
            newInputData.memberCount = inputData.memberCount;
            callToast({
              status: 'error',
              description: 'Member count must be 1, 3 or 5',
            });
          }
        } else if (generalStatus == 'Normal') {
          if (newInputData.memberCount == 1 || newInputData.memberCount == 3) {
            // do nothing
          } else {
            newInputData.memberCount = inputData.memberCount;
            callToast({
              status: 'error',
              description: 'Member count must be 1 or 3',
            });
          }
        } else {
          if (newInputData.memberCount == 0) {
            // do nothing
          } else {
            newInputData.memberCount = inputData.memberCount;
            callToast({
              status: 'error',
              description: 'Registration is currently closed',
            });
          }
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

  // Undefined warn function
  const warn = (
    memberIndex: number,
    prop: 'name' | 'email' | 'institution' | 'phoneNumber' | 'lineId',
  ) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      if (newIsWarnedInputData.members[memberIndex]) {
        newIsWarnedInputData.members[memberIndex][prop] = true;
      }

      return newIsWarnedInputData;
    });
  };

  // Undefined warn function
  // eslint-disable-next-line unused-imports/no-unused-vars
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

  // Next to payment function handler
  const handleNext = async (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Mengatur harga akhir
  const [totalPrice, setTotalPrice] = useState({
    str: '',
    int: 0,
  });

  const generateId = () => {
    // Membuat variabel result untuk menyimpan string hasil
    let result = '';
    // Membuat variabel characters untuk menyimpan karakter-karakter yang diinginkan
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // Membuat variabel charactersLength untuk menyimpan panjang string characters
    const charactersLength = characters.length;
    // Mengulangi sebanyak length kali
    for (let i = 0; i < 12; i++) {
      // Menambahkan karakter acak dari string characters ke result
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // Mengembalikan result
    return result;
  };

  // Submit handler
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
        prop: 'name' | 'email' | 'phoneNumber' | 'lineId',
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
      // checkAndWarn(!el.lineId, 'lineId');
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
      'Processing your Exhibiton and grand Seminar form registration...',
    ); // Tampilkan toast loading

    // Submit data shoot API

    try {
      // const dataTicket = {
      //   id: generateId(),
      //   salesPeriod: generalStatus,
      //   ticketType:
      //     inputData.memberCount === 1
      //       ? 'Single'
      //       : inputData.memberCount === 3
      //       ? 'Collective-3'
      //       : 'Collective-5',
      //   price: totalPrice.int,
      // };

      // const response = await axios.post(
      //   '/api/ticket/exhibition/midtrans-tokenizer',
      //   dataTicket,
      // );

      const dataTicket = {
        userId: session?.user.id,
        name: session?.user.name,
        price: totalPrice.int,
        email: session?.user.email,
        participants: inputData.members,
        registrationType: generalStatus,
      };
      console.log(dataTicket);

      // const response = await axios.post(
      //   '/api/ticket/exhibition/payment',
      //   dataTicket,
      // );

      // const tokenData = await response.data;

      // (window as any).snap.pay(tokenData.token); // Type assertion to treat window as any

      const res = await fetch('/api/ticket/exhibition/payment', {
        method: 'POST',
        body: JSON.stringify(dataTicket),
      });

      const resData = await res.json();
      console.log(resData);

      if (!res.ok) {
        callToast({
          status: 'error',
          description: resData.message,
        });
      } else {
        const w = window as any;

        w.snap.pay(resData.data.snapToken);
      }
    } catch (error) {
      callToast({
        status: 'error',
        description:
          'Something went wrong while submit your data, please try again',
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  // Login account verification
  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!session?.user) {
      router.push('/login');
    }
  }, [status, router, session?.user]);

  // Update data upload file
  useEffect(() => {
    if (filesForm2?.length) {
      const newInputData = { ...inputData };
      newInputData.paymentProofUrl = filesForm2;

      setInputData(newInputData);
      localStorage.setItem(inputDataHistoryKey, JSON.stringify(newInputData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesForm2]);

  // get data from local storage in initial
  // useEffect(() => {
  //   const memoryInputData = localStorage.getItem(inputDataHistoryKey);
  //   if (memoryInputData) {
  //     try {
  //       const historyInputData: InputData = JSON.parse(memoryInputData);

  //       if (
  //         typeof historyInputData === 'object' &&
  //         'teamName' in historyInputData &&
  //         'memberCount' in historyInputData &&
  //         'members' in historyInputData &&
  //         Array.isArray(historyInputData.members) &&
  //         'paymentMethod' in historyInputData &&
  //         Array.isArray(historyInputData.paymentProofUrl)
  //       ) {
  //         if (historyInputData.paymentProofUrl)
  //           setFilesForm2(historyInputData.paymentProofUrl);

  //         if (!historyInputData.memberCount) {
  //           historyInputData.memberCount = 1;
  //         }
  //         if (!historyInputData.members.length) {
  //           historyInputData.members = [
  //             {
  //               name: '',
  //               email: '',
  //               phoneNumber: '',
  //               lineId: '',
  //             },
  //           ];
  //         }

  //         const {
  //           teamName,
  //           memberCount,
  //           members,
  //           bankAccName,
  //           registrationType,
  //           paymentMethod,
  //           paymentProofName,
  //           paymentProofUrl,
  //         } = historyInputData;

  //         setInputData({
  //           memberCount,
  //           members,
  //           bankAccName,
  //           registrationType,
  //           paymentMethod,
  //           paymentProofName,
  //           paymentProofUrl,
  //         });

  //         const newIsWarnedInputData = { ...isWarnedInputData };
  //         while (
  //           historyInputData.memberCount > newIsWarnedInputData.members.length
  //         ) {
  //           newIsWarnedInputData.members.push({
  //             name: false,
  //             email: false,
  //             phoneNumber: false,
  //             lineId: false,
  //           });
  //         }
  //         while (
  //           historyInputData.memberCount < newIsWarnedInputData.members.length
  //         ) {
  //           newIsWarnedInputData.members.pop();
  //         }
  //         if (isWarnedInputData !== newIsWarnedInputData) {
  //           setIsWarnedInputData(newIsWarnedInputData);
  //         }

  //         localStorage.setItem(
  //           inputDataHistoryKey,
  //           JSON.stringify({
  //             teamName,
  //             memberCount,
  //             members,
  //             registrationType,
  //             paymentMethod,
  //             paymentProofUrl,
  //           }),
  //         );
  //       } else {
  //         localStorage.removeItem(inputDataHistoryKey);
  //       }
  //     } catch (error) {
  //       localStorage.removeItem(inputDataHistoryKey);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (generalStatus) {
      if (generalStatus == 'Early' || generalStatus == 'Special') {
        if (inputData.memberCount == 1) {
          setTotalPrice({
            str: SpecialPrice.SingleStr,
            int: SpecialPrice.SingleInt,
          });
        } else if (inputData.memberCount == 3) {
          setTotalPrice({
            str: SpecialPrice.Collective3Str,
            int: SpecialPrice.Collective3Int,
          });
        } else if (inputData.memberCount == 5) {
          setTotalPrice({
            str: SpecialPrice.Collective5Str,
            int: SpecialPrice.Collective5Int,
          });
        }
      } else if (generalStatus == 'Normal') {
        if (inputData.memberCount == 1) {
          setTotalPrice({
            str: NormalPrice.SingleStr,
            int: NormalPrice.SingleInt,
          });
        } else if (inputData.memberCount == 3) {
          setTotalPrice({
            str: NormalPrice.Collective3Str,
            int: NormalPrice.Collective3Int,
          });
        }
      }
    }
  }, [
    NormalPrice.Collective3Int,
    NormalPrice.Collective3Str,
    NormalPrice.SingleInt,
    NormalPrice.SingleStr,
    SpecialPrice.Collective3Int,
    SpecialPrice.Collective3Str,
    SpecialPrice.Collective5Int,
    SpecialPrice.Collective5Str,
    SpecialPrice.SingleInt,
    SpecialPrice.SingleStr,
    generalStatus,
    inputData,
  ]);

  // Debugging Console

  // console.log(inputData);

  return (
    <main className='bg-gradient-to-t px-4 sm:px-10 md:px-20 lg:px-40 from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <div className='h-fit w-full max-w-[1000px] space-y-2 lg:space-y-4 py-10 px-4 pt-16 lg:pt-24 font-poppins'>
        <Title text='Exhibition and Grand Seminar Registration' />
        <Title text='Complete your details below' isSmall />
        {step === 0 && (
          <form onSubmit={handleNext} className='space-y-2 py-6 w-full'>
            {!(generalStatus === 'Deactivate') ? (
              <div className='flex gap-8 mt-7 items-stretch flex-wrap'>
                <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                  <label htmlFor='Single' className='w-full h-full'>
                    <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                      <p className='border-b-2 py-2 w-full'>1 Person</p>
                      <p className='py-1 sm:py-2 font-bold'>
                        {generalStatus === 'Early' ||
                        generalStatus === 'Special'
                          ? SpecialPrice.SingleStr
                          : NormalPrice.SingleStr}
                      </p>
                    </GradientBox>
                  </label>
                </div>
                <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                  <label htmlFor='Collective-3' className='w-full h-full'>
                    <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                      <p className='border-b-2 py-2 w-full'>3 Person</p>
                      <p className='py-1 sm:py-2 font-bold'>
                        {generalStatus === 'Early' ||
                        generalStatus === 'Special'
                          ? SpecialPrice.Collective3Str
                          : NormalPrice.Collective3Str}
                      </p>
                    </GradientBox>
                  </label>
                </div>
                {generalStatus === 'Early' || generalStatus === 'Special' ? (
                  <div className='flex gap-3 items-start w-[230px] sm:w-[30%]'>
                    <label htmlFor='Collective-5' className='w-full h-full'>
                      <GradientBox className='px-2 sm:px-8 sm:py-1 w-full text-center h-full flex flex-col items-center justify-evenly'>
                        <p className='border-b-2 py-2 w-full'>5 Person</p>
                        <p className='py-1 sm:py-2 font-bold'>Rp 100.000,00</p>
                      </GradientBox>
                    </label>
                  </div>
                ) : null}
              </div>
            ) : null}
            <FormDetails2
              inputData={inputData}
              handleChange={handleChange}
              fillMemberIndex={fillMemberIndex}
              setFillMemberIndex={setFillMemberIndex}
              handleSubmitFormIdentity={handleSubmitFormIdentity}
              isWarnedInputData={isWarnedInputData}
              setIsWarnedInputData={setIsWarnedInputData}
              isDisabledNext={isDisabledNext}
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
          <form
            onSubmit={handleSubmitFormIdentity}
            className='space-y-2 py-6 w-full'
          >
            <div className='flex flex-col gap-7 flex-wrap justify-center w-full border-y-2 pt-4 pb-14 border-[#bb9567]'>
              <p className='text-xl font-bold text-left'>
                Your Purchase Receipt
              </p>
              <ReceiptRow
                memberCount={inputData.memberCount}
                members={inputData.members}
                price={totalPrice.str}
              />
            </div>
            <div className='flex flex-col pb-6'>
              {/* <label
                className='text-xl py-2'
                style={
                  isWarnedInputData.bankAccName
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Total Nominal Purchase
              </label> */}
              <p className='mb-2'>
                Kindly review your order details before proceeding to checkout
              </p>
              {/* <TextInput
                placeholder={''}
                type='text'
                name='bankAccName'
                text={inputData.bankAccName}
                color='white'
                onChange={handleChange}
                onFocus={() => setWarn('bankAccName', false)}
                isWarned={isWarnedInputData.bankAccName}
                fullwidth
              /> */}
            </div>
            {/* <div className='flex flex-col gap-7 flex-wrap justify-center w-full border-y-2 pt-4 pb-14 border-[#bb9567]'>
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
            </div> */}
            {/* <div className='flex justify-between pt-10 items-stretch flex-wrap'>
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
            </div> */}
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
                <span className='ml-2'>
                  I have read and agreed to{' '}
                  <Link
                    href='/events/exhibition/registration-midtrans/terms-of-service'
                    className='tos text-blue-400 font-semibold'
                    target='_blank'
                  >
                    the terms and conditions
                  </Link>
                </span>
              </label>
            </div>
            <div className='w-fit max-w-fit mx-auto pt-8 md:flex inline gap-4'>
              <Button
                type='button'
                color='trans-orange'
                className='mt-5 md:mt-0 mb-5 md:mb-0'
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
                  Payment
                </span>
              </Button>
            </div>
          </form>
        )}
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
