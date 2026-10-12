const Header = ({ title = 'ZERO100 Admin', onLogout }) => {
  return (
    <header className="flex h-[60px] w-full items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
      <h1 className="text-xl font-bold text-black">{title}</h1>
      <button type="button" onClick={onLogout} className="text-sm text-[#4A5565]">
        로그아웃
      </button>
    </header>
  );
};

export default Header;
