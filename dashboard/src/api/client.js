import axios from 'axios';
import { getToken } from './token';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error, fallback = '요청에 실패했습니다') =>
  error.response?.data?.error ?? fallback;

export default client;
