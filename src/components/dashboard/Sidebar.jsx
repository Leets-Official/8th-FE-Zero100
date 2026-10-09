// Dashboard 전용 사이드바. 메뉴 등 내부 콘텐츠는 children으로 전달
function Sidebar({ className, children, ...props }) {
  return (
    <aside className={className} {...props}>
      {children}
    </aside>
  );
}

export default Sidebar;
