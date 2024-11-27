import React, { HTMLAttributes } from 'react';

interface GradientBoxProps {
  className?: string;
  children: React.ReactNode;
  aos?: string;
  duration?: number;
  style?: HTMLAttributes<HTMLDivElement>['style'];
  type?: string;
  inverted?: boolean;
}

const GradientBox = ({
  children,
  type = 'default',
  className,
  aos,
  duration,
  style,
  inverted = false,
}: GradientBoxProps) => {
  return (
    <div
      className={`relative mx-auto mt-auto flex flex-col justify-center text-white ${
        type === 'blue'
          ? 'rounded-[50px]'
          : type === 'timeline'
          ? 'rounded-[48px]'
          : 'rounded-[64px] lg:rounded-[128px]'
      } ${className}`}
      data-aos={aos || (type === 'blue' ? 'fade-up' : 'flip-down')}
      data-aos-duration={duration || 1500}
      style={{
        position: 'relative',
        padding: '16px',
        zIndex: 1,
        background:
          type === 'blue'
            ? 'linear-gradient(135.76deg, rgba(19, 77, 73, 0.46) 28.8%, rgba(12, 48, 65, 0.46) 38.61%, rgba(7, 29, 60, 0.46) 84.37%)'
            : '#040B15',
        ...style,
      }}
    >
      <div
        className={` ${
          type === 'blue'
            ? 'rounded-[50px] p-[1px] lg:p-[4px]'
            : type === 'timeline'
            ? 'rounded-[48px] p-[1px] lg:p-[5px]'
            : 'rounded-[64px] lg:rounded-[128px] p-[2px] lg:p-[5px]'
        }`}
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            type === 'blue'
              ? inverted
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.25) 50%, rgba(19, 77, 73, 1) 90%)'
                : 'linear-gradient(135deg, rgba(19, 77, 73, 1) 10%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 90%)'
              : 'linear-gradient(45deg, transparent, #D6D1D1, #AB814E)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default GradientBox;
