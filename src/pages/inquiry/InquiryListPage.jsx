import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/dashboard/Button';
import InquiryTable from '../../components/inquiry/InquiryTable';
import { ROUTES } from '../../constants/routes';
import { getInquiries } from '../../api/inquiry';
import { getErrorMessage } from '../../api/client';
import StatusMessage from '../../components/dashboard/StatusMessage';

function InquiryListPage() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getInquiries()
      .then(setInquiries)
      .catch((err) => setError(getErrorMessage(err, '문의 목록을 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, []);

  function renderContent() {
    if (isLoading) {
      return <StatusMessage>불러오는 중...</StatusMessage>;
    }
    if (error) {
      return <StatusMessage role="alert">{error}</StatusMessage>;
    }
    if (inquiries.length === 0) {
      return <StatusMessage>등록된 문의가 없습니다.</StatusMessage>;
    }
    return <InquiryTable inquiries={inquiries} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl leading-8 font-bold text-black">문의 목록</h1>
        <Button onClick={() => navigate(ROUTES.INQUIRY_NEW)}>문의 등록</Button>
      </div>
      {renderContent()}
    </div>
  );
}

export default InquiryListPage;
