import type { ApiSuccessResponse } from '../../../types/api.ts';
import type { KakaoUnregisteredErrorResponse, LoginResponse } from '../types.ts';
import { isRecord } from '../../../utils/typeGuards.ts';
import axiosInstance, { unwrapData } from '../../../services/axiosInstance.ts';

// 카카오 OAuth 흐름
// 1. GET /api/auth/kakao → 서버가 카카오 인증 페이지로 307 리다이렉트 (브라우저 이동으로 호출)
// 2. 카카오가 프론트 콜백(/auth/kakao/callback)으로 code를 붙여 리다이렉트
// 3. 콜백 페이지가 GET /api/auth/kakao/redirect?code=로 로그인 → 일반 로그인과 같은 { accessToken, user }

// GET /api/auth/kakao는 카카오 인증 페이지로 307 리다이렉트하므로 axios가 아닌 브라우저 이동으로 호출한다.
function getKakaoAuthUrl(): string {
  return axiosInstance.getUri({ url: '/api/auth/kakao' });
}

export function redirectToKakaoAuth() {
  window.location.assign(getKakaoAuthUrl());
}

// 카카오 콜백 페이지에서 받은 인가코드로 로그인
export function loginWithKakao(code: string): Promise<LoginResponse> {
  return axiosInstance
    .get<ApiSuccessResponse<LoginResponse>>('/api/auth/kakao/redirect', {
      params: { code },
      skipAuth: true,
    })
    .then(unwrapData);
}

const KAKAO_ID_PATTERN = /^\d+$/;

export function isKakaoUnregisteredError(data: unknown): data is KakaoUnregisteredErrorResponse {
  return (
    isRecord(data) &&
    data.error === 'unregistered' &&
    typeof data.kakaoId === 'string' &&
    KAKAO_ID_PATTERN.test(data.kakaoId)
  );
}
