import axiosInstance from './axiosInstance';

// 성공 응답은 { data: ... } 형식이므로 response.data.data를 반환합니다.

// 회원가입 (성공해도 토큰은 내려오지 않습니다)
export const signup = async ({ email, password, name, kakaoId }) => {
  const body = { email, password, name };
  if (kakaoId) body.kakaoId = kakaoId;

  const response = await axiosInstance.post('/api/auth/signup', body);
  return response.data.data;
};

// 로그인 → { accessToken, user }
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return response.data.data;
};

// 내 정보 조회 → { id, email, name, created_at }
export const getMe = async () => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data.data;
};

// 이름 수정 → 수정된 내 정보
export const updateName = async (name) => {
  const response = await axiosInstance.patch('/api/auth/me', { name });
  return response.data.data;
};

// 비밀번호 변경 → { message }
export const updatePassword = async ({ currentPassword, newPassword }) => {
  const response = await axiosInstance.patch('/api/auth/me/password', {
    currentPassword,
    newPassword,
  });
  return response.data.data;
};

// 카카오 로그인 시작: 서버가 307로 카카오 인증 페이지로 보내므로 axios가 아니라 브라우저 이동으로 호출합니다.
export const getKakaoLoginUrl = () => {
  const baseUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
  return `${baseUrl}/api/auth/kakao`;
};

// 카카오 인가코드로 로그인 처리 → { accessToken, user }
// 미가입 유저는 401 + { error: 'unregistered', kakaoId }로 응답합니다.
export const loginWithKakaoCode = async (code) => {
  const response = await axiosInstance.get('/api/auth/kakao/redirect', { params: { code } });
  return response.data.data;
};
