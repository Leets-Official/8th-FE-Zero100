import { useEffect, useState } from 'react';
import { loadTodos, saveTodos } from '../utils/todoStorage.js';

export function usePersistentTodos() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return [todos, setTodos];
}
