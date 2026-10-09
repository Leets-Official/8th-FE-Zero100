import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import DeleteModal from './components/DeleteModal.jsx';
import CompletedTodoPage from './pages/CompletedTodoPage.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import TodoPage from './pages/TodoPage.jsx';
import { loadTodos, saveTodos } from './utils/storage.js';

// 두 페이지가 같은 todos를 보여줘야 하므로, 두 페이지의 공통 부모인 App에서 state를 관리한다.
function App() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    saveTodos(todos);
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
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/todolist" replace />} />
        <Route
          path="/todolist"
          element={
            <TodoPage
              todos={todos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onEditTodo={handleEditTodo}
            />
          }
        />
        <Route
          path="/todolist/completed"
          element={
            <CompletedTodoPage
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onEditTodo={handleEditTodo}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      <DeleteModal onConfirm={handleDeleteTodo} />
    </>
  );
}

export default App;
