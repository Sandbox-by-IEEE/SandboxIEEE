import React from 'react';

import Button from '@/components/Button';
import { FileInputType } from '@/components/FileInput/fileInput-type';
import SingleFileInput from '@/components/FileInput/SingleFileInput';
import { inputData } from '@/components/Forms/inputData-type';
import TextInput from '@/components/TextInput';

const FormDetails = ({
  inputData,
  setInputData,
  handleChange,
  handleSubmitFormIdentity,
  fillMemberIndex,
  setFillMemberIndex,
}: {
  inputData: inputData;
  setInputData: React.Dispatch<React.SetStateAction<inputData>>;
  handleChange: (e: any) => void;
  handleSubmitFormIdentity: (e: React.FormEvent<HTMLFormElement>) => void;
  fillMemberIndex: number;
  setFillMemberIndex: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <form onSubmit={handleSubmitFormIdentity} className=' space-y-2 py-6 w-full'>
    <div className='flex flex-col'>
      <label className='text-xl py-2'>Team Name</label>
      <TextInput
        placeholder={''}
        type='text'
        name='teamName'
        text={inputData.teamName}
        color='white'
        onChange={handleChange}
        fullwidth
        required
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
        minValue={1}
        onChange={handleChange}
        fullwidth
        required
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
            <label className='font-thin text-sm pb-1 text-slate-200'>
              Please enter your full name
            </label>
            <TextInput
              placeholder={''}
              type='text'
              name={`members[${fillMemberIndex}].name`}
              text={inputData.members[fillMemberIndex]?.name}
              color='white'
              onChange={handleChange}
              fullwidth
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-xl py-2'>Email</label>
            <label className='font-thin text-sm pb-1 text-slate-200'>
              Please enter your active email address
            </label>
            <TextInput
              placeholder={''}
              type='email'
              name={`members[${fillMemberIndex}].email`}
              text={inputData.members[fillMemberIndex]?.email}
              color='white'
              onChange={handleChange}
              fullwidth
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-xl py-2'>WhatsApp Number</label>
            <label className='font-thin text-sm pb-1 text-slate-200'>
              Please add &apos; before your number! (e.g. &apos;08111839019)
            </label>
            <TextInput
              placeholder={''}
              type='text'
              name={`members[${fillMemberIndex}].phoneNumber`}
              text={inputData.members[fillMemberIndex]?.phoneNumber}
              color='white'
              onChange={handleChange}
              fullwidth
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-xl py-2'>Age</label>
            <label className='font-thin text-sm pb-1 text-slate-200'>
              Please enter the valid age based on the student card
            </label>
            <TextInput
              placeholder={''}
              type='number'
              name={`members[${fillMemberIndex}].age`}
              text={`${inputData.members[fillMemberIndex]?.age}`}
              color='white'
              onChange={handleChange}
              fullwidth
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-xl py-2'>Institution</label>
            <label className='font-thin text-sm pb-1 text-slate-200'>
              Please write your high school or university name in its Indonesian
              version (e.g. Institut Teknologi Bandung)
            </label>
            <TextInput
              placeholder={''}
              type='text'
              name={`members[${fillMemberIndex}].institution`}
              text={inputData.members[fillMemberIndex]?.institution}
              color='white'
              onChange={handleChange}
              fullwidth
              required
            />
          </div>
          <div className='w-full pb-20'>
            <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
              <div className='w-full md:w-[49%]'>
                <p className='text-3xl py-4 text-center'>
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
                  setFile={(newFile: FileInputType) => {
                    setInputData((inputData) => {
                      const newInputData = { ...inputData };
                      newInputData.members[fillMemberIndex].studentProof =
                        newFile?.fileUrl as string;
                      newInputData.members[fillMemberIndex].studentProofName =
                        newFile?.fileName as string;

                      localStorage.setItem(
                        'inputData',
                        JSON.stringify(newInputData),
                      );

                      return newInputData;
                    });
                  }}
                />
              </div>
              <div className='w-full md:w-[49%]'>
                <p className='text-3xl py-4 text-center'>
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
                        'inputData',
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
          >
            <span className='w-fit min-w-fit max-w-fit whitespace-nowrap'>
              Next (Fill {'Member ' + (fillMemberIndex + 2)} data)
            </span>
          </Button>
        </div>
      ) : (
        <Button color='gold' type='submit'>
          Proceed to Payment
        </Button>
      )}
    </div>
  </form>
);

export default FormDetails;
