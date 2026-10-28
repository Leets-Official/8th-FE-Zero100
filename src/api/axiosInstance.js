import axios from 'axios';

// API 서버 주소가 확정되면 .env 파일의 VITE_API_BASE_URL로 지정 필요
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
