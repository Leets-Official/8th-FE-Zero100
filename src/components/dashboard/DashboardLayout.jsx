import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Toast from './Toast';
import Button from './Button';

import { createInquiry, deleteInquiryRequest, getInquiries } from '../../api/inquiries';
import { ROUTES } from '../../constants/routes';
import { removeAccessToken } from '../../utils/authStorage';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';

function DashboardLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, updateUser } = useOutletContext();

  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestNumber, setRequestNumber] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInquiries() {
      try {
        const result = await getInquiries({
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setInquiries(result);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;

        if (error.response?.status === 401) {
          removeAccessToken();
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        setErrorMessage(getApiErrorMessage(error, '문의 목록을 불러오지 못했습니다.'));
        setStatus('error');
      }
    }

    loadInquiries();

    return () => controller.abort();
  }, [requestNumber, navigate]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  function handleRetry() {
    setStatus('loading');
    setErrorMessage('');
    setRequestNumber((prev) => prev + 1);
  }

  function handleLogout() {
    removeAccessToken();
    navigate(ROUTES.LOGIN, { replace: true });
  }

  async function addInquiry(values) {
    const newInquiry = await createInquiry(values);

    setInquiries((prev) => [newInquiry, ...prev]);
    setToast({ message: '문의가 등록되었습니다.' });

    return newInquiry;
  }

  async function deleteInquiry(inquiryId) {
    await deleteInquiryRequest(inquiryId);

    setInquiries((prev) => prev.filter((inquiry) => String(inquiry.id) !== String(inquiryId)));

    setToast({ message: '문의가 삭제되었습니다.' });
  }

  const needsInquiries =
    pathname === ROUTES.DASHBOARD ||
    pathname === ROUTES.INQUIRIES ||
    (pathname.startsWith(`${ROUTES.INQUIRIES}/`) && pathname !== ROUTES.INQUIRY_CREATE);

  return (
    <div className="flex min-h-dvh flex-col bg-[#F9FAFB]">
      <Header onLogout={handleLogout} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1 p-[24px]">
          {needsInquiries && status === 'loading' ? (
            <p role="status" className="py-[32px] text-center text-[14px] text-[#364153]">
              문의 목록을 불러오고 있습니다.
            </p>
          ) : needsInquiries && status === 'error' ? (
            <div className="flex flex-col items-center gap-[16px] py-[32px]">
              <p role="alert" className="text-[14px] text-[#364153]">
                {errorMessage}
              </p>

              <Button onClick={handleRetry}>다시 시도</Button>
            </div>
          ) : (
            <Outlet
              context={{
                user,
                updateUser,
                inquiries,
                addInquiry,
                deleteInquiry,
              }}
            />
          )}
        </main>
      </div>

      <Footer />
      <Toast message={toast?.message} />
    </div>
  );
}

export default DashboardLayout;
