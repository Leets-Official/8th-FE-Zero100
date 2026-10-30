import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from '../../components/dashboard/Button.jsx';
import Card from '../../components/dashboard/Card.jsx';
import InquiryDeleteModal from '../../components/dashboard/InquiryDeleteModal.jsx';
import InquiryDetailCard from '../../components/dashboard/InquiryDetailCard.jsx';
import PageTitle from '../../components/dashboard/PageTitle.jsx';

function InquiryDetailPage({ isLoading, getInquiryById, onDeleteInquiry }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const inquiry = getInquiryById(id);

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    onDeleteInquiry(inquiry.id, () => navigate('/dashboard/inquiries', { replace: true }));
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[896.3px] mx-auto">
      <div className="flex flex-row items-center justify-between h-[41.9px]">
        <PageTitle>문의 상세</PageTitle>
        <div className="flex flex-row gap-[12px] self-start">
          <Button variant="secondary" onClick={() => navigate('/dashboard/inquiries')}>
            목록으로
          </Button>
          {inquiry && (
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </Button>
          )}
        </div>
      </div>
      {inquiry ? (
        <InquiryDetailCard inquiry={inquiry} />
      ) : (
        <Card className="p-[32px]">
          <p className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]">
            문의를 찾을 수 없습니다.
          </p>
        </Card>
      )}
      <InquiryDeleteModal
        isOpen={isDeleteModalOpen && Boolean(inquiry)}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default InquiryDetailPage;
