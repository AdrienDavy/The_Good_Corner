import React, { createContext, useState } from "react";

type ModalContextType = {
  openModalId: string | null;
  setOpenModalId: (id: string | null) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ openModalId, setOpenModalId }}>
      {children}
    </ModalContext.Provider>
  );
};
