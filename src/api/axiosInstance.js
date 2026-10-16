import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: 토큰이 있으면 모든 요청의 Authorization 헤더에 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 성공 응답은 그대로 전달, 에러 상태 코드별 공통 처리는 여기에 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예) 401 → 토큰 재발급 또는 로그인 페이지 이동 (인증 API 연결 시 구현)
    return Promise.reject(error);
  },
);

export default axiosInstance;
