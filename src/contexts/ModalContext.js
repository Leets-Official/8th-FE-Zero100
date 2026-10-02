import { createContext, useContext } from 'react';

// 삭제 확인 모달의 열림 상태와 삭제 대상 todo를 앱 전체에서 공유한다.
export const ModalContext = createContext(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal은 ModalProvider 안에서 사용해야 합니다.');
  return context;
}
