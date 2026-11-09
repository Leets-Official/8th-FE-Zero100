import { axiosInstance } from './axiosInstance';

/** 로그인: 성공하면 { accessToken, user }를 돌려준다. */
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data.data;
};
