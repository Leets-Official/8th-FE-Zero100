export const TODO_STORAGE_KEY = 'zero100.tasks';

export function loadTodos() {
  let rawTodos;

  try {
    rawTodos = localStorage.getItem(TODO_STORAGE_KEY);
  } catch {
    return { todos: [], error: 'read' };
  }

  try {
    const savedTodos = JSON.parse(rawTodos ?? '[]');
    if (!Array.isArray(savedTodos)) return { todos: [], error: 'invalid-data' };

    const usedIds = new Set();
    const todos = savedTodos
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

    return { todos, error: null };
  } catch {
    return { todos: [], error: 'invalid-data' };
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
