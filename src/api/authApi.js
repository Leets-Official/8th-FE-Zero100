import { axiosInstance } from './axiosInstance';

/** 회원가입: 성공하면 만들어진 사용자 정보 { id, email, name, created_at }를 돌려준다. */
export const signup = async ({ email, password, name }) => {
  const response = await axiosInstance.post('/auth/signup', { email, password, name });
  return response.data.data;
};

/** 로그인: 성공하면 { accessToken, user }를 돌려준다. */
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data.data;
};

/** 내 정보: { id, email, name, created_at } */
export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data.data;
};

/** 이름 변경: 성공하면 바뀐 내 정보를 돌려준다. */
export const updateMyName = async (name) => {
  const response = await axiosInstance.patch('/auth/me', { name });
  return response.data.data;
};

/**
 * 비밀번호 변경. 현재 비밀번호가 틀려도 서버가 401을 보내므로,
 * 토큰 만료로 보고 로그아웃시키지 않도록 skipAuthRedirect를 켠다. (axiosInstance 참고)
 */
export const updateMyPassword = async ({ currentPassword, newPassword }) => {
  await axiosInstance.patch(
    '/auth/me/password',
    { currentPassword, newPassword },
    { skipAuthRedirect: true },
  );
};
