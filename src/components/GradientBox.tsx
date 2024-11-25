import React, { HTMLAttributes } from 'react';

interface GradientBoxProps {
  className?: string;
  children: React.ReactNode;
  aos?: string;
  duration?: number;
  style?: HTMLAttributes<HTMLDivElement>['style'];
  type?: string;
}

const GradientBox = ({
  children,
  type = 'default',
  className,
  aos,
  duration,
  style,
}: GradientBoxProps) => {
  return (
    <div
      className={`relative mx-auto mt-auto flex flex-col items-center justify-center text-white ${className}`}
      data-aos={aos || (type === 'blue' ? 'fade-up' : 'flip-down')}
      data-aos-duration={duration || 1500}
      style={{
        position: 'relative',
        padding: '16px',
        zIndex: 1,
        borderRadius: type === 'blue' ? '64px' : '128px',
        background:
          type === 'blue'
            ? 'linear-gradient(135deg, rgba(19, 77, 73, 0.46) 20%, rgba(12, 48, 65, 0.46) 29%, rgba(7, 29, 60, 0.46) 74%)'
            : '#040B15',
        ...style,
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: type === 'blue' ? '64px' : '128px',
          padding: '4px',
          background:
            type === 'blue'
              ? 'linear-gradient(135deg, rgba(19, 77, 73, 1) 10%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 90%)'
              : 'linear-gradient(45deg, transparent, #D6D1D1, #AB814E)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: -1, // Ensure it's behind the content
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default GradientBox;
