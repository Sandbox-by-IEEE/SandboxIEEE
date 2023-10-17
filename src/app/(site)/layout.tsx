import Footer from '@/components/footer';
import { ModalContextProvider } from '@/components/Modal/ModalContext';
import NavBar from '@/components/Navbar';
import Toast from '@/components/Toast';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Toast />
      <NavBar />
      <ModalContextProvider>{children}</ModalContextProvider>
      <Footer />
    </body>
  );
};

export default SiteLayout;
