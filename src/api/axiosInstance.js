import axios from 'axios';

import { ROUTES } from '../constants/routes';
import { getAccessToken, removeAccessToken } from './tokenStorage';

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: 토큰이 있으면 모든 요청의 Authorization 헤더에 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 성공 응답은 그대로 전달하고, 인증이 만료된 401은 토큰을 지우고 로그인 화면으로 보냄
// 401의 의미가 다른 요청(로그인, 비밀번호 변경, 카카오 redirect)은 요청 옵션 skipAuthRedirect: true로 제외합니다.
// 각 화면에서 401의 의미를 직접 처리합니다.
// - 로그인: 이메일/비밀번호 불일치
// - 비밀번호 변경: 현재 비밀번호 불일치
// - 카카오 redirect: 미가입 유저
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const skipAuthRedirect = error.config?.skipAuthRedirect === true;

    if (status === 401 && !skipAuthRedirect) {
      removeAccessToken();

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.assign(ROUTES.LOGIN);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
