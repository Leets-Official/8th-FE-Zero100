import { getCurrentUser, getInquiries } from '../lib/appStorage';

function Dashboard() {
  const user = getCurrentUser();
  const inquiries = getInquiries();

  const displayName = user?.name ?? '홍길동';
  const displayEmail = user?.email ?? 'hong@example.com';
  const displayJoinedAt = user
    ? new Date(user.joinedAt).toLocaleDateString('ko-KR')
    : '2024.01.15';

  const totalInquiryCount = user ? inquiries.length : 24;
  const myInquiryCount = user
    ? inquiries.filter(
        (inquiry) => inquiry.email.toLowerCase() === user.email.toLowerCase(),
      ).length
    : 8;

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">대시보드</h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">내 정보</h2>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">이름</span>
              <span className="font-medium">{displayName}</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">이메일</span>
              <span className="font-medium">{displayEmail}</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">가입일</span>
              <span className="font-medium">{displayJoinedAt}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">문의 현황</h2>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">전체 문의</span>
              <span className="font-medium">{totalInquiryCount}건</span>
            </div>
            <div className="flex justify-between py-4 text-sm">
              <span className="text-gray-600">내가 쓴 문의</span>
              <span className="font-medium">{myInquiryCount}건</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
