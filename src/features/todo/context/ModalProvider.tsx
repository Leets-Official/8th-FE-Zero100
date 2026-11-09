import { useState, type ReactNode } from 'react';
import { ModalContext, type ModalContextValue } from './ModalContext.ts';

interface ModalProviderProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  // 삭제 대상 todo id가 있으면 모달이 열린 상태로 본다.
  const [targetTodoId, setTargetTodoId] = useState<string | null>(null);

  const openModal = (todoId: string) => setTargetTodoId(todoId);
  const closeModal = () => setTargetTodoId(null);

  const value: ModalContextValue = {
    isModalOpen: targetTodoId !== null,
    targetTodoId,
    openModal,
    closeModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
