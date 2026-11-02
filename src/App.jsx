import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { inquiries as initialInquiries } from './constants/inquiries.js';
import { ROUTES } from './constants/routes.js';
import ComponentsPage from './pages/ComponentsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InquiryCreatePage from './pages/InquiryCreatePage.jsx';
import InquiryDetailPage from './pages/InquiryDetailPage.jsx';
import InquiryListPage from './pages/InquiryListPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyPage from './pages/MyPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import TodoApp from './pages/TodoApp.jsx';

function App() {
  const [inquiries, setInquiries] = useState(initialInquiries);

  function deleteInquiry(id) {
    setInquiries((current) => current.filter((item) => String(item.id) !== id));
  }

  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signup} element={<SignupPage />} />
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
      <Route path={ROUTES.inquiries} element={<InquiryListPage inquiries={inquiries} />} />
      <Route path={ROUTES.inquiryNew} element={<InquiryCreatePage />} />
      <Route
        path="/inquiries/:id"
        element={<InquiryDetailPage inquiries={inquiries} onDelete={deleteInquiry} />}
      />
      <Route path={ROUTES.mypage} element={<MyPage />} />
      <Route path={ROUTES.components} element={<ComponentsPage />} />
      <Route path="/todolist/*" element={<TodoApp />} />
      <Route path="/stats" element={<Navigate to={ROUTES.stats} replace />} />
      <Route path="/completed" element={<Navigate to={ROUTES.completed} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}

export default App;
