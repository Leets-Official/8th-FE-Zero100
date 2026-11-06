import type { ApiSuccessResponse } from '../types/api.ts';
import type { LoginResponse } from '../types/auth.ts';
import axiosInstance, { unwrapData } from './axiosInstance.ts';

// GET /api/auth/kakao는 카카오 인증 페이지로 307 리다이렉트하므로 axios가 아닌 브라우저 이동으로 호출한다.
export function getKakaoAuthUrl(): string {
  return axiosInstance.getUri({ url: '/api/auth/kakao' });
}

export function redirectToKakaoAuth() {
  window.location.assign(getKakaoAuthUrl());
}

// 카카오 콜백 페이지에서 받은 인가코드로 로그인
// 미가입 유저는 401과 함께 KakaoUnregisteredErrorResponse를 받으므로 ApiError.data로 확인한다.
export function loginWithKakao(code: string): Promise<LoginResponse> {
  return axiosInstance
    .get<ApiSuccessResponse<LoginResponse>>('/api/auth/kakao/redirect', {
      params: { code },
      skipAuth: true,
    })
    .then(unwrapData);
}
