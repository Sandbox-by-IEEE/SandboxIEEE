import Image from 'next/image';

const Smalllogo = ({ size }: { size: number }) => {
  return (
    <Image src={'/ieeesmalllogo.svg'} alt='logo' width={size} height={size} />
  );
};

export default Smalllogo;
