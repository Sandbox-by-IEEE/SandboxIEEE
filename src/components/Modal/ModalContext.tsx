'use client';
import { createContext, ReactNode, useState } from 'react';

export interface ModalContextContextType {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextContextType>({
  openModal: false,
  setOpenModal: () => {},
});

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
