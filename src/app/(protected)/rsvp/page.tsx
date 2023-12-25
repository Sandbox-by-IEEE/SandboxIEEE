'use client';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
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
import Google from '@/components/icons/Register/google';
import RadioButtons from '@/components/radio';
import { type TypeInput } from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

enum StepEnum {
  DESCRIPTION = 1,
  FORM = 2,
  CONFIRMATION = 3,
  NULL = -1,
}

// Form data types
interface DataFormTypes {
  institution: string;
  name: string;
  contact: string;
  attendOption: string | null;
}

// Data for step 1 Enum 1
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
    'Kindly confirm your attendance by completing the form below before December 28th, 2023.',
};

// Data for Enum2 component
const enum2Data = {
  formFields: [
    {
      label: 'Institution',
      instructions: 'Please include from what institution come from',
      placeholder: 'Your institution name...',
      type: 'text',
      name: 'institution',
    },

    {
      label: 'Name',
      instructions: 'Please enter your full name',
      placeholder: 'Your full name....',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Contact',
      instructions: "Please add ' before your number! (e.g. '08111839019)",
      placeholder: 'Your Contact Number...',
      type: 'tel',
      name: 'contact',
    },
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

// Pass state each component
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

// Local storage loadData
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

// Save data to local storage
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
  const router = useRouter();
  // Avoid hidration error
  const [clientRender, setClientRender] = useState(false);
  useEffect(() => {
    setClientRender(true);
    // Fetch token
    if (loadData('tokenGet')) {
      setIsLegal(true);
    }
  }, []);

  //Validate Token
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

  // Core communication state between component
  const [idPerson, setIdPerson] = useState<number>(loadData('idPerson') || 0);
  const [step, setStep] = useState<StepEnum>(
    loadData('formStep') || StepEnum.DESCRIPTION,
  );
  const [formDataSet, setFormDataSet] = useState<DataFormTypes[]>(
    loadData('formData') || [],
  );

  // Save data to local storage
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
          <Title text='Sandbox IEEE ITB' />
        </div>

        {step === StepEnum.DESCRIPTION && <Enum1 />}
        {step === StepEnum.FORM && <Enum2 />}
        {step === StepEnum.CONFIRMATION && <Enum3 />}
      </main>
    </FormDataContext.Provider>
  );
}

