import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks는 TasksProvider 안에서 사용해야 합니다.');
  return context;
}
