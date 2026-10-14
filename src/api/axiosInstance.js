import axios from 'axios';

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
