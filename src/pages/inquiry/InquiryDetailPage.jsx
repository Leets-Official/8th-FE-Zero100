import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { ROUTES } from '../../constants/routes';
import { MOCK_INQUIRIES } from '../../mocks/inquiries';

function InquiryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const inquiry = MOCK_INQUIRIES.find((item) => item.id === Number(id));

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl leading-8 font-bold text-black">문의 상세</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate(ROUTES.INQUIRY)}>
            목록으로
          </Button>
          {inquiry && <Button variant="secondary">삭제</Button>}
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
