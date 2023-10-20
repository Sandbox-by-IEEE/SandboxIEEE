const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-clip'>
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default SiteLayout;
