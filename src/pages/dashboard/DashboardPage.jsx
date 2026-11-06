import InfoCard from '../../components/dashboard/InfoCard.jsx';
import PageTitle from '../../components/dashboard/PageTitle.jsx';

// API 연동 전까지 Figma 시안의 예시 데이터를 사용. 추후 API 응답 데이터로 교체
const INQUIRY_SUMMARY_ITEMS = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

function DashboardPage({ user }) {
  const myInfoItems = [
    { label: '이름', value: user.name },
    { label: '이메일', value: user.email },
    { label: '가입일', value: user.joinedAt },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageTitle>대시보드</PageTitle>
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <InfoCard title="내 정보" items={myInfoItems} />
        <InfoCard title="문의 현황" items={INQUIRY_SUMMARY_ITEMS} />
      </div>
    </div>
  );
}

export default DashboardPage;
