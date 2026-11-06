import axios from 'axios';
import { loadAccessToken } from '../utils/dashboard/tokenStorage.js';

// Swagger에 servers 설정이 없어 명세를 제공하는 서버 주소(origin)를 그대로 사용한다.
// 명세의 경로가 모두 /api로 시작하므로 Base URL에는 /api를 붙이지 않는다.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 요청 실패를 페이지에서 같은 형태로 다루기 위한 에러
// status: HTTP 상태 코드(응답이 없으면 null), data: 서버 에러 응답 본문
export class ApiError extends Error {
  constructor(message, { status = null, data = null, cause } = {}) {
    super(message, { cause });
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const DEFAULT_ERROR_MESSAGES = {
  400: '요청 내용을 확인해주세요.',
  401: '인증이 필요합니다.',
  403: '권한이 없습니다.',
  404: '요청한 정보를 찾을 수 없습니다.',
  409: '이미 존재하는 정보입니다.',
};
const SERVER_ERROR_MESSAGE = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
const TIMEOUT_ERROR_MESSAGE = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
const NETWORK_ERROR_MESSAGE = '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.';

function toApiError(error) {
  const { response } = error;

  if (!response) {
    const isTimeout = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
    return new ApiError(isTimeout ? TIMEOUT_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE, {
      cause: error,
    });
  }

  const { status, data } = response;
  // Swagger의 에러 응답은 { error: string } 형식
  const message =
    data?.error ||
    DEFAULT_ERROR_MESSAGES[status] ||
    (status >= 500 ? SERVER_ERROR_MESSAGE : error.message);
  return new ApiError(message, { status, data, cause: error });
}

// 토큰이 있으면 Swagger bearerAuth 형식(Authorization: Bearer <JWT>)으로 전달
axiosInstance.interceptors.request.use((config) => {
  const accessToken = loadAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Swagger의 성공 응답은 모두 { data } 형식이므로 data만 반환
// 실패는 ApiError로 바꿔 전달하고, 화면 이동·알림은 각 페이지에서 결정한다.
axiosInstance.interceptors.response.use(
  (response) => response.data.data,
  (error) => Promise.reject(axios.isCancel(error) ? error : toApiError(error)),
);

export default axiosInstance;
