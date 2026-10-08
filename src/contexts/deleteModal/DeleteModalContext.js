import { createContext } from 'react';

/** 어떤 할 일을 삭제하려는지 공유해서, 목록 깊은 곳의 삭제 버튼이 화면 맨 위의 모달을 열 수 있게 한다. */
export const DeleteModalContext = createContext(null);
