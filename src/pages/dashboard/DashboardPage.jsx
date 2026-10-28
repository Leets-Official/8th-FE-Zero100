import InfoCard from '../../components/dashboard/InfoCard.jsx';

// API 연동 전까지 Figma 시안의 예시 데이터를 사용. 추후 API 응답 데이터로 교체
const MY_INFO_ITEMS = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const INQUIRY_SUMMARY_ITEMS = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

function DashboardPage() {
  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="m-0 font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000]">
        대시보드
      </h1>
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <InfoCard title="내 정보" items={MY_INFO_ITEMS} />
        <InfoCard title="문의 현황" items={INQUIRY_SUMMARY_ITEMS} />
      </div>
    </div>
  );
}

export default DashboardPage;
