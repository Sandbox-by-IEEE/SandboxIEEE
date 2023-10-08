import React, { SetStateAction } from 'react';

import SearchIcon from '@/components/icons/SearchIcon';

const TextInput = ({
  placeholder,
  type,
  disabled,
  text,
  color,
  setText,
  fullwidth,
}: {
  placeholder?: string;
  type: 'text' | 'password' | 'search' | 'email' | 'textarea';
  disabled?: boolean;
  text: string;
  color: 'trans-white' | 'white';
  setText: React.Dispatch<SetStateAction<string>>;
  fullwidth?: boolean;
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
      disabled: 'disabled:bg-white',
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
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        type={type}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} outline-none disabled:cursor-not-allowed rounded-md font-medium text-sm w-full lg:text-base`}
      />
    </div>
  ) : (
    <div
      className={`flex gap-3 py-1.5 px-4 lg:px-6 lg:py-2 ${
        fullwidth ? 'w-full' : 'w-[250px] lg:w-[350px]'
      } ${colorEffect[color].main} justify-between items-center rounded-md`}
    >
      <textarea
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} custom-scrollbar outline-none disabled:cursor-not-allowed rounded-md font-medium text-sm w-full lg:text-base`}
      />
    </div>
  );
};

export default TextInput;
