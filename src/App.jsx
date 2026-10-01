import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import CompletedTodoPage from './pages/CompletedTodoPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

const STORAGE_KEY = 'tasks';

// 저장된 값이 없거나 올바른 배열이 아니면 빈 목록으로 시작한다.
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 두 페이지가 같은 todos를 보여줘야 하므로, 두 페이지의 공통 부모인 App에서 state를 관리한다.
function App() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title) => {
    const newTodo = { id: crypto.randomUUID(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleEditTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoPage
            todos={todos}
            onAddTodo={handleAddTodo}
            onToggleTodo={handleToggleTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        }
      />
      <Route
        path="/completed"
        element={
          <CompletedTodoPage
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        }
      />
    </Routes>
  );
}

export default App;
