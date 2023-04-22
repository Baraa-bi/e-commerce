"use client";

import { createContext, useState } from "react";

interface ActionProps {
  title: any;
  secondary?: any;
  onPress?: any;
}
interface Props {
  title?: any;
  text?: any;
  isVisible?: any;
  actions?: Array<ActionProps>;
  children: any;
}

const INIT_STATE = {
  isVisible: false,
  title: "",
  text: "",
  actions: [],
  hideModal: () => null,
  showModal: (props: any) => props,
};

export const ModalContext = createContext(INIT_STATE);

export const ModalProvider = (props: Props) => {
  const [modalData, setModalData] = useState<any>(INIT_STATE);
  const showModal = (data: Props) => setModalData({ ...data, isVisible: true });
  const hideModal = () => setModalData({ isVisible: false });
  return (
    <ModalContext.Provider value={{ ...modalData, showModal, hideModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
