import client from './client';

export const signup = async (body) => {
  const response = await client.post('/api/auth/signup', body);
  return response.data.data;
};

export const login = async (body) => {
  const response = await client.post('/api/auth/login', body);
  return response.data.data;
};

export const kakaoLogin = async (code) => {
  const response = await client.get('/api/auth/kakao/redirect', { params: { code } });
  return response.data.data;
};

export const getMe = async () => {
  const response = await client.get('/api/auth/me');
  return response.data.data;
};

export const updateName = async (name) => {
  const response = await client.patch('/api/auth/me', { name });
  return response.data.data;
};

export const updatePassword = async (body) => {
  const response = await client.patch('/api/auth/me/password', body);
  return response.data.data;
};
