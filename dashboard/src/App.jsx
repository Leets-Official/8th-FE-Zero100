import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHomePage from './pages/DashboardHomePage';
import InquiryListPage from './pages/InquiryListPage';
import InquiryCreatePage from './pages/InquiryCreatePage';
import InquiryDetailPage from './pages/InquiryDetailPage';
import MyPage from './pages/Mypage';
import ProtectedRoute from './components/ProtectedRoute';
import KakaoCallbackPage from './pages/KakaoCallbackPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardHomePage />} />
          <Route path="/inquiries" element={<InquiryListPage />} />
          <Route path="/inquiries/new" element={<InquiryCreatePage />} />
          <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
