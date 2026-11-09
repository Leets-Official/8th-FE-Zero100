import InfoCard from '../../components/dashboard/InfoCard.tsx';
import PageTitle from '../../components/dashboard/PageTitle.tsx';
import { useAuth } from '../../contexts/dashboard/AuthContext.ts';
import { useInquiries } from '../../hooks/dashboard/useInquiries.ts';
import { useMyInfo } from '../../hooks/dashboard/useMyInfo.ts';

// 문의 현황은 서버 문의 목록으로 계산한다. (페이지네이션이 없어 전체 목록 기준)
// Swagger의 Inquiry에 답변 상태 필드가 없어 답변 대기·완료 통계는 계산하지 않는다.
// 내 정보는 AuthContext의 user를 표시하고, 가입일(created_at)은 내 정보 조회 응답에만 있어 진입 시 조회한다.
function DashboardPage() {
  const { user } = useAuth();
  const myInfo = useMyInfo();
  const { inquiries, isLoading, errorMessage } = useInquiries();

  const formatJoinedAt = () => {
    if (user?.created_at) return user.created_at;
    return myInfo.isLoading ? '불러오는 중...' : '조회 실패';
  };

  const formatCount = (count: number) => {
    if (isLoading) return '불러오는 중...';
    if (errorMessage) return '조회 실패';
    return `${count}건`;
  };

  const myInquiryCount = inquiries.filter((inquiry) => inquiry.user_id === user?.id).length;

  const myInfoItems = [
    { label: '이름', value: user?.name },
    { label: '이메일', value: user?.email },
    { label: '가입일', value: formatJoinedAt() },
  ];

  const inquirySummaryItems = [
    { label: '전체 문의', value: formatCount(inquiries.length) },
    { label: '내가 쓴 문의', value: formatCount(myInquiryCount) },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageTitle>대시보드</PageTitle>
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <InfoCard title="내 정보" items={myInfoItems} />
        <InfoCard title="문의 현황" items={inquirySummaryItems} />
      </div>
    </div>
  );
}

export default DashboardPage;
