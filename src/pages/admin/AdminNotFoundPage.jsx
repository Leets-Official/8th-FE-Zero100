import { Link } from 'react-router';
export default function AdminNotFoundPage() {
  return (
    <div className="admin-empty">
      <h1 className="admin-page-title">페이지를 찾을 수 없습니다.</h1>
      <Link className="admin-button admin-button--primary" to="/">
        대시보드로 이동
      </Link>
    </div>
  );
}
