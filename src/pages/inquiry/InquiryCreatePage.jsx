import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getErrorMessage } from '../../api/getErrorMessage';
import { createInquiry } from '../../api/inquiryApi';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InquiryForm from '../../components/inquiry/InquiryForm';
import { ROUTES } from '../../constants/routes';

import './InquiryCreatePage.css';

function InquiryCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await createInquiry(values);
      navigate(ROUTES.INQUIRY, { replace: true });
    } catch (error) {
      setSubmitError(getErrorMessage(error, '문의 등록에 실패했습니다.'));
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.INQUIRY);
  };

  return (
    <DashboardLayout>
      <div className="inquiry-create">
        <h2 className="inquiry-create__title">문의 등록</h2>
        <InquiryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </div>
    </DashboardLayout>
  );
}

export default InquiryCreatePage;
