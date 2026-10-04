import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}
