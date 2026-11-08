import useAuth from '../context/useAuth.js';
import useInquiries from '../hooks/useInquiries.js';
import InquiryStatus from '../components/InquiryStatus.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';

function InfoCard({ title, rows }) {
  return (
    <section className="dashboard-card" aria-label={title}>
      <h2>{title}</h2>
      <dl>
        {rows.map(({ label, value }) => (
          <div className="dashboard-card__row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DashboardPage() {
  const { user } = useAuth();
  const request = useInquiries();
  const profileRows = [
    { label: '이름', value: user?.name || '미설정' },
    { label: '이메일', value: user?.email || '—' },
    { label: '가입일', value: user?.created_at || '—' },
  ];
  const inquiryRows = [
    { label: '전체 문의', value: `${request.inquiries.length}건` },
    {
      label: '내가 쓴 문의',
      value: `${request.inquiries.filter((item) => item.user_id === user?.id).length}건`,
    },
  ];
  return (
    <AdminLayout>
      <h1>대시보드</h1>
      <div className="dashboard-cards">
        <InfoCard title="내 정보" rows={profileRows} />
        {request.loading || request.error ? (
          <InquiryStatus {...request} />
        ) : (
          <InfoCard title="문의 현황" rows={inquiryRows} />
        )}
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;
