import { apiClient } from './client.js';
export async function login(credentials) {
  const { data } = await apiClient.post('/api/auth/login', credentials);
  if (!data?.data?.accessToken) throw new Error('로그인 응답이 올바르지 않습니다.');
  return data.data.accessToken;
}
export async function signup(values) {
  await apiClient.post('/api/auth/signup', values);
}
// React StrictMode에서도 일회용 인가코드를 한 번만 교환합니다.
const kakaoRequests = new Map();
export function exchangeKakaoCode(code) {
  if (!kakaoRequests.has(code))
    kakaoRequests.set(code, apiClient.get('/api/auth/kakao/redirect', { params: { code } }));
  return kakaoRequests.get(code);
}
