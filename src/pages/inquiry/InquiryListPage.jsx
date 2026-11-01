import { useNavigate } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import InquiryTable from '../../components/inquiry/InquiryTable';
import { ROUTES } from '../../constants/routes';
import { MOCK_INQUIRIES } from '../../mocks/inquiries';

function InquiryListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl leading-8 font-bold text-black">문의 목록</h1>
        <Button onClick={() => navigate(ROUTES.INQUIRY_NEW)}>문의 등록</Button>
      </div>
      <InquiryTable inquiries={MOCK_INQUIRIES} />
    </div>
  );
}

export default InquiryListPage;
