export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  DASHBOARD_COMPONENTS: '/dashboard/components',
  INQUIRY: '/dashboard/inquiry',
  INQUIRY_NEW: '/dashboard/inquiry/new',
  INQUIRY_DETAIL: '/dashboard/inquiry/:id',
  MYPAGE: '/dashboard/mypage',
  TODOLIST: '/todolist',
  TODOLIST_COMPLETED: '/todolist/completed',
};

export function getInquiryDetailPath(id) {
  return `/dashboard/inquiry/${id}`;
}
