import { createContext, useContext } from 'react';

export interface ModalContextValue {
  isModalOpen: boolean;
  // 삭제 대상 todo id. 모달이 닫혀 있으면 null
  targetTodoId: string | null;
  openModal: (todoId: string) => void;
  closeModal: () => void;
}

// 삭제 확인 모달의 열림 상태와 삭제 대상 todo를 앱 전체에서 공유한다.
export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal은 ModalProvider 안에서 사용해야 합니다.');
  return context;
}
