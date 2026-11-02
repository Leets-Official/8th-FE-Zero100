import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f9fafb] px-[16px] py-[32px]">
      <div className="w-full max-w-[448px] rounded-[10px] bg-[#ffffff] p-[32.93px] shadow-[inset_0_0_0_0.93px_#e5e7eb]">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
