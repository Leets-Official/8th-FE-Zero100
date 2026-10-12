import { useCallback, useEffect, useReducer, useRef } from 'react';
import { loadTodos, saveTodos } from '../utils/todoStorage.js';

function initializeTodos() {
  const { todos, error } = loadTodos();

  return {
    todos,
    loadError: error,
    storageStatus: error ? 'error' : 'ready',
    storageError: error ? 'load' : null,
  };
}

function todosReducer(state, action) {
  if (action.type === 'update') {
    const todos = typeof action.update === 'function' ? action.update(state.todos) : action.update;
    if (todos === state.todos) return state;

    return {
      ...state,
      todos,
      storageStatus: state.loadError ? 'error' : 'saving',
      storageError: state.loadError ? 'load' : null,
    };
  }

  if (action.type === 'save-result' && action.todos === state.todos) {
    return {
      ...state,
      storageStatus: action.success ? 'saved' : 'error',
      storageError: action.success ? null : 'save',
    };
  }

  return state;
}

export function usePersistentTodos() {
  const [state, dispatch] = useReducer(todosReducer, undefined, initializeTodos);
  const { todos, loadError, storageStatus, storageError } = state;
  const lastSavedTodos = useRef(todos);

  const setTodos = useCallback((update) => {
    dispatch({ type: 'update', update });
  }, []);

  useEffect(() => {
    // 읽기에 실패한 원본과 최초 목록은 덮어쓰지 않는다.
    if (loadError || todos === lastSavedTodos.current) return;

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      const success = saveTodos(todos);
      if (success) lastSavedTodos.current = todos;
      dispatch({ type: 'save-result', todos, success });
    });

    return () => {
      cancelled = true;
    };
  }, [todos, loadError]);

  return { todos, setTodos, storageStatus, storageError };
}
