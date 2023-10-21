import Image from 'next/image';

const Smalllogo = ({ size }: { size: number }) => {
  return (
    <Image src={'/goldIEEELogo.png'} alt='logo' width={size} height={size} />
  );
};

export default Smalllogo;
