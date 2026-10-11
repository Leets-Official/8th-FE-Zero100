export const TODO_STORAGE_KEY = 'zero100-todos';

export function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    const todos = savedTodos ? JSON.parse(savedTodos) : [];

    if (!Array.isArray(todos)) return [];

    return todos.filter(
      (todo) =>
        todo !== null &&
        typeof todo === 'object' &&
        (typeof todo.id === 'string' || typeof todo.id === 'number') &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean',
    );
  } catch {
    return [];
  }
}
