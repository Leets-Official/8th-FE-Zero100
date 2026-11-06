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
import axiosInstance, { unwrapData } from './axiosInstance.ts';

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
// 401은 인증 실패와 현재 비밀번호 불일치 두 경우 모두에 쓰인다.
export function updateMyPassword({
  currentPassword,
  newPassword,
}: UpdatePasswordRequest): Promise<MessageResponse> {
  return axiosInstance
    .patch<ApiSuccessResponse<MessageResponse>>('/api/auth/me/password', {
      currentPassword,
      newPassword,
    })
    .then(unwrapData);
}
