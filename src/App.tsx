
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Completed from './pages/Completed';
import Inquiries from './pages/Inquiries';
import InquiryCreate from './pages/InquiryCreate';
import InquiryDetail from './pages/InquiryDetail';
import MyPage from './pages/MyPage';

// 공통 레이아웃
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 첫 화면 */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* 로그인 */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* 회원가입 */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* 대시보드 */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* 문의 목록 */}
        <Route
          path="/inquiries"
          element={
            <Layout>
              <Inquiries />
            </Layout>
          }
        />

        {/* 문의 등록 */}
        <Route
          path="/inquiries/new"
          element={
            <Layout>
              <InquiryCreate />
            </Layout>
          }
        />

        {/* 문의 상세 */}
        <Route
          path="/inquiries/:id"
          element={
            <Layout>
              <InquiryDetail />
            </Layout>
          }
        />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={
            <Layout>
              <MyPage />
            </Layout>
          }
        />

        {/* 기존 할 일 페이지 */}
        <Route
          path="/todolist"
          element={<TodoList />}
        />

        {/* 완료된 할 일 */}
        <Route
          path="/completed"
          element={<Completed />}
        />

        {/* 잘못된 주소 */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
