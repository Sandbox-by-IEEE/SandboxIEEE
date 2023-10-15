import Footer from '@/components/footer';
import { ModalContextProvider } from '@/components/Modal/ModalContext';
import Toast from '@/components/Toast';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='overflow-x-hidden'>
      <Toast />
      <ModalContextProvider>
        {children}
        <Footer />
      </ModalContextProvider>
    </main>
  );
};

export default SiteLayout;
