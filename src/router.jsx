import { createBrowserRouter, Navigate } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout/DashboardLayout';
import TodoTabsLayout from './components/layout/TodoTabsLayout/TodoTabsLayout';
import { ROUTES } from './constants/routes';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CompletedPage from './pages/CompletedPage';
import ComingSoonPage from './pages/dashboard/ComingSoonPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import NotFoundPage from './pages/NotFoundPage';
import StatsPage from './pages/StatsPage';
import TodoListPage from './pages/TodoListPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  // 로그인/회원가입은 대시보드 틀(Header/Sidebar) 없이 카드만 보여준다.
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignupPage /> },
  {
    // 대시보드: Header/Sidebar/Footer는 DashboardLayout이 그리고, 가운데 내용만 바뀐다.
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: ROUTES.DASHBOARD_INQUIRIES, element: <ComingSoonPage title="문의" /> },
      { path: ROUTES.DASHBOARD_MYPAGE, element: <ComingSoonPage title="마이페이지" /> },
    ],
  },
  {
    // 중첩 라우팅: 할 일 목록과 통계는 TodoTabsLayout의 제목/탭을 함께 쓴다.
    element: <TodoTabsLayout />,
    children: [
      { path: ROUTES.TODO, element: <TodoListPage /> },
      { path: ROUTES.TODO_STATS, element: <StatsPage /> },
    ],
  },
  { path: ROUTES.TODO_COMPLETED, element: <CompletedPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
