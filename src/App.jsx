import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TodoPage from './pages/TodoPage';
import AllPage from './pages/AllPage';
import CompletedPage from './pages/CompletedPage';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리츠 참석하기', completed: true },
    { id: 2, text: '과제하기', completed: false },
    { id: 3, text: '운동하기', completed: false },
  ]);

  // Todo 추가
  const handleAddTodo = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  // Todo 완료 상태 변경
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  // Todo 삭제
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Todo 수정
  const handleEditTodo = (id, text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo)));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 진행 중 페이지 */}
        <Route
          path="/"
          element={
            <TodoPage
              todos={todos}
              onAdd={handleAddTodo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />

        {/* 전체보기 페이지 */}
        <Route
          path="/all"
          element={
            <AllPage
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />

        {/* 완료 페이지 */}
        <Route
          path="/completed"
          element={
            <CompletedPage
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
