import InfoCard from '../../components/dashboard/InfoCard';

// 임시 데이터
const myInfo = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const inquiryStats = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

function DashboardHomePage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-2xl leading-8 font-bold text-black">대시보드</h1>
      <div className="grid grid-cols-2 gap-6">
        <InfoCard title="내 정보" items={myInfo} />
        <InfoCard title="문의 현황" items={inquiryStats} />
      </div>
    </div>
  );
}

export default DashboardHomePage;
