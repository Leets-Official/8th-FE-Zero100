import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toast from './Toast';
import { mockInquiries } from '../../data/inquiries';

function DashboardLayout() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  function deleteInquiry(inquiryId) {
    setInquiries((prev) => prev.filter((inquiry) => String(inquiry.id) !== String(inquiryId)));

    setToast({ message: '문의가 삭제되었습니다.' });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#F9FAFB]">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1 p-[24px]">
          <Outlet context={{ inquiries, deleteInquiry }} />
        </main>
      </div>

      <Footer />
      <Toast message={toast?.message} />
    </div>
  );
}

export default DashboardLayout;
