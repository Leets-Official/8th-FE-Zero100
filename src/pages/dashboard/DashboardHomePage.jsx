import { getMe } from '../../api/authApi';
import { getInquiries } from '../../api/inquiryApi';
import InfoCard from '../../components/dashboard/InfoCard/InfoCard';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import RequestStatus from '../../components/dashboard/RequestStatus/RequestStatus';
import { useAsyncData } from '../../hooks/useAsyncData';
import { formatJoinDate } from '../../utils/formatJoinDate';

// 내 정보와 문의 목록을 동시에 요청한다.
const loadDashboard = async () => {
  const [me, inquiries] = await Promise.all([getMe(), getInquiries()]);
  return { me, inquiries };
};

/** 대시보드 홈: 내 정보와 문의 현황을 카드 두 개로 보여준다. 화면이 좁으면 위아래로 쌓인다. */
function DashboardHomePage() {
  const { status, data, error, retry } = useAsyncData(
    loadDashboard,
    '대시보드 정보를 불러오지 못했어요.',
  );

  return (
    <div className="flex flex-col gap-5">
      <PageHeading title="대시보드" />
      {status === 'success' ? (
        <DashboardCards me={data.me} inquiries={data.inquiries} />
      ) : (
        <RequestStatus
          status={status}
          error={error}
          loadingMessage="대시보드 정보를 불러오고 있어요."
          onRetry={retry}
        />
      )}
    </div>
  );
}

function DashboardCards({ me, inquiries }) {
  const myInquiryCount = inquiries.filter((inquiry) => inquiry.user_id === me.id).length;

  const myInfo = [
    { label: '이름', value: me.name || '-' },
    { label: '이메일', value: me.email },
    { label: '가입일', value: formatJoinDate(me.created_at) },
  ];
  const inquirySummary = [
    { label: '전체 문의', value: `${inquiries.length}건` },
    { label: '내가 쓴 문의', value: `${myInquiryCount}건` },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard title="내 정보" items={myInfo} />
      <InfoCard title="문의 현황" items={inquirySummary} />
    </div>
  );
}

export default DashboardHomePage;
