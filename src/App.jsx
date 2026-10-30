import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import DeleteModal from './components/todo/DeleteModal.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import InquiryCreatePage from './pages/dashboard/InquiryCreatePage.jsx';
import InquiryListPage from './pages/dashboard/InquiryListPage.jsx';
import InquiryPlaceholderPage from './pages/dashboard/InquiryPlaceholderPage.jsx';
import LoginPage from './pages/dashboard/LoginPage.jsx';
import SignupPage from './pages/dashboard/SignupPage.jsx';
import CompletedTodoPage from './pages/todo/CompletedTodoPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';
import { formatInquiryDate } from './utils/dashboard/date.js';
import { loadInquiries, saveInquiries } from './utils/dashboard/inquiryStorage.js';
import { loadTodos, saveTodos } from './utils/todo/storage.js';

// 두 페이지가 같은 todos를 보여줘야 하므로, 두 페이지의 공통 부모인 App에서 state를 관리한다.
function App() {
  const [todos, setTodos] = useState(loadTodos);
  // 문의 목록과 문의 등록 페이지가 같은 데이터를 쓰도록 todos와 같은 방식으로 App에서 관리한다.
  const [inquiries, setInquiries] = useState(loadInquiries);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    saveInquiries(inquiries);
  }, [inquiries]);

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

  const handleAddInquiry = (inquiry) => {
    const id = Math.max(0, ...inquiries.map((item) => item.id)) + 1;
    const newInquiry = { ...inquiry, id, createdAt: formatInquiryDate(new Date()) };
    setInquiries([...inquiries, newInquiry]);
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
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/inquiries" element={<InquiryListPage inquiries={inquiries} />} />
          <Route
            path="/dashboard/inquiries/new"
            element={<InquiryCreatePage onAddInquiry={handleAddInquiry} />}
          />
          <Route path="/dashboard/inquiries/:inquiryId" element={<InquiryPlaceholderPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <DeleteModal onConfirm={handleDeleteTodo} />
    </>
  );
}

export default App;
