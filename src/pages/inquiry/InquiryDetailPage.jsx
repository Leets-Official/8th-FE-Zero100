import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import StatusMessage from '../../components/dashboard/StatusMessage';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { ROUTES } from '../../constants/routes';
import { useDashboardModal } from '../../contexts/DashboardModalContext';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { deleteInquiry, getInquiries } from '../../api/inquiry';
import { getMe } from '../../api/auth';
import { getErrorMessage } from '../../api/client';

function InquiryDetailPage() {
  const navigate = useNavigate();
  const { openModal } = useDashboardModal();
  const { showToast } = useDashboardToast();
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    Promise.all([getInquiries(), getMe()])
      .then(([inquiries, user]) => {
        setInquiry(inquiries.find((item) => item.id === id) ?? null);
        setMe(user);
      })
      .catch((err) => setError(getErrorMessage(err, '문의를 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, [id]);

  const isMine = Boolean(inquiry && me && inquiry.user_id === me.id);

  function handleDelete() {
    openModal('문의를 삭제하시겠습니까?', async () => {
      setDeleteError('');
      try {
        await deleteInquiry(inquiry.id);
        navigate(ROUTES.INQUIRY);
        showToast('문의가 삭제되었습니다.');
      } catch (err) {
        setDeleteError(getErrorMessage(err, '문의 삭제에 실패했습니다.'));
      }
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
          {isMine && (
            <Button variant="secondary" onClick={handleDelete}>
              삭제
            </Button>
          )}
        </div>
      </div>
      {deleteError && (
        <p role="alert" className="text-right text-sm leading-5 text-red-500">
          {deleteError}
        </p>
      )}
      {renderContent()}
    </div>
  );
}

export default InquiryDetailPage;
