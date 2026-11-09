import { useEffect, useState } from 'react';
import InfoCard from '../../components/dashboard/InfoCard';
import StatusMessage from '../../components/dashboard/StatusMessage';
import { getMe } from '../../api/auth';
import { getInquiries } from '../../api/inquiry';
import { getErrorMessage } from '../../api/client';

function DashboardHomePage() {
  const [me, setMe] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getMe(), getInquiries()])
      .then(([user, inquiryList]) => {
        setMe(user);
        setInquiries(inquiryList);
      })
      .catch((err) => setError(getErrorMessage(err, '정보를 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, []);

  function renderContent() {
    if (isLoading) {
      return <StatusMessage>불러오는 중...</StatusMessage>;
    }
    if (error) {
      return <StatusMessage role="alert">{error}</StatusMessage>;
    }

    const myInquiryCount = inquiries.filter((inquiry) => inquiry.user_id === me.id).length;
    const myInfo = [
      { label: '이름', value: me.name },
      { label: '이메일', value: me.email },
      { label: '가입일', value: me.created_at },
    ];
    const inquiryStats = [
      { label: '전체 문의', value: `${inquiries.length}건` },
      { label: '내가 쓴 문의', value: `${myInquiryCount}건` },
    ];

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="내 정보" items={myInfo} />
        <InfoCard title="문의 현황" items={inquiryStats} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl leading-8 font-bold text-black">대시보드</h1>
      {renderContent()}
    </div>
  );
}

export default DashboardHomePage;
