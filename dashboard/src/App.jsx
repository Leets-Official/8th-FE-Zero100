import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHomePage from './pages/DashboardHomePage';
import InquiryListPage from './pages/InquiryListPage';
import InquiryCreatePage from './pages/InquiryCreatePage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="/inquiries" element={<InquiryListPage />} />
        <Route path="/inquiries/new" element={<InquiryCreatePage />} />
      </Route>
    </Routes>
  );
}

export default App;
