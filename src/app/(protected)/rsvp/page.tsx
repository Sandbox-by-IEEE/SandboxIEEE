'use client';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import React, {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import Loading from '@/app/loading';
import Button from '@/components/Button';
import FormInputField from '@/components/Forms/FormInputField';
import RadioButtons from '@/components/radio';
import { type TypeInput } from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

enum StepEnum {
  DESCRIPTION = 1,
  FORM = 2,
  CONFIRMATION = 3,
  NULL = -1,
}

interface DataFormTypes {
  institution: string;
  name: string;
  contact: string;
  attendOption: string | null;
}

const enum1Data = {
  description: [
    "In an era marked by escalating environmental concerns and the imperative for sustainable development, the Grand Seminar on Green Tech emerges as a critical forum. This seminar revolves around the pivotal theme of 'Green Tech,' encapsulating a spectrum of pioneering technologies and approaches designed to address pressing ecological challenges.",
    'With all due respect,',
    'We extend a warm invitation for your esteemed presence at this event as a distinguished guest. This event will be conducted in a hybrid method. Attendees have the option to join virtually or participate in person at the offline venue.',
  ],
  eventDetails: [
    { label: 'Date', value: 'Saturday, 9th March 2024' },
    { label: 'Time', value: '08.00 - 17.00 UTC+7' },
    {
      label: 'Offline',
      value: 'Sasana Budaya Ganesha, Bandung, West Java, IDN',
    },
    { label: 'Online', value: 'To Be Announced' },
  ],
  agenda: [
    'Discussion',
    'Q&A session',
    'Interactive games',
    'Problem Solving',
    'Exhibition',
    'Awarding of The Competition',
  ],
  confirmationText:
    'Kindly confirm your attendance by completing the form below before January 1st, 2024.',
};

// Data for Enum2 component
const enum2Data = {
  formFields: [
    {
      label: 'Institution',
      instructions: 'Please include from what institution come from',
      placeholder: 'sfsdf',
      type: 'text',
      name: 'institution',
    },
    { label: 'Name', placeholder: 'fsdf', type: 'text', name: 'name' },
    { label: 'Contact', placeholder: 'sdfsf', type: 'tel', name: 'contact' },
  ],
  attendOptions: [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Not attending', label: 'Not attending' },
  ],
  otherAttendace: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
  submitButtonText: 'Submit',
};

const FormDataContext = createContext<{
  formData: DataFormTypes[];
  setFormData: Dispatch<SetStateAction<DataFormTypes[]>>;
  step: StepEnum;
  setStep: Dispatch<SetStateAction<StepEnum>>;
  idPerson: number;
  setIdPerson: Dispatch<SetStateAction<number>>;
  clientRender?: boolean;
  setClientRender?: Dispatch<SetStateAction<boolean>>;
}>({} as any);

function loadData(type: string, userId?: number) {
  if (typeof window !== 'undefined') {
    let dataString: null | string = null;
    if (userId) {
      dataString = localStorage.getItem(`rsvp-${type}-${userId}`);
    } else {
      dataString = localStorage.getItem(`rsvp-${type}`);
    }
    if (!dataString) return null;
    const data = JSON.parse(dataString);
    return data;
  } else if (type == 'formStep') {
    return StepEnum.NULL;
  } else {
    return null;
  }
}

function saveData(type: string, data: any, userId?: number) {
  if (typeof window !== 'undefined') {
    if (userId) {
      localStorage.setItem(`rsvp-${type}-${userId}`, JSON.stringify(data));
    } else {
      localStorage.setItem(`rsvp-${type}`, JSON.stringify(data));
    }
  }
}

export default function RSVPPage({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  const [clientRender, setClientRender] = useState(false);
  useEffect(() => {
    setClientRender(true);
    if (loadData('tokenGet')) {
      setIsLegal(true);
    }
  }, []);
  const router = useRouter();
  const [isLegal, setIsLegal] = useState<boolean>(
    loadData('tokenGet') || false,
  );

  useEffect(() => {
    if (
      (!token || token !== process.env.NEXT_PUBLIC_RSVP_TOKEN) &&
      isLegal !== true &&
      !loadData('tokenGet')
    ) {
      return notFound();
    } else if (
      token &&
      token === process.env.NEXT_PUBLIC_RSVP_TOKEN &&
      isLegal !== true &&
      !loadData('tokenGet')
    ) {
      setIsLegal(true);
      saveData('tokenGet', true);
      router.push('/rsvp');
    } else {
      router.push('/rsvp');
    }
    router.refresh();
  }, [token, router, isLegal]);

  const [formDataSet, setFormDataSet] = useState<DataFormTypes[]>(
    loadData('formData') || [],
  );
  const [idPerson, setIdPerson] = useState<number>(loadData('idPerson') || 0);
  const [step, setStep] = useState<StepEnum>(
    loadData('formStep') || StepEnum.DESCRIPTION,
  );

  useEffect(() => {
    saveData('formData', formDataSet);
  }, [formDataSet]);

  useEffect(() => {
    saveData('idPerson', idPerson);
  }, [idPerson]);

  useEffect(() => {
    saveData('formStep', step);
  }, [step]);
  if (!clientRender) return <Loading />;

  return (
    <FormDataContext.Provider
      value={{
        formData: formDataSet,
        setFormData: setFormDataSet,
        step,
        setStep,
        idPerson,
        setIdPerson,
        clientRender,
        setClientRender,
      }}
    >
      <main className='overflow-hidden relative z-[50] font-poppins bg-gradient-to-tl px-4 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 from-[#103020] to-[#061906] text-white flex min-h-screen flex-col items-center'>
        <div className='h-fit w-full max-w-[1000px] space-y-2 lg:space-y-4 pb-10 px-4  font-poppins'>
          <Title text='RSVP VIP Guests' />
        </div>

        {step === StepEnum.DESCRIPTION && <Enum1 />}
        {step === StepEnum.FORM && <Enum2 />}
        {step === StepEnum.CONFIRMATION && <Enum3 />}
      </main>
    </FormDataContext.Provider>
  );
}

const Enum1 = () => {
  const { setStep, clientRender } = useContext(FormDataContext);

  return (
    <div className='text-white text-sm lg:text-base font-poppins gap-3 flex flex-col max-lg:p-5 max-w-[800px]'>
      {enum1Data.description.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      <Image
        src='/Group_1235.svg'
        width={200}
        height={200}
        alt='Mascot'
        className='absolute -z-10 top-0 max-lg:-top-20 max-lg:-right-20 right-10 rotate-[20deg] max-lg:scale-[50%]'
      />
      <Image
        src='/Ring.svg'
        width={80}
        height={80}
        alt='Mascot'
        className='absolute max-lg:scale-[50%] -z-10 top-[600px] max-lg:-right-5 right-0 rotate-180'
      />
      <Image
        src='/Explosion.svg'
        width={150}
        height={150}
        alt='Mascot'
        className='absolute -z-10 top-72 left-0 max-lg:-left-10 max-lg:scale-[50%]'
      />
      {clientRender && (
        <table>
          {enum1Data.eventDetails.map((detail, index) => (
            <tr key={index}>
              <th>
                <strong className='mr-3'>{detail.label}</strong>
              </th>
              <td>: {detail.value}</td>
            </tr>
          ))}
        </table>
      )}

      <p>
        <strong>Agenda</strong>
      </p>
      <ul className=''>
        {enum1Data.agenda.map((agenda, index) => (
          <li key={index}>{agenda}</li>
        ))}
      </ul>
      <p>{enum1Data.confirmationText}</p>
      <Button color='gold' className='ml-auto mt-7' onClick={() => setStep(2)}>
        Next
      </Button>
    </div>
  );
};
const Enum2 = memo(() => {
  const { setStep, formData, setFormData, idPerson, setIdPerson } =
    useContext(FormDataContext);
  const [institution, setInstitution] = useState<string>(
    loadData('institution', idPerson) || '',
  );
  const [name, setName] = useState<string>(loadData('name', idPerson) || '');
  const [contact, setContact] = useState<string>(
    loadData('contact', idPerson) || '',
  );
  const [attendOption, setAttendOption] = useState<string | null>(
    loadData('attendOption', idPerson) || null,
  );

  const [otherAttendance, setOtherAttendance] = useState<string | null>(
    loadData('otherAttendance', idPerson) || null,
  );

  const isAddData = otherAttendance === 'yes';
  useEffect(() => {
    saveData('institution', institution, idPerson);
  }, [institution, idPerson]);
  useEffect(() => {
    saveData('name', name, idPerson);
  }, [name, idPerson]);
  useEffect(() => {
    saveData('attendOption', idPerson);
  }, [attendOption, attendOption, idPerson]);
  useEffect(() => {
    saveData('otherAttendance', idPerson);
  }, [otherAttendance, otherAttendance, idPerson]);
  useEffect(() => {
    saveData('contact', contact, idPerson);
  }, [contact, idPerson]);

  useEffect(() => {
    const storedData = localStorage.getItem(`formData#${idPerson}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setInstitution(parsedData.institution);
      setName(parsedData.name);
      setContact(parsedData.contact);
      setAttendOption(parsedData.attendOption);
      setOtherAttendance(parsedData.otherAttendance);
    }
  }, [idPerson]);

  const handleSubmit = useCallback(async () => {
    // Check if institution is not null before passing it
    const newPersonData = {
      institution,
      name,
      contact,
      attendOption,
    };
    const newFormData = [...formData];
    newFormData[idPerson] = newPersonData;

    // Update data in formData at a specific idPerson
    setFormData(newFormData);
    if (isAddData) {
      const newId = idPerson + 1;
      setIdPerson(newId);
      setName(loadData('name', idPerson) || '');
      setContact(loadData('contact', idPerson) || '');
      setAttendOption(loadData('attendOption', idPerson) || null);
      setOtherAttendance(loadData('otherAttendance', idPerson) || null);
      setStep(StepEnum.FORM);
    } else {
      const loadingToastId = callLoading('Processing your RSVP form ...');

      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFormData),
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
          localStorage.removeItem('formData');
        }
      } catch (err) {
        callToast({
          status: 'error',
          description:
            'Something went wrong while submitting your data, please try again',
        });
      } finally {
        toast.dismiss(loadingToastId);
        setStep(StepEnum.CONFIRMATION);
      }
    }
  }, [
    isAddData,
    setFormData,
    setStep,
    attendOption,
    contact,
    institution,
    name,
    idPerson,
    setIdPerson,
    formData,
  ]);

  return (
    <form className='text-white font-poppins gap-3 w-full flex flex-col max-lg:p-5 max-w-[800px]'>
      <label className='text-xl lg:text-2xl py-2 font-bold'>
        Data Person - {idPerson + 1}
      </label>
      <FormInputField
        label={enum2Data.formFields[0].label}
        subLabel={enum2Data.formFields[0].instructions as string}
        type={enum2Data.formFields[0].type as TypeInput['type']}
        name={enum2Data.formFields[0].name}
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        isWarned={institution === ''}
      />
      <FormInputField
        label={enum2Data.formFields[1].label}
        subLabel={enum2Data.formFields[1].instructions as string}
        type={enum2Data.formFields[1].type as TypeInput['type']}
        name={enum2Data.formFields[1].name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        isWarned={name === ''}
      />
      <FormInputField
        label={enum2Data.formFields[2].label}
        subLabel={enum2Data.formFields[2].instructions as string}
        type={enum2Data.formFields[2].type as TypeInput['type']}
        name={enum2Data.formFields[2].name}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        isWarned={contact === ''}
      />
      <>
        <p className='text-lg lg:text-xl pt-2'>
          Would you be willing to attend?
        </p>
        <div className='flex w-fit'>
          <RadioButtons
            options={enum2Data.attendOptions}
            onChange={(value) => setAttendOption(value)}
          />
        </div>
      </>
      <>
        <p className='text-lg lg:text-xl pt-2'>Other expected attendees?</p>
        <div className='flex w-fit'>
          <RadioButtons
            options={enum2Data.otherAttendace}
            onChange={(value) => setOtherAttendance(value)}
          />
        </div>
      </>
      <div className='flex gap-5 mt-4 m-auto'>
        <Button
          color='trans-orange'
          type='button'
          onClick={() =>
            idPerson === 0 ? setStep(1) : setIdPerson(idPerson - 1)
          }
        >
          Back
        </Button>
        <Button color='gold' type='button' onClick={handleSubmit}>
          {isAddData ? 'Next' : 'Submit'}
        </Button>
      </div>
    </form>
  );
});

const Enum3 = () => {
  const { formData } = useContext(FormDataContext);
  const isAttend = formData[0].attendOption !== 'Not attending';

  return (
    <div className='text-white text-sm lg:text-base max-lg:mt-10 font-poppins gap-3 flex flex-col max-lg:p-5 max-w-[700px]'>
      <Image
        src='/Group_1235.svg'
        width={150}
        height={150}
        alt='Mascot'
        className='absolute -z-10 bottom-10 max-lg:bottom-10 max-lg:right-0 lg:left-10 rotate-[-20deg] max-lg:scale-[50%]'
      />
      <Image
        src='/Group_1244.svg'
        width={150}
        height={150}
        alt='Mascot'
        className='absolute max-lg:hidden max-lg:scale-[50%] -z-10 top-[400px] max-lg:-right-5 right-0 '
      />
      <Image
        src='/Explosion.svg'
        width={150}
        height={150}
        alt='Mascot'
        className='absolute -z-10 top-12 left-0 max-lg:-left-10 max-lg:scale-[50%]'
      />
      <p>Thank you for filling out the reservation.</p>
      {isAttend && (
        <p>More detailed information will be sent to the email provided.</p>
      )}
      <p>
        We eagerly await welcoming you to this event. Looking forward to our
        next gathering, The Sandbox By IEEE ITB SB
      </p>
      <Image
        className='m-auto mt-6 w-[100px] aspect-square lg:w-[200px]'
        src='/sandbox-logo.png'
        alt='Logo Sandbox'
        width={200}
        height={200}
      />
    </div>
  );
};
const Title = ({ text }) => (
  <div className='relative text-3xl lg:text-5xl font-extrabold text-[#9a7037] font-museo-muderno text-center leading-normal'>
    <div className='absolute top-0 bg-gradient-to-tr from-[#AB814E] via-[#b28856] to-[#FFFBB9] text-transparent bg-clip-text w-full'>
      {text}
    </div>
    <h2 className='z-10'>{text}</h2>
  </div>
);
