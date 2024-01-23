import React from 'react';

import Button from '@/components/Button';
import { FileInputType } from '@/components/FileInput/fileInput-type';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
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
  submissionText,
  inputDataHistoryKey,
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
  const unWarn = (
    isMember: boolean,
    memberIndex: number,
    prop:
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
      | 'studentProofName',
  ) => {
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
  return (
    <form
      onSubmit={handleSubmitFormIdentity}
      className=' space-y-2 py-6 w-full'
    >
      <div className='flex flex-col'>
        <label className='text-xl py-2'>Team Name</label>
        <TextInput
          placeholder={''}
          type='text'
          name='teamName'
          text={inputData.teamName}
          color='white'
          onChange={handleChange}
          onFocus={() => unWarn(false, -1, 'teamName')}
          isWarned={isWarnedInputData.teamName}
          required
          fullwidth
        />
      </div>
      <div className='flex flex-col'>
        <label className='text-xl py-2'>Member Count</label>
        <label className='font-thin text-sm pb-1'>
          Please enter number of members
        </label>
        <TextInput
          placeholder={''}
          type='number'
          name='memberCount'
          text={`${inputData.memberCount}`}
          color='white'
          onChange={handleChange}
          onFocus={() => unWarn(false, -1, 'memberCount')}
          isWarned={isWarnedInputData.memberCount}
          required
          fullwidth
        />
      </div>

      {inputData.memberCount > 0 && (
        <>
          <div className='w-full flex justify-center pt-10'>
            <p className='text-3xl font-bold'>Member&apos;s Data</p>
          </div>
          <p className='font-bold text-2xl'>
            Filling{' '}
            {inputData.members[fillMemberIndex]?.name !== ''
              ? inputData.members[fillMemberIndex]?.name
              : 'Member ' + (fillMemberIndex + 1)}{' '}
            data
          </p>
          <div className='flex gap-2 flex-wrap pb-4'>
            {inputData.members.map((_, i) => (
              <div
                className='w-fit max-w-fit overflow-hidden flex-grow-0'
                key={i}
              >
                <Button
                  type='button'
                  color={i == fillMemberIndex ? 'trans-orange' : 'gold'}
                  isFullWidth
                  onClick={() => setFillMemberIndex(i)}
                >
                  {i + 1}
                </Button>
              </div>
            ))}
          </div>
          <section key={fillMemberIndex} className='w-full space-y-8'>
            <div className='flex flex-col'>
              <label className='text-xl py-2'>Name</label>
              <label
                className='font-thin text-sm pb-1 text-slate-200'
                style={
                  isWarnedInputData.members[fillMemberIndex]?.name
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Please enter your full name
              </label>
              <TextInput
                placeholder={''}
                type='text'
                name={`members[${fillMemberIndex}].name`}
                text={inputData.members[fillMemberIndex]?.name}
                color='white'
                onChange={handleChange}
                onFocus={() => unWarn(true, fillMemberIndex, 'name')}
                isWarned={isWarnedInputData.members[fillMemberIndex]?.name}
                fullwidth
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-xl py-2'>Email</label>
              <label
                className='font-thin text-sm pb-1 text-slate-200'
                style={
                  isWarnedInputData.members[fillMemberIndex]?.email
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Please enter your active email address
              </label>
              <TextInput
                placeholder={''}
                type='email'
                name={`members[${fillMemberIndex}].email`}
                text={inputData.members[fillMemberIndex]?.email}
                onFocus={() => unWarn(true, fillMemberIndex, 'email')}
                isWarned={isWarnedInputData.members[fillMemberIndex]?.email}
                color='white'
                onChange={handleChange}
                fullwidth
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-xl py-2'>WhatsApp Number</label>
              <label
                className='font-thin text-sm pb-1 text-slate-200'
                style={
                  isWarnedInputData.members[fillMemberIndex]?.phoneNumber
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Please add &apos; before your number! (e.g. &apos;08111839019)
              </label>
              <TextInput
                placeholder={''}
                type='text'
                name={`members[${fillMemberIndex}].phoneNumber`}
                text={inputData.members[fillMemberIndex]?.phoneNumber}
                onFocus={() => unWarn(true, fillMemberIndex, 'phoneNumber')}
                isWarned={
                  isWarnedInputData.members[fillMemberIndex]?.phoneNumber
                }
                color='white'
                onChange={handleChange}
                fullwidth
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-xl py-2'>Age</label>
              <label
                className='font-thin text-sm pb-1 text-slate-200'
                style={
                  isWarnedInputData.members[fillMemberIndex]?.age
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Please enter the valid age based on the student card
              </label>
              <TextInput
                placeholder={''}
                type='number'
                name={`members[${fillMemberIndex}].age`}
                text={`${inputData.members[fillMemberIndex]?.age}`}
                onFocus={() => unWarn(true, fillMemberIndex, 'age')}
                isWarned={isWarnedInputData.members[fillMemberIndex]?.age}
                color='white'
                onChange={handleChange}
                fullwidth
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-xl py-2'>Institution</label>
              <label
                className='font-thin text-sm pb-1 text-slate-200'
                style={
                  isWarnedInputData.members[fillMemberIndex]?.institution
                    ? { color: 'rgba(255, 0, 0, 0.9)' }
                    : {}
                }
              >
                Please write your high school or university name in its
                Indonesian version (e.g. Institut Teknologi Bandung)
              </label>
              <TextInput
                placeholder={''}
                type='text'
                name={`members[${fillMemberIndex}].institution`}
                text={inputData.members[fillMemberIndex]?.institution}
                onFocus={() => unWarn(true, fillMemberIndex, 'institution')}
                isWarned={
                  isWarnedInputData.members[fillMemberIndex]?.institution
                }
                color='white'
                onChange={handleChange}
                fullwidth
              />
            </div>
            <div className='w-full pb-20'>
              <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
                <div
                  className='w-full md:w-[49%]'
                  onClick={() => {
                    unWarn(true, fillMemberIndex, 'studentProof');
                  }}
                >
                  <p
                    className='text-3xl py-4 text-center'
                    style={
                      isWarnedInputData.members[fillMemberIndex]?.studentProof
                        ? { color: 'rgba(255, 0, 0, 0.9)' }
                        : {}
                    }
                  >
                    Student Card Proof {fillMemberIndex + 1}
                  </p>
                  <SingleFileInput
                    key={'FormDetailsA' + fillMemberIndex}
                    message='Student Card Proof'
                    file={{
                      fileName:
                        inputData.members[fillMemberIndex]?.studentProofName,
                      fileUrl: inputData.members[fillMemberIndex]?.studentProof,
                    }}
                    setFile={(newFile: FileInputType | undefined) => {
                      setInputData((inputData) => {
                        const newInputData = { ...inputData };
                        newInputData.members[fillMemberIndex].studentProof =
                          newFile?.fileUrl as string;
                        newInputData.members[fillMemberIndex].studentProofName =
                          newFile?.fileName as string;

                        localStorage.setItem(
                          inputDataHistoryKey,
                          JSON.stringify(newInputData),
                        );

                        return newInputData;
                      });
                    }}
                  />
                </div>
                <div
                  className='w-full md:w-[49%]'
                  onClick={() => {
                    unWarn(true, fillMemberIndex, 'twibbonProof');
                  }}
                >
                  <p
                    className='text-3xl py-4 text-center'
                    style={
                      isWarnedInputData.members[fillMemberIndex]?.twibbonProof
                        ? { color: 'rgba(255, 0, 0, 0.9)' }
                        : {}
                    }
                  >
                    Twibbon Proof {fillMemberIndex + 1}
                  </p>
                  <SingleFileInput
                    key={'FormDetailsB' + fillMemberIndex}
                    message='Twibbon Proof'
                    file={{
                      fileName:
                        inputData.members[fillMemberIndex]?.twibbonProofName,
                      fileUrl: inputData.members[fillMemberIndex]?.twibbonProof,
                    }}
                    setFile={(newFiles) => {
                      setInputData((inputData) => {
                        const newInputData = { ...inputData };
                        newInputData.members[fillMemberIndex].twibbonProof =
                          newFiles?.fileUrl as string;
                        newInputData.members[fillMemberIndex].twibbonProofName =
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
            </div>
          </section>
        </>
      )}

      <div className='w-full flex justify-center py-6 gap-2'>
        {fillMemberIndex + 1 > 1 && (
          <div className='w-fit max-w-fit'>
            <Button
              type='button'
              color='green'
              isFullWidth
              onClick={() => setFillMemberIndex(fillMemberIndex - 1)}
            >
              <span className='w-fit min-w-fit max-w-fit whitespace-nowrap'>
                Back (Fill {'Member ' + fillMemberIndex} data)
              </span>
            </Button>
          </div>
        )}
        {fillMemberIndex + 1 < inputData.members.length ? (
          <div className='w-fit max-w-fit'>
            <Button
              type='button'
              color='gold'
              isFullWidth
              onClick={() => setFillMemberIndex(fillMemberIndex + 1)}
              disabled={isDisabledNext}
            >
              <span className='w-fit min-w-fit max-w-fit whitespace-nowrap'>
                Next (Fill {'Member ' + (fillMemberIndex + 2)} data)
              </span>
            </Button>
          </div>
        ) : (
          <Button color='gold' type='submit' disabled={isDisabledNext}>
            {submissionText}
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormDetails;
