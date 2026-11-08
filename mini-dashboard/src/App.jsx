import { Route, Routes } from 'react-router';
import DashboardProvider from './contexts/DashboardProvider.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InquiryPage from './pages/InquiryPage.jsx';
import InquiryCreatePage from './pages/InquiryCreatePage.jsx';
import InquiryDetailPage from './pages/InquiryDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ComponentsPage from './pages/ComponentsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import KakaoCallbackPage from './pages/KakaoCallbackPage.jsx';

function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="auth/kakao/callback" element={<KakaoCallbackPage />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="inquiries" element={<InquiryPage />} />
          <Route path="inquiries/new" element={<InquiryCreatePage />} />
          <Route path="inquiries/:inquiryId" element={<InquiryDetailPage />} />
          <Route path="mypage" element={<ProfilePage />} />
          <Route path="components" element={<ComponentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </DashboardProvider>
  );
}

export default App;
