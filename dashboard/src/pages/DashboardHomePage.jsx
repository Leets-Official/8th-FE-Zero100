import { useEffect, useState } from 'react';
import InfoCard from '../components/InfoCard';
import { getInquiries } from '../api/inquiries';
import { useAuth } from '../context/AuthContext';

const DashboardHomePage = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState(null);

  useEffect(() => {
    let ignore = false;
    getInquiries()
      .then((data) => {
        if (!ignore) setInquiries(data);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  const myInquiryCount = inquiries?.filter((inquiry) => inquiry.user_id === user.id).length;

  const myInfo = [
    { label: '이름', value: user.name || '-' },
    { label: '이메일', value: user.email },
    { label: '가입일', value: user.created_at },
  ];

  const inquiryStats = [
    { label: '전체 문의', value: inquiries ? `${inquiries.length}건` : '-' },
    { label: '내가 쓴 문의', value: inquiries ? `${myInquiryCount}건` : '-' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-black">대시보드</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="내 정보" items={myInfo} />
        <InfoCard title="문의 현황" items={inquiryStats} />
      </div>
    </div>
  );
};

export default DashboardHomePage;
