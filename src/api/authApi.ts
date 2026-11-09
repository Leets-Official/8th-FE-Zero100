import type { ApiSuccessResponse, MessageResponse } from '../types/api.ts';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  UpdateNameRequest,
  UpdatePasswordRequest,
} from '../types/auth.ts';
import type { User } from '../types/user.ts';
import axiosInstance, { ApiError, unwrapData } from './axiosInstance.ts';

// 회원가입. name은 선택, kakaoId는 카카오 미가입 유저가 가입할 때만 전달
export function signup({ email, password, name, kakaoId }: SignupRequest): Promise<SignupResponse> {
  return axiosInstance
    .post<ApiSuccessResponse<SignupResponse>>(
      '/api/auth/signup',
      { email, password, name, kakaoId },
      { skipAuth: true },
    )
    .then(unwrapData);
}

// 로그인
export function login({ email, password }: LoginRequest): Promise<LoginResponse> {
  return axiosInstance
    .post<ApiSuccessResponse<LoginResponse>>(
      '/api/auth/login',
      { email, password },
      { skipAuth: true },
    )
    .then(unwrapData);
}

// 내 정보 조회 (인증 필요)
export function fetchMe(): Promise<User> {
  return axiosInstance.get<ApiSuccessResponse<User>>('/api/auth/me').then(unwrapData);
}

// 이름 수정 (인증 필요)
export function updateMyName({ name }: UpdateNameRequest): Promise<User> {
  return axiosInstance.patch<ApiSuccessResponse<User>>('/api/auth/me', { name }).then(unwrapData);
}

// 비밀번호 수정 (인증 필요)
// 401은 인증 만료와 현재 비밀번호 불일치 두 경우 모두에 쓰인다.
// 401을 받으면 내 정보 조회로 토큰을 확인한다. 토큰이 만료됐다면 그 요청의 401이 공통 인증 만료 처리를 하고,
// 토큰이 유효하면 현재 비밀번호 불일치이므로 원래 오류를 그대로 던져 폼에 표시하게 한다.
export async function updateMyPassword({
  currentPassword,
  newPassword,
}: UpdatePasswordRequest): Promise<MessageResponse> {
  try {
    const response = await axiosInstance.patch<ApiSuccessResponse<MessageResponse>>(
      '/api/auth/me/password',
      { currentPassword, newPassword },
      { skipUnauthorizedHandler: true },
    );
    return unwrapData(response);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) await fetchMe();
    throw error;
  }
}
