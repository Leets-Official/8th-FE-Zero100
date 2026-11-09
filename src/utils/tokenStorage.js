const ACCESS_TOKEN_KEY = 'zero100-access-token';

/** 로그인 후 받은 accessToken을 꺼낸다. 저장소를 못 쓰는 환경이면 로그인 안 한 상태로 본다. */
export const getAccessToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const saveAccessToken = (accessToken) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } catch {
    // 시크릿 모드 등으로 저장이 막혀 있으면 새로고침 후 다시 로그인해야 한다.
  }
};

export const removeAccessToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // 지울 수 없어도 화면은 로그인 페이지로 이동하므로 조용히 넘어간다.
  }
};
