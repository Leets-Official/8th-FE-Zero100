export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',

  DASHBOARD: '/dashboard',
  DASHBOARD_INQUIRIES: '/dashboard/inquiries',
  DASHBOARD_MYPAGE: '/dashboard/mypage',

  TODO: '/todolist',
  TODO_STATS: '/todolist/stats',
  TODO_COMPLETED: '/todolist/completed',
};

/** Todo 제목 아래 탭 메뉴 (할 일 목록 / 통계) */
export const TODO_TABS = [
  { to: ROUTES.TODO, label: '할 일 목록' },
  { to: ROUTES.TODO_STATS, label: '통계' },
];
