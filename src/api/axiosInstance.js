import axios from 'axios';
import { getAccessToken } from '../utils/tokenStorage';

/**
 * 대시보드의 모든 API 요청이 함께 쓰는 axios 인스턴스.
 * 서버 주소는 코드에 직접 쓰지 않고 .env의 VITE_API_BASE_URL로 관리한다.
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인한 상태면 모든 요청에 토큰을 붙인다. (Swagger의 Authorize와 같은 역할)
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
