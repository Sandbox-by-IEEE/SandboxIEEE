import Footer from '@/components/footer';
import { ModalContextProvider } from '@/components/Modal/ModalContext';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <ModalContextProvider>{children}</ModalContextProvider>
      <Footer />
    </body>
  );
};

export default SiteLayout;
