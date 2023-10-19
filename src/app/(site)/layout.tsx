import Footer from '@/components/footer';
import NavBar from '@/components/Navbar';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen overflow-x-clip'>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default SiteLayout;
