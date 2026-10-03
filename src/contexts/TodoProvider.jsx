import { useState } from 'react';
import { TodoContext } from './TodoContext.js';

const initialTodos = [
  { id: 'todo-1', title: '밥 먹기', completed: false },
  { id: 'todo-2', title: '코드 공부하기', completed: true },
  { id: 'todo-3', title: '잠자기', completed: false },
];

function TodoProvider({ children }) {
  const [todos, setTodos] = useState(initialTodos);
  const [activeFilter, setActiveFilter] = useState('all');

  function addTodo(title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: trimmedTitle, completed: false },
    ]);
  }

  function toggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function updateTodo(todoId, title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === todoId ? { ...todo, title: trimmedTitle } : todo)),
    );
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        activeFilter,
        setActiveFilter,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
