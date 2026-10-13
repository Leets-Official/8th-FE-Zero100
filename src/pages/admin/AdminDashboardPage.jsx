import { Link } from 'react-router';
import { getDashboard } from '../../api/admin';
import { useAdminResource } from '../../hooks/useAdminResource';
import AsyncPanel from '../../components/common/AsyncPanel';
import { formatDate } from '../../utils/date';

export default function AdminDashboardPage() {
  const resource = useAdminResource(getDashboard);
  return (
    <>
      <h1 className="admin-page-title">대시보드</h1>
      <AsyncPanel {...resource} onRetry={resource.reload}>
        {resource.data && (
          <div className="dashboard-cards">
            <section className="admin-card">
              <h2>내 정보</h2>
              <dl className="info-list">
                <div>
                  <dt>이름</dt>
                  <dd>{resource.data.user.name}</dd>
                </div>
                <div>
                  <dt>이메일</dt>
                  <dd>{resource.data.user.email}</dd>
                </div>
                <div>
                  <dt>가입일</dt>
                  <dd>{formatDate(resource.data.user.createdAt)}</dd>
                </div>
              </dl>
            </section>
            <section className="admin-card">
              <h2>문의 현황</h2>
              <dl className="info-list">
                <div>
                  <dt>전체 문의</dt>
                  <dd>
                    <Link to="/inquiries">{resource.data.totalInquiries}건</Link>
                  </dd>
                </div>
                <div>
                  <dt>내가 쓴 문의</dt>
                  <dd>
                    <Link to="/inquiries?mine=true">{resource.data.myInquiries}건</Link>
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        )}
      </AsyncPanel>
    </>
  );
}
