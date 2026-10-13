import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { createInquiry } from '../../api/admin';
import { inquiryListLocation } from '../../utils/inquiryList';
import InquiryForm from '../../components/inquiries/InquiryForm';

export default function InquiryCreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useToast();
  const listLocation = inquiryListLocation(location.state);
  return (
    <div className="form-page">
      <h1 className="admin-page-title">문의 등록</h1>
      <InquiryForm
        initialValues={{ name: user.name, email: user.email, title: '', content: '' }}
        cancelTo={listLocation}
        onSave={async (values) => {
          const inquiry = await createInquiry(values);
          notify('문의가 등록되었습니다.');
          navigate(`/inquiries/${encodeURIComponent(inquiry.id)}`, {
            replace: true,
            state: { listLocation },
          });
        }}
      />
    </div>
  );
}
