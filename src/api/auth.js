import client from './client';

export async function login({ email, password }) {
  const response = await client.post('/api/auth/login', { email, password });
  return response.data.data;
}

export async function signup({ email, password, name }) {
  const response = await client.post('/api/auth/signup', { email, password, name });
  return response.data.data;
}

export async function getMe() {
  const response = await client.get('/api/auth/me');
  return response.data.data;
}

export async function updateName(name) {
  const response = await client.patch('/api/auth/me', { name });
  return response.data.data;
}

export async function updatePassword({ currentPassword, newPassword }) {
  await client.patch('/api/auth/me/password', { currentPassword, newPassword });
}

export async function kakaoLogin(code) {
  const response = await client.get('/api/auth/kakao/redirect', { params: { code } });
  return response.data.data;
}
