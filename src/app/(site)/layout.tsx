import Footer from '@/components/footer';
import { ModalContextProvider } from '@/components/Modal/ModalContext';
import Toast from '@/components/Toast';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Toast />
      <ModalContextProvider>
        {children}
        <Footer />
      </ModalContextProvider>
    </body>
  );
};

export default SiteLayout;
