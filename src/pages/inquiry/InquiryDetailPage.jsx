import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import StatusMessage from '../../components/dashboard/StatusMessage';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { ROUTES } from '../../constants/routes';
import { useDashboardModal } from '../../contexts/DashboardModalContext';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { getInquiries } from '../../api/inquiry';
import { getErrorMessage } from '../../api/client';

function InquiryDetailPage() {
  const navigate = useNavigate();
  const { openModal } = useDashboardModal();
  const { showToast } = useDashboardToast();
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getInquiries()
      .then((inquiries) => setInquiry(inquiries.find((item) => item.id === id) ?? null))
      .catch((err) => setError(getErrorMessage(err, '문의를 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleDelete() {
    openModal('문의를 삭제하시겠습니까?', () => {
      // TODO: API 연동 후 삭제 요청
      navigate(ROUTES.INQUIRY);
      showToast('문의가 삭제되었습니다.');
    });
  }

  function renderContent() {
    if (isLoading) {
      return <StatusMessage>불러오는 중...</StatusMessage>;
    }
    if (error) {
      return <StatusMessage role="alert">{error}</StatusMessage>;
    }
    if (!inquiry) {
      return <StatusMessage>존재하지 않는 문의입니다.</StatusMessage>;
    }
    return <InquiryDetail inquiry={inquiry} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl leading-8 font-bold text-black">문의 상세</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate(ROUTES.INQUIRY)}>
            목록으로
          </Button>
          {inquiry && (
            <Button variant="secondary" onClick={handleDelete}>
              삭제
            </Button>
          )}
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

export default InquiryDetailPage;
