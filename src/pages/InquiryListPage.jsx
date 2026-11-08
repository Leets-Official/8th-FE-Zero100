import useInquiries from '../hooks/useInquiries.js';
import InquiryStatus from '../components/InquiryStatus.jsx';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import { AdminToast } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './inquiry-page.css';

function InquiryListPage() {
  const request = useInquiries();
  const { inquiries, loading, error } = request;
  const location = useLocation();
  const navigate = useNavigate();
  const toastMessage = location.state?.deleted
    ? '문의가 삭제되었습니다.'
    : location.state?.created
      ? '문의가 등록되었습니다.'
      : '';
  const showToast = Boolean(toastMessage);

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

      <InquiryStatus {...request} />
      {!loading && !error && (
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
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={3}>등록된 문의가 없습니다.</td>
                </tr>
              )}
              {inquiries.map(({ id, title, created_at }, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`${ROUTES.inquiries}/${id}`}>{title}</Link>
                  </td>
                  <td>{created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showToast && (
        <div className="inquiry-toast">
          <AdminToast>{toastMessage}</AdminToast>
        </div>
      )}
    </AdminLayout>
  );
}

export default InquiryListPage;
