import { useState } from 'react';
import { ModalContext } from './ModalContext.js';

function ModalProvider({ children }) {
  // 삭제 대상 todo id가 있으면 모달이 열린 상태로 본다.
  const [targetTodoId, setTargetTodoId] = useState(null);

  const openModal = (todoId) => setTargetTodoId(todoId);
  const closeModal = () => setTargetTodoId(null);

  const value = { isModalOpen: targetTodoId !== null, targetTodoId, openModal, closeModal };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
