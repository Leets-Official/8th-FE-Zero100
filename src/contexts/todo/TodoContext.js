import { createContext } from 'react';

/** 할 일 목록과 목록을 바꾸는 함수들을 여러 페이지(목록/통계/완료)에서 함께 쓰기 위한 Context */
export const TodoContext = createContext(null);
