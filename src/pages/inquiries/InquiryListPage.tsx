import { useNavigate } from 'react-router';
import Button from '../../components/common/Button.tsx';
import InquiryTable from '../../features/inquiries/components/InquiryTable.tsx';
import MessageCard from '../../components/common/MessageCard.tsx';
import PageTitle from '../../components/common/PageTitle.tsx';
import { useInquiries } from '../../features/inquiries/useInquiries.ts';

function InquiryListPage() {
  const navigate = useNavigate();
  const { inquiries, isLoading, errorMessage, reload } = useInquiries();

  const renderContent = () => {
    if (isLoading) return <MessageCard message="문의 목록을 불러오는 중입니다..." />;
    if (errorMessage) {
      return (
        <MessageCard message={errorMessage} isError actionLabel="다시 시도" onAction={reload} />
      );
    }
    if (inquiries.length === 0) return <MessageCard message="등록된 문의가 없습니다." />;
    return <InquiryTable inquiries={inquiries} />;
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-row items-start justify-between h-[40px]">
        <PageTitle>문의 목록</PageTitle>
        <Button className="self-center" onClick={() => navigate('/dashboard/inquiries/new')}>
          문의 등록
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}

export default InquiryListPage;
