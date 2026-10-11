import { Outlet, useLocation } from 'react-router';
import TodoHeader from '../TodoHeader/TodoHeader';

function Layout() {
  const { pathname } = useLocation();
  const isCompletedPage = pathname === '/completed';

  return (
    <div className="flex min-h-dvh flex-col bg-[#ffffff] px-[24px] py-[48px]">
      <main className="mx-auto my-auto w-full max-w-[520px]">
        <TodoHeader isCompletedPage={isCompletedPage} />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
