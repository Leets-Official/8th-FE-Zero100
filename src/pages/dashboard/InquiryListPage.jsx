import { useNavigate } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import InquiryTable from '../../components/dashboard/InquiryTable/InquiryTable';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import { ROUTES } from '../../constants/routes';
import { useInquiries } from '../../hooks/useInquiries';

function InquiryListPage() {
  const navigate = useNavigate();
  const { inquiries } = useInquiries();

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="문의 목록"
        actions={<Button onClick={() => navigate(ROUTES.DASHBOARD_INQUIRY_NEW)}>문의 등록</Button>}
      />
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}

export default InquiryListPage;
