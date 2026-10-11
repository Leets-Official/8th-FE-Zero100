import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="py-12 text-center">
      <h2 className="mb-3 text-xl font-bold">페이지를 찾을 수 없어요.</h2>
      <Link className="text-violet-700 underline" to="/">
        진행 중인 할 일로 돌아가기
      </Link>
    </section>
  );
}
