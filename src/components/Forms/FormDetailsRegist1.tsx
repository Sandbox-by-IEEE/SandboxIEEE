import React, { useState } from 'react';

import Button from '@/components/Button';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import FormInputField from '@/components/Forms/FormInputField';
import {
  InputData,
  IsWarnedInputData,
} from '@/components/Forms/inputData-type';
import TextInput from '@/components/TextInput';

const FormDetails = ({
  inputData,
  setInputData,
  handleChange,
  handleSubmitFormIdentity,
  fillMemberIndex,
  setFillMemberIndex,
  isWarnedInputData,
  setIsWarnedInputData,
  inputDataHistoryKey,
  submissionText,
  isDisabledNext,
}: {
  inputData: InputData;
  setInputData: React.Dispatch<React.SetStateAction<InputData>>;
  handleChange: (e: any) => void;
  handleSubmitFormIdentity: (e: React.FormEvent<HTMLFormElement>) => void;
  fillMemberIndex: number;
  setFillMemberIndex: React.Dispatch<React.SetStateAction<number>>;
  isWarnedInputData: IsWarnedInputData;
  setIsWarnedInputData: React.Dispatch<React.SetStateAction<IsWarnedInputData>>;
  submissionText: string;
  inputDataHistoryKey: string;
  isDisabledNext?: boolean;
}) => {
  type PropType =
    | 'teamName'
    | 'memberCount'
    | 'paymentMethod'
    | 'name'
    | 'email'
    | 'institution'
    | 'phoneNumber'
    | 'age'
    | 'twibbonProof'
    | 'twibbonProofName'
    | 'studentProof'
    | 'studentProofName';

  //...
  const [isPaymentPage, setIsPaymentPage] = useState<boolean>(false);

  const unWarn = (isMember: boolean, memberIndex: number, prop: PropType) => {
    setIsWarnedInputData((isWarnedInputData) => {
      const newIsWarnedInputData = { ...isWarnedInputData };
      if (isMember) {
        if (newIsWarnedInputData.members[memberIndex]) {
          newIsWarnedInputData.members[memberIndex][prop] = false;
        }
      } else {
        newIsWarnedInputData[prop] = false;
      }

      return newIsWarnedInputData;
    });
  };

  // Form data
  const formFields: Array<{
    label: string;
    name: PropType;
    subLabel: string;
    type: 'email' | 'text' | 'number';
  }> = [
    {
      label: 'Name',
      name: 'name',
      subLabel: 'Please enter your full name',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      subLabel: 'Please enter your active email address',
      type: 'email',
    },
    {
      label: 'WhatsApp Number',
      name: 'phoneNumber',
      subLabel: "Please add ' before your number! (e.g. '08111839019)",
      type: 'text',
    },
    {
      label: 'Age',
      name: 'age',
      subLabel: 'Please enter the valid age based on the student card',
      type: 'number',
    },
    {
      label: 'Institution',
      name: 'institution',
      subLabel:
        'Please write your high school or university name in its Indonesian version (e.g. Institut Teknologi Bandung)',
      type: 'text',
    },
  ];
  // File data
  const fileInputs: Array<{ type: PropType; message: string }> = [
    {
      type: 'studentProof',
      message: 'Student Card Proof',
    },
    {
      type: 'twibbonProof',
      message: 'Twibbon Proof',
    },
  ];

  return (
    <form
      onSubmit={handleSubmitFormIdentity}
      className='my-10 w-full relative z-1 h-full'
    >
      <div
        style={{
          background:
            'linear-gradient(to top right, #00000000, #464646b2 69%, #666666)',
        }}
        className={`absolute w-full left-0 right-0 h-full m-0 z-0 lg:rounded-[104px] rounded-[54px]`}
      />
      <div className='absolute z-0 w-full h-full p-1'>
        <div
          style={{
            backgroundImage: "url('/RegistrationPageForm.svg')",
            backgroundOrigin: 'content-box',
          }}
          className='bg-center bg-cover w-full h-full z-0 lg:rounded-[100px] rounded-[50px]'
        />
      </div>
      <div className='relative z-1 px-[100px]'>
        <h3 className='py-10 text-center font-poppins text-[50px] font-bold'>
          {isPaymentPage ? 'Payment' : 'Identity'}
        </h3>
        <div className='relative z-1 w-full h-[100px] flex flex-col'>
          <p
            style={{
              textShadow: '0px 0px 20px #ffffff9e,0px 0px 20px #ffffff9e',
            }}
            className='absolute z-1 left-[20%] text-[25px] font-poppins top-0 transform -translate-x-1/2'
          >
            Identity
          </p>
          <p
            style={
              isPaymentPage
                ? {
                    textShadow: '0px 0px 20px #ffffff9e,0px 0px 20px #ffffff9e',
                  }
                : {}
            }
            className={`${
              isPaymentPage ? 'text-white' : 'text-[#ffffff3e]'
            } text-[25px] absolute z-1 right-[20%] font-poppins top-0 transform translate-x-1/2`}
          >
            Payment
          </p>
          <div
            className={`w-[60%] bg-gradient-to-tr from-white to-[#575757] ${
              isPaymentPage && 'to-white'
            } h-[2px] rounded-[100px] absolute left-[20%] top-16 flex items-center justify-between`}
          >
            <div className='w-3 h-3 bg-white rounded-[100px] transalte -translate-x-1/2' />
            <div
              className={`w-3 h-3 bg-[#575757] ${
                isPaymentPage && 'bg-white'
              } rounded-[100px] translate-x-1/2`}
            />
          </div>
        </div>
        {!isPaymentPage && (
          <>
            <div className='relative z-1 flex flex-col z-0'>
              <label className='font-poppins relative z-1 text-lg lg:text-xl py-2'>
                Team Name
              </label>
              <TextInput
                placeholder={''}
                type='text'
                name='teamName'
                text={inputData.teamName}
                color='trans'
                onChange={handleChange}
                onFocus={() => unWarn(false, -1, 'teamName')}
                isWarned={isWarnedInputData.teamName}
                required
                fullwidth
              />
            </div>

            <div className='relative z-1 flex flex-col'>
              <label className='font-poppins relative z-1 text-lg lg:text-xl py-2'>
                Member Count
              </label>
              <label className='font-poppins relative z-1 font-thin text-sm pb-1'>
                Enter the number of members (chairman included)
              </label>
              <TextInput
                placeholder={''}
                type='number'
                name='memberCount'
                text={`${inputData.memberCount}`}
                color='trans'
                onChange={handleChange}
                onFocus={() => unWarn(false, -1, 'memberCount')}
                isWarned={isWarnedInputData.memberCount}
                required
                fullwidth
              />
            </div>
          </>
        )}

        {isPaymentPage && (
          <>
            <div className='relative z-1 w-full my-10'>
              <div className='bg-gradient-to-br to-[#ffffff00] via-[#ffffff4b] from-[#295D5A] absolute w-full left-0 right-0 h-full m-0 rounded-[24px] z-0' />
              <div className='relative z-1 w-full h-fit p-1'>
                <div
                  style={{
                    background:
                      'linear-gradient(to bottom right, #134D49 20%, #0C3041 35%, #071D3C 74%)',
                  }}
                  className='drop-shadow-[10px] relative z-1 w-full rounded-[20px] flex flex-col text-center'
                >
                  <p
                    style={{
                      textShadow:
                        '0px 0px 20px #ffffff9e, 0px 0px 20px #ffffff9e',
                    }}
                    className='text-[55px] relative z-1 font-poppins font-bold pt-10'
                  >
                    Fee
                  </p>
                  <div className='relative z-1 flex items-center justify-between p-10'>
                    <div className='relative flex flex-col z-1'>
                      <p className='font-poppins text-[25px] font-bold'>
                        IDR 100K
                      </p>
                      <p className='font-poppins text-[15px]'>per member</p>
                    </div>
                    <div className='relative flex flex-col z-1'>
                      <p className='font-poppins text-[25px] font-bold'>
                        IDR 100K
                      </p>
                      <p className='font-poppins text-[15px]'>per member</p>
                    </div>
                    <div className='relative flex flex-col z-1'>
                      <p className='font-poppins text-[25px] font-bold'>
                        IDR 100K
                      </p>
                      <p className='font-poppins text-[15px]'>per member</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative flex flex-col md:flex-row justify-between items-center py-10 gap-10'>
              <div className='w-full relative z-1'>
                <div
                  style={{
                    background:
                      'linear-gradient(to top right, #00000000 0%, #D6D1D1ac 69%, #AB814E 100%)',
                  }}
                  className='absolute w-full scale-x-[1.015] scale-y-[1.03] left-0 right-0 h-full m-0 rounded-[20px] z-0'
                />
                <div className='relative z-1 flex items-center p-10 bg-[#040b15] rounded-[20px]'>
                  <div className='w-full text-center relative flex flex-col z-1'>
                    <p className='font-poppins text-[25px] font-bold'>BCA</p>
                    <p className='font-poppins text-[15px]'>1234567890</p>
                  </div>
                </div>
              </div>
              <div className='w-full relative z-1'>
                <div
                  style={{
                    background:
                      'linear-gradient(to top right, #00000000 0%, #D6D1D1ac 69%, #AB814E 100%)',
                  }}
                  className='absolute w-full scale-x-[1.015] scale-y-[1.03] left-0 right-0 h-full m-0 rounded-[20px] z-0'
                />
                <div className='relative z-1 flex items-center p-10 bg-[#040b15] rounded-[20px]'>
                  <div className='w-full text-center relative flex flex-col z-1'>
                    <p className='font-poppins text-[25px] font-bold'>GoPay</p>
                    <p className='font-poppins text-[15px]'>1234567890</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative z-1 w-full pb-10 lg:pb-20 px-0 md:px-20'>
              <p className='relative z-1 text-base font-poppins py-4 text-center'>
                Only single file upload. Please merge your files first before
                uploading
              </p>
              <SingleFileInput
                message={'Payment Proof'}
                file={{
                  fileName: inputData.paymentProofUrl?.[0]?.fileName || '',
                  fileUrl: inputData.paymentProofUrl?.[0]?.fileUrl || '',
                }}
                setFile={(newFile) => {
                  setInputData((inputData) => {
                    const newInputData = { ...inputData };
                    if (
                      newInputData.paymentProofUrl &&
                      newInputData.paymentProofUrl.length > 0
                    ) {
                      newInputData.paymentProofUrl[0].fileUrl =
                        newFile?.fileUrl as string;
                      newInputData.paymentProofUrl[0].fileName =
                        newFile?.fileName as string;
                    } else {
                      newInputData.paymentProofUrl = [
                        {
                          fileUrl: newFile?.fileUrl as string,
                          fileName: newFile?.fileName as string,
                        },
                      ];
                    }

                    localStorage.setItem(
                      inputDataHistoryKey,
                      JSON.stringify(newInputData),
                    );

                    return newInputData;
                  });
                }}
              />
            </div>
          </>
        )}

        {inputData.memberCount > 0 && !isPaymentPage && (
          <>
            <div className='relative z-1 w-full flex justify-center pt-10'>
              <p className='relative z-1 text-2xl lg:text-3xl font-bold'>
                {fillMemberIndex == 0
                  ? "Chairman's Data"
                  : 'Member ' + fillMemberIndex + "'s Data"}
              </p>
            </div>
            <p className='font-poppins relative z-1 font-bold pt-4 text-xl lg:text-2xl'>
              Data Count Tab
            </p>
            <div className='relative z-1 flex gap-2 flex-wrap pb-4'>
              {inputData.members.map((_, i) => (
                <div
                  className='relative z-1 w-fit max-w-fit overflow-hidden flex-grow-0'
                  key={i}
                >
                  <Button
                    type='button'
                    color={i == fillMemberIndex ? 'trans-white' : 'dark-grey'}
                    isFullWidth
                    onClick={() => setFillMemberIndex(i)}
                  >
                    {i + 1}
                  </Button>
                </div>
              ))}
            </div>
            <section
              key={fillMemberIndex}
              className='relative z-1 w-full space-y-8'
            >
              {formFields.map((field, index) => (
                <FormInputField
                  key={index}
                  label={field.label}
                  subLabel={field.subLabel}
                  type={field.type}
                  name={`members[${fillMemberIndex}].${field.name}`}
                  value={`${inputData.members[fillMemberIndex]?.[field.name]}`}
                  onChange={handleChange}
                  onFocus={() => unWarn(true, fillMemberIndex, field.name)}
                  isWarned={
                    isWarnedInputData.members[fillMemberIndex]?.[field.name]
                  }
                />
              ))}

              <div className='relative z-1 w-full pb-10 lg:pb-20'>
                <p className='relative z-1 text-base font-poppins py-4 text-center'>
                  Only single file upload. Please merge your files first before
                  uploading
                </p>
                <div className='relative z-1 flex flex-col md:flex-row w-full justify-between gap-2'>
                  {fileInputs.map((fileInput, index) => (
                    <div
                      key={index}
                      className='relative z-1 w-full md:w-[49%]'
                      onClick={() => {
                        unWarn(true, fillMemberIndex, fileInput.type);
                      }}
                    >
                      <p
                        className='relative z-1 text-2xl lg:text-3xl py-4 text-center'
                        style={
                          isWarnedInputData.members[fillMemberIndex]?.[
                            fileInput.type
                          ]
                            ? { color: 'rgba(255, 0, 0, 0.9)' }
                            : {}
                        }
                      >
                        {fileInput.message} {fillMemberIndex + 1}
                      </p>
                      <SingleFileInput
                        key={fileInput.type + fillMemberIndex}
                        message={fileInput.message}
                        file={{
                          fileName:
                            inputData.members[fillMemberIndex]?.[
                              fileInput.type + 'Name'
                            ],
                          fileUrl:
                            inputData.members[fillMemberIndex]?.[
                              fileInput.type
                            ],
                        }}
                        setFile={(newFile) => {
                          setInputData((inputData) => {
                            const newInputData = { ...inputData };
                            newInputData.members[fillMemberIndex][
                              fileInput.type
                            ] = newFile?.fileUrl as string;
                            newInputData.members[fillMemberIndex][
                              fileInput.type + 'Name'
                            ] = newFile?.fileName as string;

                            localStorage.setItem(
                              inputDataHistoryKey,
                              JSON.stringify(newInputData),
                            );

                            return newInputData;
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <div className='relative z-1 w-full flex justify-center py-6 gap-2'>
          {(fillMemberIndex + 1 > 1 || isPaymentPage) && (
            <div className='relative z-1 w-fit max-w-fit'>
              <Button
                type='button'
                color='trans-black'
                isFullWidth
                onClick={() => {
                  isPaymentPage
                    ? setFillMemberIndex(fillMemberIndex)
                    : setFillMemberIndex(fillMemberIndex - 1),
                    setIsPaymentPage(false);
                }}
              >
                <span className='relative z-1 w-fit min-w-fit max-w-fit whitespace-nowrap font-poppins'>
                  {isPaymentPage
                    ? `Back (Data Member ${fillMemberIndex + 1})`
                    : `Back (Data Member ${fillMemberIndex})`}
                </span>
              </Button>
            </div>
          )}
          {fillMemberIndex + 1 < inputData.members.length ? (
            <div className='relative z-1 w-fit max-w-fit'>
              <Button
                type='button'
                color='white-2'
                isFullWidth
                onClick={() => {
                  setFillMemberIndex(fillMemberIndex + 1);
                }}
                disabled={isDisabledNext}
              >
                <span className='relative z-1 w-fit min-w-fit max-w-fit whitespace-nowrap font-poppins'>
                  Next (Data {'Member ' + (fillMemberIndex + 2)})
                </span>
              </Button>
            </div>
          ) : (
            !isPaymentPage && (
              <>
                <Button
                  color='white-2'
                  onClick={() => {
                    setIsPaymentPage(true);
                    window.scrollTo({ top: 100, behavior: 'smooth' }); // Scrolls to the top smoothly
                  }}
                  disabled={isDisabledNext}
                >
                  Payment
                </Button>
              </>
            )
          )}
          {isPaymentPage && (
            <Button color='white-2' type='submit' disabled={isDisabledNext}>
              {submissionText}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormDetails;
