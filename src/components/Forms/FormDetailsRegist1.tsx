import React from 'react';

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
      className=' space-y-2 py-6 w-full'
    >
      <div className='flex flex-col'>
        <label className='text-lg lg:text-xl py-2'>Team Name</label>
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
        <label className='text-lg lg:text-xl py-2'>Member Count</label>
        <label className='font-thin text-sm pb-1'>
          Enter the number of members (chairman included)
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
            <p className='text-2xl lg:text-3xl font-bold'>
              {fillMemberIndex == 0
                ? "Chairman's Data"
                : 'Member ' + fillMemberIndex + "'s Data"}
            </p>
          </div>
          <p className='font-bold pt-4 text-xl lg:text-2xl'>Data Count Tab</p>
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

            <div className='w-full pb-10 lg:pb-20'>
              <p className='text-base font-poppins py-4 text-center'>
                Here single file upload. Please merge your files first before
                uploading
              </p>
              <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
                {fileInputs.map((fileInput, index) => (
                  <div
                    key={index}
                    className='w-full md:w-[49%]'
                    onClick={() => {
                      unWarn(true, fillMemberIndex, fileInput.type);
                    }}
                  >
                    <p
                      className='text-2xl lg:text-3xl py-4 text-center'
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
                          inputData.members[fillMemberIndex]?.[fileInput.type],
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

      <div className='w-full flex justify-center lg:py-6 gap-2'>
        {fillMemberIndex + 1 > 1 && (
          <div className='w-fit max-w-fit'>
            <Button
              type='button'
              color='green'
              isFullWidth
              onClick={() => setFillMemberIndex(fillMemberIndex - 1)}
            >
              <span className='w-fit min-w-fit max-w-fit whitespace-nowrap'>
                Back (Data {'Member ' + fillMemberIndex})
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
                Next (Data {'Member ' + (fillMemberIndex + 2)})
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
