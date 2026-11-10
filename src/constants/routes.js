export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  KAKAO_CALLBACK: '/auth/kakao/callback',
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
