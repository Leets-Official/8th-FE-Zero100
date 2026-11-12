import axios from 'axios';
import { ROUTES } from '../constants/routes';
import { getAccessToken, removeAccessToken } from '../utils/tokenStorage';

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

// 토큰을 붙여 보냈는데 401이 오면 토큰이 만료됐거나 잘못된 것이라 지우고 로그인 화면으로 보낸다.
// (로그인 실패 401은 토큰 없이 보낸 요청이라 여기서 걸러지지 않고 로그인 화면이 직접 처리한다.)
// 비밀번호 변경처럼 "현재 비밀번호 틀림"도 401로 오는 요청은 skipAuthRedirect로 제외한다.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;
    if (
      error.response?.status === 401 &&
      config?.headers?.Authorization &&
      !config.skipAuthRedirect
    ) {
      removeAccessToken();
      window.location.replace(ROUTES.LOGIN);
    }
    return Promise.reject(error);
  },
);
