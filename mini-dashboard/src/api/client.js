import axios from 'axios';

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://leetszero100-fe.kro.kr'
).replace(/\/$/, '');
const TOKEN_KEY = 'zero100.accessToken';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}
export function getApiError(error) {
  return typeof error?.response?.data?.error === 'string'
    ? error.response.data.error
    : '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (
    token &&
    !['/api/auth/login', '/api/auth/signup', '/api/auth/kakao/redirect'].includes(config.url)
  )
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});
