import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryTable from '../../components/inquiry/InquiryTable';
import { INQUIRIES } from '../../constants/inquiries';
import { ROUTES } from '../../constants/routes';

import './InquiryPage.css';

const TOAST_DURATION = 3000;

function InquiryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 삭제 후 이동해 왔을 때 상세 페이지에서 넘긴 메시지로 Toast를 표시
  const [toastMessage, setToastMessage] = useState(location.state?.toast ?? '');

  // 새로고침해도 Toast가 다시 뜨지 않도록 넘겨받은 상태를 지움
  useEffect(() => {
    if (location.state?.toast) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  // 일정 시간 뒤 Toast 숨김
  useEffect(() => {
    if (!toastMessage) return undefined;

    const timerId = setTimeout(() => setToastMessage(''), TOAST_DURATION);

    return () => clearTimeout(timerId);
  }, [toastMessage]);

  const handleCreate = () => {
    navigate(ROUTES.INQUIRY_CREATE);
  };

  return (
    <DashboardLayout>
      <div className="inquiry-page">
        <div className="inquiry-page__header">
          <h2 className="inquiry-page__title">문의 목록</h2>
          <Button onClick={handleCreate}>문의 등록</Button>
        </div>

        <InquiryTable inquiries={INQUIRIES} />
      </div>

      {toastMessage && (
        <div className="inquiry-page__toast">
          <Toast message={toastMessage} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default InquiryPage;
