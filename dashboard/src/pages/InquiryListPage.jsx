import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { getInquiries } from '../api/inquiries';
import { getErrorMessage } from '../api/client';

const InquiryListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState(location.state?.toast ?? '');

  useEffect(() => {
    let ignore = false;
    getInquiries()
      .then((data) => {
        if (!ignore) setInquiries(data);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getErrorMessage(error, '문의 목록을 불러오지 못했습니다'));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (location.state?.toast) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const renderStatusRow = (message, className = 'text-[#4A5565]') => (
    <tr>
      <td colSpan={3} className={`px-4 py-10 text-center ${className}`}>
        {message}
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">문의 목록</h2>
        <Button size="small" onClick={() => navigate('/inquiries/new')}>
          문의 등록
        </Button>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E5E7EB] text-[#4A5565]">
            <tr>
              <th className="w-20 px-4 py-3 font-medium">번호</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="w-56 px-4 py-3 font-medium">작성일</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && renderStatusRow('불러오는 중...')}
            {!isLoading && errorMessage && renderStatusRow(errorMessage, 'text-red-500')}
            {!isLoading &&
              !errorMessage &&
              inquiries.length === 0 &&
              renderStatusRow('등록된 문의가 없습니다.')}
            {!isLoading &&
              !errorMessage &&
              inquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.id}
                  className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-[#F9FAFB]"
                >
                  <td className="px-4 py-3 text-black">{index + 1}</td>
                  <td className="px-4 py-3">
                    <Link to={`/inquiries/${inquiry.id}`} className="text-black hover:underline">
                      {inquiry.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#4A5565]">{inquiry.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toastMessage} />
        </div>
      )}
    </div>
  );
};

export default InquiryListPage;
