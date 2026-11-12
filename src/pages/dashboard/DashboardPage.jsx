import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InfoCard from '../../components/dashboard/InfoCard';
import useAuth from '../../hooks/useAuth';
import useInquiries from '../../hooks/useInquiries';

import './DashboardPage.css';

function DashboardPage() {
  const { user } = useAuth();
  const { inquiries, isLoading, error } = useInquiries();

  const myInfo = [
    { label: '이름', value: user?.name },
    { label: '이메일', value: user?.email },
    { label: '가입일', value: user?.created_at },
  ];

  // 문의 개수는 불러오는 중이거나 실패했을 때 숫자 대신 상태를 보여줌
  const getCountText = (count) => {
    if (isLoading) return '불러오는 중';
    if (error) return '-';
    return `${count}건`;
  };

  const myInquiryCount = inquiries.filter((inquiry) => inquiry.user_id === user?.id).length;

  const inquiryStatus = [
    { label: '전체 문의', value: getCountText(inquiries.length) },
    { label: '내가 쓴 문의', value: getCountText(myInquiryCount) },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <h2 className="dashboard-title">대시보드</h2>

        <div className="dashboard-cards">
          <InfoCard title="내 정보" rows={myInfo} />
          <InfoCard title="문의 현황" rows={inquiryStatus} />
        </div>

        {error && (
          <p className="dashboard-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
