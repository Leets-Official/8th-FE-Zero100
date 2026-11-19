// axiosInstance의 요청 인터셉터가 읽는 키와 같은 값을 사용합니다.
const TOKEN_KEY = 'accessToken';

export const getAccessToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const saveAccessToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // 저장소를 사용할 수 없는 환경에서는 로그인 유지가 되지 않을 뿐 동작은 계속합니다.
  }
};

export const removeAccessToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // 위와 같은 이유로 무시합니다.
  }
};
