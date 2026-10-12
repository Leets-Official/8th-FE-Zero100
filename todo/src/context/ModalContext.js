import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal은 ModalProvider 안에서 사용해야 합니다.');
  return context;
};
