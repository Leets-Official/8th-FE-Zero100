export const TODO_STORAGE_KEY = 'zero100.tasks';

export function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) ?? '[]');
    if (!Array.isArray(savedTodos)) return [];

    const usedIds = new Set();
    return savedTodos
      .filter((todo) => {
        if (
          !todo ||
          typeof todo.id !== 'string' ||
          !todo.id.trim() ||
          usedIds.has(todo.id) ||
          typeof todo.title !== 'string' ||
          !todo.title.trim() ||
          typeof todo.completed !== 'boolean'
        ) {
          return false;
        }
        usedIds.add(todo.id);
        return true;
      })
      .map(({ id, title, completed }) => ({ id, title: title.trim(), completed }));
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch {
    return false;
  }
}
