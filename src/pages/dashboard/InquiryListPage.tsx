import { useNavigate } from 'react-router';
import type { MockInquiry } from '../../types/inquiry.ts';
import Button from '../../components/dashboard/Button.tsx';
import InquiryTable from '../../components/dashboard/InquiryTable.tsx';
import PageTitle from '../../components/dashboard/PageTitle.tsx';

interface InquiryListPageProps {
  inquiries: MockInquiry[];
}

function InquiryListPage({ inquiries }: InquiryListPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-row items-start justify-between h-[40px]">
        <PageTitle>문의 목록</PageTitle>
        <Button className="self-center" onClick={() => navigate('/dashboard/inquiries/new')}>
          문의 등록
        </Button>
      </div>
      <InquiryTable inquiries={inquiries} />
    </div>
  );
}

export default InquiryListPage;
