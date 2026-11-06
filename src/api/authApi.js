import axiosInstance from './axiosInstance.js';

// 회원가입. name은 선택, kakaoId는 카카오 미가입 유저가 가입할 때만 전달
// 반환: { id, email, name, created_at }
export function signup({ email, password, name, kakaoId }) {
  return axiosInstance.post('/api/auth/signup', { email, password, name, kakaoId });
}

// 로그인. 반환: { accessToken, user: { id, email, name } }
export function login({ email, password }) {
  return axiosInstance.post('/api/auth/login', { email, password });
}

// 내 정보 조회 (인증 필요). 반환: { id, email, name, created_at }
export function fetchMe() {
  return axiosInstance.get('/api/auth/me');
}

// 이름 수정 (인증 필요). 반환: { id, email, name, created_at }
export function updateMyName({ name }) {
  return axiosInstance.patch('/api/auth/me', { name });
}

// 비밀번호 수정 (인증 필요). 반환: { message }
// 401은 인증 실패와 현재 비밀번호 불일치 두 경우 모두에 쓰인다.
export function updateMyPassword({ currentPassword, newPassword }) {
  return axiosInstance.patch('/api/auth/me/password', { currentPassword, newPassword });
}
