import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/InquiryList';
import InquiryCreate from './pages/InquiryCreate';
import InquiryDetail from './pages/InquiryDetail';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/inquiries/create" element={<InquiryCreate />} />
        <Route path="/inquiries/:id" element={<InquiryDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
