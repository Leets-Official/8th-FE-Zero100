import { axiosInstance } from './axiosInstance';

/**
 * 회원가입: 성공하면 만들어진 사용자 정보 { id, email, name, created_at }를 돌려준다.
 * 카카오 로그인에서 넘어온 경우에만 kakaoId를 함께 보내 카카오 계정과 연결한다.
 */
export const signup = async ({ email, password, name, kakaoId }) => {
  const response = await axiosInstance.post('/auth/signup', { email, password, name, kakaoId });
  return response.data.data;
};

/** 카카오 로그인 시작 주소. axios 요청이 아니라 브라우저가 이 주소로 직접 이동해야 한다. */
export const KAKAO_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;

/**
 * 카카오가 돌려준 인가 코드로 로그인한다. 성공하면 { accessToken, user }를 돌려준다.
 * 아직 가입하지 않은 카카오 계정이면 401 { error: 'unregistered', kakaoId }가 온다.
 */
export const loginWithKakao = async (code) => {
  const response = await axiosInstance.get('/auth/kakao/redirect', { params: { code } });
  return response.data.data;
};

/** 로그인: 성공하면 { accessToken, user }를 돌려준다. */
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data.data;
};

/** 내 정보: { id, email, name, created_at } */
export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data.data;
};

/** 이름 변경: 성공하면 바뀐 내 정보를 돌려준다. */
export const updateMyName = async (name) => {
  const response = await axiosInstance.patch('/auth/me', { name });
  return response.data.data;
};

/**
 * 비밀번호 변경. 현재 비밀번호가 틀려도 서버가 401을 보내므로,
 * 토큰 만료로 보고 로그아웃시키지 않도록 skipAuthRedirect를 켠다. (axiosInstance 참고)
 */
export const updateMyPassword = async ({ currentPassword, newPassword }) => {
  await axiosInstance.patch(
    '/auth/me/password',
    { currentPassword, newPassword },
    { skipAuthRedirect: true },
  );
};
