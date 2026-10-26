import { useDashboard } from '../hooks/useDashboard.js';
import InfoCard from '../components/dashboard/InfoCard.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function DashboardPage() {
  const { data } = useDashboard();
  const { profile, inquiries } = data;

  return (
    <>
      <PageHeading title="대시보드" />
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard
          title="내 정보"
          items={[
            { label: '이름', value: profile.name },
            { label: '이메일', value: profile.email },
            { label: '가입일', value: profile.joinedAt.replaceAll('-', '.') },
          ]}
        />
        <InfoCard
          title="문의 현황"
          items={[
            { label: '전체 문의', value: `${inquiries.length}개` },
            {
              label: '내 문의',
              value: `${inquiries.filter((inquiry) => inquiry.authorId === profile.id).length}개`,
            },
          ]}
        />
      </div>
    </>
  );
}

export default DashboardPage;
