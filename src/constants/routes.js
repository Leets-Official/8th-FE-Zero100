const DASHBOARD = '/dashboard';
const TODO = '/todolist';
const INQUIRIES = `${DASHBOARD}/inquiries`;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  KAKAO_CALLBACK: '/auth/kakao/callback',
  SIGNUP: '/signup',
  DASHBOARD,
  INQUIRIES,
  INQUIRY_CREATE: `${INQUIRIES}/new`,
  INQUIRY_DETAIL: `${INQUIRIES}/:inquiryId`,
  MYPAGE: `${DASHBOARD}/mypage`,
  TODO,
  TODO_COMPLETED: `${TODO}/completed`,
  TODO_STATS: `${TODO}/stats`,
};

export function getInquiryDetailPath(inquiryId) {
  return `${INQUIRIES}/${encodeURIComponent(inquiryId)}`;
}
