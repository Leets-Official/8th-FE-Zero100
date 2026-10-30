import DashboardLayout from '../../components/dashboard/DashboardLayout';
import InfoCard from '../../components/dashboard/InfoCard';

import './DashboardPage.css';

const MY_INFO = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const INQUIRY_STATUS = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <h2 className="dashboard-title">대시보드</h2>

        <div className="dashboard-cards">
          <InfoCard title="내 정보" rows={MY_INFO} />
          <InfoCard title="문의 현황" rows={INQUIRY_STATUS} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
