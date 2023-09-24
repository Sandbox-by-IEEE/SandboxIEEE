const TextInput = ({
  box,
  label,
  placeholder,
}: {
  box: 'usual' | 'big' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  isIcon?: boolean;
  isEmpty?: boolean;
}) => {
  if (box === 'usual') {
    return (
      <div className='flex items-center justify-center'>
        <div className='relative mb-4'>
          <label className='block text-white text-sm mb-2'>{label}</label>
          <input
            className='bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none'
            id='data'
            type='text'
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
};
export default TextInput;
