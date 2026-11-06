import type { Todo } from '../../types/todo.ts';
import { isRecord } from '../typeGuards.ts';

const STORAGE_KEY = 'tasks';

function isTodo(value: unknown): value is Todo {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.completed === 'boolean'
  );
}

// 저장된 값이 없거나 올바른 배열이 아니면 빈 목록으로 시작. 형식이 맞지 않는 항목은 제외
export function loadTodos(): Todo[] {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    const savedTodos: unknown = savedValue === null ? null : JSON.parse(savedValue);
    return Array.isArray(savedTodos) ? savedTodos.filter(isTodo) : [];
  } catch {
    return [];
  }
}

// 저장 공간 부족 등으로 저장에 실패해도 앱은 현재 state로 계속 동작
export function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // 저장 실패는 무시함
  }
}
