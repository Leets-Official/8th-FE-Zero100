import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router';
import HomePage from './HomePage.jsx';
import CompletedPage from './CompletedPage.jsx';
import StatsPage from './StatsPage.jsx';
import { ROUTES } from '../constants/routes.js';

function navLinkClassName({ isActive }) {
  return `border-b-2 px-1 py-3 text-sm font-medium ${isActive ? 'border-[#4f46e5] text-[#4f46e5]' : 'border-transparent text-[#767676]'}`;
}

function TodoApp() {
  const isCompletedPage = useLocation().pathname === ROUTES.completed;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[536px] p-2 font-['Noto_Sans_KR',sans-serif]">
        <div className="flex flex-col gap-5">
          <header className="flex flex-col">
            <Link
              to={ROUTES.dashboard}
              className="mb-2 self-start text-sm font-medium text-[#4f46e5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
            >
              ← 대시보드 홈
            </Link>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-[40px] leading-[60px] font-extrabold tracking-[-0.5px] text-[#111]">
                TodoMatic
              </h1>
              <Link
                to={isCompletedPage ? ROUTES.home : ROUTES.completed}
                className="shrink-0 text-[16px] leading-[20.4px] font-semibold text-[#4f46e5]"
              >
                {isCompletedPage ? '← 할 일 목록' : '완료 목록 →'}
              </Link>
            </div>
            {!isCompletedPage && (
              <nav aria-label="페이지 이동" className="mt-3 flex gap-5 border-b border-[#e5e5e5]">
                <NavLink to={ROUTES.home} end className={navLinkClassName}>
                  할 일 목록
                </NavLink>
                <NavLink to={ROUTES.stats} className={navLinkClassName}>
                  통계
                </NavLink>
              </nav>
            )}
          </header>

          <Routes>
            <Route index element={<HomePage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="completed" element={<CompletedPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default TodoApp;