// Step display enum1 for description and login
const Enum1 = () => {
  const { data: session } = useSession();
  const { setStep, clientRender } = useContext(FormDataContext);

  // Sign in handling
  const router = useRouter();
  const handleGoogle = async (e: any) => {
    e.preventDefault();
    await signIn('google', {
      callbackUrl: '/rsvp',
    });
    router.push('/rsvp');
  };

  return (
    <div className='text-white text-sm lg:text-base font-poppins gap-3 flex flex-col max-lg:p-5 max-w-[800px]'>
      {/* Description paragraph */}
      {enum1Data.description.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      {/* Decoration */}
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

      {/* Details event */}
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
      {/* Agenda */}
      <p>
        <strong>Agenda</strong>
      </p>
      <ul>
        {enum1Data.agenda.map((agenda, index) => (
          <li key={index}>{agenda}</li>
        ))}
      </ul>
      <p>{enum1Data.confirmationText}</p>

      {/* button Sign in */}
      <div className='w-full max-w-[300px]'>
        <Button color='white' isFullWidth type='button' onClick={handleGoogle}>
          <span className='text-black flex gap-3 w-full items-center justify-center font-poppins font-semibold'>
            <Google size={25} />
            Continue with Google
          </span>
        </Button>
      </div>
      {!session && (
        <p className='text-[#e2ad6d]'>
          Please login first before fill the form
        </p>
      )}
      {/* Next button  */}
      <Button
        color='gold'
        className='ml-auto mt-7'
        onClick={() => setStep(2)}
        disabled={!session}
      >
        Next
      </Button>
    </div>
  );
};

// Step display enum2 for form
const Enum2 = memo(() => {
  // Core communication state between component
  const { setStep, formData, setFormData, idPerson, setIdPerson } =
    useContext(FormDataContext);

  // State management separately for input text
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

  // Antisipation for blank input state
  const [isWarned, setIsWarned] = useState<{
    institution: boolean;
    name: boolean;
    contact: boolean;
    attendOption: boolean;
    otherAttendance: boolean;
  }>({
    institution: false,
    name: false,
    contact: false,
    attendOption: false,
    otherAttendance: false,
  });

  // Save data to local storage
  useEffect(() => {
    saveData('institution', institution, idPerson);
  }, [institution, idPerson]);
  useEffect(() => {
    saveData('name', name, idPerson);
  }, [name, idPerson]);
  useEffect(() => {
    saveData('attendOption', attendOption, idPerson);
  }, [attendOption, idPerson]);
  useEffect(() => {
    saveData('otherAttendance', otherAttendance, idPerson);
  }, [otherAttendance, idPerson]);
  useEffect(() => {
    saveData('contact', contact, idPerson);
  }, [contact, idPerson]);

  // Save data state into form localstorage each form submit
  const isAddData = otherAttendance === 'yes';
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

  // Button back handling
  const handleBack = useCallback(() => {
    if (idPerson === 0) {
      // back to enum1
      setStep(1);
    } else {
      // back to previous data
      const newId = idPerson - 1;
      setIdPerson(newId);
      setInstitution(loadData('institution', newId) || '');
      setName(loadData('name', newId) || '');
      setContact(loadData('contact', newId) || '');
      setAttendOption(loadData('attendOption', newId) || null);
      setOtherAttendance(loadData('otherAttendance', newId) || null);
      setStep(StepEnum.FORM);
    }
  }, [idPerson, setIdPerson, setStep]);

  // Button delete handling
  const handleDelete = useCallback(() => {
    const newFormData = [...formData];
    // Update form data in localstorage
    const deleteFd = newFormData.filter((_, index) => index !== idPerson);
    setFormData(deleteFd);
    // Remove state localstorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`formData#${idPerson}`);
      localStorage.removeItem(`rsvp-institution-${idPerson}`);
      localStorage.removeItem(`rsvp-name-${idPerson}`);
      localStorage.removeItem(`rsvp-contact-${idPerson}`);
      localStorage.removeItem(`rsvp-attendOption-${idPerson}`);
      localStorage.removeItem(`rsvp-otherAttendance-${idPerson}`);
    }
    handleBack();
  }, [formData, handleBack, idPerson, setFormData]);

  const handleSubmit = useCallback(async () => {
    if (
      (idPerson == 0 && !institution) ||
      !name ||
      !attendOption ||
      !otherAttendance ||
      !contact ||
      !contact.startsWith("'")
    ) {
      setIsWarned({
        institution: !institution,
        name: !name,
        contact: !contact || !contact.startsWith("'"),
        attendOption: !attendOption,
        otherAttendance: !otherAttendance,
      });
      return;
    }
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
    if (isAddData || idPerson + 1 < formData.length) {
      const newId = idPerson + 1;
      const newInstitution = loadData('institution', newId) || '';
      const newName = loadData('name', newId) || '';
      const newContact = loadData('contact', newId) || '';
      const newAttendOption = loadData('attendOption', newId) || null;
      const newOtherAttendance = loadData('otherAttendance', newId) || null;

      setIdPerson(newId);
      setInstitution(newInstitution);
      setName(newName);
      setContact(newContact);
      setAttendOption(newAttendOption);
      setOtherAttendance(newOtherAttendance);
      setIsWarned({
        institution: false,
        name: false,
        contact: false,
        attendOption: false,
        otherAttendance: false,
      });
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
            description:
              'Something went wrong while submitting your data, please try again or contact to our Contact Person',
          });
        } else {
          callToast({
            status: 'success',
            description: bodyResponse.message,
          });
          if (typeof window !== 'undefined') {
            localStorage.removeItem('formData');
          }
          setStep(StepEnum.CONFIRMATION);
        }
      } catch (err) {
        callToast({
          status: 'error',
          description:
            'Something went wrong while submitting your data, please try again or contact to our Contact Person',
        });
      } finally {
        toast.dismiss(loadingToastId);
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
    otherAttendance,
  ]);

  return (
    <form className='text-white font-poppins gap-3 w-full flex flex-col max-lg:p-5 max-w-[800px]'>
      {(formData.length > 1 || isAddData || idPerson > 0) && (
        <p className='text-xl lg:text-2xl py-2 font-bold'>
          Data Person - {idPerson + 1}
        </p>
      )}
      {/* Form input */}
      {idPerson == 0 && (
        <FormInputField
          label={enum2Data.formFields[0].label}
          subLabel={enum2Data.formFields[0].instructions as string}
          type={enum2Data.formFields[0].type as TypeInput['type']}
          name={enum2Data.formFields[0].name}
          value={institution}
          onChange={(e) => {
            setInstitution(e.target.value);
            e.target.value !== '' &&
              setIsWarned({ ...isWarned, institution: false });
          }}
          isWarned={isWarned.institution && isWarned.institution}
        />
      )}
      <FormInputField
        label={enum2Data.formFields[1].label}
        subLabel={enum2Data.formFields[1].instructions as string}
        type={enum2Data.formFields[1].type as TypeInput['type']}
        name={enum2Data.formFields[1].name}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          e.target.value !== '' && setIsWarned({ ...isWarned, name: false });
        }}
        isWarned={isWarned.name}
      />
      <FormInputField
        label={enum2Data.formFields[2].label}
        subLabel={enum2Data.formFields[2].instructions as string}
        type={enum2Data.formFields[2].type as TypeInput['type']}
        name={enum2Data.formFields[2].name}
        value={contact}
        onChange={(e) => {
          setContact(e.target.value);
          e.target.value !== '' &&
            e.target.value.startsWith("'") &&
            setIsWarned({ ...isWarned, contact: false });
        }}
        isWarned={isWarned.contact}
      />
      {/* Radio button */}
      <>
        <p className='text-lg lg:text-xl pt-2'>
          Would you be willing to attend?
        </p>
        {isWarned.attendOption && (
          <p className='text-sm text-red-500'>Choose one to fill this data</p>
        )}
        <div className='flex w-fit'>
          <RadioButtons
            options={enum2Data.attendOptions}
            outSideCheck={attendOption}
            onChange={(value) => {
              setAttendOption(value);
            }}
          />
        </div>
      </>
      <>
        <p className='text-lg lg:text-xl pt-2'>
          {idPerson == 0 ? 'Other' : 'Still other'} expected attendees?
        </p>
        {isWarned.otherAttendance && (
          <p className='text-sm text-red-500'>Choose one to fill this data</p>
        )}
        <div className='flex w-fit'>
          <RadioButtons
            outSideCheck={otherAttendance}
            options={enum2Data.otherAttendace}
            onChange={(value) => setOtherAttendance(value)}
          />
        </div>
      </>
      {/* Button end */}
      {idPerson != 0 && (
        <button
          className='flex-1 text-red-500'
          type='button'
          onClick={handleDelete}
        >
          Delete this data person
        </button>
      )}
      <div className='flex gap-5 mt-4 m-auto items-center w-full justify-center'>
        <Button color='trans-orange' type='button' onClick={handleBack}>
          Back
        </Button>

        <Button color='gold' type='button' onClick={handleSubmit}>
          {isAddData || idPerson + 1 < formData.length ? 'Next' : 'Submit'}
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
