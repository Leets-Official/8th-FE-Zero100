import RequireAuth from './components/RequireAuth.jsx';
import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes.js';
import ComponentsPage from './pages/ComponentsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InquiryCreatePage from './pages/InquiryCreatePage.jsx';
import InquiryDetailPage from './pages/InquiryDetailPage.jsx';
import InquiryListPage from './pages/InquiryListPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import KakaoCallbackPage from './pages/KakaoCallbackPage.jsx';
import MyPage from './pages/MyPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import TodoApp from './pages/TodoApp.jsx';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signup} element={<SignupPage />} />
      <Route path={ROUTES.kakaoCallback} element={<KakaoCallbackPage />} />
      <Route element={<RequireAuth />}>
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.inquiries} element={<InquiryListPage />} />
        <Route path={ROUTES.inquiryNew} element={<InquiryCreatePage />} />
        <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
        <Route path={ROUTES.mypage} element={<MyPage />} />
      </Route>
      <Route path={ROUTES.components} element={<ComponentsPage />} />
      <Route path="/todolist/*" element={<TodoApp />} />
      <Route path="/stats" element={<Navigate to={ROUTES.stats} replace />} />
      <Route path="/completed" element={<Navigate to={ROUTES.completed} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}

export default App;
