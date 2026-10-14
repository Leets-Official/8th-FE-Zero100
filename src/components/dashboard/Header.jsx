function Header({ onLogout }) {
  return (
    <header className="flex h-[60px] w-full shrink-0 items-center justify-between gap-[16px] bg-[#ffffff] px-[24px] shadow-[inset_0_-0.93px_0_#e5e7eb]">
      <h1 className="text-[20px] font-bold text-[#000000]">ZERO100 Admin</h1>

      <button
        type="button"
        onClick={onLogout}
        disabled={!onLogout}
        className="shrink-0 rounded-[4px] text-[14px] text-[#374151] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#222222] enabled:cursor-pointer enabled:hover:underline disabled:cursor-not-allowed"
      >
        로그아웃
      </button>
    </header>
  );
}

export default Header;
