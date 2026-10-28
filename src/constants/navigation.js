export const NAV_ITEMS = [
  { to: '/', label: '대시보드', icon: 'dashboard', end: true },
  { to: '/posts', label: '게시글', icon: 'document' },
  { to: '/users', label: '사용자', icon: 'users' },
  { to: '/tasks', label: '할 일', icon: 'check', aliases: ['/active', '/completed'] },
  { to: '/stats', label: '할 일 통계', icon: 'chart' },
];

export function getPageLabel(pathname) {
  return (
    NAV_ITEMS.find((item) => item.to === pathname || item.aliases?.includes(pathname))?.label ??
    '페이지를 찾을 수 없어요'
  );
}
