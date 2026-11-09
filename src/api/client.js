import axios from 'axios';
import { ROUTES } from '../constants/routes';
import { getToken, removeToken } from './token';

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

const SKIP_LOGOUT_URLS = ['/api/auth/me/password'];

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const shouldSkip = SKIP_LOGOUT_URLS.includes(error.config?.url);
    if (isUnauthorized && getToken() && !shouldSkip) {
      removeToken();
      window.location.replace(ROUTES.LOGIN);
    }
    return Promise.reject(error);
  },
);

export function getErrorMessage(error, fallback = '요청에 실패했습니다.') {
  return error.response?.data?.error ?? fallback;
}

export default client;
