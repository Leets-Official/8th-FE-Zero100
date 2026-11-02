import { useDashboard } from '../hooks/useDashboard.js';
import InquiryTable from '../components/dashboard/InquiryTable.jsx';
import LinkButton from '../components/common/LinkButton.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function InquiryPage() {
  const { data } = useDashboard();
  return (
    <>
      <PageHeading
        title="문의 목록"
        action={<LinkButton to="/inquiries/new">문의 등록</LinkButton>}
      />
      <InquiryTable inquiries={data.inquiries} />
    </>
  );
}

export default InquiryPage;
