import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Modal 하위 컴포넌트는 Modal 내부에서 사용해야 합니다.');
  }

  return context;
};
