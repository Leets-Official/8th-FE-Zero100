import { useContext } from 'react';
import { TodoContext } from './TodoContext.js';

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos는 TodoProvider 안에서 사용해야 합니다.');
  return context;
}
