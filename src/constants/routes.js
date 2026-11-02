export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',

  DASHBOARD: '/dashboard',
  DASHBOARD_INQUIRIES: '/dashboard/inquiries',
  DASHBOARD_INQUIRY_NEW: '/dashboard/inquiries/new',
  DASHBOARD_INQUIRY_DETAIL: '/dashboard/inquiries/:inquiryId',
  DASHBOARD_MYPAGE: '/dashboard/mypage',

  TODO: '/todolist',
  TODO_STATS: '/todolist/stats',
  TODO_COMPLETED: '/todolist/completed',
};

/** 문의 상세 경로의 :inquiryId 자리에 실제 id를 넣는다. */
export const getInquiryDetailPath = (inquiryId) =>
  ROUTES.DASHBOARD_INQUIRY_DETAIL.replace(':inquiryId', inquiryId);

/** Todo 제목 아래 탭 메뉴 (할 일 목록 / 통계) */
export const TODO_TABS = [
  { to: ROUTES.TODO, label: '할 일 목록' },
  { to: ROUTES.TODO_STATS, label: '통계' },
];
