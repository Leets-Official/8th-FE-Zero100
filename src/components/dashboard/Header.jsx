// Dashboard 전용 헤더. 로고, 사용자 정보, 로그아웃 버튼 등은 children으로 전달
function Header({ title, className, children, ...props }) {
  return (
    <header className={className} {...props}>
      {title && <h1>{title}</h1>}
      {children}
    </header>
  );
}

export default Header;
