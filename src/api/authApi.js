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
