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
      className={`text-white flex items-center gap-2 justify-center ${
        disabled && 'opacity-50'
      } hover:cursor-pointer disabled:cursor-not-allowed`}
    >
      <input
        type='radio'
        className='appearance-none w-[17px] h-[17px] border-solid border-2 rounded-[12px]	form-radio flex items-center justify-center outline-none
        hover:border-[#dbb88b] after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked.svg")] after:bg-no-repeat after:bg-center
        checked:after:block checked:border-solid checked:rounded-lg checked:border-0 checked:border-[#dbb88b] '
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <p>{label}</p>
    </label>
  );
};

interface RadioButtonsProps {
  options: ChildProps[];
  onChange: (value: string | null) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ options, onChange }) => {
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
          checked={option.value === selectedOption}
          onChange={() => handleChange(option.value)}
          disabled={option.disabled || false}
        />
      ))}
      {selectedOption && (
        <button
          type='button'
          className=' text-xs font-semibold text-center font-poppins text-[#AB814E]'
          onClick={() => {
            setSelectedOption(null);
            onChange(null);
          }}
        >
          Remove option
        </button>
      )}
    </div>
  );
};

export default RadioButtons;
