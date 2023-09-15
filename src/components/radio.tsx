import React from 'react';

interface RadioButtonProps {
  value: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  checked,
  disabled,
  onChange,
}) => {
  const handleOptionChange = () => {
    onChange(value);
  };

  return (
    <label
      className={`text-white inline-flex items-center ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <input
        type='radio'
        className='appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio flex items-center justify-center outline-none
        hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
        checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b]'
        value={value}
        checked={checked}
        onChange={handleOptionChange}
        disabled={disabled}
      />
      <span className='ml-2'>{label}</span>
    </label>
  );
};

interface RadioButtonsProps {
  options: RadioButtonProps[];
  selectedValue: string | null;
  onChange: (value: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className='bg-black mt-2 flex flex-col'>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={option.value === selectedValue}
          onChange={onChange}
          disabled={option.disabled || false}
        />
      ))}
    </div>
  );
};

export default RadioButtons;
