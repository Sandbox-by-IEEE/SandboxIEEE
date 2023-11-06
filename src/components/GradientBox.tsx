import React from 'react';

const GradientBox = ({
  children,
  className,
  aos,
  duration,
}: {
  className?: string;
  children: React.ReactNode;
  aos?: string;
  duration?: number;
}) => {
  return (
    <div
      className={
        'mx-auto rounded-xl border-2 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] shadow-lg shadow-[#d8c09f] border-[#d8c09f]' +
        className
      }
      data-aos={aos}
      data-aos-duration={duration || 700}
    >
      {children}
    </div>
  );
};

export default GradientBox;
