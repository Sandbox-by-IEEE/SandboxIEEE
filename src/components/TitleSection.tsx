import React from 'react';

interface TitleSectionProps {
  children: string | JSX.Element;
  size?: 'sm' | 'md' | 'lg';
  animation?: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  children,
  size = 'md',
  animation = true,
}) => {
  const textSize =
    size === 'sm'
      ? 'text-lg md:text-2xl'
      : size === 'md'
      ? 'text-3xl'
      : 'text-4xl';

  return (
    <h3
      style={{
        ['textShadow' as any]: '0px 0px 2px #FFFFFF',
      }}
      data-aos={animation ? 'zoom-in' : undefined}
      className={`bg-gradient-brown text-center text-white drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text ${textSize} font-poppins p-1 font-bold`}
    >
      {children}
    </h3>
  );
};
export default TitleSection;
// font-museo-muderno
