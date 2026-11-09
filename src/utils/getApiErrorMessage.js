import axios from 'axios';

export function getApiErrorMessage(
  error,
  fallback = '요청을 처리하지 못했습니다. 다시 시도해주세요.',
) {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const serverMessage = error.response?.data?.error;

  if (typeof serverMessage === 'string' && serverMessage.trim()) {
    return serverMessage;
  }

  if (error.code === 'ECONNABORTED') {
    return '응답 시간이 초과되었습니다. 다시 시도해주세요.';
  }

  if (!error.response) {
    return '서버에 연결하지 못했습니다. 네트워크 연결을 확인해주세요.';
  }

  return fallback;
}
