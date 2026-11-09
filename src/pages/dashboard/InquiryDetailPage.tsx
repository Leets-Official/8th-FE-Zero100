import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import { deleteInquiry } from '../../api/inquiryApi.ts';
import Button from '../../components/dashboard/Button.tsx';
import InquiryDeleteModal from '../../components/dashboard/InquiryDeleteModal.tsx';
import InquiryDetailCard from '../../components/dashboard/InquiryDetailCard.tsx';
import MessageCard from '../../components/dashboard/MessageCard.tsx';
import PageTitle from '../../components/dashboard/PageTitle.tsx';
import { useInquiries } from '../../hooks/dashboard/useInquiries.ts';

const INQUIRY_LIST_PATH = '/dashboard/inquiries';

interface InquiryDetailPageProps {
  // 서버에서 삭제가 확인된 뒤 호출 (삭제 완료 안내)
  onDeleted: () => void;
}

// Swagger에 문의 상세 조회 API가 없어 목록 API 응답에서 URL의 id(uuid)와 같은 문의를 찾는다.
// 목록은 페이지네이션 없이 전체를 반환하므로 새로고침·URL 직접 접근도 같은 방식으로 처리된다.
function InquiryDetailPage({ onDeleted }: InquiryDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inquiries, isLoading, errorMessage, reload } = useInquiries();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const inquiry = inquiries.find((item) => item.id === id);

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteError('');
  };

  // 서버 삭제가 성공한 경우에만 목록으로 이동한다. 실패하면 모달에 오류를 표시하고 데이터는 그대로 둔다.
  const handleConfirmDelete = async () => {
    if (!inquiry || isDeleting) return;

    setIsDeleting(true);
    setDeleteError('');
    try {
      await deleteInquiry(inquiry.id);
      onDeleted();
      navigate(INQUIRY_LIST_PATH, { replace: true });
    } catch (error) {
      setDeleteError(getErrorMessage(error));
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) return <MessageCard message="문의를 불러오는 중입니다..." />;
    if (errorMessage) {
      return (
        <MessageCard message={errorMessage} isError actionLabel="다시 시도" onAction={reload} />
      );
    }
    if (!inquiry) return <MessageCard message="문의를 찾을 수 없습니다." />;
    return <InquiryDetailCard inquiry={inquiry} />;
  };

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[896.3px] mx-auto">
      <div className="flex flex-row items-center justify-between h-[41.9px]">
        <PageTitle>문의 상세</PageTitle>
        <div className="flex flex-row gap-[12px] self-start">
          <Button variant="secondary" onClick={() => navigate(INQUIRY_LIST_PATH)}>
            목록으로
          </Button>
          {inquiry && (
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </Button>
          )}
        </div>
      </div>
      {renderContent()}
      <InquiryDeleteModal
        isOpen={isDeleteModalOpen && Boolean(inquiry)}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default InquiryDetailPage;
