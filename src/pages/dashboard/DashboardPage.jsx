import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col gap-4 px-4 py-10">
      <h1 className="text-[32px] font-extrabold text-[#111]">Dashboard</h1>
      <p className="text-sm text-[#767676]">
        대시보드 화면은 피그마 디자인에 맞춰 구현할 예정입니다.
      </p>
      <Link to={ROUTES.TODO} className="font-semibold text-[#4f46e5]">
        Todo List로 이동 →
      </Link>
      <Link to={ROUTES.COMPONENT_PREVIEW} className="font-semibold text-[#4f46e5]">
        공통 컴포넌트 미리보기 →
      </Link>
    </main>
  );
}

export default DashboardPage;
