import Footer from '@/components/footer';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
