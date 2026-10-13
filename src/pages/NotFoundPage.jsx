import { Link } from 'react-router';
import EmptyState from '../components/commons/EmptyState';

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <EmptyState title="페이지를 찾을 수 없어요" description="주소가 올바른지 확인해 주세요.">
        <Link to="/" className="button button--primary">
          대시보드로 이동
        </Link>
      </EmptyState>
    </section>
  );
}
