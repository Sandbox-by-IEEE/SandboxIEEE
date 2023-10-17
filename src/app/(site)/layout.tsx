import Footer from '@/components/footer';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      {children}
      <Footer />
    </body>
  );
};

export default SiteLayout;
