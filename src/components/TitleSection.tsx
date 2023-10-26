const TitleSection = ({ children }: { children: string | JSX.Element }) => {
  return (
    <h2
      style={{
        ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
      }}
      data-aos='zoom-in'
      className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
    >
      {children}
    </h2>
  );
};
export default TitleSection;
