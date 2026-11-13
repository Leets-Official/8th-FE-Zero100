import axios, { type AxiosError, type AxiosResponse } from 'axios';
import type { ApiSuccessResponse } from '../types/api.ts';
import { isRecord } from '../utils/typeGuards.ts';
import { loadAccessToken } from './tokenStorage.ts';

declare module 'axios' {
  interface AxiosRequestConfig {
    // true면 저장된 토큰을 Authorization 헤더에 담지 않는다. (로그인·회원가입 등 인증이 필요 없는 요청)
    skipAuth?: boolean;
    // true면 401을 받아도 인증 만료 처리(unauthorizedHandler)를 하지 않는다.
    // 비밀번호 변경처럼 401이 입력 오류(현재 비밀번호 불일치)에도 쓰이는 요청에서 사용
    skipUnauthorizedHandler?: boolean;
  }
}

// Swagger에 servers 설정이 없어 명세를 제공하는 서버 주소(origin)를 그대로 사용한다.
// 명세의 경로가 모두 /api로 시작하므로 Base URL에는 /api를 붙이지 않는다.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiErrorOptions {
  status?: number | null;
  data?: unknown;
  cause?: unknown;
}

// API 요청 실패를 페이지에서 같은 형태로 다루기 위한 에러
// status: HTTP 상태 코드(응답이 없으면 null), data: 서버 에러 응답 본문(구조를 보장할 수 없어 unknown)
export class ApiError extends Error {
  status: number | null;
  data: unknown;

  constructor(message: string, { status = null, data = null, cause }: ApiErrorOptions = {}) {
    super(message, { cause });
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const DEFAULT_ERROR_MESSAGES: Partial<Record<number, string>> = {
  400: '요청 내용을 확인해주세요.',
  401: '인증이 필요합니다.',
  403: '권한이 없습니다.',
  404: '요청한 정보를 찾을 수 없습니다.',
  409: '이미 존재하는 정보입니다.',
};
const SERVER_ERROR_MESSAGE = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
const TIMEOUT_ERROR_MESSAGE = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
const NETWORK_ERROR_MESSAGE = '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.';
const UNKNOWN_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

// Swagger의 에러 응답은 { error: string } 형식이지만, 실제 본문은 보장할 수 없어 확인 후 사용
function getServerErrorMessage(data: unknown): string | undefined {
  return isRecord(data) && typeof data.error === 'string' && data.error ? data.error : undefined;
}

function toApiError(error: AxiosError): ApiError {
  const { response } = error;

  if (!response) {
    const isTimeout = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
    return new ApiError(isTimeout ? TIMEOUT_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE, {
      cause: error,
    });
  }

  const { status, data } = response;
  // 5xx는 내부 오류 내용이 노출되지 않도록 공통 문구만 사용
  if (status >= 500) return new ApiError(SERVER_ERROR_MESSAGE, { status, data, cause: error });

  const message = getServerErrorMessage(data) || DEFAULT_ERROR_MESSAGES[status] || error.message;
  return new ApiError(message, { status, data, cause: error });
}

// catch로 받은 값(unknown)에서 화면에 표시할 메시지를 꺼낸다.
export function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : UNKNOWN_ERROR_MESSAGE;
}

// Swagger의 성공 응답 { data }에서 data만 꺼낸다. API 함수에서 .then(unwrapData)로 사용
export function unwrapData<T>(response: AxiosResponse<ApiSuccessResponse<T>>): T {
  return response.data.data;
}

// 토큰을 담아 보낸 요청이 401을 받으면(인증 만료·무효) 호출. AuthProvider가 등록한다.
// 요청에 담은 토큰이 지금 저장된 토큰과 같을 때만 호출하므로, 로그아웃·다른 계정 로그인 이전에 보낸 요청의
// 401이 새 세션을 로그아웃시키지 않고, 여러 요청이 동시에 401을 받아도 처음 한 번만 처리된다.
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

// 토큰이 있으면 Swagger bearerAuth 형식(Authorization: Bearer <JWT>)으로 전달
// 로그인·회원가입처럼 인증이 필요 없는 요청은 skipAuth: true로 토큰을 보내지 않는다.
// 그래서 로그인 실패 401은 토큰 없이 받은 401이 되어 인증 만료와 구분된다.
axiosInstance.interceptors.request.use((config) => {
  const accessToken = config.skipAuth ? null : loadAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// 실패는 ApiError로 바꿔 전달하고, 화면 이동·알림은 각 페이지에서 결정한다.
function isSentWithCurrentToken(authorization: unknown): boolean {
  const accessToken = loadAccessToken();
  return Boolean(accessToken) && authorization === `Bearer ${accessToken}`;
}

axiosInstance.interceptors.response.use(undefined, (error: unknown) => {
  if (!axios.isAxiosError(error) || axios.isCancel(error)) return Promise.reject(error);

  if (
    error.response?.status === 401 &&
    error.config &&
    !error.config.skipUnauthorizedHandler &&
    isSentWithCurrentToken(error.config.headers?.Authorization)
  ) {
    unauthorizedHandler?.();
  }
  return Promise.reject(toApiError(error));
});

export default axiosInstance;
