const TitleSection = ({ children }: { children: string | JSX.Element }) => {
  return (
    <h3
      style={{
        ['textShadow' as any]: '0px 0px 2px #FFFFFF',
      }}
      data-aos='zoom-in'
      className='bg-gradient-brown text-center text-white drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-poppins p-1 font-bold'
    >
      {children}
    </h3>
  );
};
export default TitleSection;
// font-museo-muderno
