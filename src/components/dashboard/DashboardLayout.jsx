import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toast from './Toast';

import { mockInquiries } from '../../data/inquiries';
import { ROUTES } from '../../constants/routes';
import { removeAccessToken } from '../../utils/authStorage';

function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const [inquiries, setInquiries] = useState(mockInquiries);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  function handleLogout() {
    removeAccessToken();

    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  }

  function addInquiry({ name, email, title, content }) {
    const newInquiry = {
      id: crypto.randomUUID(),
      author: name.trim(),
      email: email.trim(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    setToast({ message: '문의가 등록되었습니다.' });

    return newInquiry;
  }

  function deleteInquiry(inquiryId) {
    setInquiries((prev) => prev.filter((inquiry) => String(inquiry.id) !== String(inquiryId)));

    setToast({ message: '문의가 삭제되었습니다.' });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#F9FAFB]">
      <Header onLogout={handleLogout} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1 p-[24px]">
          <Outlet
            context={{
              user,
              inquiries,
              addInquiry,
              deleteInquiry,
            }}
          />
        </main>
      </div>

      <Footer />
      <Toast message={toast?.message} />
    </div>
  );
}

export default DashboardLayout;
