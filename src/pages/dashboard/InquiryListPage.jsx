import ButtonLink from '../../components/dashboard/ButtonLink/ButtonLink';
import InquiryTable from '../../components/dashboard/InquiryTable/InquiryTable';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import { ROUTES } from '../../constants/routes';
import { useInquiries } from '../../hooks/useInquiries';

function InquiryListPage() {
  const { inquiries } = useInquiries();

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="문의 목록"
        actions={<ButtonLink to={ROUTES.DASHBOARD_INQUIRY_NEW}>문의 등록</ButtonLink>}
      />
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}

export default InquiryListPage;
