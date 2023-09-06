'use client';
import { createContext, ReactNode, useState } from 'react';

export interface ManagedUIContextType {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ManagedUI = createContext<ManagedUIContextType>({
  openModal: false,
  setOpenModal: () => {},
});

export function ManagedUIProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <ManagedUI.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ManagedUI.Provider>
  );
}
