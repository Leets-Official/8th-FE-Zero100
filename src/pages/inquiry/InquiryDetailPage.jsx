import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { ROUTES } from '../../constants/routes';
import { MOCK_INQUIRIES } from '../../mocks/inquiries';
import { useDashboardModal } from '../../contexts/DashboardModalContext';
import { useDashboardToast } from '../../contexts/DashboardToastContext';

function InquiryDetailPage() {
  const navigate = useNavigate();
  const { openModal } = useDashboardModal();
  const { showToast } = useDashboardToast();
  const { id } = useParams();
  const inquiry = MOCK_INQUIRIES.find((item) => item.id === Number(id));

  function handleDelete() {
    openModal('문의를 삭제하시겠습니까?', () => {
      // TODO: API 연동 후 삭제 요청
      navigate(ROUTES.INQUIRY);
      showToast('문의가 삭제되었습니다.');
    });
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

      {inquiry ? (
        <InquiryDetail inquiry={inquiry} />
      ) : (
        <p className="text-sm leading-5 text-gray-600">존재하지 않는 문의입니다.</p>
      )}
    </div>
  );
}

export default InquiryDetailPage;
