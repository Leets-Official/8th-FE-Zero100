import { Route, Routes, useLocation } from 'react-router';
import { useAuth } from './hooks/useAuth';
import AsyncPanel from './components/common/AsyncPanel';
import ProtectedRoute from './components/auth/RouteGuards';
import GuestRoute from './components/auth/GuestRoute';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import MyPage from './pages/admin/MyPage';
import AdminNotFoundPage from './pages/admin/AdminNotFoundPage';
import InquiryListPage from './pages/inquiries/InquiryListPage';
import InquiryCreatePage from './pages/inquiries/InquiryCreatePage';
import InquiryEditPage from './pages/inquiries/InquiryEditPage';
import InquiryDetailPage from './pages/inquiries/InquiryDetailPage';

export default function App() {
  const auth = useAuth();
  const location = useLocation();
  if (auth.status !== 'ready')
    return (
      <div className="auth-page">
        <AsyncPanel status={auth.status} error={auth.error} onRetry={auth.retry} />
      </div>
    );
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="inquiries" element={<InquiryListPage />} />
          <Route path="inquiries/new" element={<InquiryCreatePage />} />
          <Route path="inquiries/:id" element={<InquiryDetailPage key={location.pathname} />} />
          <Route path="inquiries/:id/edit" element={<InquiryEditPage key={location.pathname} />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
