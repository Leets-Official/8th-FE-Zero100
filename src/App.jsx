import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import RequireAuth from './components/auth/RequireAuth';

import KakaoCallbackPage from './pages/KakaoCallbackPage';
import TodoPage from './pages/TodoPage';
import CompletedPage from './pages/CompletedPage';
import StatsPage from './pages/StatsPage';
import DashboardPage from './pages/DashboardPage';

import Layout from './components/Layout/Layout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AuthLayout from './components/auth/AuthLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InquiryListPage from './pages/InquiryListPage';
import InquiryCreatePage from './pages/InquiryCreatePage';
import InquiryDetailPage from './pages/InquiryDetailPage';
import MyPage from './pages/MyPage';

import { loadTodos, TODO_STORAGE_KEY } from './utils/todoStorage';
import { ROUTES } from './constants/routes';

import './App.css';

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('할 일 목록을 저장하지 못했습니다.', error);
    }
  }, [todos]);

  function handleAdd(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleEdit(id, text) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  const todoProps = {
    todos,
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  };

  return (
    <Routes>
      <Route path={ROUTES.KAKAO_CALLBACK} element={<KakaoCallbackPage />} />
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path={ROUTES.INQUIRIES} element={<InquiryListPage />} />

          <Route path={ROUTES.INQUIRY_CREATE} element={<InquiryCreatePage />} />

          <Route path={ROUTES.INQUIRY_DETAIL} element={<InquiryDetailPage />} />

          <Route path={ROUTES.MYPAGE} element={<MyPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.TODO} element={<Layout />}>
        <Route
          index
          element={
            <TodoPage {...todoProps} filter={filter} onFilterChange={setFilter} onAdd={handleAdd} />
          }
        />

        <Route path={ROUTES.TODO_COMPLETED} element={<CompletedPage {...todoProps} />} />

        <Route path={ROUTES.TODO_STATS} element={<StatsPage todos={todos} />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}

export default App;
