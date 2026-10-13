import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { Accept: 'application/json' },
});

export function getApiErrorMessage(error) {
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return '응답 시간이 초과됐어요. 잠시 후 다시 시도해 주세요.';
  }
  if (error.response) {
    return `서버가 요청을 처리하지 못했어요. (HTTP ${error.response.status})`;
  }
  if (error.request) {
    return '인터넷 연결 또는 API 서버 상태를 확인한 뒤 다시 시도해 주세요.';
  }
  return '응답 데이터를 확인할 수 없어요. 잠시 후 다시 시도해 주세요.';
}
