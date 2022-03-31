import React, { useState } from "react";

type Modal = "notification" | "none";

interface ModalContextAPI {
  modal: Modal;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextAPI>({
  modal: "none",
  openModal: () => {},
  closeModal: () => {},
});

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<Modal>("none");
  const openModal = (name: Modal) => setModal(name);
  const closeModal = () => setModal("none");

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
