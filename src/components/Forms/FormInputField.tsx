import TextInput, { TypeInput } from '@/components/TextInput';

type FormInputFieldProps = {
  label: string;
  subLabel: string;
  type: TypeInput['type'];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  isWarned: boolean;
};

const FormInputField: React.FC<FormInputFieldProps> = ({
  label,
  subLabel,
  type,
  name,
  value,
  onChange,
  onFocus,
  isWarned,
}) => (
  <div className='flex flex-col'>
    <label className='text-lg lg:text-xl py-2'>{label}</label>
    {subLabel && <label className='font-thin text-sm pb-1'>{subLabel}</label>}
    <TextInput
      placeholder={''}
      type={type}
      name={name}
      text={value}
      color='white'
      onChange={onChange}
      onFocus={onFocus}
      isWarned={isWarned}
      fullwidth
    />
  </div>
);
export default FormInputField;
