import Image from 'next/image';
import React from 'react';

const IEEEITBStudentBranchIcon = ({
  className = 'w-84 h-36',
}: {
  className?: string;
}) => {
  return (
    <div className={className}>
      <Image
        src='/IEEE-ITB-Student-Branch.png'
        className='w-full h-full object-contain'
        width={417}
        height={255}
        alt='IEEE ITB Student Branch'
      />
    </div>
  );
};

export default IEEEITBStudentBranchIcon;
