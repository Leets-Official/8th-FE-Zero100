import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CompletedPage from './pages/CompletedPage.jsx';
import StatsPage from './pages/StatsPage.jsx';

function navLinkClassName({ isActive }) {
  return `border-b-2 px-1 py-3 text-sm font-medium ${isActive ? 'border-[#4f46e5] text-[#4f46e5]' : 'border-transparent text-[#767676]'}`;
}

function App() {
  const isCompletedPage = useLocation().pathname === '/completed';

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[536px] p-2 font-['Noto_Sans_KR',sans-serif]">
        <div className="flex flex-col gap-5">
          <header className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-[40px] leading-[60px] font-extrabold tracking-[-0.5px] text-[#111]">
                TodoMatic
              </h1>
              <Link
                to={isCompletedPage ? '/' : '/completed'}
                className="shrink-0 text-[16px] leading-[20.4px] font-semibold text-[#4f46e5]"
              >
                {isCompletedPage ? '← 할 일 목록' : '완료 목록 →'}
              </Link>
            </div>
            {!isCompletedPage && (
              <nav aria-label="페이지 이동" className="mt-3 flex gap-5 border-b border-[#e5e5e5]">
                <NavLink to="/" end className={navLinkClassName}>
                  할 일 목록
                </NavLink>
                <NavLink to="/stats" className={navLinkClassName}>
                  통계
                </NavLink>
              </nav>
            )}
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
