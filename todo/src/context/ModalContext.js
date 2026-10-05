import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);
