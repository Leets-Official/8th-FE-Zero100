import axios from 'axios';
import { adminAdapter } from '../mocks/adminAdapter';

export const SESSION_KEY = 'zero100-admin-session-v1';
export const SESSION_EXPIRED_EVENT = 'zero100:session-expired';
export const adminClient = axios.create({ adapter: adminAdapter, timeout: 10000 });

export function readSession() {
  return sessionStorage.getItem(SESSION_KEY);
}
export function saveSession(token) {
  try {
    sessionStorage.setItem(SESSION_KEY, token);
  } catch {
    throw new Error('로그인 정보를 저장하지 못했습니다. 브라우저 저장소 사용을 허용해 주세요.');
  }
}
export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
adminClient.interceptors.request.use((config) => {
  const token = readSession();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});
adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        clearSession();
      } catch {
        /* 화면의 인증 상태는 저장소와 무관하게 해제합니다. */
      }
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    return Promise.reject(error);
  },
);
export function errorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  return error.message || '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
}
