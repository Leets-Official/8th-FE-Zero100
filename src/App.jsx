import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CompletedTodoPage from './pages/CompletedTodoPage/CompletedTodoPage.jsx';
import TodoPage from './pages/TodoPage/TodoPage.jsx';

const INITIAL_TODOS = [
  { id: 1, title: '밥 먹기', completed: false },
  { id: 2, title: '잠자기', completed: false },
];

// 두 페이지가 같은 todos를 보여줘야 하므로, 두 페이지의 공통 부모인 App에서 state를 관리한다.
function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

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
