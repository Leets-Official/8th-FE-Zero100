import InfoCard from '../components/InfoCard';

const MY_INFO = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const INQUIRY_STATS = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

const DashboardHomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-black">대시보드</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="내 정보" items={MY_INFO} />
        <InfoCard title="문의 현황" items={INQUIRY_STATS} />
      </div>
    </div>
  );
};

export default DashboardHomePage;
