import type { ApiErrorResponse } from './api.ts';
import type { User } from './user.ts';

// POST /api/auth/signup
export interface SignupRequest {
  email: string;
  password: string;
  // 2~8자, 선택
  name?: string;
  // 카카오 미가입 유저가 가입할 때만 전달
  kakaoId?: string;
}

export type SignupResponse = User;

// POST /api/auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인·카카오 로그인 응답의 user (created_at 없음)
export type AuthUser = Pick<User, 'id' | 'email' | 'name'>;

// POST /api/auth/login, GET /api/auth/kakao/redirect 성공 응답
export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

// PATCH /api/auth/me
export interface UpdateNameRequest {
  name: string;
}

// PATCH /api/auth/me/password
export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// GET /api/auth/kakao/redirect 401: 카카오 미가입 유저
export interface KakaoUnregisteredErrorResponse extends ApiErrorResponse {
  error: 'unregistered';
  kakaoId: string;
}
