import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 저장된 토큰을 요청마다 자동으로 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 토큰 만료 응답만 인증 상태 초기화
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url ?? '';
    const isLoginRequest = requestUrl.includes('/api/auth/login');
    const errorCode = error.response?.data?.code;

    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      errorCode === 'TOKEN_EXPIRED'
    ) {
      localStorage.removeItem('accessToken');
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);