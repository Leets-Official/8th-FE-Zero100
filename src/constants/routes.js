const DASHBOARD = '/dashboard';
const TODO = '/todolist';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD,
  INQUIRIES: `${DASHBOARD}/inquiries`,
  MYPAGE: `${DASHBOARD}/mypage`,
  TODO,
  TODO_COMPLETED: `${TODO}/completed`,
  TODO_STATS: `${TODO}/stats`,
};
