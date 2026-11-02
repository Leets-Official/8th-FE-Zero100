import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryDetail from '../../components/inquiry/InquiryDetail';
import { INQUIRIES } from '../../constants/inquiries';
import { ROUTES } from '../../constants/routes';

import './InquiryDetailPage.css';

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const inquiry = INQUIRIES.find((item) => item.id === Number(id));

  const handleGoList = () => {
    navigate(ROUTES.INQUIRY);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: 문의 삭제 API 연동
    setIsDeleteModalOpen(false);
    navigate(ROUTES.INQUIRY, { state: { toast: '문의가 삭제되었습니다.' } });
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
            {inquiry && (
              <Button variant="secondary" onClick={handleOpenDeleteModal}>
                삭제
              </Button>
            )}
          </div>
        </div>

        {inquiry ? (
          <InquiryDetail inquiry={inquiry} />
        ) : (
          <p className="inquiry-detail-page__message" role="alert">
            존재하지 않는 문의입니다.
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
