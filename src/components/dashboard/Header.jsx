function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      <p className="text-xl leading-7 font-bold text-black">ZERO100 Admin</p>
      <button type="button" className="cursor-pointer text-sm leading-5 font-medium text-gray-600">
        로그아웃
      </button>
    </header>
  );
}

export default Header;
