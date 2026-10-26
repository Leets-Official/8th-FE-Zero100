import InfoCard from '../../components/dashboard/InfoCard/InfoCard';

// API 연동 전까지는 Figma 시안의 예시 값으로 화면을 그린다.
const MY_INFO = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const INQUIRY_SUMMARY = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

/** 대시보드 홈: 내 정보와 문의 현황을 카드 두 개로 보여준다. 화면이 좁으면 위아래로 쌓인다. */
function DashboardHomePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold text-dash-black">대시보드</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="내 정보" items={MY_INFO} />
        <InfoCard title="문의 현황" items={INQUIRY_SUMMARY} />
      </div>
    </div>
  );
}

export default DashboardHomePage;
