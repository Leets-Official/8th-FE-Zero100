import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminToast } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryListPage({ inquiries }) {
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = location.state?.deleted === true;

  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => {
      navigate(location.pathname, { replace: true, state: null });
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [showToast, location.pathname, navigate]);

  return (
    <AdminLayout>
      <div className="inquiry-heading">
        <h1>문의 목록</h1>
        <Link className="inquiry-create" to={ROUTES.inquiryNew}>
          문의 등록
        </Link>
      </div>

      <div className="inquiry-table-wrap">
        <table className="inquiry-table">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(({ id, title, createdAt }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <Link to={`${ROUTES.inquiries}/${id}`}>{title}</Link>
                </td>
                <td>{createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showToast && (
        <div className="inquiry-toast">
          <AdminToast>문의가 삭제되었습니다.</AdminToast>
        </div>
      )}
    </AdminLayout>
  );
}

export default InquiryListPage;
