import React from 'react';

import Button from '@/components/Button';
import FormInputField from '@/components/Forms/FormInputField';
import {
  InputData,
  IsWarnedInputData,
} from '@/components/Forms/inputData-type2';
import TextInput from '@/components/TextInput';

const FormDetails2 = ({
  inputData,
  handleChange,
  handleSubmitFormIdentity,
  fillMemberIndex,
  setFillMemberIndex,
  isWarnedInputData,
  setIsWarnedInputData,
  isDisabledNext,
}: {
  inputData: InputData;
  handleChange: (e: any) => void;
  handleSubmitFormIdentity: (e: React.FormEvent<HTMLFormElement>) => void;
  fillMemberIndex: number;
  setFillMemberIndex: React.Dispatch<React.SetStateAction<number>>;
  isWarnedInputData: IsWarnedInputData;
  setIsWarnedInputData: React.Dispatch<React.SetStateAction<IsWarnedInputData>>;
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
    | 'lineId';

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
      subLabel:
        'Please enter the participant’s email that is integrated with the Sandbox account',
      type: 'email',
    },
    {
      label: 'WhatsApp Number',
      name: 'phoneNumber',
      subLabel: "Please add ' before your number! (e.g. '08111839019)",
      type: 'text',
    },
    {
      label: 'Line ID',
      name: 'lineId',
      subLabel: 'Please enter your line id (optional)',
      type: 'text',
    },
  ];

  return (
    <form
      onSubmit={handleSubmitFormIdentity}
      className=' space-y-2 py-6 w-full'
    >
      <div className='flex flex-col'>
        <label className='text-lg lg:text-xl py-2'>Number of Person</label>
        <label className='font-thin text-sm pb-1'>
          Enter the number of person
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
                ? "Person 1's Data"
                : 'Person ' + (fillMemberIndex + 1) + "'s Data"}
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
                Back (Data {'Person ' + fillMemberIndex})
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
                Next (Data {'Person ' + (fillMemberIndex + 2)})
              </span>
            </Button>
          </div>
        ) : (
          <div className='w-fit max-w-fit hidden'>
            <Button
              type='button'
              color='gold'
              isFullWidth
              onClick={() => setFillMemberIndex(fillMemberIndex + 1)}
              disabled={isDisabledNext}
            >
              <span className='w-fit min-w-fit max-w-fit whitespace-nowrap'>
                Next (Data {'Person ' + (fillMemberIndex + 2)})
              </span>
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormDetails2;
