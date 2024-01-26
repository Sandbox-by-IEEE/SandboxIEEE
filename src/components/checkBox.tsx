import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode; // Add children prop for custom label text
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, children }) => {
  return (
    <label className='text-white inline-flex items-center'>
      <input
        type='checkbox'
        className='appearance-none h-[17px] w-[17px] cursor-pointer border-2 border-solid border-white flex justify-center content-center outline-none
        after:content-[""] after:w-full after:h-full after:hidden after:bg-[url("/checked1.svg")] after:bg-no-repeat after:bg-center
        hover:border-2 hover:border-solid hover:border-[#ab814e]
        checked:border-0 checked:border-solid
        checked:after:block'
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className='ml-2'>{children}</span>
    </label>
  );
};

interface CheckboxOption {
  label: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange: (options: CheckboxOption[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newOptions = [...options];
    newOptions[index].checked = checked;
    onChange(newOptions);
  };

  return (
    <div className='flex flex-col gap-1.5 lg:gap-2 font-poppins'>
      {options.map((option, index) => (
        <Checkbox
          key={index}
          checked={option.checked}
          onChange={(checked) => handleCheckboxChange(index, checked)}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default CheckboxGroup;
