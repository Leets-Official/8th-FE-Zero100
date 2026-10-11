import { createContext, useContext } from 'react';

export const TodoContext = createContext(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos는 TodoProvider 안에서 사용해야 합니다.');
  return context;
};
