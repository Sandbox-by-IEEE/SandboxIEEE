'use client';
import React, { useCallback, useState } from 'react';

interface RadioButtonProps {
  value: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

interface ChildProps {
  value: string;
  label: string;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <label
      className={`text-white flex gap-2 items-center ${
        disabled && 'opacity-50'
      } hover:cursor-pointer disabled:cursor-not-allowed`}
    >
      <input
        type='radio'
        className='hover:cursor-pointer appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio flex items-center justify-center outline-none
        hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
        checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b] '
        value={value}
        checked={checked}
        onClick={onChange}
        disabled={disabled}
      />
      <p>{label}</p>
    </label>
  );
};

interface RadioButtonsProps {
  options: ChildProps[];
  onChange: (value: string | null) => void;
  outSideCheck?: string | null;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  onChange,
  outSideCheck,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleChange = useCallback(
    (value: string) => {
      if (value === selectedOption) {
        setSelectedOption(null);
      } else {
        setSelectedOption(value);
      }
      onChange(value === selectedOption ? null : value);
    },
    [selectedOption, onChange],
  );

  return (
    <div className='font-poppins flex flex-col gap-2'>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={option.value === outSideCheck}
          onChange={() => handleChange(option.value)}
          disabled={option.disabled || false}
        />
      ))}
    </div>
  );
};

export default RadioButtons;
