import React, { SetStateAction, useState } from 'react';

import Eye from '@/components/icons/Register/eye';
import Eyeslash from '@/components/icons/Register/eyeslash';
import SearchIcon from '@/components/icons/SearchIcon';
export interface TypeInput {
  type:
    | 'text'
    | 'password'
    | 'search'
    | 'email'
    | 'textarea'
    | 'number'
    | 'tel';
}
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
  isWarned = false,
  onFocus,
  minValue,
  required = false,
}: {
  placeholder?: string;
  type: TypeInput['type'];
  name?: string;
  disabled?: boolean;
  text: string;
  color: 'trans-white' | 'white';
  fullwidth?: boolean;
  onChange?: (e) => void | null;
  setText?: React.Dispatch<SetStateAction<string>>;
  isWarned?: boolean;
  onFocus?: () => void;
  minValue?: number;
  required?: boolean;
}) => {
  const colorEffect = {
    'trans-white': {
      icon: 'fill-white',
      main: 'bg-transparent border-[2px] text-white',
      disabled: 'bg-transparent disabled:bg-transparent text-black',
    },
    white: {
      icon: 'fill-white',
      main: 'bg-white text-black placeholder:text-neutral-600 shadow-custom-input outline-none text-white',
      disabled: 'bg-transparent disabled:bg-white text-black',
    },
  };
  const [visible, setVisible] = useState(false);
  return type !== 'textarea' ? (
    <div
      className={`flex gap-3 py-1.5 px-4 lg:px-6 lg:py-2 ${
        fullwidth ? 'w-full' : 'w-[250px] lg:w-[350px]'
      } ${
        colorEffect[color].main
      } justify-between items-center rounded-md duration-150 ease-in`}
      style={isWarned ? { border: '4px rgba(255, 0, 0, 0.9) solid' } : {}}
    >
      {type === 'search' && (
        <SearchIcon className={`${colorEffect[color].icon}`} size={20} />
      )}
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (type === 'number') {
            const value = parseInt(e.target.value);
            if (value < 0) {
              ('');
            } else {
              setText ? setText(e.target.value) : onChange && onChange(e);
            }
          } else {
            setText ? setText(e.target.value) : onChange && onChange(e);
          }
        }}
        onFocus={onFocus}
        min={minValue}
        disabled={disabled}
        name={name}
        type={type === 'password' ? (visible ? 'text' : 'password') : type}
        pattern={(() => {
          switch (type) {
            case 'email':
              return '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
            case 'tel':
              return "[\\'\\+\\d']*"; // Matches phone numbers, possibly starting with a +, and allows apostrophes
            case 'text':
              return '.*';
            case 'password':
              return '.*';
            case 'search':
              return '.*';
            case 'number':
              return '\\d*'; // Matches any sequence of digits
            default:
              return '';
          }
        })()}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} outline-none disabled:cursor-not-allowed font-medium text-sm w-full lg:text-base`}
        required={required}
      />
      {type === 'password' && (
        <button
          type='button'
          aria-label='Toggle password visibility'
          className='cursor-pointer hover:scale-[1.1] transition-all'
          onClick={() => setVisible(!visible)}
        >
          {!visible ? <Eye /> : <Eyeslash />}
        </button>
      )}
    </div>
  ) : (
    <div
      className={`flex gap-3 py-1.5 px-4 lg:px-6 lg:py-2 ${
        fullwidth ? 'w-full' : 'w-[250px] lg:w-[350px]'
      } ${
        colorEffect[color].main
      } justify-between items-center rounded-md duration-75 ease-in delay-150`}
      style={isWarned ? { border: '2px red solid' } : {}}
    >
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText ? setText(e.target.value) : onChange && onChange(e);
        }}
        name={name}
        disabled={disabled}
        value={disabled ? '' : text}
        placeholder={placeholder}
        className={` ${colorEffect[color].disabled} custom-scrollbar outline-none disabled:cursor-not-allowed font-medium text-sm w-full lg:text-base`}
        required={required}
      />
    </div>
  );
};

export default TextInput;
