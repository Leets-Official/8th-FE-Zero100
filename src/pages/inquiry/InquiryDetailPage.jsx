import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getErrorMessage } from '../../api/getErrorMessage';
import { deleteInquiry } from '../../api/inquiryApi';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { ROUTES } from '../../constants/routes';
import useAuth from '../../hooks/useAuth';
import useInquiries from '../../hooks/useInquiries';

import './InquiryDetailPage.css';

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { inquiries, isLoading, error } = useInquiries();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // 단건 조회 API가 없어서 목록 응답에서 찾음 (id는 uuid 문자열)
  const inquiry = inquiries.find((item) => item.id === id);
  // 본인이 쓴 문의만 삭제할 수 있음
  const isMine = Boolean(inquiry && user && inquiry.user_id === user.id);

  const handleGoList = () => {
    navigate(ROUTES.INQUIRY);
  };

  const handleOpenDeleteModal = () => {
    setDeleteError('');
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteInquiry(id);
      navigate(ROUTES.INQUIRY, { replace: true, state: { toast: '문의가 삭제되었습니다.' } });
    } catch (requestError) {
      setDeleteError(getErrorMessage(requestError, '문의를 삭제하지 못했습니다.'));
      setIsDeleteModalOpen(false);
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="inquiry-detail-page__message">문의를 불러오는 중입니다.</p>;
    }

    if (error) {
      return (
        <p
          className="inquiry-detail-page__message inquiry-detail-page__message--error"
          role="alert"
        >
          {error}
        </p>
      );
    }

    if (!inquiry) {
      return (
        <p className="inquiry-detail-page__message" role="alert">
          존재하지 않는 문의입니다.
        </p>
      );
    }

    return <InquiryDetail inquiry={inquiry} />;
  };

  return (
    <DashboardLayout>
      <div className="inquiry-detail-page">
        <div className="inquiry-detail-page__header">
          <h2 className="inquiry-detail-page__title">문의 상세</h2>

          <div className="inquiry-detail-page__actions">
            <Button variant="secondary" onClick={handleGoList}>
              목록으로
            </Button>
            {isMine && (
              <Button variant="secondary" onClick={handleOpenDeleteModal}>
                삭제
              </Button>
            )}
          </div>
        </div>

        {renderContent()}

        {deleteError && (
          <p
            className="inquiry-detail-page__message inquiry-detail-page__message--error"
            role="alert"
          >
            {deleteError}
          </p>
        )}
      </div>

      <Modal
        open={isDeleteModalOpen}
        message="문의를 삭제하시겠습니까?"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  );
}

export default InquiryDetailPage;
