import React, { useState, useContext, createContext, useEffect } from "react";

type ContactPropsType = {
  children: React.ReactNode;
  lng: string;
};
type stateType = {
  modalOpen: boolean;
  lng: string;
};
type actionsType = {
  openModal: () => void;
  closeModal: () => void;
};
type contextDbType = {
  state: stateType;
  actions: actionsType;
  setState: React.Dispatch<React.SetStateAction<stateType>>;
};
export const ContactContextDb = createContext<contextDbType | null>(null);
export const useContact = () => useContext(ContactContextDb);
function ContactProvider({ children, lng }: ContactPropsType) {
  const [state, setState] = useState<stateType>({ modalOpen: false, lng: "" });
  const actions = { openModal, closeModal };
  function openModal(): void {
    setState((pre) => {
      return { ...pre, modalOpen: true };
    });
  }
  function closeModal(): void {
    setState((pre) => {
      return { ...pre, modalOpen: false };
    });
  }
  useEffect(() => {
    setState((pre) => {
      return { ...pre, lng: lng };
    });
  }, [lng]);
  return (
    <ContactContextDb.Provider value={{ state, setState, actions }}>
      {children}
    </ContactContextDb.Provider>
  );
}

export default ContactProvider;
