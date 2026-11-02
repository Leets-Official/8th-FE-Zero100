import AdminLayout from '../components/admin/AdminLayout.jsx';

const profileRows = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'hong@example.com' },
  { label: '가입일', value: '2024.01.15' },
];

const inquiryRows = [
  { label: '전체 문의', value: '24건' },
  { label: '내가 쓴 문의', value: '8건' },
];

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
  return (
    <AdminLayout>
      <h1>대시보드</h1>
      <div className="dashboard-cards">
        <InfoCard title="내 정보" rows={profileRows} />
        <InfoCard title="문의 현황" rows={inquiryRows} />
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;
