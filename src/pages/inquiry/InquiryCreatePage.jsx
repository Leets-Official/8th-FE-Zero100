import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryForm from '../../components/inquiry/InquiryForm';
import { ROUTES } from '../../constants/routes';

import './InquiryCreatePage.css';

function InquiryCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // TODO: 문의 등록 API 연동 후 성공 시 목록으로 이동
  };

  const handleCancel = () => {
    navigate(ROUTES.INQUIRY);
  };

  return (
    <DashboardLayout>
      <div className="inquiry-create">
        <h2 className="inquiry-create__title">문의 등록</h2>
        <InquiryForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </DashboardLayout>
  );
}

export default InquiryCreatePage;
