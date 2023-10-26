import React, { SetStateAction } from 'react';

import SearchIcon from '@/components/icons/SearchIcon';

const TextInput = ({
  placeholder,
  type,
  disabled,
  text,
  name,
  color,
  fullwidth,
  onChange,
  setText,
  minValue,
  required = false,
}: {
  placeholder?: string;
  type: 'text' | 'password' | 'search' | 'email' | 'textarea' | 'number';
  name?: string;
  disabled?: boolean;
  text: string;
  color: 'trans-white' | 'white';
  fullwidth?: boolean;
  onChange?: (e) => void | null;
  setText?: React.Dispatch<SetStateAction<string>>;
  minValue?: number;
  required?: boolean;
}) => {
  const colorEffect = {
    'trans-white': {
      icon: 'fill-white',
      main: 'bg-transparent border-[2px] border-white text-white',
      disabled: 'bg-transparent disabled:bg-transparent',
    },
    white: {
      icon: 'fill-white',
      main: 'bg-white text-black placeholder:text-neutral-600 shadow-custom-input outline-none',
      disabled: 'bg-transparent disabled:bg-white',
    },
  };
  return type !== 'textarea' ? (
    <div
      className={`flex gap-3 py-1.5 px-4 lg:px-6 lg:py-2 ${
        fullwidth ? 'w-full' : 'w-[250px] lg:w-[350px]'
      } ${colorEffect[color].main} justify-between items-center rounded-md`}
    >
      {type === 'search' && (
        <SearchIcon className={`${colorEffect[color].icon}`} size={20} />
      )}
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText
            ? setText(e.target.value)
            : onChange
            ? onChange(e)
            : console.warn('no Action');
        }}
        min={minValue}
        disabled={disabled}
        name={name}
        type={type}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} outline-none disabled:cursor-not-allowed rounded-md font-medium text-sm w-full lg:text-base`}
        required={required}
      />
    </div>
  ) : (
    <div
      className={`flex gap-3 py-1.5 px-4 lg:px-6 lg:py-2 ${
        fullwidth ? 'w-full' : 'w-[250px] lg:w-[350px]'
      } ${colorEffect[color].main} justify-between items-center rounded-md`}
    >
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText
            ? setText(e.target.value)
            : onChange
            ? onChange(e)
            : console.warn('no Action');
        }}
        name={name}
        disabled={disabled}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} custom-scrollbar outline-none disabled:cursor-not-allowed rounded-md font-medium text-sm w-full lg:text-base`}
        required={required}
      />
    </div>
  );
};

export default TextInput;
