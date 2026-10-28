const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

// Dashboard 전용 헤더. 제목 태그는 titleAs(h1~h6)로 선택하고, 로고, 사용자 정보, 로그아웃 버튼 등은 children으로 전달
function Header({ title, titleAs = 'h1', className, children, ...props }) {
  const TitleTag = HEADING_TAGS.includes(titleAs) ? titleAs : 'h1';

  return (
    <header className={className} {...props}>
      {title && <TitleTag>{title}</TitleTag>}
      {children}
    </header>
  );
}

export default Header;
